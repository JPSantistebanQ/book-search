import React from 'react'

import { Box, SimpleGrid, SkeletonCircle, SkeletonText } from '@chakra-ui/react'

const ResultLoading: React.FC = () => {
  return (
    <SimpleGrid columns={{ sm: 2, md: 3, lg: 4, xl: 5 }} gap={3}>
      <Box padding="6" boxShadow="lg">
        <SkeletonCircle size="10" />
        <SkeletonText mt="4" noOfLines={4} spacing="4" />
      </Box>
      <Box padding="6" boxShadow="lg">
        <SkeletonCircle size="10" />
        <SkeletonText mt="4" noOfLines={4} spacing="4" />
      </Box>
      <Box padding="6" boxShadow="lg">
        <SkeletonCircle size="10" />
        <SkeletonText mt="4" noOfLines={4} spacing="4" />
      </Box>
      <Box padding="6" boxShadow="lg">
        <SkeletonCircle size="10" />
        <SkeletonText mt="4" noOfLines={4} spacing="4" />
      </Box>
      <Box padding="6" boxShadow="lg">
        <SkeletonCircle size="10" />
        <SkeletonText mt="4" noOfLines={4} spacing="4" />
      </Box>
      <Box padding="6" boxShadow="lg">
        <SkeletonCircle size="10" />
        <SkeletonText mt="4" noOfLines={4} spacing="4" />
      </Box>
    </SimpleGrid>
  )
}

export default ResultLoading
