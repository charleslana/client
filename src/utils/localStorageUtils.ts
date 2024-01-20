const tokenKey = 'token';
const eventBoxKey = 'eventBox';

export function saveToken(token: string): void {
  localStorage.setItem(tokenKey, token);
}

export function getToken(): string | null {
  return localStorage.getItem(tokenKey);
}

export function removeToken(): void {
  localStorage.removeItem(tokenKey);
}

export function isAuthenticated(): boolean {
  return !!getToken();
}

export function saveEventBox(eventBox: string): void {
  localStorage.setItem(eventBoxKey, eventBox);
}

export function getEventBox(): string | null {
  return localStorage.getItem(eventBoxKey);
}

export function removeEventBox(): void {
  localStorage.removeItem(eventBoxKey);
}

export function isEventBox(): boolean {
  if (getEventBox() === null) {
    return true;
  }
  if (getEventBox() === 'false') {
    return false;
  }
  return true;
}
