import React, { useState, useEffect } from 'react';
import { Section, Documentation, IntegratedField, Step } from '../types/doc';

const CATEGORIES = ['Produto', 'Material', 'Operação', 'Serviços', 'Instrução de lavagem', 'Outro'];

export default function Admin() {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [title, setTitle] = useState('');
  const [erp, setErp] = useState('');
  const [version, setVersion] = useState('2025.03');
  
  // Novos campos de contato
  const [erpEmail, setErpEmail] = useState('');
  const [erpPhone, setErpPhone] = useState('');
  const [erpWhatsApp, setErpWhatsApp] = useState('');

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

  const generateManualCode = () => {
    const newDoc = { 
      id: editingId || Math.random().toString(36).substr(2, 9), 
      title, erp, version, erpEmail, erpPhone, erpWhatsApp, sections 
    };
    setGeneratedCode(JSON.stringify(newDoc, null, 2));
  };

  return (
    <div className="max-w-5xl mx-auto p-6 bg-slate-50 min-h-screen pb-40 font-sans text-slate-800">
      {generatedCode && (
        <div className="fixed inset-0 bg-slate-900/90 z-[100] p-6 flex flex-col items-center justify-center">
          <div className="w-full max-w-3xl bg-white p-6 rounded-2xl shadow-2xl flex flex-col h-[80vh]">
            <h2 className="text-lg font-bold mb-2">CÓDIGO GERADO</h2>
            <textarea readOnly value={generatedCode} className="flex-1 w-full p-4 font-mono text-[10px] bg-slate-50 border rounded-xl mb-4 outline-none" />
            <button onClick={() => setGeneratedCode('')} className="bg-blue-600 text-white p-3 rounded-full font-bold text-sm">FECHAR</button>
          </div>
        </div>
      )}

      {/* HEADER E CONTATOS ERP */}
      <div className="bg-white p-6 rounded-xl border mb-10 shadow-sm border-t-4 border-t-blue-600">
        <div className="grid grid-cols-3 gap-6 mb-6">
          <div>
            <label className="text-[10px] font-bold text-slate-400 uppercase">Título</label>
            <input value={title} className="w-full border-b font-bold p-1 outline-none focus:border-blue-500" onChange={e => setTitle(e.target.value)} />
          </div>
          <div>
            <label className="text-[10px] font-bold text-slate-400 uppercase">ERP</label>
            <input value={erp} className="w-full border-b font-bold p-1 outline-none focus:border-blue-500" onChange={e => setErp(e.target.value)} />
          </div>
          <div>
            <label className="text-[10px] font-bold text-slate-400 uppercase">Versão</label>
            <input value={version} className="w-full border-b font-bold p-1 outline-none focus:border-blue-500 text-center" onChange={e => setVersion(e.target.value)} />
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4 p-4 bg-slate-50 rounded-lg">
          <div className="col-span-3 text-[10px] font-black text-slate-400 uppercase mb-2">Dados de Contato do ERP</div>
          <input placeholder="Email de Suporte do ERP" className="p-2 border rounded text-xs" onChange={e => setErpEmail(e.target.value)} />
          <input placeholder="Telefone" className="p-2 border rounded text-xs" onChange={e => setErpPhone(e.target.value)} />
          <input placeholder="WhatsApp" className="p-2 border rounded text-xs" onChange={e => setErpWhatsApp(e.target.value)} />
        </div>
      </div>

      {/* SEÇÕES DINÂMICAS (IGUAL ANTES) */}
      {sections.map((sec) => (
        <div key={sec.id} className="bg-white p-8 rounded-xl border border-slate-200 mb-8 shadow-sm border-l-4 border-l-blue-600">
           {/* ... Resto do código do Admin permanece igual ... */}
           <h3 className="text-xs font-black text-slate-400 uppercase mb-4 tracking-widest">{sec.title}</h3>
           {/* Adicione aqui os campos de passos e prints que já tínhamos */}
           <button onClick={() => setSections(prev => prev.map(s => s.id === sec.id ? { ...s, steps: [...(s.steps || []), createStep()] } : s))} className="text-[9px] font-bold bg-slate-800 text-white px-3 py-1.5 rounded-full uppercase">+ Adicionar Passo</button>
        </div>
      ))}

      <button onClick={generateManualCode} className="fixed bottom-6 right-6 bg-blue-600 text-white px-10 py-4 rounded-full font-bold shadow-2xl z-50">🚀 GERAR CÓDIGO</button>
    </div>
  );
}
