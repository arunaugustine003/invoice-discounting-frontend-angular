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

export interface IVerifyUpdateInvoiceResponse {
  msg:                     string;
  update_document_invoice: string;
  code:                    string;
  data:                    IVerifyUpdateInvoiceResponseData;
}

export interface IVerifyUpdateInvoiceResponseData {
  Finance_Amount:        string;
  invoiceID:             number;
  corporateID:           number;
  invoiceUploadedby:     number;
  user_level:            number;
  financeAmount:         string;
  invoiceCreatedOn:      string;
  invoiceStatus:         string;
  rejectedUser:          number;
  orderID:               number;
  vendorID:              number;
  invoiceNO:             string;
  invoiceUploadedbyType: string;
  invoiceAmount:         string;
  Invoice_Date:          string;
  invoiceFile:           string;
  Status:                number;
}

