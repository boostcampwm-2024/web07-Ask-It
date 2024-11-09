export interface SuccessResponse {
  type: 'success';
  data: object;
}

export interface ErrorResponse {
  type: 'fail';
  error: {
    message: object;
  };
}
