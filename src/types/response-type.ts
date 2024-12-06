export type TSuccessResponse = {
  status: {
    code: number;
    description: string;
  };
  result: {
    access_token: string;
    expires_in: number;
  };
};

export type TErrorResponse = {
  status: {
    code: number;
    description: string;
  };
  result: string;
};

export type TResponse = TSuccessResponse | TErrorResponse;
