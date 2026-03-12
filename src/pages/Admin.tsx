import React, { useState, useEffect } from 'react';
import { Section, Documentation, IntegratedField, Step } from '../types/doc';

const CATEGORIES = ['Produto', 'Material', 'Operação', 'Serviços', 'Instrução de lavagem', 'Outro'];

export default function Admin() {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [title, setTitle] = useState('');
  const [erp, setErp] = useState('');
  const [version, setVersion] = useState('2025.03');
  const [generatedCode, setGeneratedCode] = useState('');
  const [savedDocs, setSavedDocs] = useState<Documentation[]>([]);

  const createStep = (): Step => ({ id: Math.random().toString(36).substr(2, 9), text: '' });

  const defaultSections: Section[] = [
    'Introdução', 'Benefícios', 'Iniciando a integração', 'Funcionamento', 
    'Campos integrados', 'Configuração ERP', 'Configuração IDEA', 
    'Uso da integração', 'Criar produtos', 'Visualização no ERP'
  ].map(t => ({ 
    id: Math.random().toString(36).substr(2, 9), 
    title: t, description: '', steps: [], fields: [], noteType: 'info', noteContent: ''
  }));

  const [sections, setSections] = useState<Section[]>(defaultSections);

  useEffect(() => {
    const docs = JSON.parse(localStorage.getItem('docs') || '[]');
    setSavedDocs(docs);
  }, []);

  const updateSection = (id: string, field: string, value: any) => {
    setSections(prev => prev.map(s => s.id === id ? { ...s, [field]: value } : s));
  };

  const addStep = (sectionId: string) => {
    setSections(prev => prev.map(s => {
      if (s.id === sectionId) {
        return { ...s, steps: [...(s.steps || []), createStep()] };
      }
      return s;
    }));
  };

  const updateStep = (sectionId: string, stepId: string, field: string, value: any) => {
    setSections(prev => prev.map(s => s.id === sectionId ? { 
      ...s, steps: s.steps.map(st => st.id === stepId ? { ...st, [field]: value } : st) 
    } : s));
  };

  const handleStepImage = (sectionId: string, stepId: string, e: any) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => updateStep(sectionId, stepId, 'image', reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const generateManualCode = () => {
    const newDoc = { id: editingId || Math.random().toString(36).substr(2, 9), title, erp, version, sections };
    setGeneratedCode(JSON.stringify(newDoc, null, 2));
  };

  return (
    <div className="max-w-5xl mx-auto p-6 bg-slate-50 min-h-screen pb-40 font-sans text-slate-800">
      {generatedCode && (
        <div className="fixed inset-0 bg-slate-900/90 z-[100] p-6 flex flex-col items-center justify-center">
          <div className="w-full max-w-3xl bg-white p-6 rounded-2xl shadow-2xl flex flex-col h-[80vh]">
            <h2 className="text-lg font-bold mb-2">CÓDIGO PARA MANUALS.TS</h2>
            <textarea readOnly value={generatedCode} className="flex-1 w-full p-4 font-mono text-[10px] bg-slate-50 border rounded-xl mb-4 outline-none" />
            <button onClick={() => setGeneratedCode('')} className="bg-blue-600 text-white p-3 rounded-full font-bold text-sm">FECHAR</button>
          </div>
        </div>
      )}

      {/* Inputs de Cabeçalho - Tamanho Normalizado */}
      <header className="mb-10 p-6 bg-white rounded-xl border flex gap-6 shadow-sm items-end">
        <div className="flex-1">
          <label className="text-[10px] font-bold text-slate-400 uppercase block mb-1">Título do Manual</label>
          <input value={title} placeholder="Ex: Guia de Utilização" className="w-full border-b pb-1 outline-none focus:border-blue-500 font-semibold text-lg" onChange={e => setTitle(e.target.value)} />
        </div>
        <div className="w-40">
          <label className="text-[10px] font-bold text-slate-400 uppercase block mb-1">ERP</label>
          <input value={erp} placeholder="Ex: Millennium" className="w-full border-b pb-1 outline-none focus:border-blue-500 font-semibold text-lg" onChange={e => setErp(e.target.value)} />
        </div>
        <div className="w-24">
          <label className="text-[10px] font-bold text-slate-400 uppercase block mb-1 text-center">Versão</label>
          <input value={version} className="w-full border-b pb-1 outline-none focus:border-blue-500 font-semibold text-lg text-center" onChange={e => setVersion(e.target.value)} />
        </div>
      </header>

      {sections.map((sec) => (
        <div key={sec.id} className="bg-white p-6 rounded-xl border border-slate-200 mb-8 shadow-sm border-l-4 border-l-blue-500">
          <h3 className="text-xs font-black text-slate-400 uppercase mb-4 tracking-widest">{sec.title}</h3>
          
          <textarea value={sec.description} placeholder="Resumo do tópico..." className="w-full p-2 border rounded h-16 mb-6 bg-slate-50 text-xs italic outline-none focus:ring-1 focus:ring-blue-200" onChange={e => updateSection(sec.id, 'description', e.target.value)} />

          {/* PASSOS DINÂMICOS */}
          <div className="space-y-3 mb-6">
            {sec.steps?.map((step, idx) => (
              <div key={step.id} className="p-4 border rounded-xl bg-slate-50/50">
                <div className="flex gap-4">
                  <span className="font-bold text-slate-300 text-sm">#{idx+1}</span>
                  <div className="flex-1">
                    <textarea value={step.text} placeholder="O que o usuário deve fazer?" className="w-full bg-transparent border-none focus:ring-0 text-sm mb-2 h-12" onChange={e => updateStep(sec.id, step.id, 'text', e.target.value)} />
                    <div className="flex items-center gap-4">
                      <input type="file" className="text-[10px]" onChange={e => handleStepImage(sec.id, step.id, e)} />
                      {step.image && <img src={step.image} className="w-20 h-12 object-cover rounded border bg-white" />}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* NOTA DINÂMICA */}
          {sec.noteContent && (
            <div className={`p-3 rounded-lg mb-6 border-l-4 flex gap-3 items-center ${sec.noteType === 'warning' ? 'bg-amber-50 border-amber-400' : 'bg-blue-50 border-blue-400'}`}>
              <select value={sec.noteType} className="bg-transparent border-none font-bold text-[10px] outline-none" onChange={e => updateSection(sec.id, 'noteType', e.target.value)}>
                <option value="info">INFO</option><option value="warning">AVISO</option><option value="success">OK</option>
              </select>
              <input value={sec.noteContent} placeholder="Mensagem da nota..." className="flex-1 bg-transparent border-none outline-none text-xs font-semibold" onChange={e => updateSection(sec.id, 'noteContent', e.target.value)} />
            </div>
          )}

          {/* BOTÕES DE ADIÇÃO */}
          <div className="flex gap-2 border-t pt-4">
            <button onClick={() => addStep(sec.id)} className="text-[9px] font-bold bg-slate-700 text-white px-3 py-1.5 rounded-full uppercase hover:bg-slate-900 transition-all">+ Passo com Print</button>
            {!sec.noteContent && (
              <button onClick={() => updateSection(sec.id, 'noteContent', ' ')} className="text-[9px] font-bold border border-slate-300 px-3 py-1.5 rounded-full uppercase hover:bg-slate-100 transition-all">+ Adicionar Nota</button>
            )}
          </div>

          {/* CAMPOS ERP */}
          {sec.title.toLowerCase().includes('campos') && (
            <div className="mt-6 p-4 bg-blue-50/50 border border-blue-100 rounded-xl">
               <button onClick={() => updateSection(sec.id, 'fields', [...(sec.fields || []), { erpField: '', category: 'Produto', required: false }])} className="text-[9px] font-bold text-blue-600 mb-3 block uppercase">/ Novo Campo ERP</button>
               {sec.fields?.map((f, i) => (
                 <div key={i} className="grid grid-cols-12 gap-2 mb-2 bg-white p-2 rounded shadow-sm items-center">
                    <select className="col-span-4 text-[10px] border rounded p-1" value={f.category} onChange={e => {
                      const flds = [...sec.fields!]; flds[i].category = e.target.value; updateSection(sec.id, 'fields', flds);
                    }}>
                      {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                    </select>
                    <input value={f.erpField} placeholder="Nome do Campo" className="col-span-6 text-[10px] border rounded p-1" onChange={e => {
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

      {/* Botão Salvar - Tamanho Normalizado */}
      <button onClick={generateManualCode} className="fixed bottom-6 right-6 bg-blue-600 text-white px-8 py-3 rounded-full font-bold shadow-2xl hover:scale-105 transition-all uppercase tracking-widest text-xs z-50 border-2 border-white">
        🚀 GERAR CÓDIGO
      </button>
    </div>
  );
}
