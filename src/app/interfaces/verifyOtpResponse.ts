export interface IVerifyOtpResponse {
    msg: string;
    login: string;
    code: string;
    data: {
      ID: number;
      USERNAME: string;
      TYPE: string;
    };
  }
  