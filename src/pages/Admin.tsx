import React, { useState, useEffect } from 'react';
import { Section, Documentation, IntegratedField, Step } from '../types/doc';

const CATEGORIES = ['Produto', 'Material', 'Operação', 'Serviços', 'Instrução de lavagem', 'Outro'];

export default function Admin() {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [title, setTitle] = useState('');
  const [erp, setErp] = useState('');
  const [version, setVersion] = useState('2025.03');
  const [generatedCode, setGeneratedCode] = useState('');

  const createStep = (): Step => ({ id: Math.random().toString(36).substr(2, 9), text: '' });

  // Lista agora começa direto no "Iniciando a integração"
  const defaultSections: Section[] = [
    'Iniciando a integração', 'Funcionamento', 'Campos integrados', 
    'Configuração ERP', 'Configuração IDEA', 'Uso da integração', 
    'Criar produtos', 'Visualização no ERP'
  ].map(t => ({ 
    id: Math.random().toString(36).substr(2, 9), 
    title: t, description: '', steps: [], fields: [], noteType: 'info', noteContent: ''
  }));

  const [sections, setSections] = useState<Section[]>(defaultSections);

  const updateSection = (id: string, field: string, value: any) => {
    setSections(prev => prev.map(s => s.id === id ? { ...s, [field]: value } : s));
  };

  const addStep = (sectionId: string) => {
    setSections(prev => prev.map(s => s.id === sectionId ? { ...s, steps: [...(s.steps || []), createStep()] } : s));
  };

  const updateStep = (sectionId: string, stepId: string, field: string, value: any) => {
    setSections(prev => prev.map(s => s.id === sectionId ? { ...s, steps: s.steps.map(st => st.id === stepId ? { ...st, [field]: value } : st) } : s));
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
            <h2 className="text-lg font-bold mb-2 uppercase tracking-tighter">Código do Manual</h2>
            <p className="text-xs text-slate-400 mb-4 italic">Copie e cole no arquivo src/data/manuals.ts</p>
            <textarea readOnly value={generatedCode} className="flex-1 w-full p-4 font-mono text-[10px] bg-slate-50 border rounded-xl mb-4 outline-none" />
            <button onClick={() => setGeneratedCode('')} className="bg-blue-600 text-white p-3 rounded-full font-bold text-sm">FECHAR</button>
          </div>
        </div>
      )}

      <header className="mb-10 p-6 bg-white rounded-xl border flex gap-6 shadow-sm items-end border-t-4 border-t-blue-600">
        <div className="flex-1">
          <label className="text-[10px] font-bold text-slate-400 uppercase block mb-1 tracking-widest">Título do Manual</label>
          <input value={title} placeholder="Ex: Manual de Integração" className="w-full border-b pb-1 outline-none focus:border-blue-500 font-semibold text-lg" onChange={e => setTitle(e.target.value)} />
        </div>
        <div className="w-40">
          <label className="text-[10px] font-bold text-slate-400 uppercase block mb-1 tracking-widest">ERP</label>
          <input value={erp} placeholder="Ex: Totvs Moda" className="w-full border-b pb-1 outline-none focus:border-blue-500 font-semibold text-lg" onChange={e => setErp(e.target.value)} />
        </div>
        <div className="w-24">
          <label className="text-[10px] font-bold text-slate-400 uppercase block mb-1 text-center tracking-widest">Versão</label>
          <input value={version} className="w-full border-b pb-1 outline-none focus:border-blue-500 font-semibold text-lg text-center" onChange={e => setVersion(e.target.value)} />
        </div>
      </header>

      {sections.map((sec) => (
        <div key={sec.id} className="bg-white p-8 rounded-xl border border-slate-200 mb-8 shadow-sm border-l-4 border-l-blue-600">
          <h3 className="text-xs font-black text-slate-400 uppercase mb-4 tracking-widest">{sec.title}</h3>
          
          <textarea value={sec.description} placeholder="Breve introdução do tópico..." className="w-full p-2 border rounded h-16 mb-6 bg-slate-50 text-xs italic outline-none" onChange={e => updateSection(sec.id, 'description', e.target.value)} />

          <div className="space-y-3 mb-6">
            {sec.steps?.map((step, idx) => (
              <div key={step.id} className="p-4 border rounded-xl bg-slate-50/50">
                <textarea value={step.text} placeholder={`Ação ${idx+1}...`} className="w-full bg-transparent border-none focus:ring-0 text-sm mb-2" onChange={e => updateStep(sec.id, step.id, 'text', e.target.value)} />
                <div className="flex items-center gap-4">
                  <input type="file" className="text-[10px]" onChange={e => handleStepImage(sec.id, step.id, e)} />
                  {step.image && <img src={step.image} className="w-20 h-12 object-cover rounded border" />}
                </div>
              </div>
            ))}
          </div>

          <div className="flex gap-2">
            <button onClick={() => addStep(sec.id)} className="text-[9px] font-bold bg-slate-800 text-white px-3 py-1.5 rounded-full uppercase">+ Passo com Print</button>
            {!sec.noteContent && (
              <button onClick={() => updateSection(sec.id, 'noteContent', ' ')} className="text-[9px] font-bold border border-slate-300 px-3 py-1.5 rounded-full uppercase">+ Nota</button>
            )}
          </div>

          {sec.noteContent && (
            <div className="mt-4 p-3 bg-amber-50 border-l-4 border-amber-400 rounded flex gap-3">
              <select value={sec.noteType} className="bg-transparent border-none font-bold text-[10px]" onChange={e => updateSection(sec.id, 'noteType', e.target.value)}>
                <option value="info">INFO</option><option value="warning">AVISO</option><option value="success">OK</option>
              </select>
              <input value={sec.noteContent} className="flex-1 bg-transparent border-none text-xs font-semibold outline-none" onChange={e => updateSection(sec.id, 'noteContent', e.target.value)} />
            </div>
          )}
        </div>
      ))}

      <button onClick={generateManualCode} className="fixed bottom-6 right-6 bg-blue-600 text-white px-10 py-4 rounded-full font-bold shadow-2xl hover:scale-105 transition-all text-xs uppercase tracking-widest z-50 border-2 border-white">
        🚀 Gerar Código Final
      </button>
    </div>
  );
}
