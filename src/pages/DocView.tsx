import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Documentation } from '@/types/doc';

export default function DocView() {
  const { id } = useParams();
  const [doc, setDoc] = useState<Documentation | null>(null);

  useEffect(() => {
    const savedDocs = JSON.parse(localStorage.getItem('docs') || '[]');
    const foundDoc = savedDocs.find((d: Documentation) => d.id === id);
    setDoc(foundDoc);
  }, [id]);

  if (!doc) return <p>Documentação não encontrada</p>;

  return (
    <div className="max-w-4xl mx-auto p-10">
      <h1 className="doc-heading-1">{doc.title}</h1>
      <span className="doc-erp-badge mb-6 block w-fit">{doc.erp}</span>

      {doc.sections.map(sec => (
        <div key={sec.id} className="doc-section">
          <h2 className="doc-heading-2">{sec.title}</h2>
          <p className="doc-paragraph">{sec.content}</p>
          {sec.image && <img src={sec.image} className="rounded-lg shadow-md mb-6 max-w-full" />}
        </div>
      ))}
    </div>
  );
}
