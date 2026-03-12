export interface IntegratedField {
  erpField: string;
  category: string; 
  required: boolean;
}

export interface Step {
  id: string;
  text: string;
  image?: string;
}

export interface SubSection {
  id: string;
  title: string;
  steps: Step[];
  noteType?: 'info' | 'warning' | 'success';
  noteContent?: string;
}

export interface Section {
  id: string;
  title: string;
  description: string;
  steps: Step[];
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
