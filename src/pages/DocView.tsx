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

  if (!doc) return <div className="p-20 text-center">Carregando...</div>;

  return (
    <div className="bg-slate-50 min-h-screen pb-20 font-sans">
      <div className="max-w-4xl mx-auto p-12 bg-white mt-10 shadow-xl rounded-2xl min-h-screen text-slate-700">
        
        {/* ... HEADER, INTRODUÇÃO E BENEFÍCIOS (Mantenha o código anterior) ... */}

        {doc.sections.map((sec, idx) => {
          const sectionNumber = idx + 3;

          return (
            <div key={sec.id} className="mb-20 print:break-before-page">
              <h2 className="text-3xl font-bold text-slate-800 mb-8 border-b-2 border-slate-50 pb-2">
                {sectionNumber}. {sec.title}
              </h2>

              {/* SEÇÃO ESPECIAL: INICIANDO A INTEGRAÇÃO (CARDS LADO A LADO) */}
              {sec.title === 'Iniciando a integração' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
                  {/* CARD ERP */}
                  <div className="p-8 border rounded-2xl bg-white shadow-sm">
                    <h3 className="text-xl font-black text-slate-900 mb-4">Contato {doc.erp}</h3>
                    <p className="text-sm text-slate-500 mb-6 leading-relaxed">
                      Entre em contato com a {doc.erp} para realizar o orçamento da liberação do serviço de integração.
                    </p>
                    <div className="space-y-3 text-sm font-medium text-slate-600">
                      {doc.erpEmail && <div className="flex items-center gap-2">✉️ {doc.erpEmail}</div>}
                      {doc.erpPhone && <div className="flex items-center gap-2">📞 {doc.erpPhone}</div>}
                      {doc.erpWhatsApp && <div className="flex items-center gap-2">💬 {doc.erpWhatsApp}</div>}
                    </div>
                  </div>

                  {/* CARD AUDACES */}
                  <div className="p-8 border rounded-2xl bg-white shadow-sm">
                    <h3 className="text-xl font-black text-slate-900 mb-4">Contato Audaces</h3>
                    <p className="text-sm text-slate-500 mb-6 leading-relaxed">
                      Para sanar dúvidas sobre como funciona a integração por parte da Audaces:
                    </p>
                    <div className="space-y-3 text-sm font-medium text-slate-600">
                      <div className="flex items-center gap-2">👤 Marcela Espindola</div>
                      <div className="flex items-center gap-2">✉️ integrations@audaces.com</div>
                    </div>
                  </div>
                </div>
              )}

              {/* RESTO DO CONTEÚDO DA SEÇÃO (PASSOS E PRINTS) */}
              <div className="space-y-12">
                {sec.steps?.map((step, i) => (
                  <div key={step.id}>
                    <div className="flex gap-4 mb-4">
                      <span className="bg-slate-900 text-white w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-black shrink-0">{i + 1}</span>
                      <div className="text-base leading-relaxed">{step.text}</div>
                    </div>
                    {step.image && <img src={step.image} className="rounded-xl border shadow-lg max-w-full ml-10" />}
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
