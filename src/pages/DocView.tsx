import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Documentation } from '@/types/doc';

export default function DocView() {
  const { id } = useParams();
  const [doc, setDoc] = useState<Documentation | null>(null);

  useEffect(() => {
    const savedDocs = JSON.parse(localStorage.getItem('docs') || '[]');
    const foundDoc = savedDocs.find((d: Documentation) => d.id === id);
    setDoc(foundDoc);
  }, [id]);

  if (!doc) return <div className="p-20 text-center">Documentação não encontrada.</div>;

  return (
    <div className="max-w-4xl mx-auto p-10 bg-white min-h-screen shadow-lg">
      <Link to="/" className="text-blue-600 mb-8 block">← Voltar para lista</Link>
      
      <header className="mb-12 border-b pb-8">
        <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded text-sm font-bold uppercase tracking-wider">
          {doc.erp}
        </span>
        <h1 className="text-4xl font-extrabold text-slate-900 mt-4">{doc.title}</h1>
      </header>

      {doc.sections.map(sec => (
        <section key={sec.id} className="mb-16">
          <h2 className="text-2xl font-bold text-slate-800 mb-4">{sec.title}</h2>
          <p className="text-slate-600 leading-relaxed whitespace-pre-wrap mb-6">
            {sec.content}
          </p>
          
          <div className="grid gap-6">
            {sec.images.map((img, i) => (
              <div key={i} className="space-y-2">
                <span className="text-xs text-slate-400 italic">Print {i + 1}</span>
                <img src={img} className="rounded-lg border shadow-sm max-w-full h-auto" alt={`Passo ${i+1}`} />
              </div>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
