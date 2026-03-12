export interface IntegratedField {
  erpField: string;
  category: string; 
  required: boolean;
}

export interface SubSection {
  id: string;
  title: string;
  content: string;
  images: string[];
  noteType?: 'info' | 'warning' | 'success';
  noteContent?: string;
}

export interface Section {
  id: string;
  title: string;
  content: string;
  images: string[];
  fields?: IntegratedField[];
  subSections?: SubSection[];
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
