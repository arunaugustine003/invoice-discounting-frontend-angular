export interface CreateVendorResponse {
  msg:        string;
  add_vendor: string;
  code:       string;
  data:       CreateVendorData;
}

export interface CreateVendorData {
  vendorName:          string;
  vendorAddress:       string;
  vendorContact:       string;
  vendorLastUpdatedOn: string;
  vendorStatus:        number;
  vendorEmail:         string;
  vendorID:            number;
  vendorCreatedOn:     string;
  vendorAddedBy:       string;
}

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
export interface ListCorporateVendor {
  msg:                    string;
  list_corporate_vendors: string;
  code:                   string;
  count:                  number;
  data:                   ListCorporateVendorData[];
}
export interface ListCorporateVendorData {
  corporateVendorCreatedOn: null;
  corporateVendorID:        number;
  vendorID:                 number;
  corporateVendorStatus:    number;
  corporateID:              number;
}
