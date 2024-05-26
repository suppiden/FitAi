import React from 'react';
import { Box, Text, Flex, Avatar } from '@chakra-ui/react';

const TestimonialCard = ({ quote, author, role, imageUrl }) => {
  const defaultAvatarBg = "#22c55e"; // Verde específico

  return (
    <Box bg="#6B7280" color="white" p={5} borderRadius="lg" shadow="lg">
      <Text fontStyle="italic" mb={4}>"{quote}"</Text>
      <Flex align="center" mt={4}>
        <Avatar
          name={author}
          src={imageUrl}
          bg={!imageUrl ? defaultAvatarBg : undefined} // Establecer el color de fondo solo si no hay imagen
        />
        <Box ml={3}>
          <Text fontWeight="bold">{author}</Text>
          <Text fontSize="sm">{role}</Text>
        </Box>
      </Flex>
    </Box>
  );
};

export default TestimonialCard;
