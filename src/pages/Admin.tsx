import React, { useState, useEffect } from 'react';
import { Section, Documentation, IntegratedField, SubSection } from '../types/doc';

const CATEGORIES = ['Produto', 'Material', 'Operação', 'Serviços', 'Instrução de lavagem', 'Outro'];

export default function Admin() {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [title, setTitle] = useState('');
  const [erp, setErp] = useState('');
  const [version, setVersion] = useState('2025.03');
  const [savedDocs, setSavedDocs] = useState<Documentation[]>([]);

  const defaultSections = [
    'Introdução', 'Benefícios', 'Iniciando a integração', 'Funcionamento', 
    'Campos integrados', 'Configuração ERP', 'Configuração IDEA', 
    'Uso da integração', 'Criar produtos', 'Visualização no ERP'
  ].map(t => ({ 
    id: Math.random().toString(36).substr(2, 9), 
    title: t, content: '', images: [], fields: [], subSections: [], noteType: 'info' as const, noteContent: ''
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

  const updateSection = (id: string, field: string, value: any) => {
    setSections(prev => prev.map(s => s.id === id ? { ...s, [field]: value } : s));
  };

  const addSubSection = (sectionId: string) => {
    setSections(prev => prev.map(s => s.id === sectionId ? { 
      ...s, subSections: [...(s.subSections || []), { id: Math.random().toString(36).substr(2, 9), title: 'Sub-tópico', content: '', images: [] }] 
    } : s));
  };

  const addField = (sectionId: string) => {
    setSections(prev => prev.map(s => s.id === sectionId ? { 
      ...s, fields: [...(s.fields || []), { erpField: '', category: 'Produto', required: false }] 
    } : s));
  };

  const handleImage = (id: string, e: any, isSub = false, subId = "") => {
    const files = Array.from(e.target.files as FileList);
    files.forEach(file => {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSections(prev => prev.map(s => {
          if (s.id === id) {
            if (isSub) {
              const newSubs = s.subSections?.map(sub => sub.id === subId ? { ...sub, images: [...sub.images, reader.result as string] } : sub);
              return { ...s, subSections: newSubs };
            }
            return { ...s, images: [...s.images, reader.result as string] };
          }
          return s;
        }));
      };
      reader.readAsDataURL(file);
    });
  };

  const saveDoc = () => {
    if (!title || !erp) return alert("Título e ERP obrigatórios");
    const newDoc = { id: editingId || Math.random().toString(36).substr(2, 9), title, erp, version, sections };
    let newList;
    if (editingId) {
      newList = savedDocs.map(d => d.id === editingId ? newDoc : d);
    } else {
      newList = [...savedDocs, newDoc];
    }
    localStorage.setItem('docs', JSON.stringify(newList));
    setSavedDocs(newList);
    alert('Salvo com sucesso!');
    if (!editingId) window.location.reload();
  };

  return (
    <div className="max-w-5xl mx-auto p-6 bg-slate-50 min-h-screen pb-32 font-sans">
      {/* Lista de Documentações para Editar */}
      <div className="mb-10 p-4 bg-white rounded-xl border shadow-sm">
        <h3 className="font-bold mb-3 text-slate-500 uppercase text-xs">Editar Existentes:</h3>
        <div className="flex gap-2 flex-wrap">
          {savedDocs.map(d => (
            <button key={d.id} onClick={() => handleEdit(d)} className="px-3 py-1 bg-slate-100 hover:bg-blue-600 hover:text-white rounded-full text-xs transition-all">
              ✏️ {d.erp} - {d.title}
            </button>
          ))}
        </div>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-sm border mb-6 grid grid-cols-3 gap-4">
        <input placeholder="Título" value={title} className="p-2 border rounded" onChange={e => setTitle(e.target.value)} />
        <input placeholder="ERP" value={erp} className="p-2 border rounded" onChange={e => setErp(e.target.value)} />
        <input placeholder="Versão" value={version} className="p-2 border rounded" onChange={e => setVersion(e.target.value)} />
      </div>

      <div className="bg-blue-50 p-4 rounded-lg mb-8 text-xs text-blue-700">
        💡 <b>Dicas de Formatação:</b> Use <b>**texto**</b> para negrito e comece a linha com <b>-</b> para criar listas (bullets).
      </div>

      {sections.map((sec) => (
        <div key={sec.id} className="bg-white p-8 rounded-xl shadow-sm border mb-10 border-l-4 border-l-blue-600">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-slate-800">{sec.title}</h2>
            <button onClick={() => addSubSection(sec.id)} className="text-xs bg-slate-800 text-white px-3 py-1 rounded">+ Add Sub-tópico</button>
          </div>

          <textarea value={sec.content} placeholder="Texto principal..." className="w-full p-3 border rounded h-32 mb-4 bg-slate-50 text-sm" onChange={e => updateSection(sec.id, 'content', e.target.value)} />

          {/* Notas e Prints da Sessão Principal */}
          <div className="grid grid-cols-2 gap-4 mb-4">
             <div className="p-3 border rounded bg-slate-50">
                <select value={sec.noteType} className="w-full mb-2 p-1 border text-xs" onChange={e => updateSection(sec.id, 'noteType', e.target.value)}>
                   <option value="info">ℹ️ Info</option><option value="warning">⚠️ Aviso</option><option value="success">✅ Sucesso</option>
                </select>
                <input value={sec.noteContent} placeholder="Texto da nota..." className="w-full p-1 border text-xs" onChange={e => updateSection(sec.id, 'noteContent', e.target.value)} />
             </div>
             <div className="p-3 border rounded bg-slate-50">
                <input type="file" multiple className="text-[10px]" onChange={e => handleImage(sec.id, e)} />
                <div className="flex gap-1 mt-2">{sec.images.map((img, i) => <img key={i} src={img} className="w-8 h-8 object-cover border" />)}</div>
             </div>
          </div>

          {/* Campos Simplificados */}
          {sec.title.toLowerCase().includes('campos') && (
            <div className="mb-6 p-4 bg-blue-50 rounded-lg border border-blue-100">
              <button onClick={() => addField(sec.id)} className="bg-blue-600 text-white px-3 py-1 rounded text-xs mb-4">+ Novo Campo ERP</button>
              {sec.fields?.map((f, i) => (
                <div key={i} className="grid grid-cols-12 gap-2 mb-2 bg-white p-2 rounded shadow-sm items-center">
                  <select className="col-span-4 p-1 border text-[10px]" value={f.category} onChange={e => {
                    const flds = [...sec.fields!]; flds[i].category = e.target.value; updateSection(sec.id, 'fields', flds);
                  }}>
                    {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                  <input value={f.erpField} placeholder="Nome do Campo" className="col-span-6 p-1 border text-[10px]" onChange={e => {
                    const flds = [...sec.fields!]; flds[i].erpField = e.target.value; updateSection(sec.id, 'fields', flds);
                  }} />
                  <div className="col-span-2 flex flex-col items-center">
                    <span className="text-[8px] font-bold">OBRIG?</span>
                    <input type="checkbox" checked={f.required} onChange={e => {
                      const flds = [...sec.fields!]; flds[i].required = e.target.checked; updateSection(sec.id, 'fields', flds);
                    }} />
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Renderização de Sub-tópicos */}
          {sec.subSections?.map(sub => (
            <div key={sub.id} className="ml-10 p-5 border-l-2 border-blue-200 mb-6 bg-slate-50 rounded shadow-inner">
               <input value={sub.title} className="w-full font-bold bg-transparent border-b mb-3 outline-none focus:border-blue-400" onChange={e => {
                 const newSubs = sec.subSections?.map(s => s.id === sub.id ? { ...s, title: e.target.value } : s);
                 updateSection(sec.id, 'subSections', newSubs);
               }} />
               <textarea value={sub.content} placeholder="Conteúdo do sub-tópico..." className="w-full p-2 text-xs border rounded h-24 mb-3" onChange={e => {
                 const newSubs = sec.subSections?.map(s => s.id === sub.id ? { ...s, content: e.target.value } : s);
                 updateSection(sec.id, 'subSections', newSubs);
               }} />
               <input type="file" multiple className="text-[10px]" onChange={e => handleImage(sec.id, e, true, sub.id)} />
            </div>
          ))}
        </div>
      ))}
      <button onClick={saveDoc} className="fixed bottom-10 right-10 bg-blue-700 text-white px-14 py-5 rounded-full font-black shadow-2xl hover:scale-110 transition-all z-50">
        {editingId ? '💾 ATUALIZAR ALTERAÇÕES' : '🚀 PUBLICAR DOCUMENTAÇÃO'}
      </button>
    </div>
  );
}
