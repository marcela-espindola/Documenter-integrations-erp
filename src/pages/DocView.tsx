import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Documentation } from '@/types/doc';

export default function DocView() {
  const { id } = useParams();
  const [doc, setDoc] = useState<Documentation | null>(null);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('docs') || '[]');
    setDoc(saved.find((d: any) => d.id === id));
  }, [id]);

  if (!doc) return <p>Carregando...</p>;

  const handlePrint = () => window.print();

  return (
    <div className="bg-white min-h-screen">
      {/* Botão flutuante que some no PDF */}
      <button 
        onClick={handlePrint}
        className="fixed bottom-10 right-10 bg-red-600 text-white p-4 rounded-full shadow-xl print:hidden z-50 font-bold"
      >
        PDF 📄
      </button>

      <div className="max-w-4xl mx-auto p-12 space-y-12">
        <header className="border-b-4 border-blue-600 pb-6 mb-12">
          <div className="flex justify-between items-center text-slate-400 text-sm mb-4">
            <span>Audaces IDEA :: Integração ERP</span>
            <span>Versão: {doc.version}</span>
          </div>
          <h1 className="text-5xl font-black text-slate-900 uppercase tracking-tighter">
            {doc.erp} - {doc.title}
          </h1>
        </header>

        {doc.sections.map((sec) => (
          <section key={sec.id} className="doc-section print:break-before-page">
            <h2 className="text-2xl font-bold text-blue-700 mb-6 flex items-center gap-2 border-b pb-2">
              <span className="w-2 h-6 bg-blue-600 rounded"></span>
              {sec.title}
            </h2>

            <div className="doc-paragraph mb-6 whitespace-pre-wrap text-slate-700 leading-relaxed">
              {sec.content}
            </div>

            {/* Renderização de Nota Especial */}
            {sec.noteContent && (
              <div className={`p-4 rounded-lg mb-6 border-l-8 ${
                sec.noteType === 'warning' ? 'bg-amber-50 border-amber-400 text-amber-900' :
                sec.noteType === 'success' ? 'bg-emerald-50 border-emerald-400 text-emerald-900' :
                'bg-blue-50 border-blue-400 text-blue-900'
              }`}>
                <p className="font-bold mb-1">{sec.noteType?.toUpperCase()}</p>
                <p className="text-sm">{sec.noteContent}</p>
              </div>
            )}

            {/* Tabela de Campos */}
            {sec.fields && sec.fields.length > 0 && (
              <div className="overflow-hidden border rounded-lg mb-6">
                <table className="w-full text-sm">
                  <thead className="bg-slate-100 border-b">
                    <tr>
                      <th className="p-3 text-left">Campo ERP</th>
                      <th className="p-3 text-left">Campo IDEA</th>
                      <th className="p-3 text-left">Tipo</th>
                      <th className="p-3 text-left">Descrição</th>
                    </tr>
                  </thead>
                  <tbody>
                    {sec.fields.map((f, i) => (
                      <tr key={i} className="border-b hover:bg-slate-50 transition-colors">
                        <td className="p-3 font-mono text-blue-600">{f.erpField}</td>
                        <td className="p-3 font-mono text-emerald-600">{f.ideaField}</td>
                        <td className="p-3"><span className="bg-slate-200 px-2 py-0.5 rounded text-[10px]">{f.type}</span></td>
                        <td className="p-3 text-slate-500 italic">{f.description}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {/* Galeria de Prints Passo a Passo */}
            <div className="grid gap-8 mt-8">
              {sec.images.map((img, i) => (
                <div key={i} className="space-y-2 group">
                  <p className="text-[10px] font-bold text-slate-300 uppercase tracking-widest group-hover:text-blue-500 transition-colors">
                    PRINT #{i + 1}
                  </p>
                  <img src={img} className="rounded-xl border shadow-lg max-w-full hover:scale-[1.01] transition-transform" />
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
