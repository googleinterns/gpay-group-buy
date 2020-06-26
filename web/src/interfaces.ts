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
