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

  if (!doc) return <div className="p-20 text-center text-slate-300 font-bold uppercase tracking-widest">Carregando Manual...</div>;

  return (
    <div className="bg-slate-50 min-h-screen pb-20">
      <div className="fixed top-4 left-4 flex gap-2 print:hidden z-50">
        <Link to="/" className="bg-white border text-slate-900 px-4 py-2 rounded-full text-[10px] font-black shadow-sm">← VOLTAR</Link>
        <button onClick={() => window.print()} className="bg-red-500 text-white px-4 py-2 rounded-full text-[10px] font-black shadow-sm">PDF 📄</button>
      </div>

      <div className="max-w-4xl mx-auto p-12 bg-white mt-10 shadow-xl rounded-2xl min-h-screen">
        <header className="border-b-4 border-blue-600 pb-10 mb-16">
          <h1 className="text-5xl font-black text-slate-900 tracking-tighter mb-2">{doc.erp}</h1>
          <h2 className="text-xl font-bold text-blue-600 uppercase tracking-widest">{doc.title}</h2>
          <p className="text-slate-300 font-mono text-[10px] mt-2">v.{doc.version}</p>
        </header>

        {doc.sections.map((sec) => (
          <div key={sec.id} className="mb-20 print:break-before-page">
            <h2 className="text-2xl font-black text-slate-800 mb-6 flex items-center gap-3 border-b-2 border-slate-50 pb-2">
               <span className="w-1.5 h-6 bg-blue-600 rounded"></span>{sec.title}
            </h2>

            {sec.description && (
              <div className="text-md text-slate-400 italic mb-8 pl-6 border-l-2 border-slate-100" dangerouslySetInnerHTML={{ __html: formatText(sec.description) }} />
            )}

            {sec.noteContent && (
              <div className={`p-4 rounded-xl mb-10 border-l-8 flex items-center gap-4 ${
                sec.noteType === 'warning' ? 'bg-amber-50 border-amber-400 text-amber-900' :
                sec.noteType === 'success' ? 'bg-emerald-50 border-emerald-400 text-emerald-900' :
                'bg-blue-50 border-blue-400 text-blue-900'
              }`}>
                <span className="font-bold text-sm italic">{sec.noteContent}</span>
              </div>
            )}

            <div className="space-y-12">
              {sec.steps?.map((step, i) => (
                <div key={step.id}>
                  <div className="flex gap-4 mb-4">
                    <span className="bg-slate-900 text-white w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-black shrink-0">{i + 1}</span>
                    <div className="text-slate-700 text-base leading-relaxed" dangerouslySetInnerHTML={{ __html: formatText(step.text) }} />
                  </div>
                  {step.image && <img src={step.image} className="rounded-xl border border-slate-100 shadow-lg max-w-full ml-10" alt="Passo" />}
                </div>
              ))}
            </div>

            {sec.fields && sec.fields.length > 0 && (
              <div className="overflow-hidden border rounded-xl mt-12 ml-10 shadow-sm">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50 text-slate-400 uppercase font-black tracking-widest">
                    <tr>
                      <th className="p-3">Categoria</th>
                      <th className="p-3">Campo ERP</th>
                      <th className="p-3 text-center">Obrigatório</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 font-medium">
                    {sec.fields.map((f, i) => (
                      <tr key={i}>
                        <td className="p-3 text-blue-600">{f.category}</td>
                        <td className="p-3 font-mono font-bold text-slate-800">{f.erpField}</td>
                        <td className="p-3 text-center">{f.required ? <span className="text-red-500 font-black">SIM</span> : 'NÃO'}</td>
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
