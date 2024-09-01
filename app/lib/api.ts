import axios from 'axios'
import { Builder } from 'builder-pattern'

import { Book } from '@/app/lib/definitions'

const axiosInstance = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_CORS_ORIGIN_URL}${process.env.NEXT_PUBLIC_GOOGLE_BOOK_API_URL}`,
  timeout: 5000, // Timeout if necessary
  headers: {
    ContentType: 'program/json',
    AccessControlAllowOrigin: '*',
    AccessControlAllowMethods: 'GET, POST, PUT, DELETE, OPTIONS',
    AccessControlAllowHeaders:
      'Content-Type, Authorization, Content-Length, X-Requested-With, Accept, Origin'
    // Add all custom headers here
  }
})

const searchVolumes = async (search: string): Promise<Book[]> => {
  try {
    const response = await axiosInstance.get(
      `/volumes?q=${search}&key=${process.env.NEXT_PUBLIC_GOOGLE_APi_KEY}`
    )
    return (response.data.items as any[]).map((item) => {
      return Builder(Book)
        .title(item.volumeInfo?.title)
        .subtitle(item.volumeInfo?.subtitle)
        .image(item.volumeInfo.imageLinks?.thumbnail)
        .authors(item.volumeInfo?.authors ?? [])
        .build()
    })
  } catch (error) {
    console.error('Error retrieving data:', error)
    throw new Error('Could not get data')
  }
}

export { axiosInstance, searchVolumes }
