// import {isString} from './validators.js'

// const forms = document.querySelector("#form")
// const inputs = document.querySelectorAll(".input");
// let formIsCompleted = false;

// const object_inputs = {};

// inputs.forEach(input => {
//     object_inputs[input.id] = false;
// });


// function input_feedback(e){
//     e.preventDefault();

// }

// function login_schema_validation(e) {
//     e.preventDefault();
//     // Is string the name
//     formIsCompleted = isString(object_inputs.name.value);
//     // Is string the last name
//     formIsCompleted = isString(object_inputs.last_name.value);

//     if(!formIsCompleted){
//         return "Error in forms show the fields"
//     }
// }


// forms.addEventListener("submit",login_schema_validation)
// object_inputs.name.addEventListener("input")

// js/signUpFormValidator.js (o el nombre que uses para tu lógica principal)

import { isString, isEmpty, isMinLength, isValidEmail } from './validators.js';

const form = document.querySelector("#form"); // Asumo que tu formulario tiene el ID "form"
const inputs = document.querySelectorAll(".input"); // Asumo que tus inputs tienen la clase "input"

// Objeto para almacenar el estado de validez de cada input
// { id_del_input: { value: '', isValid: false, errorMessage: '' } }
const formState = {};

// 1. Inicializar el estado de cada input y añadir elementos para feedback
inputs.forEach(input => {
    // Inicializar el estado
    formState[input.id] = {
        value: input.value,
        isValid: false, // Por defecto, hasta que se valide
        errorMessage: ''
    };

    // Crear un elemento para mostrar el mensaje de error (si no existe)
    // Esto es crucial para el feedback inmediato
    let errorElement = document.getElementById(`${input.id}-error`);
    if (!errorElement) {
        errorElement = document.createElement('div');
        errorElement.id = `${input.id}-error`;
        errorElement.className = 'error-message'; // Clase CSS para estilizar el error
        input.parentNode.insertBefore(errorElement, input.nextSibling); // Inserta después del input
    }
});

// Función para mostrar/ocultar el feedback de un input
function updateInputFeedback(inputElement, isValid, errorMessage) {
    const errorElement = document.getElementById(`${inputElement.id}-error`);
    if (isValid) {
        inputElement.classList.remove('input-error'); // Quitar estilo de error
        errorElement.textContent = ''; // Limpiar mensaje
        errorElement.style.display = 'none'; // Ocultar
    } else {
        inputElement.classList.add('input-error'); // Añadir estilo de error
        errorElement.textContent = errorMessage; // Mostrar mensaje
        errorElement.style.display = 'block'; // Mostrar
    }
}

// 2. Función de Validación Específica por Campo
function validateInput(inputElement) {
    const value = inputElement.value.trim();
    let isValid = true;
    let errorMessage = '';

    // Lógica de validación según el ID del input
    switch (inputElement.id) {
        case 'name': // Asumo que tienes un input con id="name"
            if (isEmpty(value)) {
                isValid = false;
                errorMessage = 'El nombre no puede estar vacío.';
            } else if (!isString(value)) {
                isValid = false;
                errorMessage = 'El nombre debe ser texto.';
            } else if (!isMinLength(value, 2)) {
                isValid = false;
                errorMessage = 'El nombre debe tener al menos 2 caracteres.';
            }
            break;
        case 'last_name': // Asumo que tienes un input con id="last_name"
            if (isEmpty(value)) {
                isValid = false;
                errorMessage = 'El apellido no puede estar vacío.';
            } else if (!isString(value)) {
                isValid = false;
                errorMessage = 'El apellido debe ser texto.';
            } else if (!isMinLength(value, 2)) {
                isValid = false;
                errorMessage = 'El apellido debe tener al menos 2 caracteres.';
            }
            break;
        case 'email': // Ejemplo para un campo de email
            if (isEmpty(value)) {
                isValid = false;
                errorMessage = 'El email no puede estar vacío.';
            } else if (!isValidEmail(value)) {
                isValid = false;
                errorMessage = 'Por favor, introduce un email válido.';
            }
            break;
        // Agrega más casos para otros inputs (password, etc.)
        default:
            // Por defecto, si no hay validación específica, se considera válido
            break;
    }

    // Actualizar el estado del formulario y el feedback visual
    formState[inputElement.id].value = value;
    formState[inputElement.id].isValid = isValid;
    formState[inputElement.id].errorMessage = errorMessage;

    updateInputFeedback(inputElement, isValid, errorMessage);

    return isValid;
}

// 3. Añadir Event Listeners para feedback inmediato
// Escucha el evento 'input' (cada vez que el usuario escribe) y 'blur' (cuando el usuario sale del campo)
inputs.forEach(input => {
    input.addEventListener('input', () => validateInput(input));
    input.addEventListener('blur', () => validateInput(input)); // Útil para validar al salir del campo
});

// 4. Función de Validación General al Enviar el Formulario
function validateFormOnSubmit(event) {
    event.preventDefault(); // Previene el envío por defecto

    let formIsValid = true;

    // Recorre todos los inputs y valida cada uno
    inputs.forEach(input => {
        const inputIsValid = validateInput(input); // Esto también actualiza el feedback individual
        if (!inputIsValid) {
            formIsValid = false; // Si un campo es inválido, el formulario completo es inválido
        }
    });

    if (formIsValid) {
        console.log("Formulario válido. Enviando datos:", formState);
        alert("¡Formulario enviado con éxito!");
        form.reset(); // Limpia el formulario
        // Aquí es donde harías la llamada a una API, por ejemplo, con fetch
    } else {
        console.log("Formulario inválido. Hay errores.");
        alert("Por favor, corrige los errores antes de enviar.");
    }
}

// 5. Añadir Event Listener para el envío del formulario
form.addEventListener('submit', validateFormOnSubmit);

console.log('Validación de formulario cargada y lista para feedback inmediato.');