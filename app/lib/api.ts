import axios from 'axios'
import { Builder } from 'builder-pattern'

import { Book } from '@/app/lib/definitions'

const axiosInstance = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_CORS_ORIGIN_URL}${process.env.NEXT_PUBLIC_GOOGLE_BOOK_API_URL}`,
  timeout: 5000 // Timeout if necessary
})

const authors: string[] = [
  'J.K. Rowling',
  'George R.R. Martin',
  'J.R.R. Tolkien',
  'Agatha Christie',
  'Issac Asimov',
  'Mario Vargas Llosa',
  'Gabriel García Márquez',
  'George Orwell'
]

const searchVolumes = async (
  search: string,
  startIndex: number = 0,
  maxResults: number = 40
): Promise<Book[]> => {
  try {
    const response = await axiosInstance.get(
      `/volumes?q=${search}&key=${process.env.NEXT_PUBLIC_GOOGLE_API_KEY}&startIndex=${startIndex}&maxResults=${maxResults}`
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

const searchMostPopular = async (): Promise<Book[]> => {
  const randomAuthor = authors[Math.floor(Math.random() * authors.length)]
  return searchVolumes(`inauthor:${randomAuthor}`, 0, 10)
}

export { axiosInstance, searchMostPopular, searchVolumes }
