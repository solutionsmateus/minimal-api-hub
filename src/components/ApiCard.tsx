import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

interface ApiCardProps {
  id: string;
  name: string;
  description: string;
}

export const ApiCard = ({ id, name, description }: ApiCardProps) => {
  return (
    <Link
      to={`/api/${id}`}
      className="group block border border-border bg-card p-8 transition-all hover:bg-accent hover:border-foreground"
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1">
          <h3 className="text-2xl font-bold mb-3 group-hover:translate-x-1 transition-transform">
            {name}
          </h3>
          <p className="text-muted-foreground leading-relaxed">
            {description}
          </p>
        </div>
        <ArrowRight className="w-5 h-5 mt-2 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
      </div>
    </Link>
  );
};
