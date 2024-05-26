import React from 'react';
import { SimpleGrid } from '@chakra-ui/react';
import TestimonialCard from './TestimonialCards'; // Asegúrate de importar TestimonialCard


// { quote, author, role, imageUrl }
const testimonialsData = [
  // Tus datos de testimonios van aquí
  {"quote" : "blablabl",
    "author" : "me",
    "role" : "some",    


},
{"quote" : "blablabl",
"author" : "me",
"role" : "some",    


},
{"quote" : "blablabl",
"author" : "me",
"role" : "some",    


},
{"quote" : "blablabl",
"author" : "me",
"role" : "some",    


},
{"quote" : "blablabl",
"author" : "me",
"role" : "some",    


},
{"quote" : "blablabl",
"author" : "me",
"role" : "some",    


}
];

  const Testimonials = () => {
  return (
    <SimpleGrid columns={[1, null, 3]} spacing={10} p={10} justifyContent="center" bg="black">
      {testimonialsData.map((testimonial, index) => (
        <TestimonialCard key={index} {...testimonial} />
      ))}
    </SimpleGrid>
  );
};

export default Testimonials;