import React, { useState, useEffect, useRef } from "react";
import {
  Play,
  CheckCircle2,
  XCircle,
  Loader2,
  ShoppingCart,
  Terminal as TerminalIcon,
  Activity,
  Zap,
  Trash2,
} from "lucide-react";
import { toast } from "sonner";

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
  const [statuses, setStatuses] = useState<Record<string, StatusType>>(
    Object.fromEntries(SUPERMERCADOS.map((s) => [s.id, "idle"]))
  );
  const [logs, setLogs] = useState<{ msg: string; type: string }[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Auto-scroll para o final do terminal
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [logs]);

  const addLog = (msg: string, type: "info" | "success" | "error" = "info") => {
    const time = new Date().toLocaleTimeString();
    setLogs((prev) => [...prev, { msg: `[${time}] ${msg}`, type }]);
  };

  const runAutomation = async (id: string) => {
    if (statuses[id] === "loading") return;

    setStatuses((prev) => ({ ...prev, [id]: "loading" }));
    addLog(`Iniciando automação: ${id.toUpperCase()}...`, "info");

    try {
      const response = await fetch(
        `https://solutionsmateus-encartes-download.hf.space/api/download/${id}`,
        { method: "GET" }
      );

      if (response.ok) {
        setStatuses((prev) => ({ ...prev, [id]: "success" }));
        addLog(`Sucesso: ${id.toUpperCase()} processado com êxito.`, "success");
        toast.success(`${id.toUpperCase()}: OK!`);
      } else {
        throw new Error("Falha na resposta");
      }
    } catch (error) {
      setStatuses((prev) => ({ ...prev, [id]: "error" }));
      addLog(`Erro: Falha crítica em ${id.toUpperCase()}.`, "error");
      toast.error(`${id.toUpperCase()}: Falha.`);
    }
  };

  const runAll = async () => {
    addLog("Comando GLOBAL disparado. Executando fila...", "info");
    for (const s of SUPERMERCADOS) {
      await runAutomation(s.id);
    }
  };

  const clearLogs = () => setLogs([]);

  const stats = {
    total: SUPERMERCADOS.length,
    success: Object.values(statuses).filter((s) => s === "success").length,
    errors: Object.values(statuses).filter((s) => s === "error").length,
    running: Object.values(statuses).filter((s) => s === "loading").length,
  };

  return (
    <div className="min-h-screen bg-[#e0e0e0] p-4 lg:p-8 font-mono relative overflow-hidden">
      {/* Background Grid Dinâmico */}
      <div
        className="absolute inset-0 opacity-10 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      ></div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header Dashboard */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 mb-8">
          <div className="lg:col-span-2 bg-yellow-400 border-4 border-black p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
            <h1 className="text-4xl font-black italic tracking-tighter">
              ENCARTES_OS v2.0
            </h1>
            <p className="font-bold uppercase text-xs mt-2">
              Central de Comando - Grupo Mateus
            </p>
          </div>

          <div className="bg-white border-4 border-black p-4 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] flex flex-col justify-center">
            <span className="text-xs font-black text-slate-500 uppercase">
              Status Global
            </span>
            <div className="flex items-center gap-2">
              <Activity className="text-green-600 animate-pulse" />
              <span className="text-2xl font-black">SISTEMA_OK</span>
            </div>
          </div>

          <button
            onClick={runAll}
            className="bg-black text-white border-4 border-black p-4 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:bg-white hover:text-black transition-all flex items-center justify-center gap-3 active:shadow-none active:translate-x-1 active:translate-y-1"
          >
            <Zap className="fill-current" />
            <span className="text-xl font-black uppercase">Rodar Todos</span>
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Coluna de Cards (Esquerda/Centro) */}
          <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
            {SUPERMERCADOS.map((supermarket) => (
              <div
                key={supermarket.id}
                className="border-4 border-black bg-white p-5 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] relative overflow-hidden group"
              >
                <div className="flex justify-between items-start mb-6">
                  <div className="border-2 border-black p-2 bg-slate-100 group-hover:bg-yellow-400 transition-colors">
                    <ShoppingCart size={24} />
                  </div>
                  <div
                    className={`px-2 py-1 border-2 border-black text-[10px] font-black uppercase
                    ${
                      statuses[supermarket.id] === "success"
                        ? "bg-green-400"
                        : statuses[supermarket.id] === "error"
                        ? "bg-red-400"
                        : "bg-white"
                    }`}
                  >
                    {statuses[supermarket.id]}
                  </div>
                </div>

                <h2 className="text-xl font-black uppercase mb-4">
                  {supermarket.name}
                </h2>

                <button
                  onClick={() => runAutomation(supermarket.id)}
                  disabled={statuses[supermarket.id] === "loading"}
                  className="w-full border-4 border-black bg-black text-white py-2 font-black uppercase flex items-center justify-center gap-2 hover:bg-white hover:text-black transition-all disabled:opacity-50"
                >
                  {statuses[supermarket.id] === "loading" ? (
                    <Loader2 className="animate-spin" />
                  ) : (
                    <Play size={16} fill="currentColor" />
                  )}
                  Executar
                </button>
              </div>
            ))}
          </div>

          {/* Coluna do Terminal (Direita) */}
          <div className="lg:col-span-1 flex flex-col gap-6">
            {/* Stats Rápido */}
            <div className="bg-white border-4 border-black p-4 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] grid grid-cols-2 gap-4 text-center">
              <div className="border-2 border-black p-2">
                <div className="text-2xl font-black">{stats.success}</div>
                <div className="text-[10px] uppercase font-bold">Sucessos</div>
              </div>
              <div className="border-2 border-black p-2 bg-red-100">
                <div className="text-2xl font-black text-red-600">
                  {stats.errors}
                </div>
                <div className="text-[10px] uppercase font-bold">Falhas</div>
              </div>
            </div>

            {/* Janela de Terminal */}
            <div className="bg-black text-green-400 border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] flex flex-col h-[500px]">
              <div className="bg-slate-800 p-2 flex justify-between items-center border-b-2 border-black">
                <div className="flex items-center gap-2">
                  <TerminalIcon size={14} className="text-white" />
                  <span className="text-[10px] text-white font-bold uppercase tracking-widest">
                    System_Logs
                  </span>
                </div>
                <button
                  onClick={clearLogs}
                  className="text-white hover:text-red-400 transition-colors"
                >
                  <Trash2 size={14} />
                </button>
              </div>

              <div
                ref={scrollRef}
                className="p-4 text-[11px] font-mono overflow-y-auto flex-1 space-y-1"
              >
                {logs.length === 0 && (
                  <div className="opacity-50 italic underline">
                    Aguardando comandos...
                  </div>
                )}
                {logs.map((log, i) => (
                  <div
                    key={i}
                    className={`
                    ${log.type === "success" ? "text-green-300 font-bold" : ""}
                    ${log.type === "error" ? "text-red-400" : ""}
                    ${log.type === "info" ? "text-blue-300" : ""}
                  `}
                  >
                    {log.msg}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RedirectPage;
