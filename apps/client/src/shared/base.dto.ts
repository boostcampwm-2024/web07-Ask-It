export interface BaseDto {
  type: string;
}

export interface SuccessDTO<T> extends BaseDto {
  data: T;
}

export interface ErrorDTO extends BaseDto {
  error: {
    messages: string[];
  };
}
