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
    setTitle(doc.title);
    setErp(doc.erp);
    setVersion(doc.version);
    setSections(doc.sections);
    window.scrollTo(0, 0);
  };

  const resetForm = () => {
    setEditingId(null);
    setTitle('');
    setErp('');
    setSections(defaultSections);
  };

  const updateSection = (id: string, field: string, value: any) => {
    setSections(prev => prev.map(s => s.id === id ? { ...s, [field]: value } : s));
  };

  const addStep = (sectionId: string, isSub = false, subId = "") => {
    setSections(prev => prev.map(s => {
      if (s.id === sectionId) {
        if (isSub) {
          const newSubs = s.subSections?.map(sub => sub.id === subId ? { ...sub, steps: [...sub.steps, createEmptyStep()] } : sub);
          return { ...s, subSections: newSubs };
        }
        return { ...s, steps: [...s.steps, createEmptyStep()] };
      }
      return s;
    }));
  };

  const updateStep = (sectionId: string, stepId: string, field: string, value: any, isSub = false, subId = "") => {
    setSections(prev => prev.map(s => {
      if (s.id === sectionId) {
        const updateInSteps = (steps: Step[]) => steps.map(st => st.id === stepId ? { ...st, [field]: value } : st);
        if (isSub) {
          const newSubs = s.subSections?.map(sub => sub.id === subId ? { ...sub, steps: updateInSteps(sub.steps) } : sub);
          return { ...s, subSections: newSubs };
        }
        return { ...s, steps: updateInSteps(s.steps) };
      }
      return s;
    }));
  };

  const handleStepImage = (sectionId: string, stepId: string, e: any, isSub = false, subId = "") => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => updateStep(sectionId, stepId, 'image', reader.result as string, isSub, subId);
      reader.readAsDataURL(file);
    }
  };

  const saveDoc = () => {
    if (!title || !erp) return alert("Título e ERP obrigatórios");
    const newDoc = { id: editingId || Math.random().toString(36).substr(2, 9), title, erp, version, sections };
    const newList = editingId ? savedDocs.map(d => d.id === editingId ? newDoc : d) : [...savedDocs, newDoc];
    localStorage.setItem('docs', JSON.stringify(newList));
    setSavedDocs(newList);
    alert('Documentação Salva!');
    resetForm();
  };

  return (
    <div className="max-w-5xl mx-auto p-6 bg-slate-50 min-h-screen pb-40 font-sans">
      {/* HEADER DE ESTADO */}
      <div className={`mb-10 p-6 rounded-2xl border-2 flex justify-between items-center ${editingId ? 'border-orange-400 bg-orange-50' : 'border-blue-400 bg-blue-50'}`}>
        <div>
          <h2 className="text-xl font-black uppercase tracking-tight">
            {editingId ? `📝 Editando: ${erp}` : '🆕 Criando Nova Documentação'}
          </h2>
          <p className="text-sm opacity-70">As alterações são salvas localmente no seu navegador.</p>
        </div>
        {editingId && <button onClick={resetForm} className="bg-orange-500 text-white px-4 py-2 rounded-lg font-bold">CANCELAR EDIÇÃO</button>}
      </div>

      {/* LISTA DE EDIÇÃO */}
      <div className="mb-10 p-4 bg-white rounded-xl border shadow-sm">
        <h3 className="font-bold mb-3 text-slate-400 uppercase text-[10px]">Documentações no seu navegador:</h3>
        <div className="flex gap-2 flex-wrap">
          {savedDocs.map(d => (
            <button key={d.id} onClick={() => handleEdit(d)} className="px-3 py-1 bg-slate-100 hover:bg-blue-600 hover:text-white rounded-full text-xs transition-all flex items-center gap-2">
              <span>{d.erp}</span> <span className="opacity-50">|</span> <span>{d.title}</span>
            </button>
          ))}
        </div>
      </div>

      {/* DADOS BÁSICOS */}
      <div className="bg-white p-6 rounded-xl shadow-sm border mb-10 grid grid-cols-3 gap-4">
        <input placeholder="Título (Ex: Guia de Uso)" value={title} className="p-3 border rounded-lg font-bold" onChange={e => setTitle(e.target.value)} />
        <input placeholder="ERP (Ex: Millennium)" value={erp} className="p-3 border rounded-lg font-bold" onChange={e => setErp(e.target.value)} />
        <input placeholder="Versão" value={version} className="p-3 border rounded-lg font-bold text-center text-blue-600" onChange={e => setVersion(e.target.value)} />
      </div>

      {/* SEÇÕES */}
      {sections.map((sec) => (
        <div key={sec.id} className="bg-white p-8 rounded-2xl shadow-sm border mb-12 border-l-[12px] border-l-blue-600">
          <h2 className="text-2xl font-black text-slate-800 mb-6 uppercase tracking-tighter italic">{sec.title}</h2>
          
          <textarea value={sec.description} placeholder="Descrição curta do tópico..." className="w-full p-3 border rounded-lg h-20 mb-6 bg-slate-50 text-sm" onChange={e => updateSection(sec.id, 'description', e.target.value)} />

          {/* PASSOS DA SEÇÃO PRINCIPAL */}
          <div className="space-y-6 mb-8">
            <h4 className="text-xs font-bold text-slate-400 uppercase">Passo a Passo Intercalado:</h4>
            {sec.steps.map((step, idx) => (
              <div key={step.id} className="p-4 border rounded-xl bg-slate-50 relative group">
                <textarea 
                  value={step.text} 
                  placeholder={`Ação ${idx + 1}...`} 
                  className="w-full p-2 border-none bg-transparent focus:ring-0 text-sm mb-2"
                  onChange={e => updateStep(sec.id, step.id, 'text', e.target.value)}
                />
                <div className="flex items-center gap-4">
                   <input type="file" className="text-[10px]" onChange={e => handleStepImage(sec.id, step.id, e)} />
                   {step.image && <img src={step.image} className="w-20 h-12 object-cover rounded border" />}
                </div>
              </div>
            ))}
            <button onClick={() => addStep(sec.id)} className="w-full py-2 border-2 border-dashed border-slate-200 rounded-xl text-slate-400 text-xs hover:bg-slate-100">+ Adicionar Novo Passo (Texto + Print)</button>
          </div>

          {/* CAMPOS ERP (SÓ SE FOR A SEÇÃO DE CAMPOS) */}
          {sec.title.toLowerCase().includes('campos') && (
            <div className="mb-8 p-4 bg-blue-50 rounded-xl border border-blue-100">
               <button onClick={() => updateSection(sec.id, 'fields', [...(sec.fields || []), { erpField: '', category: 'Produto', required: false }])} className="bg-blue-600 text-white px-3 py-1 rounded text-[10px] font-bold mb-4 uppercase tracking-widest">+ Novo Campo</button>
               {sec.fields?.map((f, i) => (
                 <div key={i} className="grid grid-cols-12 gap-2 mb-2 bg-white p-2 rounded shadow-sm items-center">
                    <select className="col-span-4 p-1 border text-[10px] font-bold" value={f.category} onChange={e => {
                      const flds = [...sec.fields!]; flds[i].category = e.target.value; updateSection(sec.id, 'fields', flds);
                    }}>
                      {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                    </select>
                    <input value={f.erpField} placeholder="Nome do Campo" className="col-span-6 p-1 border text-[10px]" onChange={e => {
                      const flds = [...sec.fields!]; flds[i].erpField = e.target.value; updateSection(sec.id, 'fields', flds);
                    }} />
                    <input type="checkbox" checked={f.required} className="col-span-2 justify-self-center" onChange={e => {
                      const flds = [...sec.fields!]; flds[i].required = e.target.checked; updateSection(sec.id, 'fields', flds);
                    }} />
                 </div>
               ))}
            </div>
          )}
        </div>
      ))}

      <button onClick={saveDoc} className="fixed bottom-10 right-10 bg-slate-900 text-white px-16 py-6 rounded-full font-black shadow-2xl hover:scale-110 transition-all z-50 border-4 border-blue-500">
        {editingId ? '💾 ATUALIZAR MANUAL' : '🚀 PUBLICAR MANUAL'}
      </button>
    </div>
  );
}
