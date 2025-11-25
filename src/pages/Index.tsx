import { ApiCard } from "@/components/ApiCard";
import { apis } from "@/data/apis";
import { Terminal, Github, BookOpen } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="relative overflow-hidden border-b-2 border-border">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, currentColor 2px, currentColor 4px), repeating-linear-gradient(90deg, transparent, transparent 2px, currentColor 2px, currentColor 4px)',
            backgroundSize: '40px 40px'
          }} />
        </div>
        
        <div className="relative max-w-7xl mx-auto px-6 py-24 lg:py-32">
          <div className="flex items-center gap-3 mb-8 animate-slide-in">
            <Terminal className="w-8 h-8" />
            <span className="text-sm font-mono uppercase tracking-wider">Developer Tools</span>
          </div>
          
          <h1 className="text-7xl lg:text-9xl font-display mb-8 animate-slide-up tracking-tight">
            <span className="block">MARKETING</span>
            <span className="block text-gradient">APIs</span>
          </h1>
          
          <p className="text-xl lg:text-2xl text-muted-foreground max-w-2xl mb-12 animate-fade-in leading-relaxed">
            Simples, rápido e automático todos os dados da Concorrência
          </p>

          <div className="flex flex-wrap gap-4 animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <a 
              href="#apis" 
              className="px-8 py-4 bg-foreground text-background font-mono uppercase text-sm tracking-wider hover:bg-foreground/90 transition-all border-2 border-foreground hover:translate-x-1 hover:translate-y-1"
            >
              Buscar API's
            </a>
            <button className="px-8 py-4 border-2 border-foreground font-mono uppercase text-sm tracking-wider hover:bg-foreground hover:text-background transition-all">
              AI
            </button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-8 mt-20 pt-12 border-t-2 border-border animate-fade-in" style={{ animationDelay: '0.4s' }}>
            <div>
              <div className="text-4xl lg:text-5xl font-display mb-2">4</div>
              <div className="text-sm font-mono text-muted-foreground uppercase tracking-wider">APIs Disponiveis</div>
            </div>
            <div>
              <div className="text-4xl lg:text-5xl font-display mb-2">100%</div>
              <div className="text-sm font-mono text-muted-foreground uppercase tracking-wider">Automatizado</div>
            </div>
            <div>
              <div className="text-4xl lg:text-5xl font-display mb-2">&lt;Segurança</div>
              <div className="text-sm font-mono text-muted-foreground uppercase tracking-wider">Ambiente Web Seguro</div>
            </div>
          </div>
        </div>
      </div>

      {/* APIs Section */}
      <div id="apis" className="max-w-7xl mx-auto px-6 py-20 lg:py-32">
        <div className="mb-16">
          <h2 className="text-5xl lg:text-6xl font-display mb-6 tracking-tight">
            API's
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl">
            API's Automaticas - Projetos para o Grupo Mateus
          </p>
        </div>

        <div className="grid gap-6 animate-fade-in">
          {apis.map((api, index) => (
            <ApiCard
              key={api.id}
              id={api.id}
              name={api.name}
              description={api.description}
              index={index}
            />
          ))}
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t-2 border-border mt-20">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8">
            <div>
              <div className="text-3xl font-display mb-2">MateuSolutions</div>
              <p className="text-sm font-mono text-muted-foreground">Construindo o futuro das automações,</p>
            </div>
            
            <div className="flex gap-6">
              <a href="#" className="group flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
                <Github className="w-5 h-5" />
                <span className="font-mono text-sm uppercase tracking-wider">GitHub</span>
              </a>
              <a href="#" className="group flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
                <BookOpen className="w-5 h-5" />
                <span className="font-mono text-sm uppercase tracking-wider">Docs</span>
              </a>
            </div>
          </div>
          
          <div className="mt-8 pt-8 border-t border-border text-center">
            <p className="text-xs font-mono text-muted-foreground uppercase tracking-wider">
              © 2024 MateuSolutions. Todos os direitos reservados.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
