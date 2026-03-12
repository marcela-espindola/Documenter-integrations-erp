export interface IntegratedField {
  erpField: string;
  ideaField: string;
  description: string;
  type: 'Texto' | 'Número' | 'Data' | 'Lista';
}

export interface Section {
  id: string;
  title: string;
  content: string;
  images: string[];
  fields?: IntegratedField[]; // Opcional: apenas para a seção de Campos Integrados
  noteType?: 'info' | 'warning' | 'success'; // Opcional: para destacar notas
  noteContent?: string;
}

export interface Documentation {
  id: string;
  title: string;
  erp: string;
  version: string;
  sections: Section[];
}
