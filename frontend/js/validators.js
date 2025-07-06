// js/validators.js
// (Asegúrate de que este archivo está exportando isString, isEmpty, etc.)
export function isString(value) {
    return typeof value === 'string';
}

export function isEmpty(value) {
    return value.trim() === '';
}

export function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

export function isMinLength(value, min) {
    return value.length >= min;
}