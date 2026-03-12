import { useState } from 'react';
import { Section, Documentation, IntegratedField } from '@/types/doc';

export default function Admin() {
  const [title, setTitle] = useState('');
  const [erp, setErp] = useState('');
  const [version, setVersion] = useState('2025.01');

  const defaultTitles = [
    'Introdução', 'Benefícios', 'Iniciando a integração', 'Funcionamento', 
    'Campos integrados', 'Configuração ERP', 'Configuração IDEA', 
    'Uso da integração', 'Criar produtos', 'Visualização no ERP'
  ];

  const [sections, setSections] = useState<Section[]>(
    defaultTitles.map(t => ({ id: crypto.randomUUID(), title: t, content: '', images: [], fields: [] }))
  );

  const updateSection = (id: string, field: keyof Section, value: any) => {
    setSections(sections.map(s => s.id === id ? { ...s, [field]: value } : s));
  };

  const addField = (sectionId: string) => {
    const section = sections.find(s => s.id === sectionId);
    const newFields = [...(section?.fields || []), { erpField: '', ideaField: '', description: '', type: 'Texto' }];
    updateSection(sectionId, 'fields', newFields);
  };

  const handleImageUpload = (id: string, e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      Array.from(files).forEach(file => {
        const reader = new FileReader();
        reader.onloadend = () => {
          const currentSection = sections.find(s => s.id === id);
          if (currentSection) {
            updateSection(id, 'images', [...currentSection.images, reader.result as string]);
          }
        };
        reader.readAsDataURL(file);
      });
    }
  };

  const saveDoc = () => {
    const newDoc = { id: crypto.randomUUID(), title, erp, version, sections };
    const saved = JSON.parse(localStorage.getItem('docs') || '[]');
    localStorage.setItem('docs', JSON.stringify([...saved, newDoc]));
    alert('Documentação publicada!');
  };

  return (
    <div className="max-w-5xl mx-auto p-6 bg-slate-50 min-h-screen pb-20">
      <div className="bg-white p-6 rounded-xl shadow-sm border mb-6 grid grid-cols-3 gap-4">
        <input placeholder="Título da Doc" className="p-2 border rounded" onChange={e => setTitle(e.target.value)} />
        <input placeholder="Nome do ERP" className="p-2 border rounded" onChange={e => setErp(e.target.value)} />
        <input placeholder="Versão" value={version} className="p-2 border rounded" onChange={e => setVersion(e.target.value)} />
      </div>

      {sections.map((sec) => (
        <div key={sec.id} className="bg-white p-8 rounded-xl shadow-sm border mb-10 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-1 h-full bg-blue-500"></div>
          <h2 className="text-xl font-bold mb-4 text-slate-800">{sec.title}</h2>
          
          <textarea 
            placeholder="Conteúdo formatado (use Enter para novos parágrafos)..." 
            className="w-full p-3 border rounded h-32 mb-4 bg-slate-50"
            onChange={e => updateSection(sec.id, 'content', e.target.value)}
          />

          {/* Editor de Notas */}
          <div className="mb-6 p-4 border rounded-lg bg-amber-50">
            <label className="text-xs font-bold uppercase text-amber-600 block mb-2">Adicionar Nota/Aviso:</label>
            <div className="flex gap-2 mb-2">
              <select className="text-xs p-1 border" onChange={e => updateSection(sec.id, 'noteType', e.target.value)}>
                <option value="info">ℹ️ Info (Azul)</option>
                <option value="warning">⚠️ Aviso (Amarelo)</option>
                <option value="success">✅ Sucesso (Verde)</option>
              </select>
            </div>
            <input 
              placeholder="Conteúdo da nota importante..." 
              className="w-full p-2 text-sm border rounded"
              onChange={e => updateSection(sec.id, 'noteContent', e.target.value)}
            />
          </div>

          {/* Tabela de Campos (Apenas se for a seção de campos) */}
          {sec.title.includes('Campos') && (
            <div className="mb-6">
              <button onClick={() => addField(sec.id)} className="text-xs bg-slate-800 text-white px-2 py-1 rounded mb-2">+ Add Campo na Tabela</button>
              {sec.fields?.map((f, i) => (
                <div key={i} className="grid grid-cols-4 gap-2 mb-2">
                  <input placeholder="Campo ERP" className="p-1 border text-xs" onChange={e => {
                    const flds = [...sec.fields!]; flds[i].erpField = e.target.value; updateSection(sec.id, 'fields', flds);
                  }} />
                  <input placeholder="Campo IDEA" className="p-1 border text-xs" onChange={e => {
                    const flds = [...sec.fields!]; flds[i].ideaField = e.target.value; updateSection(sec.id, 'fields', flds);
                  }} />
                  <input placeholder="Descrição" className="p-1 border text-xs" onChange={e => {
                    const flds = [...sec.fields!]; flds[i].description = e.target.value; updateSection(sec.id, 'fields', flds);
                  }} />
                  <select className="p-1 border text-xs" onChange={e => {
                    const flds = [...sec.fields!]; flds[i].type = e.target.value as any; updateSection(sec.id, 'fields', flds);
                  }}>
                    <option>Texto</option><option>Número</option><option>Data</option>
                  </select>
                </div>
              ))}
            </div>
          )}

          <input type="file" multiple onChange={e => handleImageUpload(sec.id, e)} className="text-xs mb-4" />
          <div className="flex gap-2 flex-wrap">
            {sec.images.map((img, i) => <img key={i} src={img} className="w-20 h-20 object-cover rounded border" />)}
          </div>
        </div>
      ))}

      <button onClick={saveDoc} className="fixed bottom-6 right-6 bg-green-600 text-white px-10 py-4 rounded-full font-bold shadow-2xl">
        PUBLICAR DOCUMENTAÇÃO
      </button>
    </div>
  );
}
