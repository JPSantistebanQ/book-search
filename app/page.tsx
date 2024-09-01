'use client'

import { FormEvent, useState } from 'react'
import { FaSearch } from 'react-icons/fa'
import uniqid from 'uniqid'

import { searchVolumes } from '@/app/lib/api'
import { Book } from '@/app/lib/definitions'
import {
  Box,
  Button,
  Container,
  Divider,
  Flex,
  Heading,
  HStack,
  Image,
  Input,
  SimpleGrid,
  SkeletonCircle,
  SkeletonText,
  Spinner,
  Text
} from '@chakra-ui/react'

const Home = () => {
  const [data, setData] = useState<Book[]>([])
  const [isLoading, setLoading] = useState(false)
  const [input, setInput] = useState('')

  const searchBooks = async () => {
    setLoading(true)
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
    <Container maxW="full">
      <Flex flexDirection="column">
        <Heading as="h1">Book search</Heading>
        <form onSubmit={(e) => handleSubmit(e)}>
          <HStack my={2}>
            <Input
              placeholder="Basic usage"
              type="text"
              value={input}
              onInput={(e) => setInput(e.currentTarget.value)}
            />
            <Button rightIcon={<FaSearch />} variant="solid" type="submit">
              Buscar
            </Button>
          </HStack>
        </form>
      </Flex>

      <Divider />

      {isLoading ? <Spinner /> : null}

      <Text>Result:</Text>
      <SimpleGrid columns={3} gap={3}>
        {data.map((book) => (
          <Box key={uniqid()} padding="6" boxShadow="lg" bg="white">
            <Image src={book.image} alt={book.title} />
            <Text>{book.title}</Text>
            <Text>{book.subtitle}</Text>
            {book.authors.map((author) => (
              <Text key={uniqid()}>{author}</Text>
            ))}
          </Box>
        ))}
        <Box padding="6" boxShadow="lg" bg="white">
          <SkeletonCircle size="10" />
          <SkeletonText mt="4" noOfLines={4} spacing="4" />
        </Box>
      </SimpleGrid>
    </Container>
  )
}

export default Home
