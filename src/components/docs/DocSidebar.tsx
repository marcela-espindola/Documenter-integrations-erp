import { ERPIntegration } from "@/data/erpIntegrations";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  BookOpen, Settings, Plug, PlayCircle, FileText, Eye,
  ChevronDown, ChevronRight, Server
} from "lucide-react";
import { useState } from "react";

interface DocSidebarProps {
  integrations: ERPIntegration[];
  selectedErp: ERPIntegration;
  activeSection: string;
  onSelectErp: (erp: ERPIntegration) => void;
  onSelectSection: (section: string) => void;
}

const sections = [
  { id: "introduction", label: "Introdução", icon: BookOpen },
  { id: "benefits", label: "Benefícios", icon: BookOpen },
  { id: "getting-started", label: "Iniciando a integração", icon: Plug },
  { id: "how-it-works", label: "Funcionamento", icon: Settings },
  { id: "fields", label: "Campos integrados", icon: FileText },
  { id: "erp-config", label: "Configuração ERP", icon: Server },
  { id: "idea-config", label: "Configuração IDEA", icon: Settings },
  { id: "usage", label: "Uso da integração", icon: PlayCircle },
  { id: "create-products", label: "Criar produtos", icon: FileText },
  { id: "visualization", label: "Visualização no ERP", icon: Eye },
];

export const DocSidebar = ({
  integrations,
  selectedErp,
  activeSection,
  onSelectErp,
  onSelectSection,
}: DocSidebarProps) => {
  const [expandedErp, setExpandedErp] = useState<string>(selectedErp.id);

  const handleErpClick = (erp: ERPIntegration) => {
    if (expandedErp === erp.id) {
      return;
    }
    setExpandedErp(erp.id);
    onSelectErp(erp);
  };

  return (
    <div className="h-full bg-card border-r border-border flex flex-col">
      <ScrollArea className="flex-1">
        <div className="py-4">
          <div className="doc-nav-section-title">Integrações ERP</div>
          
          {integrations.map((erp) => {
            const isExpanded = expandedErp === erp.id;
            const isSelected = selectedErp.id === erp.id;

            return (
              <div key={erp.id}>
                <button
                  onClick={() => handleErpClick(erp)}
                  className={`w-full doc-nav-item justify-between ${isSelected ? 'active' : ''}`}
                >
                  <span className="flex items-center gap-2">
                    <Server size={16} />
                    {erp.name}
                  </span>
                  <span className="flex items-center gap-1">
                    <span className="doc-erp-badge">{erp.version}</span>
                    {isExpanded ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
                  </span>
                </button>

                {isExpanded && isSelected && (
                  <div className="ml-4 mt-1 mb-2 border-l-2 border-border pl-2">
                    {sections.map((section) => {
                      // Hide ERP config section if not available
                      if (section.id === "erp-config" && !erp.erpConfiguration) return null;

                      const Icon = section.icon;
                      return (
                        <button
                          key={section.id}
                          onClick={() => onSelectSection(section.id)}
                          className={`w-full doc-nav-item text-xs ${
                            activeSection === section.id ? 'active' : ''
                          }`}
                        >
                          <Icon size={14} />
                          {section.label}
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </ScrollArea>
    </div>
  );
};
