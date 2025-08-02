/**
 * Authentication Form Types
 *
 * Centralized type definitions for authentication components.
 * Follows Interface Segregation Principle.
 */

export interface AuthFormProps {
  mode: 'signin' | 'signup';
}

export interface FormData {
  email: string;
  password: string;
  name: string;
}

export interface FormErrors {
  [key: string]: string;
}

export interface FormFieldProps {
  id: string;
  name: string;
  type: 'text' | 'email' | 'password';
  label: string;
  placeholder: string;
  value: string;
  error?: string;
  required?: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  icon?: React.ReactNode;
  showPasswordToggle?: boolean;
  onPasswordToggle?: () => void;
  showPassword?: boolean;
}

export interface AuthState {
  isLoading: boolean;
  isGoogleLoading: boolean;
  showPassword: boolean;
  formData: FormData;
  errors: FormErrors;
}