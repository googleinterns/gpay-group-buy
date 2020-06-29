export interface Image {
  url: string;
  alt?: string;
}

export interface Customer {
  id: number;
  gpayId: string; // E164 format
  contactNumber: string;
  address: string;
  numCommits: number;
}

/**
 * MerchantPayload Interface that contains the fields of the payload that
 * would be sent to the server to add the merchant to the database.
 */
export interface MerchantPayload {
  name: string;
  email: string;
  vpa: string;
}

/**
 * MerchantResponse Interface that contains the fields of the Response that
 * client side would receive.
 */
export interface MerchantResponse extends MerchantPayload {
  id: number;
  firebaseUid: string;
}
