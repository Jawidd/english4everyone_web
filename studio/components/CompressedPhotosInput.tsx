/**
 * CompressedPhotosInput.tsx
 *
 * Array-level input for the photos field.
 * - Compresses each image to max 1600px / JPEG 82% before upload
 * - Uploads all selected files in parallel
 * - Adds each as a properly keyed array item (fixes "Missing keys" warning)
 * - Replaces the default array input entirely for this field
 */
import { useCallback, useRef } from 'react'
import { useClient, insert, set } from 'sanity'
import type { ArrayOfObjectsInputProps } from 'sanity'

const MAX_PX = 1600
const QUALITY = 0.82

async function compress(file: File): Promise<File> {
  return new Promise((resolve) => {
    const img = new Image()
    const url = URL.createObjectURL(file)
    img.onload = () => {
      URL.revokeObjectURL(url)
      let { width, height } = img
      if (width > MAX_PX || height > MAX_PX) {
        if (width >= height) { height = Math.round(height / width * MAX_PX); width = MAX_PX }
        else { width = Math.round(width / height * MAX_PX); height = MAX_PX }
      }
      const canvas = document.createElement('canvas')
      canvas.width = width
      canvas.height = height
      canvas.getContext('2d')!.drawImage(img, 0, 0, width, height)
      canvas.toBlob(
        (blob) => resolve(blob
          ? new File([blob], file.name.replace(/\.[^.]+$/, '.jpg'), { type: 'image/jpeg' })
          : file
        ),
        'image/jpeg', QUALITY
      )
    }
    img.onerror = () => { URL.revokeObjectURL(url); resolve(file) }
    img.src = url
  })
}

function randomKey() {
  return Math.random().toString(36).slice(2, 10)
}

export function CompressedPhotosInput(props: ArrayOfObjectsInputProps) {
  const client = useClient({ apiVersion: '2024-01-01' })
  const inputRef = useRef<HTMLInputElement>(null)
  const isUploading = useRef(false)

  const handleFiles = useCallback(async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files ?? [])
    if (!files.length || isUploading.current) return
    isUploading.current = true

    // Upload all files in parallel
    const results = await Promise.all(
      files.map(async (file) => {
        const compressed = await compress(file)
        const asset = await client.assets.upload('image', compressed, { filename: compressed.name })
        return {
          _type: 'image' as const,
          _key: randomKey(),
          asset: { _type: 'reference' as const, _ref: asset._id },
        }
      })
    )

    // Append all new items to the existing array
    props.onChange(insert(results, 'after', [-1]))

    isUploading.current = false
    if (inputRef.current) inputRef.current.value = ''
  }, [client, props])

  const currentCount = props.value?.length ?? 0
  const remaining = 6 - currentCount

  return (
    <div>
      {/* Default array rendering (shows existing photos with remove/reorder) */}
      {props.renderDefault(props)}

      {/* Upload control */}
      {remaining > 0 && (
        <div style={{ marginTop: 12, padding: '10px 12px', background: '#f5f5f5', borderRadius: 6 }}>
          <label style={{ display: 'block', fontSize: 13, fontWeight: 600, marginBottom: 6, color: '#333' }}>
            Add photos ({currentCount}/6)
          </label>
          <input
            ref={inputRef}
            type="file"
            accept="image/*"
            multiple
            onChange={handleFiles}
            style={{ display: 'block', marginBottom: 6 }}
          />
          <p style={{ fontSize: 11, color: '#888', margin: 0 }}>
            Select up to {remaining} more · Auto-compressed to max 1600px before upload
          </p>
        </div>
      )}
      {remaining === 0 && (
        <p style={{ fontSize: 12, color: '#888', marginTop: 8 }}>Maximum 6 photos reached.</p>
      )}
    </div>
  )
}
