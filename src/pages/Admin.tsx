import React, { useState } from 'react';
import { Section, Documentation, IntegratedField, Step } from '../types/doc';

const CATEGORIES = ['Produto', 'Material', 'Operação', 'Serviços', 'Instrução de lavagem', 'Outro'];

export default function Admin() {
  const [title, setTitle] = useState('');
  const [erp, setErp] = useState('');
  const [version, setVersion] = useState('2025.03');
  
  // Contatos ERP
  const [erpEmail, setErpEmail] = useState('');
  const [erpPhone, setErpPhone] = useState('');
  const [erpWhatsApp, setErpWhatsApp] = useState('');
  
  // Contatos Audaces
  const [audacesName, setAudacesName] = useState('Integração Audaces');
  const [audacesEmail, setAudacesEmail] = useState('integrations@audaces.com');

  const [generatedCode, setGeneratedCode] = useState('');

  const createStep = (): Step => ({ id: Math.random().toString(36).substr(2, 9), text: '' });

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
    const newDoc = { 
      id: Math.random().toString(36).substr(2, 9), 
      title, erp, version, erpEmail, erpPhone, erpWhatsApp, audacesName, audacesEmail, sections 
    };
    setGeneratedCode(JSON.stringify(newDoc, null, 2));
  };

  return (
    <div className="max-w-5xl mx-auto p-6 bg-slate-50 min-h-screen pb-40 font-sans text-slate-800">
      {generatedCode && (
        <div className="fixed inset-0 bg-slate-900/90 z-[100] p-6 flex flex-col items-center justify-center">
          <div className="w-full max-w-3xl bg-white p-6 rounded-2xl shadow-2xl flex flex-col h-[80vh]">
            <h2 className="text-lg font-bold mb-2 uppercase text-blue-600">Código Gerado</h2>
            <textarea readOnly value={generatedCode} className="flex-1 w-full p-4 font-mono text-[10px] bg-slate-50 border rounded-xl mb-4 outline-none" />
            <button onClick={() => setGeneratedCode('')} className="bg-blue-600 text-white p-3 rounded-full font-bold text-sm">FECHAR</button>
          </div>
        </div>
      )}

      {/* HEADER E CONTATOS ORGANIZADOS */}
      <div className="bg-white p-8 rounded-xl border mb-10 shadow-sm border-t-4 border-t-blue-600">
        <div className="grid grid-cols-3 gap-6 mb-10">
          <div><label className="text-[10px] font-bold text-slate-400 uppercase mb-1 block">Título do Manual</label><input value={title} placeholder="Ex: Guia Técnico" className="w-full border-b font-bold p-1 outline-none focus:border-blue-500" onChange={e => setTitle(e.target.value)} /></div>
          <div><label className="text-[10px] font-bold text-slate-400 uppercase mb-1 block">Nome do ERP</label><input value={erp} placeholder="Ex: Totvs" className="w-full border-b font-bold p-1 outline-none focus:border-blue-500" onChange={e => setErp(e.target.value)} /></div>
          <div><label className="text-[10px] font-bold text-slate-400 uppercase mb-1 block text-center">Versão</label><input value={version} className="w-full border-b font-bold p-1 outline-none focus:border-blue-500 text-center" onChange={e => setVersion(e.target.value)} /></div>
        </div>

        <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {/* LADO DO ERP */}
            <div className="space-y-3">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest border-b pb-2">Dados de Contato: {erp || 'ERP'}</p>
              <input placeholder="E-mail de Suporte" className="w-full p-2 border rounded text-xs bg-white" onChange={e => setErpEmail(e.target.value)} />
              <input placeholder="Telefone (opcional)" className="w-full p-2 border rounded text-xs bg-white" onChange={e => setErpPhone(e.target.value)} />
              <input placeholder="WhatsApp (opcional)" className="w-full p-2 border rounded text-xs bg-white" onChange={e => setErpWhatsApp(e.target.value)} />
            </div>

            {/* LADO DA AUDACES */}
            <div className="space-y-3">
              <p className="text-[10px] font-black text-blue-400 uppercase tracking-widest border-b pb-2">Dados de Contato: Audaces</p>
              <input value={audacesName} placeholder="Responsável" className="w-full p-2 border rounded text-xs bg-white font-bold" onChange={e => setAudacesName(e.target.value)} />
              <input value={audacesEmail} placeholder="E-mail Audaces" className="w-full p-2 border rounded text-xs bg-white font-bold" onChange={e => setAudacesEmail(e.target.value)} />
            </div>
          </div>
        </div>
      </div>

      {sections.map((sec) => (
        <div key={sec.id} className="bg-white p-8 rounded-xl border border-slate-200 mb-8 shadow-sm border-l-4 border-l-blue-500">
          <h3 className="text-sm font-black text-slate-400 uppercase mb-4 tracking-widest">{sec.title}</h3>
          <textarea value={sec.description} placeholder="Resumo do tópico..." className="w-full p-2 border rounded h-16 mb-6 bg-slate-50 text-xs italic outline-none" onChange={e => updateSection(sec.id, 'description', e.target.value)} />

          <div className="space-y-4 mb-6">
            {sec.steps.map((step, idx) => (
              <div key={step.id} className="p-4 border rounded-xl bg-slate-50/50">
                <textarea value={step.text} placeholder={`Passo ${idx+1}...`} className="w-full bg-transparent border-none focus:ring-0 text-sm mb-2" onChange={e => updateStep(sec.id, step.id, 'text', e.target.value)} />
                <div className="flex items-center gap-4">
                  <input type="file" className="text-[10px]" onChange={e => handleStepImage(sec.id, step.id, e)} />
                  {step.image && <img src={step.image} className="w-24 h-16 object-cover rounded border shadow-md" />}
                </div>
              </div>
            ))}
          </div>

          <div className="flex gap-2 mb-6">
            <button onClick={() => addStep(sec.id)} className="text-[9px] font-bold bg-slate-800 text-white px-4 py-2 rounded-full uppercase hover:bg-black">+ Passo com Print</button>
            {!sec.noteContent && (
              <button onClick={() => updateSection(sec.id, 'noteContent', ' ')} className="text-[9px] font-bold border border-slate-300 px-4 py-2 rounded-full uppercase hover:bg-white">+ Adicionar Nota</button>
            )}
          </div>

          {sec.noteContent && (
            <div className={`p-4 rounded-lg mb-6 border-l-4 flex gap-3 ${sec.noteType === 'warning' ? 'bg-amber-50 border-amber-400' : 'bg-blue-50 border-blue-400'}`}>
              <select value={sec.noteType} className="bg-transparent border-none font-bold text-[10px]" onChange={e => updateSection(sec.id, 'noteType', e.target.value)}>
                <option value="info">INFO</option><option value="warning">AVISO</option><option value="success">OK</option>
              </select>
              <input value={sec.noteContent} placeholder="Texto da nota..." className="flex-1 bg-transparent border-none outline-none text-xs font-semibold" onChange={e => updateSection(sec.id, 'noteContent', e.target.value)} />
            </div>
          )}

          {sec.title.toLowerCase().includes('campos') && (
            <div className="p-4 bg-blue-50/50 border border-blue-100 rounded-xl">
               <button onClick={() => updateSection(sec.id, 'fields', [...(sec.fields || []), { erpField: '', category: 'Produto', required: false }])} className="text-[10px] font-bold text-blue-600 mb-4 block uppercase">+ Add Campo ERP</button>
               {sec.fields?.map((f, i) => (
                 <div key={i} className="grid grid-cols-12 gap-2 mb-2 bg-white p-2 rounded shadow-sm items-center">
                    <select className="col-span-4 text-[10px] border rounded" value={f.category} onChange={e => {
                      const flds = [...sec.fields!]; flds[i].category = e.target.value; updateSection(sec.id, 'fields', flds);
                    }}>
                      {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                    </select>
                    <input value={f.erpField} placeholder="Campo" className="col-span-6 p-1 border rounded text-[10px]" onChange={e => {
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

      <button onClick={generateManualCode} className="fixed bottom-10 right-10 bg-blue-600 text-white px-16 py-6 rounded-full font-black shadow-2xl hover:scale-110 transition-all uppercase tracking-widest text-sm z-50 border-4 border-white">🚀 Gerar Código Final</button>
    </div>
  );
}
