const tokenKey = 'token';

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
