import { useState } from 'react';
import { Section, Documentation } from '@/types/doc';

export default function Admin() {
  const [title, setTitle] = useState('');
  const [erp, setErp] = useState('');

  // Definindo as sessões padrão que já aparecerão ao carregar a página
  const [sections, setSections] = useState<Section[]>([
    { id: crypto.randomUUID(), title: 'Pré-requisitos', content: '' },
    { id: crypto.randomUUID(), title: 'Configuração no ERP', content: '' },
    { id: crypto.randomUUID(), title: 'Configuração no Audaces IDEA', content: '' },
    { id: crypto.randomUUID(), title: 'Processo de Sincronização', content: '' },
    { id: crypto.randomUUID(), title: 'Erros Comuns e Soluções', content: '' }
  ]);

  const addSection = () => {
    setSections([...sections, { id: crypto.randomUUID(), title: '', content: '' }]);
  };

  const updateSection = (id: string, field: keyof Section, value: string) => {
    setSections(sections.map(s => s.id === id ? { ...s, [field]: value } : s));
  };

  const handleImageUpload = (id: string, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        updateSection(id, 'image', reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const saveDoc = () => {
    if (!title || !erp) {
      alert("Por favor, preencha o Título e o nome do ERP.");
      return;
    }
    const newDoc: Documentation = { id: crypto.randomUUID(), title, erp, sections };
    const savedDocs = JSON.parse(localStorage.getItem('docs') || '[]');
    localStorage.setItem('docs', JSON.stringify([...savedDocs, newDoc]));
    alert('Documentação gerada com sucesso!');
  };

  return (
    <div className="max-w-3xl mx-auto p-10">
      <h1 className="doc-heading-1 text-center mb-8">Gerador de Documentação</h1>
      
      <div className="space-y-4 mb-10">
        <div>
          <label className="block text-sm font-medium mb-1">Título da Documentação</label>
          <input 
            placeholder="Ex: Guia de Integração" 
            className="w-full p-2 border rounded shadow-sm" 
            onChange={e => setTitle(e.target.value)} 
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Nome do ERP</label>
          <input 
            placeholder="Ex: Millennium" 
            className="w-full p-2 border rounded shadow-sm" 
            onChange={e => setErp(e.target.value)} 
          />
        </div>
      </div>

      <h2 className="text-xl font-semibold mb-4 border-b pb-2">Conteúdo</h2>

      {sections.map((sec, index) => (
        <div key={sec.id} className="p-6 border rounded-lg mb-8 bg-white shadow-sm border-l-4 border-l-blue-500">
          <div className="flex justify-between items-center mb-4">
            <span className="text-xs font-bold text-blue-600 uppercase">Sessão {index + 1}</span>
          </div>
          
          <input 
            value={sec.title}
            placeholder="Título da seção" 
            className="w-full p-2 border mb-3 rounded font-semibold bg-gray-50" 
            onChange={e => updateSection(sec.id, 'title', e.target.value)} 
          />
          
          <textarea 
            placeholder="Descreva o passo a passo ou informações desta seção..." 
            className="w-full p-2 border mb-4 rounded h-32 text-sm" 
            onChange={e => updateSection(sec.id, 'content', e.target.value)} 
          />
          
          <div className="bg-gray-50 p-3 rounded border border-dashed">
            <label className="block text-xs font-medium text-gray-500 mb-2 italic">Adicionar print/imagem para esta seção:</label>
            <input type="file" accept="image/*" className="text-sm" onChange={e => handleImageUpload(sec.id, e)} />
            {sec.image && <p className="text-xs text-green-600 mt-2">✓ Imagem carregada</p>}
          </div>
        </div>
      ))}

      <div className="flex gap-4 sticky bottom-10 bg-white/80 backdrop-blur p-4 rounded-xl border shadow-lg justify-center">
        <button 
          onClick={addSection} 
          className="bg-slate-700 hover:bg-slate-800 text-white px-6 py-2 rounded-lg font-medium transition-colors"
        >
          + Adicionar Sessão Extra
        </button>
        
        <button 
          onClick={saveDoc} 
          className="bg-green-600 hover:bg-green-700 text-white px-10 py-2 rounded-lg font-bold shadow-md transition-all hover:scale-105"
        >
          Gerar Documentação Final
        </button>
      </div>
    </div>
  );
}
