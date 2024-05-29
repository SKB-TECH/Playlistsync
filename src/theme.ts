// src/theme.js
import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
    components: {
        Button: {
            // You can update the base styles or add new variants
            baseStyle: {
                fontWeight: "bold",
                // Example: change the base font weight
            },
            sizes: {
                xl: {
                    h: "56px",
                    fontSize: "lg",
                    px: "32px",
                },
            },
            variants: {
                primary: {
                    bg: "#03aafc",
                    color: "white",
                    // _hover: {
                    //     bg: "teal.600",
                    // },
                },
                secondary: {
                    bg: "gray.500",
                    color: "white",
                    border: "2px solid",
                    borderColor: "gray.600",
                    _hover: {
                        bg: "gray.600",
                        borderColor: "gray.700",
                    },
                },
                outline: {
                    border: "1px solid",
                    borderColor: "#03aafc",
                    color: "#03aafc",
                    bg: "transparent",

                },
                joine: {
                    border: "1px solid",
                    borderColor: "#13d763",
                    color: "#13d763",
                    bg: "transparent",

                },
            },
            defaultProps: {
                size: "md", // default size is md
                variant: "primary", // default variant is primary
            },
        },
        Input: {
            variants: {
                custom: {
                    field: {
                        bg: "white.400",
                        border:"1px solid",
                        borderColor: "gray.400",
                    },
                },
            },
        },
    },
    colors: {
        brand: {
            50: "#f5fee5",
            100: "#e1fbb2",
            200: "#cdf781",
            300: "#b8ee56",
            400: "#a2e032",
            500: "#8ac919",
            600: "#71ab09",
            700: "#578602",
            800: "#3c5e00",
            900: "#203300",
        },
    },
});

export default theme;
