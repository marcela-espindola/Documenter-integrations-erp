import React, { useState } from 'react';
import { Section, Documentation, IntegratedField, Step } from '../types/doc';

const CATEGORIES = ['Produto', 'Material', 'Operação', 'Serviços', 'Instrução de lavagem', 'Outro'];

export default function Admin() {
  const [title, setTitle] = useState('');
  const [erp, setErp] = useState('');
  const [version, setVersion] = useState('2025.03');
  const [erpEmail, setErpEmail] = useState('');
  const [erpPhone, setErpPhone] = useState('');
  const [erpWhatsApp, setErpWhatsApp] = useState('');
  const [audacesName, setAudacesName] = useState('Integração Audaces');
  const [audacesEmail, setAudacesEmail] = useState('integrations@audaces.com');
  const [generatedCode, setGeneratedCode] = useState('');

  const defaultSections: Section[] = [
    'Iniciando a integração', 'Funcionamento', 'Campos integrados', 
    'Configuração ERP', 'Configuração IDEA', 'Uso da integração', 
    'Criar produtos', 'Visualização no ERP'
  ].map(t => ({ 
    id: Math.random().toString(36).substr(2, 9), 
    title: t, description: '', steps: [], fields: [], noteType: 'info', noteContent: ''
  }));

  const [sections, setSections] = useState<Section[]>(defaultSections);

  // FUNÇÕES DE ATUALIZAÇÃO (ROBUSTAS)
  const updateSection = (id: string, field: string, value: any) => {
    setSections(prev => prev.map(s => s.id === id ? { ...s, [field]: value } : s));
  };

  const addStep = (sectionId: string) => {
    setSections(prev => prev.map(s => {
      if (s.id === sectionId) {
        const newStep: Step = { id: Math.random().toString(36).substr(2, 9), text: '' };
        return { ...s, steps: [...s.steps, newStep] };
      }
      return s;
    }));
  };

  const updateStep = (sectionId: string, stepId: string, field: string, value: any) => {
    setSections(prev => prev.map(s => {
      if (s.id === sectionId) {
        return { ...s, steps: s.steps.map(st => st.id === stepId ? { ...st, [field]: value } : st) };
      }
      return s;
    }));
  };

  const handleStepImage = (sectionId: string, stepId: string, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => updateStep(sectionId, stepId, 'image', reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const generateCode = () => {
    const newDoc: Documentation = { 
      id: erp.toLowerCase().replace(/\s+/g, '-'), 
      title, erp, version, erpEmail, erpPhone, erpWhatsApp, audacesName, audacesEmail, sections 
    };
    setGeneratedCode(JSON.stringify(newDoc, null, 2));
  };

  return (
    <div className="max-w-5xl mx-auto p-6 bg-slate-50 min-h-screen pb-40 font-sans text-slate-800">
      {generatedCode && (
        <div className="fixed inset-0 bg-slate-900/95 z-[100] p-10 flex flex-col items-center">
          <div className="bg-white p-6 rounded-2xl w-full max-w-4xl h-full flex flex-col">
            <h2 className="text-xl font-bold mb-2">CÓDIGO GERADO</h2>
            <p className="text-sm mb-4">Cole no arquivo <b>src/data/manuals.ts</b></p>
            <textarea readOnly value={generatedCode} className="flex-1 w-full p-4 font-mono text-[10px] bg-slate-100 border rounded-xl mb-4" />
            <button onClick={() => setGeneratedCode('')} className="bg-blue-600 text-white p-4 rounded-full font-bold">FECHAR</button>
          </div>
        </div>
      )}

      {/* HEADER E CONTATOS */}
      <div className="bg-white p-6 rounded-xl border mb-10 shadow-sm border-t-4 border-t-blue-600">
        <div className="grid grid-cols-3 gap-6 mb-8">
          <div><label className="text-[10px] font-bold text-slate-400 uppercase">Título</label><input value={title} className="w-full border-b font-bold p-1 outline-none text-lg" onChange={e => setTitle(e.target.value)} /></div>
          <div><label className="text-[10px] font-bold text-slate-400 uppercase">ERP</label><input value={erp} className="w-full border-b font-bold p-1 outline-none text-lg" onChange={e => setErp(e.target.value)} /></div>
          <div><label className="text-[10px] font-bold text-slate-400 uppercase">Versão</label><input value={version} className="w-full border-b font-bold p-1 outline-none text-center text-lg" onChange={e => setVersion(e.target.value)} /></div>
        </div>

        <div className="grid grid-cols-2 gap-8 p-6 bg-slate-50 rounded-2xl">
          <div className="space-y-2">
            <p className="text-[10px] font-black text-slate-400 uppercase">Contato {erp || 'ERP'}</p>
            <input placeholder="Email Suporte" className="w-full p-2 border rounded text-xs bg-white" onChange={e => setErpEmail(e.target.value)} />
            <input placeholder="Telefone" className="w-full p-2 border rounded text-xs bg-white" onChange={e => setErpPhone(e.target.value)} />
            <input placeholder="WhatsApp" className="w-full p-2 border rounded text-xs bg-white" onChange={e => setErpWhatsApp(e.target.value)} />
          </div>
          <div className="space-y-2">
            <p className="text-[10px] font-black text-blue-400 uppercase">Contato Audaces</p>
            <input value={audacesName} className="w-full p-2 border rounded text-xs bg-white font-bold" onChange={e => setAudacesName(e.target.value)} />
            <input value={audacesEmail} className="w-full p-2 border rounded text-xs bg-white font-bold" onChange={e => setAudacesEmail(e.target.value)} />
          </div>
        </div>
      </div>

      {sections.map((sec) => (
        <div key={sec.id} className="bg-white p-8 rounded-xl border border-slate-200 mb-10 shadow-sm border-l-4 border-l-blue-500">
          <h3 className="text-xs font-black text-slate-400 uppercase mb-4 tracking-widest">{sec.title}</h3>
          
          <textarea value={sec.description} placeholder="Descrição curta do tópico..." className="w-full p-3 border rounded h-20 mb-6 bg-slate-50 text-sm italic" onChange={e => updateSection(sec.id, 'description', e.target.value)} />

          {/* PASSOS */}
          <div className="space-y-4 mb-6">
            {sec.steps.map((step, idx) => (
              <div key={step.id} className="p-4 border rounded-xl bg-slate-50/50">
                <textarea value={step.text} placeholder={`Ação ${idx+1}...`} className="w-full bg-transparent border-none focus:ring-0 text-sm mb-2" onChange={e => updateStep(sec.id, step.id, 'text', e.target.value)} />
                <div className="flex items-center gap-4">
                  <input type="file" className="text-[10px]" onChange={e => handleStepImage(sec.id, step.id, e)} />
                  {step.image && <img src={step.image} className="w-32 h-20 object-cover rounded border" />}
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
              <input value={sec.noteContent} placeholder="Texto da nota..." className="flex-1 bg-transparent border-none text-sm font-semibold outline-none" onChange={e => updateSection(sec.id, 'noteContent', e.target.value)} />
            </div>
          )}

          <div className="flex gap-2 border-t pt-4">
            <button onClick={() => addStep(sec.id)} className="text-[10px] font-bold bg-slate-800 text-white px-4 py-2 rounded-full uppercase hover:bg-black">+ Adicionar Passo</button>
            {!sec.noteContent && (
              <button onClick={() => updateSection(sec.id, 'noteContent', ' ')} className="text-[10px] font-bold border border-slate-300 px-4 py-2 rounded-full uppercase hover:bg-slate-50">+ Adicionar Nota</button>
            )}
          </div>
        </div>
      ))}

      <button onClick={generateCode} className="fixed bottom-10 right-10 bg-blue-600 text-white px-12 py-5 rounded-full font-black shadow-2xl hover:scale-110 transition-all uppercase tracking-widest text-xs z-50 border-4 border-white">🚀 Gerar Código Final</button>
    </div>
  );
}
