export interface Image {
  url: string;
  alt?: string;
}

export interface Customer {
  id: number;
  gpayId: string;
  contactNumber: string;
  address: string;
  numCommits: number;
}
