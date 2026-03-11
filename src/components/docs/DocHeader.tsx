import { BookOpen } from "lucide-react";

export const DocHeader = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 h-[var(--doc-header-height)] bg-card/80 backdrop-blur-xl border-b border-border">
      <div className="h-full flex items-center px-6 gap-3">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
            <BookOpen size={18} className="text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-base font-bold text-foreground leading-tight">Audaces IDEA</h1>
            <p className="text-xs text-muted-foreground leading-tight">Documentação de Integrações ERP</p>
          </div>
        </div>
      </div>
    </header>
  );
};
