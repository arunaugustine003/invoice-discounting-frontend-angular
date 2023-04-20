export interface CorporateData {
  msg:             string;
  list_corporates: string;
  code:            string;
  count:           number;
  data:            Corporate[];
}

export interface Corporate {
  corporateID:                  number;
  FullName:                     string;
  corporateEmail:               string;
  corporateContact:             string;
  corporateAddress:             string;
  corporateUserGroupLevels:     number;
  corporateUserGroupNames:      CorporateUserGroupName[];
  RiskCategory:                 string;
  IndustryClassification:       string;
  otp:                          string;
  DateOfCommencementOfBusiness: string;
  PanNo:                        string;
  exp:                          string;
  Constitution:                 string;
  corporateCreatedOn:           string;
  ShortName:                    string;
  DateOfIncorporation:          string;
  corporateLastUpdatedOn:       string;
  CbsCifId:                     string;
  corporateStatus:              number;
}

export interface CorporateUserGroupName {
  name: string;
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
export interface CorporateUserList {
  msg:       string;
  get_users: string;
  code:      string;
  count:     number;
  data:      CorporateUserDetails[];
}

export interface CorporateUserDetails {
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
export interface ListCorporateUserGroupBynameResponse {
  msg:                       string;
  list_corporate_user_group: string;
  code:                      string;
  data:                      ListCorporateUserGroupData;
}

export interface ListCorporateUserGroupData {
  corporateID:                 number;
  corporateUserGroupLevel:     number;
  corporateUserGroupCreatedOn: string;
  corporateUserGroupName:      string;
  corporateUserGroupID:        number;
  corporateUserGroupStatus:    number;
}
