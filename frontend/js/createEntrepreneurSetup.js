import {renderRoleBasedContent} from './creationSetup.js'

document.addEventListener('DOMContentLoaded', () => {
  renderRoleBasedContent({
    roleRequired: 'entrepreneur',
    containerClass: 'creation_div',
    html: ``,
    buttonText: 'Crear evento',
    buttonHref: 'eventForm.html',
  });
});