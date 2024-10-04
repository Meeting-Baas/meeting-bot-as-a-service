import { ChakraProvider, extendTheme } from '@chakra-ui/react'

import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'

// Define your custom theme
const theme = extendTheme({
    colors: {
        primary: {
            500: '#78FFF0',
            700: '#447671',
        },
        neutral: {
            50: '#F4F9F8',
            200: '#B9B5B5',
            400: '#5A5A5A',
            500: '#343D3C',
            700: '#2B2B2B',
            900: '#232323',
        },
        warning: {
            500: '#FFFF93',
        },
    },
})

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <ChakraProvider theme={theme}>
            <App />
        </ChakraProvider>
    </React.StrictMode>,
)
