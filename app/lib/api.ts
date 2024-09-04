import axios from 'axios'
import { Builder } from 'builder-pattern'

import { Book } from '@/app/lib/definitions'

const axiosInstance = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_CORS_ORIGIN_URL}${process.env.NEXT_PUBLIC_GOOGLE_BOOK_API_URL}`,
  timeout: 5000 // Timeout if necessary
})

const searchVolumes = async (search: string): Promise<Book[]> => {
  try {
    const response = await axiosInstance.get(
      `/volumes?q=${search}&key=${process.env.NEXT_PUBLIC_GOOGLE_API_KEY}&startIndex=0&maxResults=40`
    )

    return (response.data.items as any[]).map((item) => {
      return Builder(Book)
        .id(item.id)
        .title(item.volumeInfo?.title)
        .subtitle(item.volumeInfo?.subtitle)
        .image(item.volumeInfo.imageLinks?.thumbnail)
        .authors(item.volumeInfo?.authors ?? [])
        .previewLink(item.volumeInfo?.previewLink ?? null)
        .build()
    })
  } catch (error) {
    console.error('Error retrieving data:', error)
    throw new Error('Could not get data')
  }
}

export { axiosInstance, searchVolumes }
