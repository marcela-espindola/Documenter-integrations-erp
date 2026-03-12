import { useState } from 'react';
import { Section, Documentation, IntegratedField } from '@/types/doc';

export default function Admin() {
  const [title, setTitle] = useState('');
  const [erp, setErp] = useState('');
  const [version, setVersion] = useState('2025.01');

  const defaultTitles = [
    'Introdução', 'Benefícios', 'Iniciando a integração', 'Funcionamento', 
    'Campos integrados', 'Configuração ERP', 'Configuração IDEA', 
    'Uso da integração', 'Criar produtos', 'Visualização no ERP'
  ];

  const [sections, setSections] = useState<Section[]>(
    defaultTitles.map(t => ({ 
      id: Math.random().toString(36).substr(2, 9), 
      title: t, 
      content: '', 
      images: [], 
      fields: [],
      noteType: 'info',
      noteContent: ''
    }))
  );

  const updateSection = (id: string, field: keyof Section, value: any) => {
    setSections(prev => prev.map(s => s.id === id ? { ...s, [field]: value } : s));
  };

  const addField = (sectionId: string) => {
    setSections(prev => prev.map(s => {
      if (s.id === sectionId) {
        const newField: IntegratedField = { 
          erpField: '', ideaField: '', category: '', type: 'Texto', required: false, description: '' 
        };
        return { ...s, fields: [...(s.fields || []), newField] };
      }
      return s;
    }));
  };

  const updateField = (sectionId: string, fieldIndex: number, fieldName: keyof IntegratedField, value: any) => {
    setSections(prev => prev.map(s => {
      if (s.id === sectionId && s.fields) {
        const newFields = [...s.fields];
        newFields[fieldIndex] = { ...newFields[fieldIndex], [fieldName]: value };
        return { ...s, fields: newFields };
      }
      return s;
    }));
  };

  const handleImageUpload = (id: string, e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      Array.from(files).forEach(file => {
        const reader = new FileReader();
        reader.onloadend = () => {
          setSections(prev => prev.map(s => s.id === id ? { ...s, images: [...s.images, reader.result as string] } : s));
        };
        reader.readAsDataURL(file);
      });
    }
  };

  const saveDoc = () => {
    if (!title || !erp) return alert("Preencha Título e ERP");
    const newDoc: Documentation = { id: Math.random().toString(36).substr(2, 9), title, erp, version, sections };
    const saved = JSON.parse(localStorage.getItem('docs') || '[]');
    localStorage.setItem('docs', JSON.stringify([...saved, newDoc]));
    alert('Documentação publicada!');
  };

  return (
    <div className="max-w-5xl mx-auto p-6 bg-slate-50 min-h-screen pb-24">
      <div className="bg-white p-6 rounded-xl shadow-sm border mb-6 grid grid-cols-3 gap-4">
        <input placeholder="Título" className="p-2 border rounded" onChange={e => setTitle(e.target.value)} />
        <input placeholder="ERP" className="p-2 border rounded" onChange={e => setErp(e.target.value)} />
        <input placeholder="Versão" value={version} className="p-2 border rounded" onChange={e => setVersion(e.target.value)} />
      </div>

      {sections.map((sec) => (
        <div key={sec.id} className="bg-white p-8 rounded-xl shadow-sm border mb-10 border-l-4 border-l-blue-500">
          <h2 className="text-xl font-bold mb-4 text-slate-800">{sec.title}</h2>
          <textarea placeholder="Conteúdo..." className="w-full p-3 border rounded h-32 mb-4 bg-slate-50" onChange={e => updateSection(sec.id, 'content', e.target.value)} />
          
          {sec.title.toLowerCase().includes('campos') && (
            <div className="mb-6 bg-blue-50 p-4 rounded-lg border">
              <button onClick={() => addField(sec.id)} className="text-[10px] bg-blue-600 text-white px-2 py-1 rounded mb-4">+ Novo Campo</button>
              {sec.fields?.map((f, i) => (
                <div key={i} className="grid grid-cols-12 gap-1 mb-2 bg-white p-2 rounded shadow-sm">
                  <input placeholder="Cat" className="col-span-2 p-1 border text-[10px]" onChange={e => updateField(sec.id, i, 'category', e.target.value)} />
                  <input placeholder="ERP" className="col-span-2 p-1 border text-[10px]" onChange={e => updateField(sec.id, i, 'erpField', e.target.value)} />
                  <input placeholder="IDEA" className="col-span-2 p-1 border text-[10px]" onChange={e => updateField(sec.id, i, 'ideaField', e.target.value)} />
                  <input placeholder="Desc" className="col-span-5 p-1 border text-[10px]" onChange={e => updateField(sec.id, i, 'description', e.target.value)} />
                  <input type="checkbox" className="col-span-1" onChange={e => updateField(sec.id, i, 'required', e.target.checked)} />
                </div>
              ))}
            </div>
          )}

          <input type="file" multiple onChange={e => handleImageUpload(sec.id, e)} className="text-xs" />
        </div>
      ))}
      <button onClick={saveDoc} className="fixed bottom-6 right-6 bg-green-600 text-white px-10 py-4 rounded-full font-bold shadow-2xl">PUBLICAR</button>
    </div>
  );
}
