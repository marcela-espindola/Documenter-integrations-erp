import { useState } from 'react';
import { Section, Documentation } from '@/types/doc';

export default function Admin() {
  const [title, setTitle] = useState('');
  const [erp, setErp] = useState('');

  // SESSÕES PADRÃO AUDACES IDEA
  const [sections, setSections] = useState<Section[]>([
    { id: crypto.randomUUID(), title: '1. Introdução e Visão Geral', content: '', images: [] },
    { id: crypto.randomUUID(), title: '2. Configurações no ERP', content: '', images: [] },
    { id: crypto.randomUUID(), title: '3. Configurações no Audaces IDEA', content: '', images: [] },
    { id: crypto.randomUUID(), title: '4. Mapeamento de Campos (De-Para)', content: '', images: [] },
    { id: crypto.randomUUID(), title: '5. Sincronização de Materiais', content: '', images: [] },
    { id: crypto.randomUUID(), title: '6. Exportação de Ficha Técnica', content: '', images: [] },
    { id: crypto.randomUUID(), title: '7. Troubleshooting (Erros Comuns)', content: '', images: [] }
  ]);

  const updateSection = (id: string, field: keyof Section, value: any) => {
    setSections(sections.map(s => s.id === id ? { ...s, [field]: value } : s));
  };

  // Lógica para adicionar múltiplos prints
  const handleImageUpload = (id: string, e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      Array.from(files).forEach(file => {
        const reader = new FileReader();
        reader.onloadend = () => {
          const currentSection = sections.find(s => s.id === id);
          if (currentSection) {
            const newImages = [...currentSection.images, reader.result as string];
            updateSection(id, 'images', newImages);
          }
        };
        reader.readAsDataURL(file);
      });
    }
  };

  const removeImage = (sectionId: string, imageIndex: number) => {
    const section = sections.find(s => s.id === sectionId);
    if (section) {
      const newImages = section.images.filter((_, i) => i !== imageIndex);
      updateSection(sectionId, 'images', newImages);
    }
  };

  const saveDoc = () => {
    if (!title || !erp) return alert("Preencha Título e ERP");
    const newDoc: Documentation = { id: crypto.randomUUID(), title, erp, sections };
    const savedDocs = JSON.parse(localStorage.getItem('docs') || '[]');
    localStorage.setItem('docs', JSON.stringify([...savedDocs, newDoc]));
    alert('Documentação Gerada! Vá para a Home para ver.');
  };

  return (
    <div className="max-w-4xl mx-auto p-10 bg-slate-50 min-h-screen">
      <div className="bg-white p-8 rounded-xl shadow-sm border mb-8">
        <h1 className="text-2xl font-bold mb-6 text-slate-800">Nova Documentação de Integração</h1>
        <div className="grid grid-cols-2 gap-4">
          <input placeholder="Título (Ex: Integração Millennium)" className="p-3 border rounded" onChange={e => setTitle(e.target.value)} />
          <input placeholder="ERP (Ex: Millennium)" className="p-3 border rounded" onChange={e => setErp(e.target.value)} />
        </div>
      </div>

      {sections.map((sec, idx) => (
        <div key={sec.id} className="bg-white p-6 rounded-xl shadow-sm border mb-6">
          <input 
            value={sec.title} 
            className="w-full text-lg font-bold mb-4 p-2 border-b focus:border-blue-500 outline-none"
            onChange={e => updateSection(sec.id, 'title', e.target.value)}
          />
          
          <textarea 
            placeholder="Descreva o passo a passo..." 
            className="w-full p-3 border rounded h-32 mb-4 text-slate-600"
            onChange={e => updateSection(sec.id, 'content', e.target.value)}
          />

          <div className="space-y-4">
            <label className="block text-sm font-semibold text-slate-700">Prints da Sessão (Passo a Passo):</label>
            <input type="file" multiple accept="image/*" onChange={e => handleImageUpload(sec.id, e)} className="text-sm" />
            
            <div className="flex flex-wrap gap-4 mt-4">
              {sec.images.map((img, i) => (
                <div key={i} className="relative group">
                  <img src={img} className="w-32 h-20 object-cover rounded border shadow-sm" />
                  <button 
                    onClick={() => removeImage(sec.id, i)}
                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 text-xs opacity-0 group-hover:opacity-100 transition-opacity"
                  >✕</button>
                </div>
              ))}
            </div>
          </div>
        </div>
      ))}

      <div className="sticky bottom-6 flex justify-center">
        <button onClick={saveDoc} className="bg-blue-600 text-white px-12 py-4 rounded-full font-bold shadow-xl hover:bg-blue-700 transition-all">
          PUBLICAR DOCUMENTAÇÃO
        </button>
      </div>
    </div>
  );
}
