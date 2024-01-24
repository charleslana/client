import router from '@/router';
import UserCharacterService from '@/service/UserCharacterService';
import { removeToken } from './localStorageUtils';
import Swal, { type SweetAlertIcon } from 'sweetalert2';
import type { AxiosError } from 'axios';
import type ICelebrateError from '@/interface/ICelebrateError';

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

export function showError(err: unknown): void {
  const error = err as AxiosError<ICelebrateError>;
  if (error.response && error.response.data) {
    showAlert(error.response.data.message, 'error');
  }
}

export function formatNumberWithZero(number: number): string {
  const formarNumber = number.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
  return formarNumber + ',00';
}

export function calculateWidthForPercentage(percentage: number, fixedSize: number): number {
  if (fixedSize === 0) {
    return 0;
  }
  const clampedPercentage = Math.min(Math.max(percentage, 0), 100);
  const width = (clampedPercentage / 100) * fixedSize;
  return parseFloat(width.toFixed(2));
}

export function calculatePercentage(minValue: number, maxValue: number): number {
  if (maxValue === 0) {
    return 0;
  }
  const clampedPercentage = Math.min(Math.max(minValue, 0), maxValue);
  const width = (clampedPercentage / maxValue) * 100;
  return parseFloat(width.toFixed(2));
}

export function handleNavigation(destination: string): void {
  if (destination.startsWith('http') || destination.startsWith('https')) {
    window.open(destination, '_blank');
    return;
  }
  switch (destination) {
    case 'logout':
      removeToken();
      router.push({ name: 'home' });
      break;
    case 'change-character':
      logoutAPI();
      router.push({ name: 'home' });
      break;
    default:
      router.push({ name: destination });
      break;
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

export function formatDateToDateTime(dateString: string, isSecond: boolean = false): string {
  const date = new Date(dateString);
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const year = date.getFullYear().toString();
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');
  const seconds = date.getSeconds().toString().padStart(2, '0');
  let formattedDate = `${day}/${month}/${year} ${hours}:${minutes}`;
  if (isSecond) {
    formattedDate += `:${seconds}`;
  }
  return formattedDate;
}

export function calculateTimeRemaining(endTimeString: string): string {
  const endTime = new Date(endTimeString);
  const currentTime = new Date();
  const timeDifference = endTime.getTime() - currentTime.getTime();
  if (timeDifference > 24 * 60 * 60 * 1000) {
    const days = Math.ceil(timeDifference / (24 * 60 * 60 * 1000));
    return `${days} dia${days > 1 ? 's' : ''}`;
  }
  const hours = Math.floor(timeDifference / (60 * 60 * 1000));
  const minutes = Math.floor((timeDifference % (60 * 60 * 1000)) / (60 * 1000));
  const seconds = Math.floor((timeDifference % (60 * 1000)) / 1000);
  return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds
    .toString()
    .padStart(2, '0')}`;
}

export function formatBreakLines(text: string): string {
  text = text.replace(/\n/g, '<br>');
  return text;
}

export function isVip(userVipExpiration: string | null): boolean {
  if (userVipExpiration && new Date(userVipExpiration) > new Date()) {
    return true;
  }
  return false;
}

async function logoutAPI(): Promise<void> {
  try {
    await UserCharacterService.logout();
  } catch (err: unknown) {
    //
  } finally {
    //
  }
}
