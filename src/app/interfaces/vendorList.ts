export interface VendorFormData {
    vendorName:    string;
    vendorAddress: string;
    vendorEmail:   string;
    vendorContact: string;
}
export interface VendorData {
    msg:             string;
    list_Vendors: string;
    code:            string;
    count:           number;
    data:            Vendor[];
  }
  export interface Vendor {
    vendorID:                  number;
    vendorName:                string;
    vendorAddress:               string;
    vendorEmail:             string;
    vendorContact:             string;
    vendorStatus:              number;
  }
