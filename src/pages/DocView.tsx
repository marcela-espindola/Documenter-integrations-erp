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
    return text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>').replace(/\n/g, '<br/>');
  };

  if (!doc) return <div className="p-20 text-center text-slate-300 font-bold uppercase tracking-[10px]">Carregando Manual...</div>;

  return (
    <div className="bg-white min-h-screen pb-40">
      <div className="fixed top-4 left-4 flex gap-2 print:hidden z-50">
        <Link to="/" className="bg-slate-900 text-white px-4 py-2 rounded-full text-xs font-black shadow-lg">← VOLTAR</Link>
        <button onClick={() => window.print()} className="bg-red-600 text-white px-4 py-2 rounded-full text-xs font-black shadow-lg">PDF 📄</button>
      </div>

      <div className="max-w-4xl mx-auto p-12">
        <header className="border-b-[12px] border-blue-600 pb-12 mb-20">
          <h1 className="text-8xl font-black text-slate-900 tracking-tighter mb-4">{doc.erp}</h1>
          <h2 className="text-2xl font-bold text-blue-600 uppercase tracking-widest">{doc.title}</h2>
          <p className="text-slate-300 font-mono text-[10px] mt-4 tracking-tighter">SISTEMA DE DOCUMENTAÇÃO AUDACES IDEA // v.{doc.version}</p>
        </header>

        {doc.sections.map((sec) => (
          <div key={sec.id} className="mb-32 print:break-before-page">
            <h2 className="text-3xl font-black text-slate-800 mb-8 border-b-2 border-slate-100 pb-2 uppercase italic">
               <span className="text-blue-600 mr-2">/</span>{sec.title}
            </h2>

            {sec.description && (
              <div className="text-xl text-slate-400 italic mb-10 pl-6 border-l-2 border-slate-100" dangerouslySetInnerHTML={{ __html: formatText(sec.description) }} />
            )}

            {/* NOTA */}
            {sec.noteContent && (
              <div className={`p-6 rounded-2xl mb-12 border-l-[12px] ${
                sec.noteType === 'warning' ? 'bg-amber-50 border-amber-400 text-amber-900' :
                sec.noteType === 'success' ? 'bg-emerald-50 border-emerald-400 text-emerald-900' :
                'bg-blue-50 border-blue-400 text-blue-900'
              }`}>
                <p className="font-black text-xs uppercase tracking-widest mb-1 opacity-50">{sec.noteType}</p>
                <p className="text-lg font-bold leading-tight">{sec.noteContent}</p>
              </div>
            )}

            {/* PASSOS INTERCALADOS */}
            <div className="space-y-16 mb-16">
              {sec.steps.map((step, i) => (
                <div key={step.id} className="relative pl-12">
                  <div className="absolute left-0 top-0 text-slate-100 font-black text-6xl leading-none -z-10">{i + 1}</div>
                  <div className="text-lg text-slate-700 leading-relaxed mb-6" dangerouslySetInnerHTML={{ __html: formatText(step.text) }} />
                  {step.image && <img src={step.image} className="rounded-2xl border border-slate-100 shadow-2xl max-w-full" alt="Manual" />}
                </div>
              ))}
            </div>

            {/* TABELA */}
            {sec.fields && sec.fields.length > 0 && (
              <div className="overflow-hidden border-2 border-slate-900 rounded-3xl mt-12">
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
