import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Documentation } from '@/types/doc';

export default function DocView() {
  const { id } = useParams();
  const [doc, setDoc] = useState<Documentation | null>(null);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('docs') || '[]');
    const found = saved.find((d: any) => d.id === id);
    if (found) setDoc(found);
  }, [id]);

  if (!doc) return <div className="p-20 text-center">Carregando...</div>;

  return (
    <div className="bg-white min-h-screen p-12">
      <div className="max-w-4xl mx-auto">
        <Link to="/" className="print:hidden text-blue-600 mb-4 block">← Voltar</Link>
        <button onClick={() => window.print()} className="print:hidden bg-red-600 text-white px-4 py-2 rounded mb-8">PDF 📄</button>
        
        <h1 className="text-5xl font-black mb-10 border-b-8 border-blue-600 pb-4">{doc.erp} - {doc.title}</h1>

        {doc.sections.map((sec) => (
          <div key={sec.id} className="mb-16 print:break-before-page">
            <h2 className="text-2xl font-bold mb-4 text-blue-800 border-b pb-2">{sec.title}</h2>
            <div className="whitespace-pre-wrap text-slate-700 mb-6">{sec.content}</div>
            
            {sec.fields && sec.fields.length > 0 && (
              <table className="w-full border mb-8 text-sm">
                <thead className="bg-slate-800 text-white">
                  <tr>
                    <th className="p-2 text-left">Categoria</th>
                    <th className="p-2 text-left">Campo ERP</th>
                    <th className="p-2 text-left">Campo IDEA</th>
                    <th className="p-2 text-center">Obrig?</th>
                  </tr>
                </thead>
                <tbody>
                  {sec.fields.map((f, i) => (
                    <tr key={i} className="border-b">
                      <td className="p-2 text-slate-400">{f.category}</td>
                      <td className="p-2 font-mono font-bold">{f.erpField}</td>
                      <td className="p-2 font-mono">{f.ideaField}</td>
                      <td className="p-2 text-center">{f.required ? 'SIM' : 'NÃO'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}

            {sec.images.map((img, i) => (
              <img key={i} src={img} className="rounded shadow-lg mb-4 max-w-full" alt="Print" />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
