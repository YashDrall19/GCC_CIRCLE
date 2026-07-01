import * as crypto from 'crypto';

export interface User {
  id: number;
  email: string;
  name: string;
  role: string;
  created_at: string;
}

export interface AuthResponse {
  success: boolean;
  user?: User;
  token?: string;
  error?: string;
}

// Simple token management (client-side only)
const TOKEN_KEY = 'admin_token';
const USER_KEY = 'admin_user';

export const setSession = (token: string, user: User) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem(TOKEN_KEY, token);
    localStorage.setItem(USER_KEY, JSON.stringify(user));
  }
};

export const getSession = (): { token: string | null; user: User | null } => {
  if (typeof window === 'undefined') {
    return { token: null, user: null };
  }
  const token = localStorage.getItem(TOKEN_KEY);
  const userStr = localStorage.getItem(USER_KEY);
  const user = userStr ? JSON.parse(userStr) : null;
  return { token, user };
};

export const clearSession = () => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
  }
};

// Hash password using Node.js crypto (server-side only)
export const hashPassword = (password: string): string => {
  return crypto.createHash('sha256').update(password).digest('hex');
};

export const verifyPassword = (password: string, hash: string): boolean => {
  const passwordHash = hashPassword(password);
  return passwordHash === hash;
};

// Generate simple token (server-side only)
export const generateToken = (): string => {
  return crypto.randomBytes(32).toString('hex');
};
