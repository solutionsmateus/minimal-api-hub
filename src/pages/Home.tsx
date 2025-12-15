import { Link } from "react-router-dom";
import { Download, Save, FileText, ShoppingBag } from "lucide-react";

// --- Definição dos Dados ---

// Lista de Supermercados conforme solicitado
const supermercados = [
  "assai",
  "atacadao",
  "cometa",
  "gbarbosa",
  "novoatacarejo",
  "frangolandia",
  "atakarejo",
];

// Mapeamento das Ações para URLs/Endpoints (Exemplo)
// Na vida real, cada supermercado/ação teria um ID de API único,
// mas para o mock, usaremos uma estrutura simples.
interface Acao {
  id: "download" | "salvar" | "transcrever";
  name: string;
  icon: React.ElementType; // Tipo para ícones do Lucide
  description: string;
}

const acoes: Acao[] = [
  {
    id: "download",
    name: "Download Encarte",
    icon: Download,
    description: "Baixa o encarte mais recente do supermercado.",
  },
  {
    id: "salvar",
    name: "Salvar Dados",
    icon: Save,
    description: "Salva os dados do encarte no banco de dados.",
  },
  {
    id: "transcrever",
    name: "Transcrever Promoções",
    icon: FileText,
    description: "Processa o encarte para extrair texto/promoções (HF Space).",
  },
];

// --- Componente Home ---

const Home = () => {
  return (
    <div className="min-h-screen bg-background p-8">
      <header className="max-w-6xl mx-auto mb-10 border-b-2 border-foreground pb-4 animate-fade-in">
        <h1 className="text-4xl font-display uppercase tracking-widest text-foreground">
          Central de Encartes - Concorrência
        </h1>
        <p className="text-md font-mono text-muted-foreground mt-2">
          Selecione o supermercado e a ação desejada para execução remota.
        </p>
      </header>

      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {supermercados.map((supermercado) => (
          <div
            key={supermercado}
            className="border-2 border-foreground bg-card p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all duration-300 transform hover:-translate-x-1 hover:-translate-y-1 animate-slide-up"
          >
            {/* Header do Supermercado */}
            <h2 className="text-2xl font-mono uppercase tracking-wider mb-4 border-b pb-2 flex items-center gap-2 text-primary">
              <ShoppingBag className="w-6 h-6" />
              {supermercado.toUpperCase()}
            </h2>

            {/* Lista de Ações (Botões Personalizados) */}
            <div className="space-y-4 mt-4">
              {acoes.map((acao) => {
                const Icon = acao.icon;
                // Rota: /supermercado/:nome/:acaoId
                const toPath = `/${supermercado}/${acao.id}`;

                return (
                  <Link
                    key={acao.id}
                    to={toPath}
                    // Estilo de Botão Dinâmico e Animado
                    className="w-full flex items-center justify-between p-3 border-2 border-foreground text-foreground hover:bg-foreground hover:text-background transition-all duration-200 group relative overflow-hidden"
                  >
                    {/* Efeito de Overlay Animado (Dinâmico) */}
                    <span className="absolute inset-0 bg-primary/20 transition-transform duration-500 transform translate-x-full group-hover:translate-x-0"></span>

                    <span className="flex items-center gap-3 relative z-10 font-mono text-sm tracking-wider">
                      <Icon className="w-5 h-5 group-hover:animate-bounce-y" />
                      {acao.name}
                    </span>
                    <span className="relative z-10 font-display text-xs bg-secondary px-2 py-0.5 border-2 border-foreground group-hover:bg-background group-hover:text-foreground group-hover:border-background">
                      Executar
                    </span>
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
