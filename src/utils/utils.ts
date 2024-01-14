import Swal, { type SweetAlertIcon } from 'sweetalert2';

export function formatNumber(number: number): string {
  return number.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
}

export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export function showAlert(message: string, icon: SweetAlertIcon = 'error'): void {
  Swal.fire({
    text: message,
    icon: icon,
    confirmButtonText: 'OK'
  });
}
