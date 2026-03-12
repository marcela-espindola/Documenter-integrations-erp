export interface Section {
  id: string;
  title: string;
  content: string;
  images: string[]; // Agora é um array para aceitar vários prints
}

export interface Documentation {
  id: string;
  title: string;
  erp: string;
  sections: Section[];
}
