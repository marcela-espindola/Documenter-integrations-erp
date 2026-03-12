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

  const createStep = (): Step => ({ id: Math.random().toString(36).substr(2, 9), text: '' });

  const [sections, setSections] = useState<Section[]>([
    'Iniciando a integração', 'Funcionamento', 'Campos integrados', 
    'Configuração ERP', 'Configuração IDEA', 'Uso da integração', 
    'Criar produtos', 'Visualização no ERP'
  ].map(t => ({ 
    id: Math.random().toString(36).substr(2, 9), 
    title: t, description: '', steps: [], fields: [], noteType: 'info', noteContent: ''
  })));

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

  // FUNÇÃO PARA BAIXAR O ARQUIVO
  const downloadManual = () => {
    if (!title || !erp) return alert("Título e ERP são obrigatórios");
    
    const newDoc: Documentation = { 
      id: erp.toLowerCase().replace(/\s+/g, '-'), 
      title, erp, version, erpEmail, erpPhone, erpWhatsApp, audacesName, audacesEmail, sections 
    };

    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(newDoc, null, 2));
    const downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", `${newDoc.id}.json`);
    document.body.appendChild(downloadAnchorNode);
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
  };

  return (
    <div className="max-w-5xl mx-auto p-6 bg-slate-50 min-h-screen pb-40 font-sans text-slate-800">
      {/* ... (Todo o layout do seu Admin que já funciona) ... */}

      <header className="mb-10 p-8 bg-white rounded-xl border-b-4 border-blue-600 shadow-sm">
        {/* Título, ERP, Versão e Blocos de Contato que você já tem */}
        <div className="grid grid-cols-3 gap-6 mb-8">
            <input placeholder="Título" className="border-b-2 outline-none focus:border-blue-500 font-bold text-xl" onChange={e => setTitle(e.target.value)} />
            <input placeholder="Nome do ERP" className="border-b-2 outline-none focus:border-blue-500 font-bold text-xl" onChange={e => setErp(e.target.value)} />
            <input placeholder="Versão" className="border-b-2 outline-none focus:border-blue-500 font-bold text-xl text-center" value={version} onChange={e => setVersion(e.target.value)} />
        </div>
        
        <div className="grid grid-cols-2 gap-8 p-6 bg-slate-50 rounded-2xl">
            <div className="space-y-2">
                <p className="text-[10px] font-black text-slate-400 uppercase">Contato ERP</p>
                <input placeholder="E-mail" className="w-full p-2 text-xs border rounded" onChange={e => setErpEmail(e.target.value)} />
                <input placeholder="Telefone" className="w-full p-2 text-xs border rounded" onChange={e => setErpPhone(e.target.value)} />
                <input placeholder="WhatsApp" className="w-full p-2 text-xs border rounded" onChange={e => setErpWhatsApp(e.target.value)} />
            </div>
            <div className="space-y-2">
                <p className="text-[10px] font-black text-blue-400 uppercase">Contato Audaces</p>
                <input value={audacesName} className="w-full p-2 text-xs border rounded font-bold" onChange={e => setAudacesName(e.target.value)} />
                <input value={audacesEmail} className="w-full p-2 text-xs border rounded font-bold" onChange={e => setAudacesEmail(e.target.value)} />
            </div>
        </div>
      </header>

      {sections.map(sec => (
        <div key={sec.id} className="bg-white p-8 rounded-xl border mb-10 shadow-sm border-l-4 border-l-blue-500">
           {/* ... Seus campos de descrição, passos e campos ERP ... */}
           <h3 className="font-bold text-slate-400 uppercase text-xs mb-4">{sec.title}</h3>
           <button onClick={() => addStep(sec.id)} className="bg-slate-100 text-slate-600 px-4 py-2 rounded-full text-[10px] font-bold uppercase">+ Novo Passo</button>
        </div>
      ))}

      {/* BOTÃO DE SALVAR */}
      <button onClick={downloadManual} className="fixed bottom-10 right-10 bg-green-600 text-white px-12 py-5 rounded-full font-black shadow-2xl hover:scale-110 transition-all border-4 border-white uppercase tracking-widest text-xs z-50">
        💾 BAIXAR ARQUIVO DO MANUAL
      </button>
    </div>
  );
}
