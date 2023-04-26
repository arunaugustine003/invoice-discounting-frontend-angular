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
export interface ListVendorOrder {
    msg:                   string;
    list_corporate_orders: string;
    code:                  string;
    Total_count:           number;
    count:                 number;
    data:                  ListVendorOrderData[];
}

export interface ListVendorOrderData {
    corporateID:           number;
    orderID:               number;
    userID:                number;
    invoiceTrackerID:      number;
    invoiceTrackStatus:    string;
    corporateUserGroupID:  number;
    vendorID:              number;
    invoiceTrackCreatedOn: string;
    Status:                number;
}
