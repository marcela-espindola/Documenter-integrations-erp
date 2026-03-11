import { useState } from "react";
import { erpIntegrations, ERPIntegration } from "@/data/erpIntegrations";
import { DocSidebar } from "@/components/docs/DocSidebar";
import { DocContent } from "@/components/docs/DocContent";
import { DocHeader } from "@/components/docs/DocHeader";
import { Menu, X } from "lucide-react";

const Index = () => {
  const [selectedErp, setSelectedErp] = useState<ERPIntegration>(erpIntegrations[0]);
  const [activeSection, setActiveSection] = useState("introduction");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <DocHeader />
      
      {/* Mobile menu button */}
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="fixed top-4 right-4 z-50 lg:hidden p-2 rounded-lg bg-card border border-border shadow-sm"
      >
        {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      <div className="flex pt-[var(--doc-header-height)]">
        {/* Sidebar */}
        <div className={`
          fixed lg:sticky top-[var(--doc-header-height)] left-0 z-40
          h-[calc(100vh-var(--doc-header-height))] w-[var(--doc-nav-width)]
          transition-transform duration-300 lg:translate-x-0
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        `}>
          <DocSidebar
            integrations={erpIntegrations}
            selectedErp={selectedErp}
            activeSection={activeSection}
            onSelectErp={(erp) => {
              setSelectedErp(erp);
              setActiveSection("introduction");
              setSidebarOpen(false);
            }}
            onSelectSection={(section) => {
              setActiveSection(section);
              setSidebarOpen(false);
            }}
          />
        </div>

        {/* Overlay for mobile */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-foreground/20 z-30 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Main content */}
        <main className="flex-1 min-w-0 px-6 lg:px-12 py-8 max-w-4xl">
          <DocContent erp={selectedErp} activeSection={activeSection} />
        </main>
      </div>
    </div>
  );
};

export default Index;
