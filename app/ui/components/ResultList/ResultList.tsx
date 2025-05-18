import React, { useEffect, useState } from 'react'
import PropTypes, { type InferProps } from 'prop-types'
import uniqid from 'uniqid'

import { Book } from '@/app/lib/definitions'
import {
  AspectRatio,
  Box,
  Image,
  LinkBox,
  LinkOverlay,
  SimpleGrid,
  Text
} from '@chakra-ui/react'

const ResultListPropTypes = {
  data: PropTypes.arrayOf(PropTypes.instanceOf(Book).isRequired).isRequired
}

type ResultListTypes = InferProps<typeof ResultListPropTypes>

const ResultList: React.FC<ResultListTypes> = ({ data }) => {
  const [books, setBooks] = useState<Book[]>([])

  useEffect(() => {
    console.log('ResultList effect: ', data)
    setBooks(data)
  }, [data])

  return (
    <SimpleGrid columns={{ sm: 2, md: 3, lg: 4, xl: 5 }} gap={3}>
      {books.map((book) => (
        <LinkBox key={book.id} as="article" rounded="sm">
          <Box padding="6" boxShadow="lg">
            <AspectRatio mb={2} ratio={3 / 4} maxW="100%">
              <Image
                src={book.image}
                alt={book.title}
                objectFit="cover"
                fallbackSrc="No-Image-Placeholder.svg"
              />
            </AspectRatio>
            <Text fontSize="md" noOfLines={2}>
              <LinkOverlay href={book.previewLink ?? '#'} isExternal={true}>
                {book.title}
              </LinkOverlay>
            </Text>
            <Text fontSize="sm" noOfLines={2} as="i">
              {book.subtitle}
            </Text>
            {book.authors.map((author) => (
              <Text fontSize="sm" key={uniqid()} fontWeight="bold">
                {author}
              </Text>
            ))}
          </Box>
        </LinkBox>
      ))}
    </SimpleGrid>
  )
}

ResultList.propTypes = ResultListPropTypes

export default ResultList
