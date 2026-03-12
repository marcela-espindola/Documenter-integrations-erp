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

  if (!doc) return <div className="p-20 text-center font-bold text-slate-300 uppercase tracking-widest">Carregando Manual...</div>;

  return (
    <div className="bg-slate-50 min-h-screen pb-20 font-sans">
      <div className="fixed top-4 left-4 flex gap-2 print:hidden z-50">
        <Link to="/" className="bg-white border text-slate-900 px-4 py-2 rounded-full text-[10px] font-black shadow-sm">← VOLTAR</Link>
        <button onClick={() => window.print()} className="bg-red-500 text-white px-4 py-2 rounded-full text-[10px] font-black shadow-sm">PDF 📄</button>
      </div>

      <div className="max-w-4xl mx-auto p-12 bg-white mt-10 shadow-xl rounded-2xl min-h-screen">
        <header className="border-b-4 border-blue-600 pb-10 mb-16">
          <h1 className="text-6xl font-black text-slate-900 tracking-tighter mb-2 leading-none">{doc.erp}</h1>
          <h2 className="text-xl font-bold text-blue-600 uppercase tracking-widest">{doc.title}</h2>
          <p className="text-slate-300 font-mono text-[10px] mt-2">v.{doc.version}</p>
        </header>

        {/* --- SEÇÃO FIXA 1: INTRODUÇÃO --- */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold text-slate-800 mb-6">1. Introdução</h2>
          <p className="text-lg text-slate-600 leading-relaxed mb-6">
            A Audaces, presente em mais de 70 países, é referência em inovação tecnológica para a indústria da moda. 
            Nossa parceria com a <strong>{doc.erp}</strong> trouxe uma integração poderosa entre o ERP e o software Audaces IDEA, 
            um sistema que combina desenho técnico e ficha técnica de forma integrada.
          </p>
          <p className="text-lg text-slate-600 mb-4">Com esta solução, sua empresa poderá:</p>
          <ul className="space-y-3 pl-6">
            {['Acelerar o desenvolvimento de produtos.', 'Reduzir erros de comunicação entre áreas.', 'Melhorar a precisão no controle de custos e processos.'].map((item, i) => (
              <li key={i} className="flex items-center gap-3 text-slate-600 text-lg">
                <span className="w-1.5 h-1.5 bg-slate-400 rounded-full"></span> {item}
              </li>
            ))}
          </ul>
        </section>

        {/* --- SEÇÃO FIXA 2: BENEFÍCIOS --- */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold text-slate-800 mb-8">2. Benefícios comerciais da integração</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-8 border rounded-2xl bg-slate-50/50 shadow-sm">
              <div className="flex items-center gap-3 mb-4 text-blue-600">
                 <span className="w-6 h-6 rounded-full border-2 border-blue-600 flex items-center justify-center text-xs font-bold">✓</span>
                 <h3 className="font-black text-xl text-slate-900">Para sua equipe</h3>
              </div>
              <ul className="space-y-4">
                <li className="flex gap-2 text-slate-600 leading-snug"><span className="text-blue-500 font-bold">→</span> Economia de tempo: Automatize tarefas manuais como criação e atualização de fichas técnicas.</li>
                <li className="flex gap-2 text-slate-600 leading-snug"><span className="text-blue-500 font-bold">→</span> Colaboração integrada: Sincronize informações entre design, produção e gestão.</li>
              </ul>
            </div>
            <div className="p-8 border rounded-2xl bg-slate-50/50 shadow-sm">
              <div className="flex items-center gap-3 mb-4 text-blue-600">
                 <span className="w-6 h-6 rounded-full border-2 border-blue-600 flex items-center justify-center text-xs font-bold">✓</span>
                 <h3 className="font-black text-xl text-slate-900">Para sua empresa</h3>
              </div>
              <ul className="space-y-4">
                <li className="flex gap-2 text-slate-600 leading-snug"><span className="text-blue-500 font-bold">→</span> Redução de custos: Minimize desperdícios com dados centralizados e precisos.</li>
                <li className="flex gap-2 text-slate-600 leading-snug"><span className="text-blue-500 font-bold">→</span> Escalabilidade: Prepare sua operação para atender volumes maiores com a mesma eficiência.</li>
                <li className="flex gap-2 text-slate-600 leading-snug"><span className="text-blue-500 font-bold">→</span> Decisões estratégicas: Acesse relatórios mais completos e otimize a alocação de recursos.</li>
              </ul>
            </div>
          </div>
        </section>

        {/* --- SEÇÕES DINÂMICAS DO ADMIN --- */}
        {doc.sections.map((sec, idx) => (
          <div key={sec.id} className="mb-20 print:break-before-page">
            <h2 className="text-3xl font-bold text-slate-800 mb-8 border-b-2 border-slate-50 pb-2">
               {idx + 3}. {sec.title}
            </h2>

            {sec.description && (
              <div className="text-md text-slate-400 italic mb-8 pl-6 border-l-2 border-slate-100" dangerouslySetInnerHTML={{ __html: formatText(sec.description) }} />
            )}

            {/* NOTA */}
            {sec.noteContent && (
              <div className={`p-5 rounded-xl mb-10 border-l-8 flex items-center gap-4 ${
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

            {/* TABELA DE CAMPOS INTEGRADOS */}
            {sec.fields && sec.fields.length > 0 && (
              <div className="overflow-hidden border rounded-2xl mt-12 ml-10 shadow-sm border-slate-200">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-900 text-white">
                    <tr>
                      <th className="p-4 uppercase tracking-widest text-[10px]">Categoria</th>
                      <th className="p-4 uppercase tracking-widest text-[10px]">Campo ERP</th>
                      <th className="p-4 text-center uppercase tracking-widest text-[10px]">Obrigatório</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {sec.fields.map((f, i) => (
                      <tr key={i}>
                        <td className="p-4 font-bold text-blue-600">{f.category}</td>
                        <td className="p-4 font-mono font-bold text-slate-800 text-sm">{f.erpField}</td>
                        <td className="p-4 text-center">
                          {f.required ? <span className="text-red-500 font-black">SIM</span> : <span className="text-slate-300">NÃO</span>}
                        </td>
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
