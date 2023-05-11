export interface ApproveBulkUploadResponse {
    msg:                   string;
    approove_bulk_invoice: string;
    code:                  string;
    count:                 number;
    data:                  any[];
}
export interface UploadBulkInvoiceResponse {
    msg:                     string;
    upload_document_invoice: string;
    code:                    string;
    success_count:           number;
    error_count:             number;
    notUploded:              any[];
}


export interface ListUniqueInvoiceDetailsByInvoiceID {
    msg:                       string;
    view_invoice_by_invoiceID: string;
    code:                      string;
    count:                     number;
    data:                      ListUniqueInvoiceDetailsByInvoiceIDData;
}

export interface ListUniqueInvoiceDetailsByInvoiceIDData {
    invoiceID:             number;
    corporateID:           number;
    invoiceUploadedby:     number;
    user_level:            number;
    financeAmount:         string;
    invoiceFile:           string;
    Status:                number;
    orderID:               number;
    vendorID:              number;
    invoiceNO:             string;
    invoiceUploadedbyType: string;
    invoiceAmount:         string;
    invoiceCreatedOn:      string;
    invoiceStatus:         string;
    rejectedUser:          number;
}

export interface ListAllInvoicesForUniqueOrder {
    msg:                     string;
    filter_order_by_orderID: string;
    code:                    string;
    count:                   number;
    data:                    ListAllInvoicesForUniqueOrderData[];
}
export interface ListAllInvoicesForUniqueOrderData {
    orderID:               number;
    invoiceNO:             string;
    vendorID:              number;
    vendorName:            string;
    invoiceUploadedbyType: string;
    invoiceAmount:         string;
    invoiceStatus:         string;
    financeAmount:         string;
    invoiceCreatedOn:      null;
    rejectedUser:          number;
    corporateID:           number;
    invoiceID:             number;
    invoiceUploadedby:     number;
    user_level:            number;
    invoiceFile:           string;
    Status:                number;
}
export interface ViewInvoiceDocument {
    msg:                   string;
    view_document_invoice: string;
    code:                  string;
    count:                 number;
    data:                  string;
}
export interface ApproveInvoice {
    msg:                      string;
    approve_document_invoice: string;
    code:                     string;
    data:                     any[];
}
export interface RejectInvoice {
    msg:                      string;
    reject_document_invoice: string;
    code:                     string;
    data:                     any[];
}
