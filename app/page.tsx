'use client'

import { FormEvent, useState } from 'react'
import { FaSearch } from 'react-icons/fa'

import { searchVolumes } from '@/app/lib/api'
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
  const [isLoading, setLoading] = useState(false)
  const [input, setInput] = useState('')

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

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault()
    await searchBooks()
  }

  return (
    <Container maxW="container.xl">
      <Flex flexDirection="column">
        <Heading mt={40} mb={8} as="h1" textAlign="center">
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
    </Container>
  )
}

export default Home
