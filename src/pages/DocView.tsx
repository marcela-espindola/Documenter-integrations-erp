import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Documentation } from '@/types/doc';

export default function DocView() {
  const { id } = useParams();
  const [doc, setDoc] = useState<Documentation | null>(null);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('docs') || '[]');
    setDoc(saved.find((d: any) => d.id === id));
  }, [id]);

  const formatText = (text: string) => {
    if (!text) return '';
    return text
      .split('\n')
      .map(line => {
        let formatted = line.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
        if (line.trim().startsWith('-')) return `<li class="ml-5 list-disc mb-1">${formatted.replace('-', '').trim()}</li>`;
        return `<p class="mb-3">${formatted}</p>`;
      })
      .join('');
  };

  if (!doc) return <div className="p-20 text-center font-black text-slate-300 italic text-4xl uppercase">Manual não encontrado</div>;

  return (
    <div className="bg-white min-h-screen font-sans">
      <div className="max-w-4xl mx-auto p-12">
        <header className="border-b-[16px] border-blue-600 pb-10 mb-20">
          <h1 className="text-8xl font-black text-slate-900 tracking-tighter leading-none mb-4">{doc.erp}</h1>
          <h2 className="text-3xl font-light text-slate-500 uppercase tracking-[10px]">{doc.title}</h2>
        </header>

        {doc.sections.map((sec) => (
          <div key={sec.id} className="mb-32 print:break-before-page">
            <h2 className="text-4xl font-black text-slate-900 mb-10 flex items-baseline gap-4 border-b-2 border-slate-100 pb-4">
               <span className="text-blue-600 text-2xl font-mono">/</span> {sec.title}
            </h2>

            {sec.description && (
              <div 
                className="text-xl text-slate-500 mb-10 italic leading-relaxed border-l-4 border-slate-200 pl-6"
                dangerouslySetInnerHTML={{ __html: formatText(sec.description) }}
              />
            )}

            {/* PASSOS INTERCALADOS */}
            <div className="space-y-12 mb-16">
              {sec.steps.map((step, i) => (
                <div key={step.id} className="group">
                  <div className="flex gap-6">
                    <span className="text-slate-200 font-black text-6xl leading-none group-hover:text-blue-100 transition-colors">{String(i + 1).padStart(2, '0')}</span>
                    <div className="flex-1 pt-2">
                       <div className="text-lg text-slate-700 leading-relaxed" dangerouslySetInnerHTML={{ __html: formatText(step.text) }} />
                       {step.image && (
                         <div className="mt-6 relative">
                           <div className="absolute inset-0 bg-blue-600 rounded-2xl rotate-1 opacity-5 -z-10"></div>
                           <img src={step.image} className="rounded-2xl shadow-2xl border-4 border-white max-w-full" alt="Passo" />
                         </div>
                       )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* TABELA DE CAMPOS */}
            {sec.fields && sec.fields.length > 0 && (
              <div className="mt-10 overflow-hidden border-2 border-slate-900 rounded-3xl">
                <table className="w-full text-left">
                  <thead className="bg-slate-900 text-white">
                    <tr>
                      <th className="p-4 uppercase text-[10px] font-black tracking-widest">Categoria</th>
                      <th className="p-4 uppercase text-[10px] font-black tracking-widest">Campo ERP</th>
                      <th className="p-4 uppercase text-[10px] font-black tracking-widest text-center">Obrigatório</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {sec.fields.map((f, i) => (
                      <tr key={i}>
                        <td className="p-4 font-bold text-blue-600 text-xs uppercase">{f.category}</td>
                        <td className="p-4 font-mono font-bold text-slate-800 text-lg">{f.erpField}</td>
                        <td className="p-4 text-center">{f.required ? <span className="bg-red-600 text-white px-3 py-1 rounded-full text-[10px] font-black">SIM</span> : <span className="text-slate-300 font-bold text-[10px]">NÃO</span>}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
