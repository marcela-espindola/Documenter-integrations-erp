import { useState } from 'react';
import { Section, Documentation } from '@/types/doc';

export default function Admin() {
  const [title, setTitle] = useState('');
  const [erp, setErp] = useState('');
  const [sections, setSections] = useState<Section[]>([]);

  const addSection = () => {
    setSections([...sections, { id: crypto.randomUUID(), title: '', content: '' }]);
  };

  const updateSection = (id: string, field: keyof Section, value: string) => {
    setSections(sections.map(s => s.id === id ? { ...s, [field]: value } : s));
  };

  const handleImageUpload = (id: string, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        updateSection(id, 'image', reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const saveDoc = () => {
    const newDoc: Documentation = { id: crypto.randomUUID(), title, erp, sections };
    const savedDocs = JSON.parse(localStorage.getItem('docs') || '[]');
    localStorage.setItem('docs', JSON.stringify([...savedDocs, newDoc]));
    alert('Documentação gerada com sucesso!');
  };

  return (
    <div className="max-w-3xl mx-auto p-10">
      <h1 className="doc-heading-1">Gerador de Documentação</h1>
      <input placeholder="Título da Doc" className="w-full p-2 border mb-4 rounded" onChange={e => setTitle(e.target.value)} />
      <input placeholder="Nome do ERP" className="w-full p-2 border mb-8 rounded" onChange={e => setErp(e.target.value)} />

      {sections.map(sec => (
        <div key={sec.id} className="p-4 border rounded mb-6 bg-slate-50">
          <input placeholder="Título da seção" className="w-full p-2 border mb-2 rounded" onChange={e => updateSection(sec.id, 'title', e.target.value)} />
          <textarea placeholder="Conteúdo" className="w-full p-2 border mb-2 rounded h-24" onChange={e => updateSection(sec.id, 'content', e.target.value)} />
          <input type="file" accept="image/*" onChange={e => handleImageUpload(sec.id, e)} />
        </div>
      ))}

      <button onClick={addSection} className="bg-blue-600 text-white px-4 py-2 rounded mr-4">Adicionar Seção</button>
      <button onClick={saveDoc} className="bg-green-600 text-white px-4 py-2 rounded">Gerar Documentação</button>
    </div>
  );
}
