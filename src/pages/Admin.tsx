import React, { useState, useEffect } from 'react';
import { Section, Documentation, IntegratedField, Step } from '../types/doc';

const CATEGORIES = ['Produto', 'Material', 'Operação', 'Serviços', 'Instrução de lavagem', 'Outro'];

export default function Admin() {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [title, setTitle] = useState('');
  const [erp, setErp] = useState('');
  const [version, setVersion] = useState('2025.03');
  const [erpEmail, setErpEmail] = useState('');
  const [erpPhone, setErpPhone] = useState('');
  const [erpWhatsApp, setErpWhatsApp] = useState('');
  const [audacesName, setAudacesName] = useState('Integração Audaces');
  const [audacesEmail, setAudacesEmail] = useState('integrations@audaces.com');
  const [generatedCode, setGeneratedCode] = useState('');
  const [savedDocs, setSavedDocs] = useState<Documentation[]>([]);

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

  useEffect(() => {
    const docs = JSON.parse(localStorage.getItem('docs') || '[]');
    setSavedDocs(docs);
  }, []);

  const handleEdit = (doc: Documentation) => {
    setEditingId(doc.id);
    setTitle(doc.title); setErp(doc.erp); setVersion(doc.version);
    setErpEmail(doc.erpEmail || ''); setErpPhone(doc.erpPhone || ''); setErpWhatsApp(doc.erpWhatsApp || '');
    setAudacesName(doc.audacesName || ''); setAudacesEmail(doc.audacesEmail || '');
    setSections(doc.sections);
    window.scrollTo(0, 0);
  };

  const updateSection = (id: string, field: string, value: any) => {
    setSections(prev => prev.map(s => s.id === id ? { ...s, [field]: value } : s));
  };

  const addStep = (sectionId: string) => {
    setSections(prev => prev.map(s => s.id === sectionId ? { ...s, steps: [...s.steps, createStep()] } : s));
  };

  const updateStep = (sectionId: string, stepId: string, field: string, value: any) => {
    setSections(prev => prev.map(s => s.id === sectionId ? { ...s, steps: s.steps.map(st => st.id === stepId ? { ...st, [field]: value } : st) } : s));
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
      id: editingId || erp.toLowerCase().replace(/\s+/g, '-'), 
      title, erp, version, erpEmail, erpPhone, erpWhatsApp, audacesName, audacesEmail, sections 
    };
    const newList = editingId ? savedDocs.map(d => d.id === editingId ? newDoc : d) : [...savedDocs, newDoc];
    localStorage.setItem('docs', JSON.stringify(newList));
    setGeneratedCode(JSON.stringify(newDoc, null, 2));
  };

  return (
    <div className="max-w-5xl mx-auto p-6 bg-slate-50 min-h-screen pb-40 font-sans text-slate-800">
      {generatedCode && (
        <div className="fixed inset-0 bg-slate-900/95 z-[100] p-10 flex flex-col items-center">
          <div className="bg-white p-8 rounded-3xl w-full max-w-4xl h-full flex flex-col shadow-2xl">
            <h2 className="text-xl font-black text-blue-600 mb-2">CÓDIGO GERADO!</h2>
            <p className="text-xs text-slate-400 mb-4 italic">Cole no arquivo src/data/manuals.ts dentro do array manualSaves.</p>
            <textarea readOnly value={generatedCode} className="flex-1 w-full p-4 font-mono text-[10px] bg-slate-50 border rounded-xl mb-4 outline-none" />
            <button onClick={() => setGeneratedCode('')} className="bg-slate-900 text-white p-4 rounded-full font-bold uppercase tracking-widest text-xs">FECHAR JANELA</button>
          </div>
        </div>
      )}

      {/* SELETOR DE EDIÇÃO */}
      <div className="mb-10 p-4 bg-white rounded-xl border border-dashed flex items-center gap-4">
        <span className="text-[10px] font-black text-slate-400 uppercase">Editar:</span>
        {savedDocs.map(d => (
          <button key={d.id} onClick={() => handleEdit(d)} className="px-3 py-1 bg-slate-100 rounded-full text-[10px] font-bold hover:bg-blue-600 hover:text-white transition-all uppercase">{d.erp}</button>
        ))}
        {editingId && <button onClick={() => window.location.reload()} className="text-[10px] text-red-500 font-bold ml-auto underline">CANCELAR EDIÇÃO</button>}
      </div>

      {/* HEADER E CONTATOS */}
      <div className={`bg-white p-8 rounded-2xl border mb-10 shadow-sm border-t-8 ${editingId ? 'border-t-orange-400' : 'border-t-blue-600'}`}>
        <div className="grid grid-cols-3 gap-6 mb-8">
          <div><label className="text-[10px] font-bold text-slate-400 uppercase mb-1 block">Título</label><input value={title} className="w-full border-b font-bold p-1 outline-none text-lg" onChange={e => setTitle(e.target.value)} /></div>
          <div><label className="text-[10px] font-bold text-slate-400 uppercase mb-1 block">ERP</label><input value={erp} className="w-full border-b font-bold p-1 outline-none text-lg" onChange={e => setErp(e.target.value)} /></div>
          <div><label className="text-[10px] font-bold text-slate-400 uppercase mb-1 block text-center">Versão</label><input value={version} className="w-full border-b font-bold p-1 outline-none text-center text-lg" onChange={e => setVersion(e.target.value)} /></div>
        </div>

        <div className="grid grid-cols-2 gap-8 p-6 bg-slate-50 rounded-2xl border">
          <div className="space-y-3">
            <p className="text-[10px] font-black text-slate-400 uppercase border-b pb-1">Contatos {erp || 'ERP'}</p>
            <input value={erpEmail} placeholder="E-mail Suporte" className="w-full p-2 border rounded text-xs" onChange={e => setErpEmail(e.target.value)} />
            <input value={erpPhone} placeholder="Telefone" className="w-full p-2 border rounded text-xs" onChange={e => setErpPhone(e.target.value)} />
            <input value={erpWhatsApp} placeholder="WhatsApp" className="w-full p-2 border rounded text-xs" onChange={e => setErpWhatsApp(e.target.value)} />
          </div>
          <div className="space-y-3">
            <p className="text-[10px] font-black text-blue-400 uppercase border-b pb-1">Contatos Audaces</p>
            <input value={audacesName} placeholder="Responsável" className="w-full p-2 border rounded text-xs font-bold" onChange={e => setAudacesName(e.target.value)} />
            <input value={audacesEmail} placeholder="E-mail Audaces" className="w-full p-2 border rounded text-xs font-bold" onChange={e => setAudacesEmail(e.target.value)} />
          </div>
        </div>
      </div>

      {sections.map((sec) => (
        <div key={sec.id} className="bg-white p-8 rounded-2xl border border-slate-200 mb-10 shadow-sm border-l-4 border-l-blue-500">
          <h3 className="text-xs font-black text-slate-400 uppercase mb-4 tracking-widest">{sec.title}</h3>
          
          <textarea value={sec.description} placeholder="Descrição curta do tópico (Ex: Resumo inicial)..." className="w-full p-3 border rounded h-20 mb-6 bg-slate-50 text-sm italic outline-none" onChange={e => updateSection(sec.id, 'description', e.target.value)} />

          <div className="space-y-4 mb-6">
            {sec.steps.map((step, idx) => (
              <div key={step.id} className="p-4 border rounded-xl bg-slate-50/50">
                <textarea value={step.text} placeholder={`Descreva a ação do passo ${idx+1}...`} className="w-full bg-transparent border-none focus:ring-0 text-sm mb-2" onChange={e => updateStep(sec.id, step.id, 'text', e.target.value)} />
                <div className="flex items-center gap-4">
                  <input type="file" className="text-[10px]" onChange={e => handleStepImage(sec.id, step.id, e)} />
                  {step.image && <img src={step.image} className="w-32 h-20 object-cover rounded border" />}
                </div>
              </div>
            ))}
          </div>

          <div className="flex gap-2 mb-6">
            <button onClick={() => addStep(sec.id)} className="text-[9px] font-bold bg-slate-800 text-white px-4 py-2 rounded-full uppercase hover:bg-black transition-all">+ Novo Passo com Print</button>
            {!sec.noteContent && (
              <button onClick={() => updateSection(sec.id, 'noteContent', ' ')} className="text-[9px] font-bold border border-slate-300 px-4 py-2 rounded-full uppercase hover:bg-slate-50 transition-all">+ Adicionar Nota</button>
            )}
          </div>

          {sec.noteContent !== '' && (
            <div className={`p-4 rounded-lg mb-6 border-l-4 flex gap-3 ${sec.noteType === 'warning' ? 'bg-amber-50 border-amber-400' : 'bg-blue-50 border-blue-400'}`}>
              <select value={sec.noteType} className="bg-transparent border-none font-bold text-[10px]" onChange={e => updateSection(sec.id, 'noteType', e.target.value)}>
                <option value="info">INFO</option><option value="warning">AVISO</option><option value="success">OK</option>
              </select>
              <input value={sec.noteContent} placeholder="Texto da nota de destaque..." className="flex-1 bg-transparent border-none outline-none text-sm font-semibold" onChange={e => updateSection(sec.id, 'noteContent', e.target.value)} />
            </div>
          )}

          {sec.title.toLowerCase().includes('campos') && (
            <div className="p-4 bg-blue-50/50 border border-blue-100 rounded-xl">
               <button onClick={() => updateSection(sec.id, 'fields', [...(sec.fields || []), { erpField: '', category: 'Produto', required: false }])} className="text-[10px] font-bold text-blue-600 mb-4 block uppercase tracking-tighter">/ Novo Campo ERP</button>
               {sec.fields?.map((f, i) => (
                 <div key={i} className="grid grid-cols-12 gap-2 mb-2 bg-white p-2 rounded shadow-sm items-center">
                    <select className="col-span-4 text-[10px] border-none font-bold" value={f.category} onChange={e => {
                      const flds = [...sec.fields!]; flds[i].category = e.target.value; updateSection(sec.id, 'fields', flds);
                    }}>
                      {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                    </select>
                    <input value={f.erpField} placeholder="Nome do Campo" className="col-span-6 text-[10px] border-none font-medium" onChange={e => {
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

      <button onClick={generateCode} className="fixed bottom-10 right-10 bg-blue-600 text-white px-16 py-6 rounded-full font-black shadow-2xl hover:scale-110 transition-all uppercase tracking-widest text-sm z-50 border-4 border-white">
        {editingId ? '💾 ATUALIZAR E GERAR CÓDIGO' : '🚀 PUBLICAR E GERAR CÓDIGO'}
      </button>
    </div>
  );
}
