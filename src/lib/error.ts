export const VALIDATION_ERROR_STATUS = 422;
export const AUTHENTICATION_ERROR_STATUS = 401;

export type ValidationErrorPayload = {
  message: string;
  errors: {
    field: string;
    message: string;
  }[];
};

export class HttpError extends Error {
  status: number;
  payload: {
    message: string;
    [key: string]: any;
  };
  constructor({
    status,
    payload,
    message = "Error",
  }: {
    status: number;
    payload: any;
    message?: string;
  }) {
    super(message);
    this.status = status;
    this.payload = payload;
  }
}

export class ValidationError extends HttpError {
  status: typeof VALIDATION_ERROR_STATUS;
  payload: ValidationErrorPayload;
  constructor({
    status,
    payload,
  }: {
    status: typeof VALIDATION_ERROR_STATUS;
    payload: ValidationErrorPayload;
  }) {
    super({ status, payload, message: "Error validations" });
    this.status = status;
    this.payload = payload;
  }
}
