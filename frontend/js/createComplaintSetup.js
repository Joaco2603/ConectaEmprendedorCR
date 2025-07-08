import {renderRoleBasedContent} from './creationSetup.js'

document.addEventListener('DOMContentLoaded', () => {
  renderRoleBasedContent({
    roleRequired: ['citizen','entrepreneur'],
    containerClass: 'creation_div',
    html: ``,
    buttonText: 'Crear queja',
    buttonHref: 'complaintmentForm.html',
  });
});