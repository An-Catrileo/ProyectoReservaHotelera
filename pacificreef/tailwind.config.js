import defaultTheme from "tailwindcss/defaultTheme";
import forms from "@tailwindcss/forms";
// import lineClamp from '@tailwindcss/line-clamp';
import colors from "tailwindcss/colors";
/** @type {import('tailwindcss').Config} */
export default {
    darkMode: ["class"],
    content: [
        "./vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php",
        "./storage/framework/views/*.php",
        "./resources/views/**/*.blade.php",
        "./resources/js/**/*.jsx",
    ],
    theme: {
        container: {
            center: true,
            padding: {
                DEFAULT: "1rem",
                sm: "2rem",
                lg: "2rem",
                xl: "4rem",
                "2xl": "10rem",
            },
        },
        colors: {
            ...colors,

            // OPCIÓN 2: Definir tus propios colores personalizados
            // Descomenta estas líneas y comenta la línea "primary: colors.indigo" de arriba
            primary: {
                50: "#3897CF",
                100: "#3897CF",
                200: "#286D95",
                300: "#286D95",
                400: "#286D95",
                500: "#18425A",
                600: "#102c3c",
                700: "#102c3c",
                800: "#102c3c",
                900: "#102c3c",
                950: "#102c3c",
            },
        },
        extend: {
            fontFamily: {
                sans: ["Inter var", ...defaultTheme.fontFamily.sans],
            },
        },
    },

    plugins: [forms],
};
