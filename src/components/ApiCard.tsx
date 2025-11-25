import { Link } from "react-router-dom";
import { ArrowRight, Lock, Zap } from "lucide-react";
import { useState } from "react";

interface ApiCardProps {
  id: string;
  name: string;
  description: string;
  index: number;
}

export const ApiCard = ({ id, name, description, index }: ApiCardProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Link
      to={`/api/${id}`}
      className="group relative block border-2 border-border bg-card overflow-hidden transition-all duration-300 hover:border-foreground"
      style={{ animationDelay: `${index * 0.1}s` }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Background effect */}
      <div 
        className="absolute inset-0 bg-foreground transition-transform duration-500 ease-out"
        style={{ transform: isHovered ? 'translateY(0)' : 'translateY(100%)' }}
      />
      
      <div className="relative p-8 lg:p-12">
        <div className="flex items-start justify-between gap-6 mb-6">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 border-2 border-current flex items-center justify-center transition-colors">
                <Zap className={`w-6 h-6 transition-colors ${isHovered ? 'text-background' : 'text-foreground'}`} />
              </div>
              <span className={`text-xs font-mono uppercase tracking-wider transition-colors ${isHovered ? 'text-background/70' : 'text-muted-foreground'}`}>
                v1.0
              </span>
            </div>
            
            <h3 className={`text-4xl lg:text-5xl font-display mb-4 transition-all duration-300 ${isHovered ? 'text-background translate-x-2' : 'text-foreground'}`}>
              {name}
            </h3>
            
            <p className={`text-base lg:text-lg leading-relaxed transition-colors ${isHovered ? 'text-background/80' : 'text-muted-foreground'}`}>
              {description}
            </p>
          </div>
          
          <div className="flex flex-col items-center gap-4">
            <ArrowRight 
              className={`w-8 h-8 transition-all duration-300 ${
                isHovered 
                  ? 'text-background translate-x-2 rotate-[-45deg]' 
                  : 'text-foreground'
              }`} 
            />
            <Lock className={`w-5 h-5 transition-colors ${isHovered ? 'text-background/60' : 'text-muted-foreground'}`} />
          </div>
        </div>

        <div className="flex items-center justify-between pt-6 border-t-2 border-current">
          <div className="flex gap-6">
            <div>
              <div className={`text-2xl font-display transition-colors ${isHovered ? 'text-background' : 'text-foreground'}`}>
                99.9%
              </div>
              <div className={`text-xs font-mono uppercase tracking-wider transition-colors ${isHovered ? 'text-background/70' : 'text-muted-foreground'}`}>
                Uptime
              </div>
            </div>
            <div>
              <div className={`text-2xl font-display transition-colors ${isHovered ? 'text-background' : 'text-foreground'}`}>
                &lt;100ms
              </div>
              <div className={`text-xs font-mono uppercase tracking-wider transition-colors ${isHovered ? 'text-background/70' : 'text-muted-foreground'}`}>
                Response
              </div>
            </div>
          </div>
          
          <span className={`text-sm font-mono transition-colors ${isHovered ? 'text-background/80' : 'text-muted-foreground'}`}>
            RESTful
          </span>
        </div>
      </div>
    </Link>
  );
};
