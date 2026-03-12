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

export interface Section {
  id: string;
  title: string;
  description: string;
  steps: Step[];
  fields?: IntegratedField[];
  noteType: 'info' | 'warning' | 'success';
  noteContent: string;
}

export interface Documentation {
  id: string;
  title: string;
  erp: string;
  version: string;
  erpEmail?: string;
  erpPhone?: string;
  erpWhatsApp?: string;
  audacesName?: string;
  audacesEmail?: string;
  sections: Section[];
}
