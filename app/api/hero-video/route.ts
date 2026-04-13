import { list } from '@vercel/blob'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const { blobs } = await list({ prefix: 'hero/' })

    if (blobs.length === 0) {
      return NextResponse.json({ url: null })
    }

    // Return the most recently uploaded hero video
    const sorted = blobs.sort(
      (a, b) =>
        new Date(b.uploadedAt).getTime() - new Date(a.uploadedAt).getTime()
    )

    return NextResponse.json({ url: sorted[0].url })
  } catch (error) {
    console.error('Error fetching hero video:', error)
    return NextResponse.json({ url: null })
  }
}
