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
