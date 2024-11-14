export interface BaseDto {
  type: 'success' | 'fail';
}

export interface SuccessDTO<T> extends BaseDto {
  type: 'success';
  data: T;
}

export interface ErrorDTO extends BaseDto {
  type: 'fail';
  error: {
    message?: string;
    messages?: string[];
  };
}
