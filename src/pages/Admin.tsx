import React, { useState, useEffect } from 'react';
import { Section, Documentation, IntegratedField, SubSection, Step } from '../types/doc';

const CATEGORIES = ['Produto', 'Material', 'Operação', 'Serviços', 'Instrução de lavagem', 'Outro'];

export default function Admin() {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [title, setTitle] = useState('');
  const [erp, setErp] = useState('');
  const [version, setVersion] = useState('2025.03');
  const [savedDocs, setSavedDocs] = useState<Documentation[]>([]);

  const createEmptyStep = (): Step => ({ id: Math.random().toString(36).substr(2, 9), text: '' });

  const defaultSections: Section[] = [
    'Introdução', 'Benefícios', 'Iniciando a integração', 'Funcionamento', 
    'Campos integrados', 'Configuração ERP', 'Configuração IDEA', 
    'Uso da integração', 'Criar produtos', 'Visualização no ERP'
  ].map(t => ({ 
    id: Math.random().toString(36).substr(2, 9), 
    title: t, description: '', steps: [createEmptyStep()], fields: [], subSections: [], noteType: 'info', noteContent: ''
  }));

  const [sections, setSections] = useState<Section[]>(defaultSections);

  useEffect(() => {
    const docs = JSON.parse(localStorage.getItem('docs') || '[]');
    setSavedDocs(docs);
  }, []);

  const handleEdit = (doc: Documentation) => {
    setEditingId(doc.id);
    setTitle(doc.title); setErp(doc.erp); setVersion(doc.version); setSections(doc.sections);
    window.scrollTo(0, 0);
  };

  const updateSection = (id: string, field: string, value: any) => {
    setSections(prev => prev.map(s => s.id === id ? { ...s, [field]: value } : s));
  };

  const addStep = (sectionId: string) => {
    setSections(prev => prev.map(s => s.id === sectionId ? { ...s, steps: [...s.steps, createEmptyStep()] } : s));
  };

  const updateStep = (sectionId: string, stepId: string, field: string, value: any) => {
    setSections(prev => prev.map(s => {
      if (s.id === sectionId) {
        return { ...s, steps: s.steps.map(st => st.id === stepId ? { ...st, [field]: value } : st) };
      }
      return s;
    }));
  };

  const handleStepImage = (sectionId: string, stepId: string, e: any) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => updateStep(sectionId, stepId, 'image', reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const saveDoc = () => {
    if (!title || !erp) return alert("Título e ERP obrigatórios");
    const newDoc = { id: editingId || Math.random().toString(36).substr(2, 9), title, erp, version, sections };
    const newList = editingId ? savedDocs.map(d => d.id === editingId ? newDoc : d) : [...savedDocs, newDoc];
    localStorage.setItem('docs', JSON.stringify(newList));
    setSavedDocs(newList);
    alert('Salvo com sucesso!');
    if(!editingId) window.location.reload();
  };

  return (
    <div className="max-w-5xl mx-auto p-8 bg-slate-50 min-h-screen pb-40 font-sans text-slate-900">
      {/* Editor Status */}
      <div className={`mb-8 p-4 rounded-xl border flex justify-between items-center bg-white shadow-sm`}>
        <div className="flex items-center gap-4">
          <div className={`w-3 h-3 rounded-full ${editingId ? 'bg-orange-400 animate-pulse' : 'bg-blue-500'}`}></div>
          <h2 className="text-sm font-bold uppercase tracking-widest text-slate-500">
            {editingId ? `Editando: ${erp}` : 'Novo Manual'}
          </h2>
        </div>
        <div className="flex gap-2">
           {savedDocs.map(d => (
             <button key={d.id} onClick={() => handleEdit(d)} className="text-[10px] px-2 py-1 bg-slate-100 rounded hover:bg-slate-200 transition-colors uppercase font-bold text-slate-400 italic">
               {d.erp}
             </button>
           ))}
        </div>
      </div>

      {/* Header Fino */}
      <div className="bg-white p-6 rounded-xl border shadow-sm mb-10 flex gap-4">
        <input placeholder="Título" value={title} className="flex-1 p-2 bg-slate-50 border-transparent focus:border-blue-500 border-2 rounded outline-none transition-all text-sm" onChange={e => setTitle(e.target.value)} />
        <input placeholder="ERP" value={erp} className="w-48 p-2 bg-slate-50 border-transparent focus:border-blue-500 border-2 rounded outline-none transition-all text-sm" onChange={e => setErp(e.target.value)} />
        <input placeholder="2025.03" value={version} className="w-24 p-2 bg-slate-50 border-transparent focus:border-blue-500 border-2 rounded outline-none transition-all text-sm text-center" onChange={e => setVersion(e.target.value)} />
      </div>

      {sections.map((sec) => (
        <div key={sec.id} className="bg-white p-8 rounded-xl border border-slate-200 mb-12 shadow-sm border-l-4 border-l-blue-500 relative">
          <div className="flex justify-between items-start mb-6">
            <h3 className="text-lg font-bold text-slate-800 uppercase tracking-tight">{sec.title}</h3>
            <div className="flex gap-2">
               <select value={sec.noteType} className="text-[10px] p-1 border rounded bg-slate-50 font-bold" onChange={e => updateSection(sec.id, 'noteType', e.target.value)}>
                  <option value="info">INFO (Azul)</option>
                  <option value="warning">AVISO (Amarelo)</option>
                  <option value="success">OK (Verde)</option>
               </select>
            </div>
          </div>

          <textarea value={sec.description} placeholder="Resumo deste tópico..." className="w-full p-3 border rounded-lg h-16 mb-6 text-sm bg-slate-50/50 italic" onChange={e => updateSection(sec.id, 'description', e.target.value)} />

          {/* Campo de Nota de Texto */}
          <input value={sec.noteContent} placeholder="Opcional: Adicionar uma nota de destaque aqui..." className="w-full p-2 border-b border-dashed mb-8 text-xs outline-none focus:border-blue-400" onChange={e => updateSection(sec.id, 'noteContent', e.target.value)} />

          {/* Passos Compactos */}
          <div className="space-y-4 mb-8 pl-4 border-l-2 border-slate-100">
            {sec.steps.map((step, idx) => (
              <div key={step.id} className="p-4 bg-slate-50/50 rounded-lg border border-slate-100 group">
                <div className="flex gap-4">
                  <span className="text-slate-300 font-bold text-xs">{idx + 1}</span>
                  <div className="flex-1">
                    <textarea value={step.text} placeholder="Descreva a ação..." className="w-full bg-transparent border-none focus:ring-0 text-sm mb-2" onChange={e => updateStep(sec.id, step.id, 'text', e.target.value)} />
                    <div className="flex items-center gap-3">
                       <input type="file" className="text-[9px] text-slate-400 file:mr-2 file:py-1 file:px-2 file:rounded file:border-0 file:bg-slate-200" onChange={e => handleStepImage(sec.id, step.id, e)} />
                       {step.image && <img src={step.image} className="w-16 h-10 object-cover rounded shadow-sm border" />}
                    </div>
                  </div>
                </div>
              </div>
            ))}
            <button onClick={() => addStep(sec.id)} className="w-full py-1 text-[10px] font-bold text-slate-400 border border-dashed border-slate-200 rounded hover:bg-white transition-all uppercase">+ Novo Passo</button>
          </div>

          {/* Tabela Simplificada */}
          {sec.title.toLowerCase().includes('campos') && (
            <div className="mb-6 p-4 bg-blue-50/30 rounded-lg border border-blue-100">
               <button onClick={() => updateSection(sec.id, 'fields', [...(sec.fields || []), { erpField: '', category: 'Produto', required: false }])} className="text-[9px] font-bold bg-blue-600 text-white px-3 py-1 rounded-full mb-4 uppercase tracking-tighter hover:bg-blue-700 transition-colors">+ Add Campo ERP</button>
               {sec.fields?.map((f, i) => (
                 <div key={i} className="grid grid-cols-12 gap-2 mb-2 items-center">
                    <select className="col-span-3 p-1 border text-[10px] rounded" value={f.category} onChange={e => {
                      const flds = [...sec.fields!]; flds[i].category = e.target.value; updateSection(sec.id, 'fields', flds);
                    }}>
                      {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                    </select>
                    <input value={f.erpField} placeholder="Nome do Campo" className="col-span-7 p-1 border text-[10px] rounded" onChange={e => {
                      const flds = [...sec.fields!]; flds[i].erpField = e.target.value; updateSection(sec.id, 'fields', flds);
                    }} />
                    <div className="col-span-2 flex items-center justify-center gap-1">
                      <span className="text-[8px] font-bold text-slate-400 uppercase">Obri?</span>
                      <input type="checkbox" checked={f.required} onChange={e => {
                        const flds = [...sec.fields!]; flds[i].required = e.target.checked; updateSection(sec.id, 'fields', flds);
                      }} />
                    </div>
                 </div>
               ))}
            </div>
          )}
        </div>
      ))}

      <button onClick={saveDoc} className="fixed bottom-8 right-8 bg-blue-600 text-white px-10 py-4 rounded-full font-black shadow-2xl hover:scale-110 transition-all z-50 border-2 border-white uppercase tracking-widest text-xs">
        {editingId ? 'Salvar Alterações' : 'Publicar Manual'}
      </button>
    </div>
  );
}
