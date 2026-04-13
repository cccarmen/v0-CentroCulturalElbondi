'use client'

import { useState, useRef } from 'react'
import { Upload, CheckCircle, Loader2, Film } from 'lucide-react'
import useSWR, { mutate } from 'swr'

const fetcher = (url: string) => fetch(url).then((res) => res.json())

export default function AdminPage() {
  const [uploading, setUploading] = useState(false)
  const [dragOver, setDragOver] = useState(false)
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const { data } = useSWR<{ url: string | null }>('/api/hero-video', fetcher)

  async function handleUpload(file: File) {
    if (!file.type.startsWith('video/')) {
      setMessage({ type: 'error', text: 'Por favor subi un archivo de video.' })
      return
    }

    setUploading(true)
    setMessage(null)

    try {
      const formData = new FormData()
      formData.append('file', file)

      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      })

      if (!res.ok) throw new Error('Upload failed')

      const { url } = await res.json()
      setMessage({ type: 'success', text: 'Video subido correctamente.' })
      mutate('/api/hero-video', { url }, false)
    } catch {
      setMessage({ type: 'error', text: 'Error al subir el video. Intenta de nuevo.' })
    } finally {
      setUploading(false)
    }
  }

  function handleDrop(e: React.DragEvent) {
    e.preventDefault()
    setDragOver(false)
    const file = e.dataTransfer.files[0]
    if (file) handleUpload(file)
  }

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (file) handleUpload(file)
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <div className="w-full max-w-lg space-y-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground">Admin - Video del Hero</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Subi un video para reemplazar la imagen del hero en la pagina principal.
          </p>
        </div>

        <div
          onDragOver={(e) => {
            e.preventDefault()
            setDragOver(true)
          }}
          onDragLeave={() => setDragOver(false)}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          className={`flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed p-12 transition-colors ${
            dragOver
              ? 'border-primary bg-primary/5'
              : 'border-border hover:border-primary/50 hover:bg-muted/50'
          }`}
        >
          {uploading ? (
            <>
              <Loader2 className="size-10 animate-spin text-primary" />
              <p className="mt-4 text-sm font-medium text-foreground">Subiendo video...</p>
            </>
          ) : (
            <>
              <Upload className="size-10 text-muted-foreground" />
              <p className="mt-4 text-sm font-medium text-foreground">
                Arrastra un video o hace click para seleccionar
              </p>
              <p className="mt-1 text-xs text-muted-foreground">MP4, WebM, MOV</p>
            </>
          )}

          <input
            ref={fileInputRef}
            type="file"
            accept="video/*"
            onChange={handleFileChange}
            className="hidden"
          />
        </div>

        {message && (
          <div
            className={`flex items-center gap-2 rounded-lg p-3 text-sm ${
              message.type === 'success'
                ? 'bg-green-500/10 text-green-500'
                : 'bg-destructive/10 text-destructive'
            }`}
          >
            {message.type === 'success' && <CheckCircle className="size-4" />}
            {message.text}
          </div>
        )}

        {data?.url && (
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-sm font-medium text-foreground">
              <Film className="size-4" />
              Video actual
            </div>
            <video
              src={data.url}
              controls
              className="w-full rounded-lg border border-border"
            >
              <track kind="captions" />
            </video>
          </div>
        )}
      </div>
    </div>
  )
}
