import React, { useState } from 'react';
import { Section, Documentation, IntegratedField, SubSection } from '../types/doc';

const CATEGORIES = ['Produto', 'Material', 'Operação', 'Serviços', 'Instrução de lavagem', 'Outro'];

export default function Admin() {
  const [title, setTitle] = useState('');
  const [erp, setErp] = useState('');
  const [version, setVersion] = useState('2025.03');

  const defaultTitles = [
    'Introdução', 'Benefícios', 'Iniciando a integração', 'Funcionamento', 
    'Campos integrados', 'Configuração ERP', 'Configuração IDEA', 
    'Uso da integração', 'Criar produtos', 'Visualização no ERP'
  ];

  const [sections, setSections] = useState<Section[]>(
    defaultTitles.map(t => ({ 
      id: Math.random().toString(36).substr(2, 9), 
      title: t, content: '', images: [], fields: [], subSections: [], noteType: 'info', noteContent: ''
    }))
  );

  const updateSection = (id: string, field: string, value: any) => {
    setSections(prev => prev.map(s => s.id === id ? { ...s, [field]: value } : s));
  };

  const addSubSection = (sectionId: string) => {
    setSections(prev => prev.map(s => {
      if (s.id === sectionId) {
        const newSub: SubSection = { id: Math.random().toString(36).substr(2, 9), title: 'Novo Sub-tópico', content: '', images: [] };
        return { ...s, subSections: [...(s.subSections || []), newSub] };
      }
      return s;
    }));
  };

  const updateSubSection = (sectionId: string, subId: string, field: string, value: any) => {
    setSections(prev => prev.map(s => {
      if (s.id === sectionId) {
        const newSubs = s.subSections?.map(sub => sub.id === subId ? { ...sub, [field]: value } : sub);
        return { ...s, subSections: newSubs };
      }
      return s;
    }));
  };

  const addField = (sectionId: string) => {
    setSections(prev => prev.map(s => {
      if (s.id === sectionId) {
        const newField: IntegratedField = { erpField: '', ideaField: '', category: 'Produto', type: 'Texto', required: false, description: '' };
        return { ...s, fields: [...(s.fields || []), newField] };
      }
      return s;
    }));
  };

  const updateField = (sectionId: string, index: number, fieldName: string, value: any) => {
    setSections(prev => prev.map(s => {
      if (s.id === sectionId && s.fields) {
        const newFields = [...s.fields];
        newFields[index] = { ...newFields[index], [fieldName]: value };
        return { ...s, fields: newFields };
      }
      return s;
    }));
  };

  const saveDoc = () => {
    const newDoc: Documentation = { id: Math.random().toString(36).substr(2, 9), title, erp, version, sections };
    const saved = JSON.parse(localStorage.getItem('docs') || '[]');
    localStorage.setItem('docs', JSON.stringify([...saved, newDoc]));
    alert('Documentação publicada!');
  };

  return (
    <div className="max-w-5xl mx-auto p-6 bg-slate-50 min-h-screen pb-24 font-sans">
      <div className="bg-white p-6 rounded-xl shadow-sm border mb-6 grid grid-cols-3 gap-4">
        <input placeholder="Título da Doc" className="p-2 border rounded" onChange={e => setTitle(e.target.value)} />
        <input placeholder="Nome do ERP" className="p-2 border rounded" onChange={e => setErp(e.target.value)} />
        <input placeholder="Versão" value={version} className="p-2 border rounded" onChange={e => setVersion(e.target.value)} />
      </div>

      {sections.map((sec) => (
        <div key={sec.id} className="bg-white p-8 rounded-xl shadow-sm border mb-10 border-l-4 border-l-blue-600">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-slate-800">{sec.title}</h2>
            <button onClick={() => addSubSection(sec.id)} className="text-xs bg-slate-100 text-slate-600 px-3 py-1 rounded hover:bg-blue-600 hover:text-white transition-all">+ Add Sub-tópico</button>
          </div>

          <textarea placeholder="Descrição principal do tópico..." className="w-full p-3 border rounded h-24 mb-4 text-sm" onChange={e => updateSection(sec.id, 'content', e.target.value)} />

          {/* Sub-tópicos renderizados aqui */}
          {sec.subSections?.map(sub => (
            <div key={sub.id} className="ml-8 p-4 border-l-2 border-slate-200 mb-4 bg-slate-50 rounded-r">
              <input value={sub.title} className="w-full font-bold bg-transparent border-b mb-2 outline-none focus:border-blue-400" onChange={e => updateSubSection(sec.id, sub.id, 'title', e.target.value)} />
              <textarea placeholder="Conteúdo do sub-tópico..." className="w-full p-2 text-xs border rounded mb-2" onChange={e => updateSubSection(sec.id, sub.id, 'content', e.target.value)} />
            </div>
          ))}

          {sec.title.toLowerCase().includes('campos') && (
            <div className="mb-6 bg-blue-50 p-4 rounded-lg border border-blue-100">
              <button onClick={() => addField(sec.id)} className="bg-blue-600 text-white px-3 py-1 rounded text-xs mb-4">+ Novo Campo</button>
              {sec.fields?.map((f, i) => (
                <div key={i} className="grid grid-cols-12 gap-1 mb-2 bg-white p-2 rounded shadow-sm items-center">
                  <div className="col-span-2">
                    <select className="w-full p-1 border text-[10px]" value={f.category} onChange={e => updateField(sec.id, i, 'category', e.target.value)}>
                      {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                    </select>
                    {f.category === 'Outro' && <input placeholder="Qual?" className="w-full p-1 border text-[9px] mt-1" onBlur={e => updateField(sec.id, i, 'category', e.target.value)} />}
                  </div>
                  <input placeholder="ERP" className="col-span-2 p-1 border text-[10px]" onChange={e => updateField(sec.id, i, 'erpField', e.target.value)} />
                  <input placeholder="IDEA" className="col-span-2 p-1 border text-[10px]" onChange={e => updateField(sec.id, i, 'ideaField', e.target.value)} />
                  <input placeholder="Desc" className="col-span-5 p-1 border text-[10px]" onChange={e => updateField(sec.id, i, 'description', e.target.value)} />
                  <input type="checkbox" className="col-span-1" onChange={e => updateField(sec.id, i, 'required', e.target.checked)} />
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
      <button onClick={saveDoc} className="fixed bottom-6 right-6 bg-blue-700 text-white px-10 py-4 rounded-full font-bold shadow-2xl hover:scale-105 transition-all">PUBLICAR NO SITE</button>
    </div>
  );
}
