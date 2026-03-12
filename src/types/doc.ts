export interface IntegratedField {
  erpField: string;
  ideaField: string;
  category: string; 
  type: 'Texto' | 'Número' | 'Data' | 'Lista';
  required: boolean;
  description: string;
}

export interface SubSection {
  id: string;
  title: string;
  content: string;
  images: string[];
}

export interface Section {
  id: string;
  title: string;
  content: string;
  images: string[];
  fields?: IntegratedField[];
  subSections?: SubSection[]; // Novo campo para sub-tópicos
  noteType?: 'info' | 'warning' | 'success';
  noteContent?: string;
}

export interface Documentation {
  id: string;
  title: string;
  erp: string;
  version: string;
  sections: Section[];
}
