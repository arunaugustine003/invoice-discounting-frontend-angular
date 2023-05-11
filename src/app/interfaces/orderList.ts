export interface DownloadSampleDataResponse {
    msg:                  string;
    view_document_sample: string;
    code:                 string;
    count:                number;
    data:                 string;
}

export interface ListUniqueOrdersForSuperAdmin {
    msg:                           string;
    filter_order_by_orderID_admin: string;
    code:                          string;
    count:                         number;
    data:                          ListUniqueOrdersForSuperAdminData[];
}

export interface ListUniqueOrdersForSuperAdminData {
    orderID:                number;
    vendorID:               number;
    vendorName:             string;
    invoiceAmount:          string;
    invoiceUploadedbyType:  string;
    invoiceUploadedby:      number;
    invoiceStatus:          string;
    Status:                 number;
    invoiceNO:              string;
    financeAmount:          string;
    invoiceCreatedOn:       string;
    rejectedUser:           number;
    invoiceID:              number;
    corporateID:            number;
    user_level:             number;
    corporateUserGroupName: string;
    invoiceFile:            string;
}
export interface ListUniqueOrdersForCorporateAdmin {
    msg:                           string;
    filter_order_by_orderID_admin: string;
    code:                          string;
    count:                         number;
    data:                          ListUniqueOrdersForCorporateAdminData[];
}

export interface ListUniqueOrdersForCorporateAdminData {
    orderID:                number;
    vendorID:               number;
    vendorName:             string;
    invoiceAmount:          string;
    invoiceUploadedbyType:  string;
    invoiceUploadedby:      number;
    invoiceStatus:          string;
    Status:                 number;
    invoiceNO:              string;
    financeAmount:          string;
    invoiceCreatedOn:       string;
    rejectedUser:           number;
    invoiceID:              number;
    corporateID:            number;
    user_level:             number;
    corporateUserGroupName: string;
    invoiceFile:            string;
}

export interface ListUniqueOrdersForCorporateUser {
    msg:                  string;
    list_only_order_user: string;
    code:                 string;
    count:                number;
    data:                 ListUniqueOrdersForCorporateUserData[];
}

export interface ListUniqueOrdersForCorporateUserData {
    orderID:               number;
    vendorID:            number;
    vendorName:            string;
    invoiceAmount:         string;
    invoiceUploadedbyType: string;
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
    
    orderID:               number;
    corporateID:               number;
    invoiceTrackStatus:    string;
    vendorName:              string;
    Status:                number;
}
