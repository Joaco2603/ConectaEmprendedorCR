// Validadores básicos
export const validators = {
  required: (value) => ({
    isValid: !!value.trim(),
    error: 'Este campo es requerido'
  }),
  
  minLength: (value, min) => ({
    isValid: value.length >= min,
    error: `Mínimo ${min} caracteres`
  }),
  
  email: (value) => ({
    isValid: /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
    error: 'Email inválido'
  }),
  
  alpha: (value) => ({
    isValid: /^[a-zA-Z\s]+$/.test(value),
    error: 'Solo letras permitidas'
  })
  
  // Puedes añadir más validadores aquí
};

// Función para analizar las reglas de validación
export const parseValidationRules = (rulesString) => {
  return rulesString.split('|').map(rule => {
    const [name, param] = rule.split(':');
    return { name, param };
  });
};