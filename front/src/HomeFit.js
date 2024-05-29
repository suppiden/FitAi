import Hero from './Hero';
import { ChakraProvider } from '@chakra-ui/react';
import Testimonials from './Testimonials.js';
import Footer from './Footer.js'
import Catch from './Catch.js';
import Nav from './Nav.js';
import './indexCatch.css'
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { useEffect, useState } from "react";
import Relleno from './Relleno.js';
import useVerifySession from "./customHooks/useVerifySession";
import useVerifyEmail from "./customHooks/useVerifyEmail";
import useVerifyPago from "./customHooks/useVerifyPago";

function HomeFit() {
    const navigate = useNavigate();
    const { userId, error: sessionError } = useVerifySession();
    const emailError = useVerifyEmail(userId);
    const { pagoStatus, error: pagoError } = useVerifyPago(userId);

    useEffect(() => {
        if (sessionError) {
            navigate("/");
        }
    }, [sessionError, navigate]);

    const error = emailError || pagoError;

    return (
        <>
            <Nav userId={!!userId} error={error} />
            <Catch error={error} />
            <ChakraProvider>
                <Hero userId={userId} error={emailError} />
                <Relleno />
                <Testimonials />
            </ChakraProvider>
            <Footer />
        </>
    );
}

export default HomeFit;
