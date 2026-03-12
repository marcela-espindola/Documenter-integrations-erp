import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Index from "./pages/Index.tsx";
import Admin from "./pages/Admin.tsx";
import DocView from "./pages/DocView.tsx";
import NotFound from "./pages/NotFound.tsx";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter basename="/Documenter-integrations-erp/">
        <Routes>
          <Route path="/" element={<Index />} />
          
          {/* Rota para o Painel Administrativo */}
          <Route path="/admin" element={<Admin />} />
          
          {/* Rota para visualizar uma documentação específica pelo ID */}
          <Route path="/view/:id" element={<DocView />} />

          {/* Rota de erro 404 - Sempre deve ser a última */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
