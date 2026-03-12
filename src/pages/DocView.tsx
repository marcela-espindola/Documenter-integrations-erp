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

  // Função simples para formatar Negrito e Bullets
  const formatText = (text: string) => {
    if (!text) return '';
    return text
      .split('\n')
      .map(line => {
        let formatted = line.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
        if (line.trim().startsWith('-')) {
          return `<li class="ml-4 list-disc">${formatted.replace('-', '').trim()}</li>`;
        }
        return `<p class="mb-2">${formatted}</p>`;
      })
      .join('');
  };

  if (!doc) return <div className="p-20 text-center font-bold text-slate-400 uppercase tracking-widest">Documentação não encontrada...</div>;

  return (
    <div className="bg-white min-h-screen pb-20">
      <div className="fixed top-4 left-4 flex gap-2 print:hidden z-50">
        <Link to="/" className="bg-slate-800 text-white px-4 py-2 rounded-lg text-xs font-bold shadow-lg">← VOLTAR</Link>
        <button onClick={() => window.print()} className="bg-red-600 text-white px-4 py-2 rounded-lg text-xs font-bold shadow-lg">GERAR PDF 📄</button>
      </div>

      <div className="max-w-4xl mx-auto p-12">
        <header className="border-b-8 border-blue-600 pb-10 mb-20">
          <h1 className="text-7xl font-black text-slate-900 leading-none mb-2">{doc.erp}</h1>
          <h2 className="text-3xl font-bold text-blue-600">{doc.title}</h2>
          <span className="text-slate-300 font-mono text-xs mt-4 block">Versão: {doc.version}</span>
        </header>

        {doc.sections.map((sec) => (
          <div key={sec.id} className="mb-24 print:break-before-page">
            <h2 className="text-3xl font-black text-slate-800 mb-8 flex items-center gap-4">
               <span className="w-3 h-10 bg-blue-600 rounded"></span> {sec.title}
            </h2>

            {sec.content && (
              <div 
                className="text-lg text-slate-600 mb-8 leading-relaxed pl-7"
                dangerouslySetInnerHTML={{ __html: formatText(sec.content) }}
              />
            )}

            {/* Notas e Imagens omitidas aqui para brevidade, mas devem seguir a mesma lógica do Admin */}
            {sec.images.map((img, i) => (
               <img key={i} src={img} className="rounded-2xl border-8 border-slate-50 shadow-2xl mb-10 max-w-full" alt="Manual" />
            ))}

            {sec.subSections?.map(sub => (
              <div key={sub.id} className="ml-10 mb-16 border-l-4 border-slate-100 pl-8">
                <h3 className="text-2xl font-bold text-slate-800 mb-4">{sub.title}</h3>
                <div 
                  className="text-slate-600 text-lg mb-6"
                  dangerouslySetInnerHTML={{ __html: formatText(sub.content) }}
                />
                {sub.images.map((img, i) => (
                  <img key={i} src={img} className="rounded-xl border shadow-lg mb-6 max-w-full" />
                ))}
              </div>
            ))}

            {/* Tabela de Campos Integrados Simplificada */}
            {sec.fields && sec.fields.length > 0 && (
              <div className="overflow-hidden border-2 border-slate-100 rounded-3xl shadow-xl mb-12">
                <table className="w-full text-sm">
                  <thead className="bg-slate-900 text-white">
                    <tr>
                      <th className="p-5 text-left uppercase text-[10px]">Categoria</th>
                      <th className="p-5 text-left uppercase text-[10px]">Nome do Campo</th>
                      <th className="p-5 text-center uppercase text-[10px]">Obrigatório?</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {sec.fields.map((f, i) => (
                      <tr key={i} className="hover:bg-blue-50 transition-colors">
                        <td className="p-5 font-black text-blue-500 uppercase text-[11px]">{f.category}</td>
                        <td className="p-5 font-mono font-bold text-slate-800 text-base">{f.erpField}</td>
                        <td className="p-5 text-center font-bold text-slate-400">
                          {f.required ? <span className="bg-red-100 text-red-600 px-3 py-1 rounded-full text-[10px]">SIM</span> : 'NÃO'}
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
