export interface IVerifyLoginResponse {
  msg: string;
  txt: string;
  code: string;
}

export interface IVerifyOtpResponse {
  msg:   string;
  login: string;
  code:  string;
  data:  IVerifyOtpResponseData;
}

export interface IVerifyOtpResponseData {
  token:                  string;
  user_type:              string;
  user_id:                number;
  user_level:             number;
  corporateUserGroupName: string;
}
export interface IVerifyCreateCorporateResponse {
    msg:              string;
    create_corporate: string;
    code:             string;
    data:             CreateCorporateData;
}

export interface CreateCorporateData {
}
export interface IVerifyCreateCorporateUserResponse {
  msg:         string;
  create_user: string;
  code:        string;
  data:        CreateCorporateUserData;
}

export interface CreateCorporateUserData {
  userID:               number;
  userName:             string;
  userEmail:            string;
  token:                string;
  userCreatedOn:        string;
  userStatus:           number;
  userContact:          string;
  corporateID:          string;
  corporateUserGroupID: number;
  userPassword:         string;
  exp:                  string;
  userLastUpdatedOn:    string;
}


