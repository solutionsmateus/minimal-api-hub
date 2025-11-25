import { useParams, Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { apis } from "@/data/apis";

const ApiDetail = () => {
  const { id } = useParams();
  const api = apis.find(a => a.id === id);

  if (!api) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">API Not Found</h1>
          <Link to="/" className="inline-flex items-center gap-2 hover:underline">
            <ArrowLeft className="w-4 h-4" />
            Back to APIs
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-6 py-12">
        <Link 
          to="/" 
          className="inline-flex items-center gap-2 mb-8 hover:underline text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to APIs
        </Link>

        <div className="space-y-12">
          <div>
            <h1 className="text-5xl font-bold mb-4">{api.name}</h1>
            <p className="text-xl text-muted-foreground">{api.description}</p>
          </div>

          <div className="border-t border-border pt-8">
            <div className="grid gap-8">
              <div>
                <h2 className="text-sm font-bold uppercase tracking-wider mb-3">Endpoint</h2>
                <code className="block bg-card p-4 border border-border font-mono text-sm">
                  {api.endpoint}
                </code>
              </div>

              <div>
                <h2 className="text-sm font-bold uppercase tracking-wider mb-3">Methods</h2>
                <p className="text-muted-foreground">{api.method}</p>
              </div>

              <div>
                <h2 className="text-sm font-bold uppercase tracking-wider mb-3">Documentation</h2>
                <p className="text-muted-foreground leading-relaxed">{api.documentation}</p>
              </div>

              <div>
                <h2 className="text-sm font-bold uppercase tracking-wider mb-3">Example Request</h2>
                <pre className="bg-card p-4 border border-border font-mono text-sm overflow-x-auto">
                  {api.exampleRequest}
                </pre>
              </div>

              <div>
                <h2 className="text-sm font-bold uppercase tracking-wider mb-3">Example Response</h2>
                <pre className="bg-card p-4 border border-border font-mono text-sm overflow-x-auto">
                  {api.exampleResponse}
                </pre>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApiDetail;
