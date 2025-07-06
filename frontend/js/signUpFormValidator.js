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

import { validators, parseValidationRules } from './validators.js';

const login_validation_schema = {
    
}

export class FormValidator {
  constructor(formId) {
    this.form = document.getElementById(formId);
    this.inputs = Array.from(this.form.querySelectorAll('inputs'));
    this.init();
  }
  
  init() {
    // Configurar eventos para cada input
    this.inputs.forEach(input => {
      input.addEventListener('input', () => this.validateInput(input));
      input.addEventListener('blur', () => this.validateInput(input));
    });
    
    // Configurar evento de submit
    this.form.addEventListener('submit', (e) => {
      if (!this.validateForm()) {
        e.preventDefault();
      }
    });
  }
  
  validateInput(input) {
    const rulesString = input.getAttribute('data-validation');
    const rules = parseValidationRules(rulesString);
    let isValid = true;
    let errorMessage = '';
    
    for (const rule of rules) {
      const validator = validators[rule.name];
      if (!validator) continue;
      
      const result = validator(input.value.trim(), rule.param);
      if (!result.isValid) {
        isValid = false;
        errorMessage = result.error;
        break;
      }
    }
    
    this.updateInputFeedback(input, isValid, errorMessage);
    return isValid;
  }
  
  updateInputFeedback(input, isValid, errorMessage) {
    const errorElement = input.nextElementSibling;
    
    if (isValid) {
      input.classList.remove('error');
      errorElement.classList.remove('show');
    } else {
      input.classList.add('error');
      errorElement.textContent = errorMessage;
      errorElement.classList.add('show');
    }
  }
  
  validateForm() {
    let formIsValid = true;
    
    this.inputs.forEach(input => {
      const inputIsValid = this.validateInput(input);
      if (!inputIsValid) {
        formIsValid = false;
      }
    });
    
    return formIsValid;
  }
}


new FormValidator('form');