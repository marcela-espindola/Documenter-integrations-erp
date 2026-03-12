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

  if (!doc) return <div className="p-20 text-center font-bold text-slate-300 italic uppercase">Manual não encontrado</div>;

  return (
    <div className="bg-slate-50 min-h-screen pb-20 font-sans">
      {/* HEADER FIXO VOLTAR */}
      <div className="fixed top-4 left-4 flex gap-2 print:hidden z-50">
        <Link to="/" className="bg-white border text-slate-900 px-4 py-2 rounded-full text-[10px] font-black shadow-sm hover:bg-slate-50 transition-all">← VOLTAR</Link>
        <button onClick={() => window.print()} className="bg-red-500 text-white px-4 py-2 rounded-full text-[10px] font-black shadow-sm hover:bg-red-600 transition-all">PDF 📄</button>
      </div>

      <div className="max-w-4xl mx-auto p-12 bg-white mt-10 shadow-xl rounded-2xl min-h-screen text-slate-700">
        <header className="border-b-4 border-blue-600 pb-10 mb-16">
          <h1 className="text-6xl font-black text-slate-900 tracking-tighter mb-2 leading-none">{doc.erp}</h1>
          <h2 className="text-xl font-bold text-blue-600 uppercase tracking-widest">{doc.title}</h2>
          <p className="text-slate-300 font-mono text-[10px] mt-2">v.{doc.version}</p>
        </header>

        {/* --- INTRODUÇÃO E BENEFÍCIOS (FIXOS) --- */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold text-slate-800 mb-6 underline decoration-blue-200">1. Introdução</h2>
          <p className="text-lg text-slate-600 leading-relaxed mb-6">
            A Audaces, presente em mais de 70 países, é referência em inovação tecnológica para a indústria da moda. 
            Nossa parceria com a <strong>{doc.erp}</strong> trouxe uma integração poderosa entre o ERP e o software Audaces IDEA.
          </p>
        </section>

        {doc.sections.map((sec, idx) => {
          const sectionNumber = idx + 3;

          return (
            <div key={sec.id} className="mb-24 print:break-before-page pl-4">
              <h2 className="text-2xl font-black text-slate-800 mb-6 flex items-center gap-3 border-b-2 border-slate-50 pb-2 uppercase italic tracking-tighter">
                {sectionNumber}. {sec.title}
              </h2>

              {sec.description && (
                <div className="text-md text-slate-400 italic mb-8 pl-6 border-l-2 border-slate-100" dangerouslySetInnerHTML={{ __html: formatText(sec.description) }} />
              )}

              {/* SEÇÃO ESPECIAL: CONTATOS LADO A LADO NA SEÇÃO 3 */}
              {sec.title === 'Iniciando a integração' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
                  <div className="p-8 border rounded-2xl bg-white shadow-sm border-t-4 border-t-slate-800">
                    <h3 className="text-xl font-black text-slate-900 mb-4">Contato {doc.erp}</h3>
                    <div className="space-y-3 text-sm text-slate-500">
                      {doc.erpEmail && <div className="flex items-center gap-2 font-medium">✉️ {doc.erpEmail}</div>}
                      {doc.erpPhone && <div className="flex items-center gap-2 font-medium">📞 {doc.erpPhone}</div>}
                      {doc.erpWhatsApp && <div className="flex items-center gap-2 font-medium">💬 {doc.erpWhatsApp}</div>}
                    </div>
                  </div>
                  <div className="p-8 border rounded-2xl bg-white shadow-sm border-t-4 border-t-blue-600">
                    <h3 className="text-xl font-black text-slate-900 mb-4">Contato Audaces</h3>
                    <div className="space-y-3 text-sm text-slate-500">
                      <div className="flex items-center gap-2 font-medium italic">👤 {doc.audacesName || 'Marcela Espindola'}</div>
                      <div className="flex items-center gap-2 font-medium italic">✉️ {doc.audacesEmail || 'integrations@audaces.com'}</div>
                    </div>
                  </div>
                </div>
              )}

              {/* NOTA */}
              {sec.noteContent && (
                <div className={`p-4 rounded-xl mb-10 border-l-8 flex items-center gap-4 ${
                  sec.noteType === 'warning' ? 'bg-amber-50 border-amber-400 text-amber-900' :
                  sec.noteType === 'success' ? 'bg-emerald-50 border-emerald-400 text-emerald-900' :
                  'bg-blue-50 border-blue-400 text-blue-900'
                }`}>
                  <span className="font-bold text-sm italic">{sec.noteContent}</span>
                </div>
              )}

              {/* PASSOS */}
              <div className="space-y-12">
                {sec.steps?.map((step, i) => (
                  <div key={step.id}>
                    <div className="flex gap-4 mb-4">
                      <span className="bg-slate-900 text-white w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-black shrink-0">{i + 1}</span>
                      <div className="text-slate-700 text-base leading-relaxed" dangerouslySetInnerHTML={{ __html: formatText(step.text) }} />
                    </div>
                    {step.image && <img src={step.image} className="rounded-xl border border-slate-100 shadow-lg max-w-full ml-10" />}
                  </div>
                ))}
              </div>

              {/* TABELA ERP */}
              {sec.fields && sec.fields.length > 0 && (
                <div className="overflow-hidden border rounded-2xl mt-12 ml-10 shadow-sm border-slate-200">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-slate-900 text-white">
                      <tr><th className="p-4">Categoria</th><th className="p-4">Campo ERP</th><th className="p-4 text-center">Obrigatório</th></tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 font-medium">
                      {sec.fields.map((f, i) => (
                        <tr key={i}>
                          <td className="p-4 font-bold text-blue-600 uppercase text-[10px]">{f.category}</td>
                          <td className="p-4 font-mono font-bold text-slate-800 text-sm">{f.erpField}</td>
                          <td className="p-4 text-center">{f.required ? <span className="text-red-500 font-black">SIM</span> : <span className="text-slate-300">NÃO</span>}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
