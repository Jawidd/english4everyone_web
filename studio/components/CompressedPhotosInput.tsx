/**
 * CompressedPhotosInput.tsx
 *
 * Lightweight photo input component optimized for performance:
 * - Only shows browse button (no "Add Item" button)
 * - Minimal DOM manipulation
 * - Compresses images to reduce file size
 * - Simple, clean interface
 */
import { useCallback, useRef } from 'react'
import { useClient, insert } from 'sanity'
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
        if (width >= height) { 
          height = Math.round(height / width * MAX_PX)
          width = MAX_PX 
        } else { 
          width = Math.round(width / height * MAX_PX)
          height = MAX_PX 
        }
      }
      const canvas = document.createElement('canvas')
      canvas.width = width
      canvas.height = height
      const ctx = canvas.getContext('2d')
      if (ctx) {
        ctx.drawImage(img, 0, 0, width, height)
        canvas.toBlob(
          (blob) => resolve(blob
            ? new File([blob], file.name.replace(/\.[^.]+$/, '.jpg'), { type: 'image/jpeg' })
            : file
          ),
          'image/jpeg', QUALITY
        )
      } else {
        resolve(file)
      }
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

    try {
      // Process files sequentially to reduce memory usage
      const results = []
      for (const file of files) {
        const compressed = await compress(file)
        const asset = await client.assets.upload('image', compressed, { filename: compressed.name })
        results.push({
          _type: 'image' as const,
          _key: randomKey(),
          asset: { _type: 'reference' as const, _ref: asset._id },
        })
      }

      // Add all new items to the array
      props.onChange(insert(results, 'after', [-1]))
    } catch (error) {
      console.error('Upload failed:', error)
    } finally {
      isUploading.current = false
      if (inputRef.current) inputRef.current.value = ''
    }
  }, [client, props])

  const currentCount = props.value?.length ?? 0
  const remaining = 6 - currentCount

  return (
    <div>
      {/* Show existing photos with simple controls */}
      {props.renderDefault(props)}

      {/* Simple browse button - no "Add Item" button */}
      {remaining > 0 && (
        <div style={{ 
          marginTop: 12, 
          padding: '8px 12px', 
          background: '#f9f9f9', 
          borderRadius: 4,
          border: '1px solid #e1e1e1'
        }}>
          <input
            ref={inputRef}
            type="file"
            accept="image/*"
            multiple
            onChange={handleFiles}
            disabled={isUploading.current}
            style={{ 
              display: 'block', 
              width: '100%',
              fontSize: '13px'
            }}
          />
          <p style={{ 
            fontSize: 11, 
            color: '#666', 
            margin: '4px 0 0 0' 
          }}>
            {isUploading.current ? 'Uploading...' : `Add up to ${remaining} more photos (auto-compressed)`}
          </p>
        </div>
      )}
    </div>
  )
}
