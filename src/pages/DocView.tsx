import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Documentation } from '@/types/doc';

export default function DocView() {
  const { id } = useParams();
  const [doc, setDoc] = useState<Documentation | null>(null);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('docs') || '[]');
    const found = saved.find((d: any) => d.id === id);
    if (found) setDoc(found);
  }, [id]);

  if (!doc) return <div className="p-20 text-center font-bold">Documentação não encontrada...</div>;

  return (
    <div className="bg-white min-h-screen">
      <div className="max-w-4xl mx-auto p-12">
        <header className="border-b-8 border-blue-600 pb-8 mb-16">
          <h1 className="text-6xl font-black text-slate-900 leading-none">{doc.erp}</h1>
          <p className="text-blue-600 text-2xl font-bold mt-2">{doc.title}</p>
        </header>

        {doc.sections.map((sec) => (
          <div key={sec.id} className="mb-20 print:break-before-page">
            <h2 className="text-3xl font-black text-slate-800 mb-6 flex items-center gap-3">
               <span className="text-blue-600">#</span> {sec.title}
            </h2>
            <div className="text-lg text-slate-700 whitespace-pre-wrap mb-8">{sec.content}</div>

            {/* Renderização de Sub-tópicos */}
            {sec.subSections?.map(sub => (
              <div key={sub.id} className="ml-10 mb-10 border-l-4 border-slate-100 pl-6">
                <h3 className="text-xl font-bold text-slate-800 mb-3 underline decoration-blue-200">{sub.title}</h3>
                <div className="text-slate-600 whitespace-pre-wrap">{sub.content}</div>
              </div>
            ))}

            {/* Tabela de Campos Integrados */}
            {sec.fields && sec.fields.length > 0 && (
              <div className="overflow-hidden border rounded-xl shadow-lg mb-10">
                <table className="w-full text-sm">
                  <thead className="bg-slate-900 text-white">
                    <tr>
                      <th className="p-3 text-left">Categoria</th>
                      <th className="p-3 text-left">ERP</th>
                      <th className="p-3 text-left">IDEA</th>
                      <th className="p-3 text-center">Obrig?</th>
                      <th className="p-3 text-left">Descrição</th>
                    </tr>
                  </thead>
                  <tbody>
                    {sec.fields.map((f, i) => (
                      <tr key={i} className="border-b hover:bg-blue-50">
                        <td className="p-3 font-bold text-blue-500 uppercase text-[10px]">{f.category}</td>
                        <td className="p-3 font-mono font-bold text-slate-700">{f.erpField}</td>
                        <td className="p-3 font-mono text-slate-500">{f.ideaField}</td>
                        <td className="p-3 text-center">{f.required ? <span className="text-red-600 font-black">SIM</span> : 'NÃO'}</td>
                        <td className="p-3 text-slate-400 italic text-xs">{f.description}</td>
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
