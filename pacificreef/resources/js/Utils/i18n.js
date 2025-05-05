import { usePage } from "@inertiajs/react";

/**
 * Traduce un texto basado en la clave y el idioma actual
 * @param {string} key - Clave de traducción en formato 'seccion.subseccion.clave'
 * @param {Object} params - Parámetros para reemplazar en la traducción
 * @returns {string} - Texto traducido
 */
export const __ = (key, params = {}) => {
    const { translations, locale } = usePage().props;

    if (!translations || !locale) {
        console.error(
            "No se encontraron traducciones o locale en las props de la página"
        );
        return key;
    }

    // Dividir la clave por puntos para acceder a la anidación
    const keys = key.split(".");
    let value = translations[locale];

    // Navegar por la estructura de traducciones
    for (const k of keys) {
        if (!value || !value[k]) {
            return key; // Si no se encuentra la clave, devolver la clave original
        }
        value = value[k];
    }

    // Reemplazar parámetros si existen
    if (typeof value === "string" && Object.keys(params).length > 0) {
        return Object.keys(params).reduce((acc, paramKey) => {
            return acc.replace(`:${paramKey}`, params[paramKey]);
        }, value);
    }

    return value;
};

/**
 * Hook para usar traducciones en componentes funcionales
 * @returns {Function} - Función de traducción
 */
export const useTranslation = () => {
    return __;
};
