export interface IVerifyLoginResponse {
  msg: string;
  txt: string;
  code: string;
}
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
export interface IVerifyCreateCorporateResponse {
    msg:              string;
    create_corporate: string;
    code:             string;
    data:             CreateCorporateData;
}

export interface CreateCorporateData {
}
export interface IVerifyGetCorporateByIDResponse {
  corporateID: number;
  corporateName: string;
  corporateAddress: string;
  corporateEmail: string;
  corporateContact: string;
  corporateUserGroupLevels: number;
  corporateUserGroupNames: string[];
}