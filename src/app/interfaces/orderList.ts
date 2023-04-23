export interface ListUniqueOrdersForCorporateUser {
    msg:                  string;
    list_only_order_user: string;
    code:                 string;
    count:                number;
    data:                 ListUniqueOrdersForCorporateUserData[];
}

export interface ListUniqueOrdersForCorporateUserData {
    orderID:               number;
    vendorID:              number;
    invoiceAmount:         string;
    invoiceUploadedbyType: string;
    invoiceUploadedby:     number;
    invoiceStatus:         string;
    Status:                number;
    invoiceNO:             string;
    financeAmount:         string;
    invoiceCreatedOn:      null | string;
    rejectedUser:          number;
    invoiceID:             number;
    corporateID:           number;
    user_level:            number;
    invoiceFile:           string;
}
