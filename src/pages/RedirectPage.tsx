import React, { useState, useEffect, useRef } from "react";
import {
  Play,
  Loader2,
  Terminal as TerminalIcon,
  Trash2,
  ShoppingCart,
} from "lucide-react";
import { toast } from "sonner";

const SUPERMERCADOS = [
  { id: "assai", name: "Assaí" },
  { id: "atacadao", name: "Atacadão" },
  { id: "cometa", name: "Cometa" },
  { id: "gbarbosa", name: "GBarbosa" },
  { id: "novoatacarejo", name: "Novo Atakarejo" },
  { id: "frangolandia", name: "Frangolândia" },
  { id: "atakarejo", name: "Atakarejo" },
];

type StatusType = "idle" | "loading" | "success" | "error";

const RedirectPage = () => {
  const [statuses, setStatuses] = useState<Record<string, StatusType>>({});
  const [logs, setLogs] = useState<{ msg: string; type: string }[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Auto-scroll do terminal
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [logs]);

  const addLog = (msg: string, type: "info" | "success" | "error" = "info") => {
    const time = new Date().toLocaleTimeString();
    setLogs((prev) => [...prev, { msg: `> [${time}] ${msg}`, type }]);
  };

  const runAutomation = async (id: string) => {
    if (statuses[id] === "loading") return;

    setStatuses((prev) => ({ ...prev, [id]: "loading" }));
    addLog(`Iniciando conexão: ${id.toUpperCase()}...`, "info");

    try {
      const response = await fetch(
        `https://solutionsmateus-encartes-download.hf.space/api/download/${id}`,
        { method: "GET" }
      );

      if (response.ok) {
        setStatuses((prev) => ({ ...prev, [id]: "success" }));
        addLog(`Sucesso: Dados de ${id.toUpperCase()} recebidos.`, "success");
        toast.success(`${id.toUpperCase()} Finalizado.`);
      } else {
        throw new Error();
      }
    } catch (error) {
      setStatuses((prev) => ({ ...prev, [id]: "error" }));
      addLog(`Falha: Erro na requisição de ${id.toUpperCase()}.`, "error");
      toast.error(`Erro em ${id.toUpperCase()}`);
    }
  };

  return (
    <div className="min-h-screen bg-[#f0f0f0] p-6 font-mono text-black">
      <div className="max-w-5xl mx-auto space-y-6">
        {/* Título Simples */}
        <div className="border-b-4 border-black pb-2 mb-8">
          <h1 className="text-3xl font-black uppercase tracking-tighter italic">
            Encartes - Concorrencia
          </h1>
        </div>

        {/* Grade de Botões */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {SUPERMERCADOS.map((s) => (
            <button
              key={s.id}
              onClick={() => runAutomation(s.id)}
              disabled={statuses[s.id] === "loading"}
              className={`
                relative flex items-center justify-between p-4 border-4 border-black font-black uppercase text-xs tracking-widest transition-all
                ${
                  statuses[s.id] === "loading"
                    ? "bg-blue-400 translate-x-1 translate-y-1 shadow-none"
                    : "bg-white hover:bg-yellow-400 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] active:shadow-none active:translate-x-1 active:translate-y-1"
                }
                ${
                  statuses[s.id] === "success"
                    ? "border-green-600 text-green-600"
                    : ""
                }
                ${
                  statuses[s.id] === "error"
                    ? "border-red-600 text-red-600"
                    : ""
                }
              `}
            >
              <div className="flex items-center gap-2">
                {statuses[s.id] === "loading" ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <ShoppingCart className="w-4 h-4" />
                )}
                {s.name}
              </div>
              {statuses[s.id] !== "loading" && (
                <Play className="w-3 h-3 fill-current" />
              )}
            </button>
          ))}
        </div>

        {/* Output Terminal */}
        <div className="flex flex-col border-4 border-black bg-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] overflow-hidden">
          {/* Barra de título do terminal */}
          <div className="bg-zinc-800 border-b-2 border-black p-2 flex justify-between items-center px-4">
            <div className="flex items-center gap-2">
              <TerminalIcon size={16} className="text-white" />
              <span className="text-[10px] text-white font-bold uppercase tracking-widest">
                Output_Terminal
              </span>
            </div>
            <button
              onClick={() => setLogs([])}
              className="text-zinc-400 hover:text-red-500 transition-colors"
            >
              <Trash2 size={16} />
            </button>
          </div>

          {/* Área de Texto */}
          <div
            ref={scrollRef}
            className="h-80 overflow-y-auto p-4 text-xs md:text-sm font-mono leading-relaxed"
          >
            {logs.length === 0 && (
              <div className="text-zinc-600 italic animate-pulse font-bold">
                _ Ready, Waiting for execution...
              </div>
            )}
            {logs.map((log, i) => (
              <div
                key={i}
                className={`mb-1 break-all
                ${log.type === "success" ? "text-green-400" : ""}
                ${log.type === "error" ? "text-red-500 font-bold" : ""}
                ${log.type === "info" ? "text-zinc-100" : ""}
              `}
              >
                {log.msg}
              </div>
            ))}
            {/* Cursor piscante simulado */}
            <span className="inline-block w-2 h-4 bg-green-500 animate-bounce ml-1"></span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RedirectPage;
