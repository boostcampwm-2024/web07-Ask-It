export type ValidationStatus = 'INITIAL' | 'PENDING' | 'VALID' | 'INVALID';

export interface ValidationStatusWithMessage {
  status: ValidationStatus;
  message?: string;
}
