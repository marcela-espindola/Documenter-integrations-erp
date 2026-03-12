export interface Section {
  id: string;
  title: string;
  content: string;
  image?: string; // Aqui ficará a imagem em Base64
}

export interface Documentation {
  id: string;
  title: string;
  erp: string;
  sections: Section[];
}
