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

  if (!doc) return <div className="p-20 text-center text-slate-300 font-bold uppercase tracking-[10px]">Carregando...</div>;

  return (
    <div className="bg-slate-50 min-h-screen pb-40 font-sans">
      <div className="fixed top-4 left-4 flex gap-2 print:hidden z-50">
        <Link to="/" className="bg-slate-900 text-white px-4 py-2 rounded-full text-xs font-black shadow-lg">← VOLTAR</Link>
        <button onClick={() => window.print()} className="bg-red-600 text-white px-4 py-2 rounded-full text-xs font-black shadow-lg">PDF 📄</button>
      </div>

      <div className="max-w-4xl mx-auto p-12 bg-white mt-10 shadow-xl rounded-2xl min-h-screen text-slate-700">
        <header className="border-b-[12px] border-blue-600 pb-12 mb-20">
          <h1 className="text-8xl font-black text-slate-900 tracking-tighter mb-4 leading-none">{doc.erp}</h1>
          <h2 className="text-2xl font-bold text-blue-600 uppercase tracking-widest">{doc.title}</h2>
          <p className="text-slate-300 font-mono text-[10px] mt-4">v.{doc.version}</p>
        </header>

        {/* --- 1. INTRODUÇÃO (FIXA) --- */}
        <section className="mb-24">
          <h2 className="text-3xl font-black text-slate-800 mb-8 border-b-2 pb-2 uppercase">1. Introdução</h2>
          <p className="text-lg text-slate-600 leading-relaxed mb-6">
            A Audaces, presente em mais de 70 países, é referência em inovação tecnológica para a indústria da moda. 
            Nossa parceria com a <strong>{doc.erp}</strong> trouxe uma integração poderosa entre o ERP e o software Audaces IDEA.
          </p>
          <ul className="space-y-2 pl-6">
            {['Acelerar o desenvolvimento.', 'Reduzir erros.', 'Melhorar a precisão.'].map((item, i) => (
              <li key={i} className="list-disc text-slate-500 font-medium">{item}</li>
            ))}
          </ul>
        </section>

        {/* --- 2. BENEFÍCIOS (FIXOS) --- */}
        <section className="mb-24">
           <h2 className="text-3xl font-black text-slate-800 mb-8 border-b-2 pb-2 uppercase">2. Benefícios</h2>
           <div className="grid grid-cols-2 gap-6 text-sm">
              <div className="p-6 border rounded-xl bg-slate-50">
                 <h3 className="font-black text-blue-600 uppercase mb-4 italic tracking-widest">Para a Equipe</h3>
                 <p className="mb-2">→ Economia de tempo em tarefas manuais.</p>
                 <p>→ Colaboração integrada entre design e produção.</p>
              </div>
              <div className="p-6 border rounded-xl bg-slate-50">
                 <h3 className="font-black text-blue-600 uppercase mb-4 italic tracking-widest">Para a Empresa</h3>
                 <p className="mb-2">→ Redução de custos com dados precisos.</p>
                 <p>→ Escalabilidade para grandes volumes.</p>
              </div>
           </div>
        </section>

        {/* --- SEÇÕES DINÂMICAS DO ADMIN --- */}
        {doc.sections.map((sec, idx) => {
          const sectionNumber = idx + 3;

          return (
            <div key={sec.id} className="mb-32 print:break-before-page">
              <h2 className="text-3xl font-black text-slate-800 mb-8 border-b-2 border-slate-50 pb-2 uppercase italic">
                {sectionNumber}. {sec.title}
              </h2>

              {sec.description && (
                <div className="text-xl text-slate-400 italic mb-10 pl-6 border-l-4 border-slate-100" dangerouslySetInnerHTML={{ __html: formatText(sec.description) }} />
              )}

              {/* CONTATOS LADO A LADO NA SEÇÃO 3 */}
              {sec.title === 'Iniciando a integração' && (
                <div className="grid grid-cols-2 gap-6 mb-12">
                  <div className="p-8 border rounded-2xl bg-white shadow-sm border-t-4 border-t-slate-800">
                    <h3 className="text-xl font-black text-slate-900 mb-4">Contato {doc.erp}</h3>
                    <div className="space-y-2 text-sm text-slate-500 font-medium">
                      {doc.erpEmail && <div>✉️ {doc.erpEmail}</div>}
                      {doc.erpPhone && <div>📞 {doc.erpPhone}</div>}
                      {doc.erpWhatsApp && <div>💬 {doc.erpWhatsApp}</div>}
                    </div>
                  </div>
                  <div className="p-8 border rounded-2xl bg-white shadow-sm border-t-4 border-t-blue-600">
                    <h3 className="text-xl font-black text-slate-900 mb-4">Contato Audaces</h3>
                    <div className="space-y-2 text-sm text-slate-500 font-medium italic">
                      <div>👤 {doc.audacesName}</div>
                      <div>✉️ {doc.audacesEmail}</div>
                    </div>
                  </div>
                </div>
              )}

              {/* NOTA */}
              {sec.noteContent?.trim() && (
                <div className={`p-6 rounded-2xl mb-12 border-l-[12px] ${
                  sec.noteType === 'warning' ? 'bg-amber-50 border-amber-400 text-amber-900' :
                  sec.noteType === 'success' ? 'bg-emerald-50 border-emerald-400 text-emerald-900' :
                  'bg-blue-50 border-blue-400 text-blue-900'
                }`}>
                  <p className="text-lg font-bold leading-tight italic">{sec.noteContent}</p>
                </div>
              )}

              {/* PASSOS INTERCALADOS */}
              <div className="space-y-16">
                {sec.steps?.map((step, i) => (
                  <div key={step.id} className="relative pl-12">
                    <div className="absolute left-0 top-0 text-slate-100 font-black text-6xl leading-none -z-10">{i + 1}</div>
                    <div className="text-lg text-slate-700 leading-relaxed mb-6" dangerouslySetInnerHTML={{ __html: formatText(step.text) }} />
                    {step.image && <img src={step.image} className="rounded-2xl border border-slate-100 shadow-2xl max-w-full" alt="Manual" />}
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
