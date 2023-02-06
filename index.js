import { Toast } from './Toast/toast.js';
Toast.init();
let showToastBtn = document.getElementById('show-toast-btn');

showToastBtn.addEventListener('click', () => {
  Toast.show('Error Toast', 'error', 'top-right', 5);
});
