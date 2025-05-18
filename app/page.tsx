'use client'

import { FormEvent, useEffect, useState } from 'react'
import { FaSearch } from 'react-icons/fa'

import { searchMostPopular, searchVolumes } from '@/app/lib/api'
import { Book } from '@/app/lib/definitions'
import ResultList from '@/app/ui/components/ResultList/ResultList'
import ResultLoading from '@/app/ui/components/ResultLoading/ResultLoading'
import {
  Button,
  Container,
  Flex,
  Heading,
  HStack,
  Input,
  Text
} from '@chakra-ui/react'

const Home = () => {
  const [data, setData] = useState<Book[]>([])
  const [popularBooks, setPopularBooks] = useState<Book[]>([])
  const [isLoading, setLoading] = useState(false)
  const [isLoadingPopular, setLoadingpopular] = useState(false)
  const [input, setInput] = useState('')

  useEffect(() => {
    searchBookspopular()
  }, [])

  const searchBooks = async () => {
    setLoading(true)
    if (!input) setLoading(false)
    await searchVolumes(input)
      .then((response) => {
        console.log('data: ', response)
        setData(response)
      })
      .catch((error) => {
        console.error('Error retrieving data:', error)
        throw new Error('Could not get data')
      })
      .finally(() => {
        setLoading(false)
      })
  }
  const searchBookspopular = async () => {
    setLoadingpopular(true)
    await searchMostPopular()
      .then((response) => {
        console.log('data: ', response)
        setPopularBooks(response)
      })
      .catch((error) => {
        console.error('Error retrieving data:', error)
        throw new Error('Could not get data')
      })
      .finally(() => {
        setLoadingpopular(false)
      })
  }

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault()
    await searchBooks()
  }

  return (
    <Container maxW="container.xl">
      <Flex flexDirection="column">
        <Heading
          mt={40}
          mb={8}
          as="h1"
          size="3xl"
          textAlign="center"
          style={{
            fontFamily: 'var(--font-pacifico)'
          }}
        >
          Book Scout
        </Heading>
        <form onSubmit={(e) => handleSubmit(e)}>
          <HStack my={10}>
            <Input
              disabled={isLoading}
              placeholder="Ingrese título, autor, ISBN"
              type="text"
              value={input}
              onInput={(e) => setInput(e.currentTarget.value)}
            />
            <Button
              rightIcon={<FaSearch />}
              variant="solid"
              type="submit"
              disabled={isLoading}
            >
              Buscar
            </Button>
          </HStack>
        </form>
      </Flex>

      {isLoading ? <ResultLoading /> : null}

      {!isLoading && data.length > 0 ? (
        <>
          <Text fontSize="xl" fontWeight="bold" mb={2}>
            Resultado:
          </Text>
          <ResultList data={data} />
        </>
      ) : null}
      <Text fontSize="2xl" fontWeight="bold" mb={2}>
        Más buscados
      </Text>
      {isLoadingPopular ? <ResultLoading /> : null}
      {!isLoadingPopular && popularBooks.length > 0 ? (
        <>
          <ResultList data={popularBooks} />
        </>
      ) : null}
    </Container>
  )
}

export default Home
