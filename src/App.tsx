import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
// Componente renomeado e importado corretamente
import ApiActionDetail from "./pages/ApiActionDetail";
import NotFound from "./pages/NotFound";
import Home from "./pages/Home";
import RedirectPage from "./pages/RedirectPage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    {" "}
    <TooltipProvider>
      <Toaster />
      <Sonner />{" "}
      <BrowserRouter>
        {" "}
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/home" element={<Home />} />{" "}
          <Route path="/:supermercado/:acaoId" element={<ApiActionDetail />} />{" "}
          <Route path="*" element={<NotFound />} />{" "}
          <Route path="/redirectpage" element={<RedirectPage />} />{" "}
        </Routes>{" "}
      </BrowserRouter>{" "}
    </TooltipProvider>{" "}
  </QueryClientProvider>
);

export default App;
