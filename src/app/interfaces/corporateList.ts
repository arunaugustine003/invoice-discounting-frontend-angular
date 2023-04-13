export interface CorporateData {
    msg:             string;
    list_corporates: string;
    code:            string;
    count:           number;
    data:            Corporate[];
}
export interface Corporate {
    corporateEmail:           string;
    corporateID:              number;
    corporateUserGroupLevels: number;
    corporateCreatedOn:       string;
    corporateStatus:          number;
    corporateName:            string;
    corporateAddress:         string;
    corporateContact:         string;
    corporateUserGroupNames:  string[];
    corporateLastUpdatedOn:   string;
    otp:                      string;
}
export interface CorporateFormData {
    corporateName: string;
    corporateAddress: string;
    corporateEmail: string;
    corporateContact: string;
    corporateUserGroupLevels: number;
    corporateUserGroupNames: string[];
  }
  export interface CorporateUpdationData {
    corporateID: number;
    corporateName: string;
    corporateAddress: string;
    corporateEmail: string;
    corporateContact: string;
    corporateUserGroupLevels: number;
    corporateUserGroupNames: string[];
  }

export interface CorporateUser {
  corporateUserGroupID: number;
  userName:             string;
  userContact:          string;
  userEmail:            string;
}
