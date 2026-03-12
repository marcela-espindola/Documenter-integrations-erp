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
        if (line.trim().startsWith('-')) return `<li class="ml-6 list-disc mb-1 text-slate-600 font-normal">${formatted.replace('-', '').trim()}</li>`;
        return `<p class="mb-3 text-slate-600 leading-relaxed font-normal">${formatted}</p>`;
      })
      .join('');
  };

  if (!doc) return <div className="p-20 text-center font-bold text-slate-300 italic uppercase">Carregando...</div>;

  return (
    <div className="bg-slate-50 min-h-screen pb-20 font-sans">
      <div className="fixed top-4 left-4 flex gap-2 print:hidden z-50">
        <Link to="/" className="bg-white border text-slate-800 px-4 py-2 rounded-full text-xs font-bold shadow-sm hover:bg-slate-50 transition-all">← VOLTAR</Link>
        <button onClick={() => window.print()} className="bg-red-500 text-white px-4 py-2 rounded-full text-xs font-bold shadow-sm hover:bg-red-600 transition-all">GERAR PDF 📄</button>
      </div>

      <div className="max-w-4xl mx-auto p-12 bg-white mt-10 shadow-2xl rounded-3xl min-h-screen">
        <header className="border-b-2 border-slate-100 pb-10 mb-16 text-center">
          <span className="text-blue-600 font-black tracking-[8px] text-xs uppercase mb-2 block">Audaces IDEA Integration System</span>
          <h1 className="text-6xl font-black text-slate-900 leading-none mb-4">{doc.erp}</h1>
          <h2 className="text-xl font-medium text-slate-400 italic">{doc.title}</h2>
        </header>

        {doc.sections.map((sec) => (
          <div key={sec.id} className="mb-24 print:break-before-page pl-4">
            <h2 className="text-2xl font-black text-slate-800 mb-6 flex items-center gap-3 border-b-4 border-blue-600 w-fit pr-8 pb-1 uppercase italic tracking-tighter">
              {sec.title}
            </h2>

            {sec.description && (
              <div 
                className="text-lg text-slate-400 mb-8 leading-relaxed italic border-l-2 border-slate-100 pl-6"
                dangerouslySetInnerHTML={{ __html: formatText(sec.description) }}
              />
            )}

            {/* NOTAS COLORIDAS RESTAURADAS */}
            {sec.noteContent && (
              <div className={`p-5 rounded-xl mb-10 border-l-8 flex gap-4 items-center ${
                sec.noteType === 'warning' ? 'bg-amber-50 border-amber-400 text-amber-900' :
                sec.noteType === 'success' ? 'bg-emerald-50 border-emerald-400 text-emerald-900' :
                'bg-blue-50 border-blue-400 text-blue-900'
              }`}>
                <span className="text-xl">{sec.noteType === 'warning' ? '⚠️' : sec.noteType === 'success' ? '✅' : 'ℹ️'}</span>
                <p className="text-sm font-bold italic">{sec.noteContent}</p>
              </div>
            )}

            {/* PASSOS INTERCALADOS */}
            <div className="space-y-12 mb-12">
              {sec.steps.map((step, i) => (
                <div key={step.id}>
                   <div className="flex gap-4 mb-4">
                      <span className="bg-slate-900 text-white w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-black shrink-0">{i + 1}</span>
                      <div className="text-slate-700 text-base" dangerouslySetInnerHTML={{ __html: formatText(step.text) }} />
                   </div>
                   {step.image && (
                     <div className="pl-10">
                        <img src={step.image} className="rounded-xl border border-slate-100 shadow-md max-w-full" alt="Passo" />
                     </div>
                   )}
                </div>
              ))}
            </div>

            {/* TABELA DE CAMPOS */}
            {sec.fields && sec.fields.length > 0 && (
              <div className="overflow-hidden border border-slate-200 rounded-xl shadow-sm mb-12 ml-10">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50 text-slate-400 uppercase font-black tracking-widest">
                    <tr>
                      <th className="p-3">Categoria</th>
                      <th className="p-3">Campo ERP</th>
                      <th className="p-3 text-center">Obrigatório</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {sec.fields.map((f, i) => (
                      <tr key={i}>
                        <td className="p-3 font-bold text-blue-600">{f.category}</td>
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
