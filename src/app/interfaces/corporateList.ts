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
