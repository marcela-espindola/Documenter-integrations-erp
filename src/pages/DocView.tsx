{/* Tabela de Campos */}
{sec.fields && sec.fields.length > 0 && (
  <div className="overflow-hidden border-2 border-slate-100 rounded-xl mb-10 shadow-sm">
    <table className="w-full text-sm">
      <thead className="bg-slate-800 text-white">
        <tr>
          <th className="p-4 text-left font-semibold">Categoria</th>
          <th className="p-4 text-left font-semibold">Campo ERP</th>
          <th className="p-4 text-left font-semibold">Campo IDEA</th>
          <th className="p-4 text-left font-semibold text-center">Tipo</th>
          <th className="p-4 text-left font-semibold text-center">Obrigatório?</th>
          <th className="p-4 text-left font-semibold">Descrição</th>
        </tr>
      </thead>
      <tbody className="divide-y divide-slate-100">
        {sec.fields.map((f, i) => (
          <tr key={i} className="hover:bg-blue-50/50 transition-colors">
            <td className="p-4"><span className="text-[10px] font-bold uppercase text-slate-400 bg-slate-100 px-2 py-1 rounded">{f.category}</span></td>
            <td className="p-4 font-mono text-blue-700 font-bold">{f.erpField}</td>
            <td className="p-4 font-mono text-slate-600">{f.ideaField}</td>
            <td className="p-4 text-center text-xs text-slate-500">{f.type}</td>
            <td className="p-4 text-center">
              {f.required ? (
                <span className="bg-red-100 text-red-600 px-2 py-1 rounded-full text-[10px] font-black uppercase">SIM</span>
              ) : (
                <span className="bg-slate-100 text-slate-400 px-2 py-1 rounded-full text-[10px] font-medium uppercase">NÃO</span>
              )}
            </td>
            <td className="p-4 text-slate-500 text-xs italic">{f.description}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
)}
