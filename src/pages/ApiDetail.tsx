import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Play, Loader2, Terminal } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

// --- Definição dos Dados (Incluso localmente para evitar erros de importação) ---

interface Api {
  id: string;
  name: string;
  description: string;
  endpoint: string;
  method: string;
  documentation: string;
  exampleRequest: string;
  exampleResponse: string;
}

export const apis: Api[] = [
  {
    id: "concorrencia",
    name: "Concorrencia API",
    description: "Promoções e Campanhas de todos os supermercados.",
    endpoint: "/api/v1/concorrencia",
    method: "GET, POST, PUT, DELETE",
    documentation: "Clique e pegue todos os dados da concorrencia",
    exampleRequest: `GET /api/v1/users/123\nAuthorization: Bearer {token}`,
    exampleResponse: `{\n  "id": "Button",\n  "name": "John Doe",\n  "email": "john@example.com",\n  "created_at": "2024-01-01T00:00:00Z"\n}`,
  },
  {
    id: "hf-random-dice",
    name: "Rodar Dado (HF Space)",
    description:
      "Gera um número aleatório processado remotamente no Hugging Face.",
    endpoint:
      "https://solutionsmateus-encartes-download.hf.space/api/random-dice",
    method: "GET",
    documentation: "Retorna um valor entre 1 e 20 gerado pelo servidor Python.",
    exampleRequest: `GET /api/random-dice`,
    exampleResponse: `{\n  "resultado": 15,\n  "mensagem": "Dado rolado com sucesso no servidor HF!",\n  "status": "success"\n}`,
  },
];

// --- Componente ApiDetail ---

const ApiDetail = () => {
  const { id } = useParams();
  const api = apis.find((a) => a.id === id);

  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState<string | null>(null);

  // Função que roda ao clicar no botão
  const handleExecute = async () => {
    if (!api) return;

    setLoading(true);
    setResponse(null);

    try {
      // Faz a requisição para o endpoint configurado no objeto 'api'
      const res = await fetch(api.endpoint, {
        method: api.method.split(",")[0].trim() || "GET", // Pega o primeiro método da lista
        headers: {
          "Content-Type": "application/json",
          // Se precisar de token, adicione aqui
        },
      });

      if (!res.ok) throw new Error(`Status: ${res.status}`);

      const data = await res.json();
      setResponse(JSON.stringify(data, null, 2));
      toast.success("Função executada com sucesso!");
    } catch (error) {
      console.error(error);
      toast.error("Falha ao executar a função");
      setResponse(`Erro: ${error}`);
    } finally {
      setLoading(false);
    }
  };

  if (!api) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center animate-fade-in">
          <h1 className="text-6xl font-display mb-6">404</h1>
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-6 py-3 border-2 border-foreground hover:bg-foreground hover:text-background transition-all font-mono text-sm uppercase tracking-wider"
          >
            <ArrowLeft className="w-4 h-4" />
            Voltar
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header Simplificado */}
      <div className="border-b-2 border-border bg-background p-6">
        <div className="max-w-4xl mx-auto flex items-center gap-4">
          <Link
            to="/"
            className="p-2 border-2 border-transparent hover:border-foreground transition-all rounded-full"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <h1 className="text-xl font-mono uppercase tracking-wider truncate">
            {api.name}
          </h1>
        </div>
      </div>

      {/* Área Principal Centralizada */}
      <div className="flex-1 flex flex-col items-center justify-center p-6 max-w-4xl mx-auto w-full gap-12 animate-fade-in">
        {/* O BOTÃO (Foco principal da página) */}
        <div className="text-center w-full max-w-md">
          <button
            onClick={handleExecute}
            disabled={loading}
            className="w-full group relative px-8 py-6 bg-foreground text-background font-display text-2xl uppercase tracking-widest hover:bg-background hover:text-foreground border-2 border-foreground transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-[4px] hover:translate-y-[4px]"
          >
            <div className="flex items-center justify-center gap-4">
              {loading ? (
                <Loader2 className="w-8 h-8 animate-spin" />
              ) : (
                <Play className="w-8 h-8 fill-current" />
              )}
              {loading ? "Executando..." : "Rodar Função"}
            </div>
          </button>
          <p className="mt-4 text-muted-foreground font-mono text-sm">
            Endpoint: {api.endpoint}
          </p>
        </div>

        {/* Console de Saída (Aparece apenas se houver resposta) */}
        {(response || loading) && (
          <div className="w-full animate-slide-up">
            <div className="flex items-center gap-2 mb-2 text-sm font-mono uppercase tracking-wider text-muted-foreground">
              <Terminal className="w-4 h-4" />
              Console Output
            </div>
            <div className="w-full h-64 bg-black text-green-400 p-6 font-mono text-sm overflow-auto border-2 border-foreground shadow-lg rounded-sm">
              {loading ? (
                <span className="animate-pulse">
                  Aguardando resposta do servidor...
                </span>
              ) : (
                <pre>{response}</pre>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ApiDetail;
