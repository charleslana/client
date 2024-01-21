import router from '@/router';
import { removeToken } from './localStorageUtils';
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

export function formatNumberWithZero(number: number): string {
  const formarNumber = number.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
  return formarNumber + ',00';
}

export function calculateWidthForPercentage(percentage: number, fixedSize: number): number {
  const clampedPercentage = Math.min(Math.max(percentage, 0), 100);
  const width = (clampedPercentage / 100) * fixedSize;
  return parseFloat(width.toFixed(2));
}

export function calculatePercentage(minValue: number, maxValue: number): number {
  const clampedPercentage = Math.min(Math.max(minValue, 0), maxValue);
  const width = (clampedPercentage / maxValue) * 100;
  return parseFloat(width.toFixed(2));
}

export function handleNavigation(destination: string): void {
  if (destination.startsWith('http') || destination.startsWith('https')) {
    window.open(destination, '_blank');
  } else if (destination.includes('logout')) {
    removeToken();
    router.push({ name: 'home' });
  } else {
    router.push({ name: destination });
  }
}

export function formatDateToDateOnly(dateString: string): string {
  const date = new Date(dateString);
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const year = date.getFullYear().toString().slice(2);
  const formattedDate = `${day}/${month}/${year}`;
  return formattedDate;
}
