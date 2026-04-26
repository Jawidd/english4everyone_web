/**
 * CompressedImageInput.tsx
 *
 * Wraps Sanity's built-in ImageInput. Intercepts file selection,
 * resizes to max 1600px and compresses to JPEG 82% quality via canvas,
 * then uploads the smaller file. Typical phone photo: 5 MB → ~400 KB.
 */
import { useCallback, useRef } from 'react'
import { useClient, set } from 'sanity'
import type { ObjectInputProps } from 'sanity'

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
      canvas.width = width; canvas.height = height
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

export function CompressedImageInput(props: ObjectInputProps) {
  const client = useClient({ apiVersion: '2024-01-01' })
  const inputRef = useRef<HTMLInputElement>(null)

  const handleFiles = useCallback(async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files ?? [])
    if (!files.length) return

    for (const file of files) {
      const compressed = await compress(file)
      const asset = await client.assets.upload('image', compressed, {
        filename: compressed.name,
      })
      props.onChange(set({
        _type: 'image',
        asset: { _type: 'reference', _ref: asset._id },
      }))
    }
    // reset so same file can be re-selected
    if (inputRef.current) inputRef.current.value = ''
  }, [client, props])

  return (
    <div>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        multiple
        onChange={handleFiles}
        style={{ display: 'block', marginBottom: 8 }}
      />
      <p style={{ fontSize: 12, color: '#888' }}>
        Images are automatically resized to max 1600px and compressed before upload.
      </p>
      {props.renderDefault(props)}
    </div>
  )
}
