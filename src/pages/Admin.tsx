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

  const saveToLocal = () => {
    const newDoc = { id: editingId || Math.random().toString(36).substr(2, 9), title, erp, version, sections };
    const newList = editingId ? savedDocs.map(d => d.id === editingId ? newDoc : d) : [...savedDocs, newDoc];
    localStorage.setItem('docs', JSON.stringify(newList));
    setSavedDocs(newList);
    setGeneratedCode(JSON.stringify(newDoc, null, 2));
    alert("Código Gerado! Copie o texto da tela.");
  };

  return (
    <div className="max-w-5xl mx-auto p-8 bg-slate-50 min-h-screen pb-40 font-sans border-x">
      {generatedCode && (
        <div className="fixed inset-0 bg-slate-900/95 z-[100] p-10 flex flex-col items-center">
          <div className="w-full max-w-4xl bg-white p-6 rounded-2xl shadow-2xl flex flex-col h-full">
            <h2 className="text-xl font-bold mb-2">CÓDIGO GERADO COM SUCESSO!</h2>
            <p className="text-sm text-slate-500 mb-4">Copie o conteúdo abaixo e cole no arquivo <b>src/data/manuals.ts</b></p>
            <textarea readOnly value={generatedCode} className="flex-1 w-full p-4 font-mono text-[10px] bg-slate-50 border rounded-xl mb-4" />
            <button onClick={() => setGeneratedCode('')} className="bg-blue-600 text-white p-4 rounded-full font-bold">FECHAR TELA</button>
          </div>
        </div>
      )}

      <header className="mb-10 flex justify-between items-end">
        <div className="flex-1 mr-4">
          <label className="text-[10px] font-bold text-slate-400 uppercase">Título do Manual</label>
          <input value={title} className="w-full bg-transparent border-b-2 border-slate-200 focus:border-blue-500 text-2xl font-black outline-none pb-1" onChange={e => setTitle(e.target.value)} />
        </div>
        <div className="w-48 mr-4">
          <label className="text-[10px] font-bold text-slate-400 uppercase">ERP</label>
          <input value={erp} className="w-full bg-transparent border-b-2 border-slate-200 focus:border-blue-500 text-2xl font-black outline-none pb-1" onChange={e => setErp(e.target.value)} />
        </div>
        <div className="w-24 text-center">
          <label className="text-[10px] font-bold text-slate-400 uppercase">Versão</label>
          <input value={version} className="w-full bg-transparent border-b-2 border-slate-200 focus:border-blue-500 text-2xl font-black outline-none pb-1 text-center" onChange={e => setVersion(e.target.value)} />
        </div>
      </header>

      {sections.map((sec) => (
        <div key={sec.id} className="bg-white p-8 rounded-xl border border-slate-200 mb-10 shadow-sm border-l-4 border-l-blue-500">
          <h3 className="text-sm font-black text-slate-400 uppercase mb-6 tracking-widest">{sec.title}</h3>
          
          <textarea value={sec.description} placeholder="Breve introdução do tópico..." className="w-full p-3 border rounded-lg h-20 mb-6 bg-slate-50 text-sm italic" onChange={e => updateSection(sec.id, 'description', e.target.value)} />

          {/* PASSOS */}
          <div className="space-y-4 mb-6">
            {sec.steps.map((step, idx) => (
              <div key={step.id} className="p-4 border rounded-xl bg-slate-50/50">
                <div className="flex gap-4">
                  <span className="font-black text-slate-300">#0{idx+1}</span>
                  <div className="flex-1">
                    <textarea value={step.text} placeholder="Descreva a ação..." className="w-full bg-transparent border-none focus:ring-0 text-sm mb-2" onChange={e => updateStep(sec.id, step.id, 'text', e.target.value)} />
                    <input type="file" className="text-[10px]" onChange={e => handleStepImage(sec.id, step.id, e)} />
                    {step.image && <img src={step.image} className="mt-3 w-32 h-20 object-cover rounded border shadow-sm" />}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* NOTA */}
          {sec.noteContent && (
            <div className={`p-4 rounded-lg mb-6 border-l-4 flex gap-3 ${sec.noteType === 'warning' ? 'bg-amber-50 border-amber-400' : 'bg-blue-50 border-blue-400'}`}>
              <select value={sec.noteType} className="bg-transparent border-none font-bold text-[10px]" onChange={e => updateSection(sec.id, 'noteType', e.target.value)}>
                <option value="info">INFO</option><option value="warning">AVISO</option><option value="success">OK</option>
              </select>
              <input value={sec.noteContent} placeholder="Texto da nota..." className="flex-1 bg-transparent border-none outline-none text-sm font-medium" onChange={e => updateSection(sec.id, 'noteContent', e.target.value)} />
            </div>
          )}

          {/* BOTÕES DE ADIÇÃO */}
          <div className="flex gap-2 border-t pt-4">
            <button onClick={() => addStep(sec.id)} className="text-[10px] font-bold bg-slate-800 text-white px-4 py-2 rounded-full uppercase tracking-tighter hover:bg-black">+ Passo com Print</button>
            {!sec.noteContent && (
              <button onClick={() => updateSection(sec.id, 'noteContent', ' ')} className="text-[10px] font-bold border border-slate-300 px-4 py-2 rounded-full uppercase tracking-tighter hover:bg-white">+ Adicionar Nota</button>
            )}
          </div>

          {/* TABELA DE CAMPOS (SÓ EM CAMPOS INTEGRADOS) */}
          {sec.title.toLowerCase().includes('campos') && (
            <div className="mt-8 p-4 bg-blue-50/50 border border-blue-100 rounded-xl">
               <button onClick={() => updateSection(sec.id, 'fields', [...(sec.fields || []), { erpField: '', category: 'Produto', required: false }])} className="text-[10px] font-bold text-blue-600 mb-4 uppercase">/ Adicionar Campo ERP</button>
               {sec.fields?.map((f, i) => (
                 <div key={i} className="grid grid-cols-12 gap-2 mb-2 bg-white p-2 rounded shadow-sm items-center">
                    <select className="col-span-4 p-1 border text-[10px] rounded" value={f.category} onChange={e => {
                      const flds = [...sec.fields!]; flds[i].category = e.target.value; updateSection(sec.id, 'fields', flds);
                    }}>
                      {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                    </select>
                    <input value={f.erpField} placeholder="Campo" className="col-span-6 p-1 border text-[10px] rounded" onChange={e => {
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

      <button onClick={saveToLocal} className="fixed bottom-10 right-10 bg-blue-600 text-white px-16 py-6 rounded-full font-black shadow-2xl hover:scale-110 transition-all uppercase tracking-widest text-sm z-50 border-4 border-white">
        🚀 GERAR CÓDIGO DO MANUAL
      </button>
    </div>
  );
}
