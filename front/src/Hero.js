import React, { useState, useEffect } from 'react';
import { 
  Flex,
  SimpleGrid,
  Box, 
  Heading,
  Text,
  Button, 
  Tooltip
} from '@chakra-ui/react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import axios from 'axios';

// Hook para determinar si es un dispositivo móvil
const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkIfMobile();

    window.addEventListener('resize', checkIfMobile);
    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);

  return isMobile;
};

const Card = ({ children }) => {
  return (
    <Box
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      p={5}
      textAlign="center"
      bg="black"
      color={'#6B7280'}
      boxShadow="md"
      transition="all 0.3s"
      className="rainbow-border"
      _hover={{
        boxShadow: 'xl',
      }}
    >
      {children}
    </Box>
  );
};

function Hero({ userId, error }) {
  const isMobile = useIsMobile(); // Usamos el hook para verificar si estamos en un dispositivo móvil
  const priceFontSize = isMobile ? "6xl" : "7xl"; // Tamaño dinámico del precio
  const priceColor = "white"; // Nuevo color para el precio

  const cards = [
    {
      title: 'Basic Plan',
      price: '$9.99',
      description: '1 month, just joking and finding out.',
    },
    {
      title: 'Premium Plan',
      price: '$19.99',
      description: '3 months, now you are pretty serious.',
    },
    {
      title: 'Pro Plan',
      price: '$29.99',
      description: '6 months, let the grind begin',
    },
  ];

  const handlePayment = async (plan) => {
    if (!userId) {
      alert("Please log in to make a payment.");
      return;
    }
    try {
      localStorage.setItem('planPrice', plan.price);
      const response = await axios.post('http://localhost:8081/pago', { plan });
      window.location.href = response.data.url; // Redirige al Checkout de Stripe
    } catch (error) {
      console.error('Error al iniciar el proceso de pago:', error);
    }
  };

  return (
    <Flex align="center" justify="center" height="100vh" width="100vw" className="hero-container">
      {isMobile ? (
        <Swiper slidesPerView={1} spaceBetween={30} pagination={{ clickable: true }} style={{ width: '100%' }}>
          {cards.map((card, index) => (
            <SwiperSlide key={index}>
              <Card>
                <Heading size='md' color={'white'} mb={4}>{card.title}</Heading>
                <Text fontSize={priceFontSize} fontWeight="bold" my={6} color={priceColor}>
                  {card.price}
                </Text>
                <Text mb={6}>{card.description}</Text>
                <Tooltip label={!userId ? "You need to log in to choose a plan" : error ? "You need to verify the email" : ""} shouldWrapChildren>
                  <Button 
                    mt={4} 
                    bg={'#22c55e'} 
                    onClick={() => handlePayment(card)} 
                    isDisabled={!userId || error} // Deshabilitar si no hay userId o si hay un error
                    _hover={{ bg: '#16a34a' }}
                  >
                    Choose Plan
                  </Button>
                </Tooltip>
              </Card>
            </SwiperSlide>
          ))}
        </Swiper>
      ) : (
        <SimpleGrid columns={3} spacing={10} p={10} w="full" maxW="1200px" height="80vh">
          {cards.map((card, index) => (
            <Card key={index}>
              <Heading size='md' mb={40}>{card.title}</Heading>
              <Text fontSize={priceFontSize} fontWeight="bold" my={6} color={priceColor}>
                {card.price}
              </Text>
              <Text mb={20}>{card.description}</Text>
              <Tooltip label={!userId ? "You need to log in to choose a plan" : error ? "You need to verify the email" : ""} shouldWrapChildren>
                <Button 
                  mt={20} 
                  bg={'#22c55e'} 
                  onClick={() => handlePayment(card)} 
                  isDisabled={!userId || error} // Deshabilitar si no hay userId o si hay un error
                  _hover={{ bg: '#16a34a' }}
                >
                  Choose Plan
                </Button>
              </Tooltip>
            </Card>
          ))}
        </SimpleGrid>
      )}
    </Flex>
  );
}

export default Hero;

