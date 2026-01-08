import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Play, Loader2, Terminal, ShoppingBag } from "lucide-react";
import { useState, useMemo } from "react";
import { toast } from "sonner";

// --- Definição dos Dados & Mapeamento ---

// Lista de Supermercados (ajustada para minúsculas para corresponder à URL)
// O useParams captura o valor da URL que está em minúsculas (ex: "atacadao")
const supermercados = [
  "assai",
  "atacadao",
  "cometa",
  "gbarbosa",
  "novoatacarejo",
  "frangolandia",
  "atakarejo",
];

// Função que simula o fetch dos dados da API com base na Ação e Supermercado
interface DynamicApi {
  id: string; // Ex: 'atacadao-download'
  name: string; // Ex: 'Download Encarte ATACADAO'
  description: string;
  endpoint: string;
  method: string;
}

const getApiDefinition = (
  // Mapeia o parâmetro da URL (string)
  supermercadoUrl: string,
  acaoId: "download" | "salvar" | "transcrever"
): DynamicApi | null => {
  // Normaliza o nome para corresponder ao padrão interno
  const supermercado = supermercadoUrl.toLowerCase();

  // Verifica se o supermercado é válido
  if (!supermercados.includes(supermercado)) return null;

  // URL base do Hugging Face Space
  const baseEndpoint = "https://solutionsmateus-encartes-download.hf.space/api";

  let name = "";
  let path = "";
  let displayName = supermercado.toUpperCase(); // Nome para exibir no título

  // Lógica para construir o nome e o path do endpoint
  switch (acaoId) {
    case "download":
      name = "Download Encarte";
      path = `/download/${supermercado}`;
      break;
    case "salvar":
      name = "Salvar Dados";
      path = `/save/${supermercado}`;
      break;
    case "transcrever":
      name = "Transcrever Promoções";
      path = `/transcribe/${supermercado}`;
      break;
    default:
      return null;
  }

  return {
    id: `${supermercado}-${acaoId}`,
    name: `${name} (${displayName})`,
    description: `Executa a função de ${name.toLowerCase()} para o ${displayName}.`,
    endpoint: `${baseEndpoint}${path}`,
    method: "GET",
  };
};

// --- Componente ApiActionDetail (Novo Nome) ---

const ApiActionDetail = () => {
  // Pega os parâmetros da URL
  const { supermercado, acaoId } = useParams<{
    supermercado: string;
    acaoId: "download" | "salvar" | "transcrever";
  }>();

  // Usa useMemo para calcular a definição da API apenas quando os parâmetros mudarem
  const api = useMemo(
    () =>
      supermercado && acaoId ? getApiDefinition(supermercado, acaoId) : null,
    [supermercado, acaoId]
  );

  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState<string | null>(null);

  // Função que roda ao clicar no botão
  const handleExecute = async () => {
    if (!api) return;

    setLoading(true);
    setResponse(null);

    try {
      // Faz a requisição para o endpoint configurado
      const res = await fetch(api.endpoint, {
        method: api.method.split(",")[0].trim() || "GET",
        headers: { "Content-Type": "application/json" },
      });

      if (!res.ok)
        throw new Error(`Status: ${res.status} | URL: ${api.endpoint}`);

      const data = await res.json();
      setResponse(JSON.stringify(data, null, 2));
      toast.success(`Função ${api.id} executada com sucesso!`);
    } catch (error) {
      console.error(error);
      // Garante que o erro é um objeto Error para extrair a mensagem
      const errorMessage =
        error instanceof Error ? error.message : String(error);
      toast.error("Falha ao executar a função. Verifique o console.");
      setResponse(`Erro: ${errorMessage}`);
    } finally {
      setLoading(false);
    }
  };

  // Tratamento de Erro (API não encontrada)
  if (!api) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center animate-fade-in">
          <h1 className="text-6xl font-display mb-6">Ação Não Encontrada</h1>
          <Link
            to="/home" // Volta para a home page de encartes
            className="inline-flex items-center gap-2 px-6 py-3 border-2 border-foreground hover:bg-foreground hover:text-background transition-all font-mono text-sm uppercase tracking-wider"
          >
            <ArrowLeft className="w-4 h-4" />
            Voltar para a Central de Encartes
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header Simplificado */}
      <div className="border-b-2 border-border bg-card p-6">
        <div className="max-w-4xl mx-auto flex items-center gap-4">
          <Link
            to="/home" // Volta para a home page de encartes
            className="p-2 border-2 border-transparent hover:border-foreground transition-all rounded-full"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <h1 className="text-xl font-mono uppercase tracking-wider truncate flex items-center gap-2">
            <ShoppingBag className="w-5 h-5" />
            {api.name}
          </h1>
        </div>
      </div>

      {/* Área Principal Centralizada */}
      <div className="flex-1 flex flex-col items-center justify-center p-6 max-w-4xl mx-auto w-full gap-12 animate-fade-in">
        {/* Descrição e Endpoint */}
        <div className="text-center w-full max-w-md">
          <p className="text-lg font-display mb-4 text-foreground/80">
            {api.description}
          </p>
          <p className="mt-4 text-muted-foreground font-mono text-sm break-all">
            **Endpoint:**{" "}
            <code className="bg-secondary p-1 text-primary">
              {api.endpoint}
            </code>
          </p>
        </div>

        {/* O BOTÃO (Foco principal da página) - Estilo Retrô/Arcade */}
        <div className="text-center w-full max-w-md">
          <button
            onClick={handleExecute}
            disabled={loading}
            // Estilo dinâmico e animado com sombra "press"
            className="w-full group relative px-8 py-6 bg-primary text-background font-display text-2xl uppercase tracking-widest hover:bg-primary/90 hover:text-white border-2 border-foreground transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-[4px] hover:translate-y-[4px]"
          >
            <div className="flex items-center justify-center gap-4">
              {loading ? (
                <Loader2 className="w-8 h-8 animate-spin" />
              ) : (
                // Ícone que pulsa ao passar o mouse
                <Play className="w-8 h-8 fill-current transition-transform group-hover:scale-110" />
              )}
              {loading ? "Executando..." : "Rodar Função"}
            </div>
          </button>
        </div>

        {/* Console de Saída (Aparece apenas se houver resposta) */}
        {(response || loading) && (
          <div className="w-full animate-slide-up">
            <div className="flex items-center gap-2 mb-2 text-sm font-mono uppercase tracking-wider text-muted-foreground">
              <Terminal className="w-4 h-4" />
              Console Output
            </div>
            {/* Console com Efeito de Terminal */}
            <div className="w-full h-64 bg-black text-green-400 p-6 font-mono text-sm overflow-auto border-2 border-foreground shadow-lg rounded-sm whitespace-pre-wrap">
              {loading ? (
                <span className="animate-pulse">
                  Aguardando resposta do servidor Hugging Face...
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

export default ApiActionDetail;
