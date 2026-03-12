export interface IntegratedField {
  erpField: string;
  ideaField: string;
  category: string; // Ex: Modelos, Materiais, Insumos
  type: 'Texto' | 'Número' | 'Data' | 'Lista';
  required: boolean; // Sim ou Não
  description: string;
}

export interface Section {
  id: string;
  title: string;
  content: string;
  images: string[];
  fields?: IntegratedField[];
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
