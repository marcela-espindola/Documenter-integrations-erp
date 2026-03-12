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
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .split('\n')
      .map(line => line.trim().startsWith('-') 
        ? `<li class="ml-6 list-disc mb-1">${line.replace('-', '').trim()}</li>`
        : `<p class="mb-3">${line}</p>`
      ).join('');
  };

  if (!doc) return <div className="p-20 text-center font-bold text-slate-300 tracking-[10px] uppercase">Carregando Manual...</div>;

  return (
    <div className="bg-slate-50 min-h-screen pb-20 font-sans">
      <div className="fixed top-4 left-4 flex gap-2 print:hidden z-50">
        <Link to="/" className="bg-white border text-slate-900 px-4 py-2 rounded-full text-[10px] font-black shadow-sm hover:bg-slate-50 transition-all">← VOLTAR</Link>
        <button onClick={() => window.print()} className="bg-red-500 text-white px-4 py-2 rounded-full text-[10px] font-black shadow-sm">PDF 📄</button>
      </div>

      <div className="max-w-4xl mx-auto p-12 bg-white mt-10 shadow-xl rounded-3xl min-h-screen text-slate-700">
        <header className="border-b-4 border-blue-600 pb-10 mb-16">
          <h1 className="text-6xl font-black text-slate-900 tracking-tighter mb-2 leading-none">{doc.erp}</h1>
          <h2 className="text-xl font-bold text-blue-600 uppercase tracking-widest">{doc.title}</h2>
          <p className="text-slate-300 font-mono text-[10px] mt-2 italic">Versão {doc.version}</p>
        </header>

        {/* --- 1. INTRODUÇÃO (PADRÃO) --- */}
        <section className="mb-24">
          <h2 className="text-3xl font-black text-slate-800 mb-8 border-b-2 pb-2 uppercase italic tracking-tighter">1. Introdução</h2>
          <p className="text-lg text-slate-600 leading-relaxed mb-6">
            A Audaces, presente em mais de 70 países, é referência em inovação tecnológica para a indústria da moda. 
            Nossa parceria com a <strong>{doc.erp}</strong> trouxe uma integração poderosa entre o ERP e o software Audaces IDEA.
          </p>
          <div className="space-y-3 text-slate-500 text-lg italic pl-6 border-l-4 border-slate-100">
             <p>• Acelerar o desenvolvimento de produtos.</p>
             <p>• Reduzir erros de comunicação entre áreas.</p>
             <p>• Melhorar a precisão no controle de custos.</p>
          </div>
        </section>

        {/* --- 2. BENEFÍCIOS (PADRÃO) --- */}
        <section className="mb-24">
           <h2 className="text-3xl font-black text-slate-800 mb-8 border-b-2 pb-2 uppercase italic tracking-tighter">2. Benefícios</h2>
           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-8 border rounded-3xl bg-slate-50/50 shadow-sm">
                 <h3 className="font-black text-blue-600 uppercase mb-4 italic tracking-widest text-lg">Para sua Equipe</h3>
                 <p className="mb-4 text-slate-600">→ Economia de tempo em tarefas manuais.</p>
                 <p className="text-slate-600">→ Colaboração integrada entre design e produção.</p>
              </div>
              <div className="p-8 border rounded-3xl bg-slate-50/50 shadow-sm">
                 <h3 className="font-black text-blue-600 uppercase mb-4 italic tracking-widest text-lg">Para sua Empresa</h3>
                 <p className="mb-4 text-slate-600">→ Redução de custos com dados centralizados.</p>
                 <p className="text-slate-600">→ Escalabilidade para grandes volumes.</p>
              </div>
           </div>
        </section>

        {/* --- SEÇÕES DINÂMICAS --- */}
        {doc.sections.map((sec, idx) => {
          const sectionNumber = idx + 3;

          return (
            <div key={sec.id} className="mb-32 print:break-before-page">
              <h2 className="text-3xl font-black text-slate-800 mb-8 border-b-2 border-slate-50 pb-2 uppercase italic tracking-tighter">
                {sectionNumber}. {sec.title}
              </h2>

              {sec.description && (
                <div className="text-lg text-slate-400 italic mb-10 pl-6 border-l-2 border-slate-100" dangerouslySetInnerHTML={{ __html: formatText(sec.description) }} />
              )}

              {/* CONTATOS NA SEÇÃO 3 */}
              {sec.title === 'Iniciando a integração' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
                  <div className="p-8 border rounded-3xl bg-white shadow-sm border-t-4 border-t-slate-800">
                    <h3 className="text-lg font-black text-slate-900 mb-4 uppercase tracking-tighter">Suporte {doc.erp}</h3>
                    <div className="space-y-3 text-sm text-slate-500 font-medium italic">
                      {doc.erpEmail && <div className="flex items-center gap-2">✉️ {doc.erpEmail}</div>}
                      {doc.erpPhone && <div className="flex items-center gap-2">📞 {doc.erpPhone}</div>}
                      {doc.erpWhatsApp && <div className="flex items-center gap-2">💬 {doc.erpWhatsApp}</div>}
                    </div>
                  </div>
                  <div className="p-8 border rounded-3xl bg-white shadow-sm border-t-4 border-t-blue-600">
                    <h3 className="text-lg font-black text-slate-900 mb-4 uppercase tracking-tighter">Suporte Audaces</h3>
                    <div className="space-y-3 text-sm text-slate-500 font-medium italic">
                      <div className="flex items-center gap-2 font-bold text-blue-600">👤 {doc.audacesName}</div>
                      <div className="flex items-center gap-2">✉️ {doc.audacesEmail}</div>
                    </div>
                  </div>
                </div>
              )}

              {sec.noteContent?.trim() && (
                <div className={`p-6 rounded-2xl mb-12 border-l-[12px] shadow-sm ${
                  sec.noteType === 'warning' ? 'bg-amber-50 border-amber-400 text-amber-900' :
                  sec.noteType === 'success' ? 'bg-emerald-50 border-emerald-400 text-emerald-900' :
                  'bg-blue-50 border-blue-400 text-blue-900'
                }`}>
                  <p className="text-lg font-bold leading-tight italic">{sec.noteContent}</p>
                </div>
              )}

              {/* PASSOS INTERCALADOS COM PRINTS */}
              <div className="space-y-16">
                {sec.steps?.map((step, i) => (
                  <div key={step.id}>
                    <div className="flex gap-4 mb-6">
                      <span className="bg-slate-900 text-white w-7 h-7 rounded-full flex items-center justify-center text-xs font-black shrink-0 shadow-lg">{i + 1}</span>
                      <div className="text-lg text-slate-700 leading-relaxed font-medium" dangerouslySetInnerHTML={{ __html: formatText(step.text) }} />
                    </div>
                    {step.image && <img src={step.image} className="rounded-3xl border-4 border-slate-50 shadow-2xl max-w-full ml-10" alt="Passo" />}
                  </div>
                ))}
              </div>

              {/* TABELA ERP */}
              {sec.fields && sec.fields.length > 0 && (
                <div className="overflow-hidden border rounded-3xl mt-16 ml-10 shadow-sm border-slate-200">
                  <table className="w-full text-left text-xs font-medium">
                    <thead className="bg-slate-900 text-white">
                      <tr><th className="p-4 uppercase tracking-widest text-[10px]">Categoria</th><th className="p-4 uppercase tracking-widest text-[10px]">Campo ERP</th><th className="p-4 text-center uppercase tracking-widest text-[10px]">Obrigatório</th></tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {sec.fields.map((f, i) => (
                        <tr key={i} className="hover:bg-blue-50/50 transition-colors">
                          <td className="p-4 font-black text-blue-500 uppercase text-[10px]">{f.category}</td>
                          <td className="p-4 font-mono font-bold text-slate-800 text-sm">{f.erpField}</td>
                          <td className="p-4 text-center">{f.required ? <span className="bg-red-100 text-red-600 px-3 py-1 rounded-full text-[10px] font-black">SIM</span> : <span className="text-slate-300">NÃO</span>}</td>
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
