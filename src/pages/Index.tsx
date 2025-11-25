import { ApiCard } from "@/components/ApiCard";
import { apis } from "@/data/apis";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-6xl mx-auto px-6 py-16">
        <header className="mb-20">
          <h1 className="text-7xl font-bold mb-6 tracking-tight">APIs</h1>
          <p className="text-xl text-muted-foreground max-w-2xl">
            Simple, powerful, and minimalist API solutions
          </p>
        </header>

        <section className="grid gap-4">
          {apis.map((api) => (
            <ApiCard
              key={api.id}
              id={api.id}
              name={api.name}
              description={api.description}
            />
          ))}
        </section>
      </div>
    </div>
  );
};

export default Index;
