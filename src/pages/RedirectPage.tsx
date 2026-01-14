import React, { useState } from "react";
import { Play, CheckCircle2, XCircle, Loader2 } from "lucide-react";
import { toast } from "sonner";

///Çosssss
// Lista oficial dos supermercados conforme sua estrutura
const SUPERMERCADOS = [
  { id: "assai", name: "Assaí Atacadista" },
  { id: "atacadao", name: "Atacadão" },
  { id: "cometa", name: "Cometa Supermercados" },
  { id: "gbarbosa", name: "GBarbosa" },
  { id: "novoatacarejo", name: "Novo Atakarejo" },
  { id: "frangolandia", name: "Frangolândia" },
  { id: "atakarejo", name: "Atakarejo" },
];

type StatusType = "idle" | "loading" | "success" | "error";

const RedirectPage = () => {
  // Estado para controlar o status de cada supermercado individualmente
  const [statuses, setStatuses] = useState<Record<string, StatusType>>(
    Object.fromEntries(SUPERMERCADOS.map((s) => [s.id, "idle"]))
  );

  const runAutomation = async (id: string) => {
    // Evita rodar se já estiver carregando
    if (statuses[id] === "loading") return;

    // 1. Atualiza para Status: Loading
    setStatuses((prev) => ({ ...prev, [id]: "loading" }));

    try {
      // Endpoint do seu Hugging Face Space
      const response = await fetch(
        `https://solutionsmateus-encartes-download.hf.space/api/download/${id}`,
        { method: "GET" }
      );

      if (response.ok) {
        setStatuses((prev) => ({ ...prev, [id]: "success" }));
        toast.success(`${id.toUpperCase()}: Processado com sucesso!`);
      } else {
        throw new Error("Falha na resposta do servidor");
      }
    } catch (error) {
      console.error(`Erro ao processar ${id}:`, error);
      setStatuses((prev) => ({ ...prev, [id]: "error" }));
      toast.error(`${id.toUpperCase()}: Erro ao rodar automação.`);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 p-8">
      <div className="max-w-6xl mx-auto">
        <header className="mb-10 text-center">
          <h1 className="text-3xl font-bold text-slate-900 uppercase tracking-tighter">
            Central de Automação de Encartes
          </h1>
          <p className="text-slate-500 font-mono text-sm mt-2">
            Status do Sistema:{" "}
            <span className="text-green-600 font-bold underline">ONLINE</span>
          </p>
        </header>

        {/* Grid Lado a Lado */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SUPERMERCADOS.map((supermarket) => (
            <div
              key={supermarket.id}
              className="bg-white border-2 border-slate-200 p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="bg-slate-100 p-3 rounded-full"></div>
                <h2 className="text-xl font-bold text-slate-800">
                  {supermarket.name}
                </h2>
              </div>

              <div className="flex items-center justify-between mt-auto">
                {/* Indicador de Status */}
                <div className="flex items-center gap-2">
                  {statuses[supermarket.id] === "idle" && (
                    <span className="text-xs font-mono text-slate-400 uppercase">
                      Aguardando
                    </span>
                  )}
                  {statuses[supermarket.id] === "loading" && (
                    <div className="flex items-center gap-2 text-blue-600 animate-pulse">
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span className="text-xs font-bold uppercase">
                        Rodando...
                      </span>
                    </div>
                  )}
                  {statuses[supermarket.id] === "success" && (
                    <div className="flex items-center gap-2 text-green-600">
                      <CheckCircle2 className="w-4 h-4" />
                      <span className="text-xs font-bold uppercase underline">
                        Status: OK
                      </span>
                    </div>
                  )}
                  {statuses[supermarket.id] === "error" && (
                    <div className="flex items-center gap-2 text-red-600">
                      <XCircle className="w-4 h-4" />
                      <span className="text-xs font-bold uppercase underline">
                        Status: Falhou
                      </span>
                    </div>
                  )}
                </div>

                {/* Botão de Ação */}
                <button
                  onClick={() => runAutomation(supermarket.id)}
                  disabled={statuses[supermarket.id] === "loading"}
                  className={`
                    flex items-center gap-2 px-4 py-2 rounded font-bold text-xs uppercase transition-all
                    ${
                      statuses[supermarket.id] === "loading"
                        ? "bg-slate-200 text-slate-400 cursor-not-allowed"
                        : "bg-black text-white hover:bg-slate-800 active:scale-95"
                    }
                  `}
                >
                  <Play
                    className={`w-3 h-3 ${
                      statuses[supermarket.id] === "loading"
                        ? "hidden"
                        : "fill-current"
                    }`}
                  />
                  Executar
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RedirectPage;
