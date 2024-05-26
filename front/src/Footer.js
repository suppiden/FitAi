import React from 'react';
import { Box, Container, Stack, Text, Flex, Link } from '@chakra-ui/react';
import { FaFacebook, FaTwitter, FaYoutube, FaInstagram } from 'react-icons/fa';
import './footer.css'

const Footer = () => {
  return (
    <Box
      bg="gray.900" // Aseguramos que el fondo es el más oscuro disponible
      color="gray.200" // El color del texto para asegurar contraste
    >
      <Container as={Stack} maxW={'6xl'} py={10}>
        <Flex direction={{ base: "column", md: "row" }} justify="space-between" align="center">
          <Stack spacing={1} mb={{ base: 5, md: 0 }}>
            <Text fontWeight="bold" mb={2}>About</Text>
            <Link href="#" className="footer-link">Our Story</Link>
            <Link href="#" className="footer-link">Privacy Policy</Link>
            <Link href="#" className="footer-link">Refund Policy</Link>
            <Link href="#" className="footer-link">Terms of Service</Link>
          </Stack>

          <Stack spacing={1}>
            <Text fontWeight="bold" mb={2}>Support</Text>
            <Link href="#" className="footer-link">Help Center</Link>
            <Link href="#" className="footer-link">Email Us</Link>
          </Stack>

          <Stack spacing={4} direction="row">
            <Link href="#" className="footer-link" isExternal><FaFacebook /></Link>
            <Link href="#" className="footer-link" isExternal><FaTwitter /></Link>
            <Link href="#" className="footer-link" isExternal><FaYoutube /></Link>
            <Link href="#" className="footer-link" isExternal><FaInstagram /></Link>
          </Stack>
        </Flex>

        <Text textAlign="center" mt={10} fontSize="sm">© 2024 Renaissance Periodization. All rights reserved.</Text>
      </Container>
    </Box>
  );
};

export default Footer;