{/* Tabela de Campos (Apenas se for a seção de campos) */}
{sec.title.toLowerCase().includes('campos') && (
  <div className="mb-6 bg-slate-100 p-4 rounded-lg border border-slate-200">
    <div className="flex justify-between items-center mb-4">
      <h3 className="text-sm font-bold text-slate-700 uppercase">Mapeamento de Dados</h3>
      <button 
        onClick={() => addField(sec.id)} 
        className="text-xs bg-blue-600 text-white px-3 py-1.5 rounded hover:bg-blue-700 transition-colors shadow-sm"
      >
        + Adicionar Campo
      </button>
    </div>

    <div className="space-y-3">
      {sec.fields?.map((f, i) => (
        <div key={i} className="grid grid-cols-12 gap-2 bg-white p-3 rounded shadow-sm border border-slate-200 items-end">
          <div className="col-span-2">
            <label className="text-[10px] font-bold text-slate-400 block mb-1">CAMPO ERP</label>
            <input placeholder="Ex: COD_ITEM" className="w-full p-1.5 border rounded text-xs" value={f.erpField} onChange={e => {
              const flds = [...sec.fields!]; flds[i].erpField = e.target.value; updateSection(sec.id, 'fields', flds);
            }} />
          </div>
          <div className="col-span-2">
            <label className="text-[10px] font-bold text-slate-400 block mb-1">CAMPO IDEA</label>
            <input placeholder="Ex: Referência" className="w-full p-1.5 border rounded text-xs" value={f.ideaField} onChange={e => {
              const flds = [...sec.fields!]; flds[i].ideaField = e.target.value; updateSection(sec.id, 'fields', flds);
            }} />
          </div>
          <div className="col-span-2">
            <label className="text-[10px] font-bold text-slate-400 block mb-1">CATEGORIA</label>
            <input placeholder="Ex: Materiais" className="w-full p-1.5 border rounded text-xs" value={f.category} onChange={e => {
              const flds = [...sec.fields!]; flds[i].category = e.target.value; updateSection(sec.id, 'fields', flds);
            }} />
          </div>
          <div className="col-span-2">
            <label className="text-[10px] font-bold text-slate-400 block mb-1">TIPO</label>
            <select className="w-full p-1.5 border rounded text-xs" value={f.type} onChange={e => {
              const flds = [...sec.fields!]; flds[i].type = e.target.value as any; updateSection(sec.id, 'fields', flds);
            }}>
              <option>Texto</option><option>Número</option><option>Data</option><option>Lista</option>
            </select>
          </div>
          <div className="col-span-3">
            <label className="text-[10px] font-bold text-slate-400 block mb-1">DESCRIÇÃO</label>
            <input placeholder="Para que serve este campo?" className="w-full p-1.5 border rounded text-xs" value={f.description} onChange={e => {
              const flds = [...sec.fields!]; flds[i].description = e.target.value; updateSection(sec.id, 'fields', flds);
            }} />
          </div>
          <div className="col-span-1 flex flex-col items-center">
            <label className="text-[10px] font-bold text-slate-400 mb-2">OBRIG.</label>
            <input type="checkbox" checked={f.required} onChange={e => {
              const flds = [...sec.fields!]; flds[i].required = e.target.checked; updateSection(sec.id, 'fields', flds);
            }} />
          </div>
        </div>
      ))}
    </div>
  </div>
)}
