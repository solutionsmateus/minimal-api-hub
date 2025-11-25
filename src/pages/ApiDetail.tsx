import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Copy, CheckCircle2, Lock, Zap, Clock } from "lucide-react";
import { apis } from "@/data/apis";
import { useState } from "react";
import { toast } from "sonner";

const ApiDetail = () => {
  const { id } = useParams();
  const api = apis.find(a => a.id === id);
  const [copiedRequest, setCopiedRequest] = useState(false);
  const [copiedResponse, setCopiedResponse] = useState(false);

  const copyToClipboard = (text: string, type: 'request' | 'response') => {
    navigator.clipboard.writeText(text);
    if (type === 'request') {
      setCopiedRequest(true);
      setTimeout(() => setCopiedRequest(false), 2000);
    } else {
      setCopiedResponse(true);
      setTimeout(() => setCopiedResponse(false), 2000);
    }
    toast.success("Copied to clipboard!");
  };

  if (!api) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center animate-fade-in">
          <h1 className="text-6xl font-display mb-6">404</h1>
          <p className="text-xl text-muted-foreground mb-8">API Not Found</p>
          <Link to="/" className="inline-flex items-center gap-2 px-6 py-3 border-2 border-foreground hover:bg-foreground hover:text-background transition-all font-mono text-sm uppercase tracking-wider">
            <ArrowLeft className="w-4 h-4" />
            Back to APIs
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b-2 border-border sticky top-0 bg-background z-10">
        <div className="max-w-6xl mx-auto px-6 py-6">
          <Link 
            to="/" 
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors font-mono text-sm uppercase tracking-wider group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Back to APIs
          </Link>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-16">
        {/* Hero */}
        <div className="mb-20 animate-fade-in">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-16 h-16 border-2 border-foreground flex items-center justify-center">
              <Zap className="w-8 h-8" />
            </div>
            <span className="text-sm font-mono uppercase tracking-wider text-muted-foreground">v1.0 API</span>
          </div>
          
          <h1 className="text-6xl lg:text-8xl font-display mb-6 tracking-tight animate-slide-up">
            {api.name}
          </h1>
          
          <p className="text-xl lg:text-2xl text-muted-foreground max-w-3xl animate-slide-in leading-relaxed">
            {api.description}
          </p>

          {/* Quick Stats */}
          <div className="grid grid-cols-3 gap-6 mt-12 pt-8 border-t-2 border-border">
            <div className="flex items-start gap-3">
              <Lock className="w-6 h-6 mt-1" />
              <div>
                <div className="font-display text-xl mb-1">Secure</div>
                <div className="text-sm font-mono text-muted-foreground">OAuth 2.0</div>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Zap className="w-6 h-6 mt-1" />
              <div>
                <div className="font-display text-xl mb-1">Fast</div>
                <div className="text-sm font-mono text-muted-foreground">&lt;100ms</div>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Clock className="w-6 h-6 mt-1" />
              <div>
                <div className="font-display text-xl mb-1">Reliable</div>
                <div className="text-sm font-mono text-muted-foreground">99.9% Uptime</div>
              </div>
            </div>
          </div>
        </div>

        {/* Documentation Sections */}
        <div className="space-y-16">
          {/* Endpoint */}
          <section className="animate-slide-in" style={{ animationDelay: '0.1s' }}>
            <h2 className="text-sm font-mono uppercase tracking-wider mb-6 text-muted-foreground">
              Base Endpoint
            </h2>
            <div className="border-2 border-border p-6 bg-card font-mono text-sm hover:border-foreground transition-colors">
              <span className="text-muted-foreground">https://api.mateusolutions.com</span>
              <span className="text-foreground">{api.endpoint}</span>
            </div>
          </section>

          {/* Methods */}
          <section className="animate-slide-in" style={{ animationDelay: '0.2s' }}>
            <h2 className="text-sm font-mono uppercase tracking-wider mb-6 text-muted-foreground">
              Supported Methods
            </h2>
            <div className="flex flex-wrap gap-3">
              {api.method.split(', ').map((method) => (
                <div 
                  key={method}
                  className="px-6 py-3 border-2 border-foreground bg-foreground text-background font-mono text-sm uppercase tracking-wider"
                >
                  {method}
                </div>
              ))}
            </div>
          </section>

          {/* Documentation */}
          <section className="animate-slide-in" style={{ animationDelay: '0.3s' }}>
            <h2 className="text-sm font-mono uppercase tracking-wider mb-6 text-muted-foreground">
              Overview
            </h2>
            <div className="border-2 border-border p-8 bg-card">
              <p className="text-lg leading-relaxed">{api.documentation}</p>
            </div>
          </section>

          {/* Example Request */}
          <section className="animate-slide-in" style={{ animationDelay: '0.4s' }}>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-sm font-mono uppercase tracking-wider text-muted-foreground">
                Example Request
              </h2>
              <button
                onClick={() => copyToClipboard(api.exampleRequest, 'request')}
                className="flex items-center gap-2 px-4 py-2 border border-border hover:border-foreground transition-colors font-mono text-xs uppercase tracking-wider"
              >
                {copiedRequest ? (
                  <>
                    <CheckCircle2 className="w-4 h-4" />
                    Copied
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    Copy
                  </>
                )}
              </button>
            </div>
            <pre className="border-2 border-border p-6 bg-card font-mono text-sm overflow-x-auto hover:border-foreground transition-colors">
              {api.exampleRequest}
            </pre>
          </section>

          {/* Example Response */}
          <section className="animate-slide-in" style={{ animationDelay: '0.5s' }}>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-sm font-mono uppercase tracking-wider text-muted-foreground">
                Example Response
              </h2>
              <button
                onClick={() => copyToClipboard(api.exampleResponse, 'response')}
                className="flex items-center gap-2 px-4 py-2 border border-border hover:border-foreground transition-colors font-mono text-xs uppercase tracking-wider"
              >
                {copiedResponse ? (
                  <>
                    <CheckCircle2 className="w-4 h-4" />
                    Copied
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    Copy
                  </>
                )}
              </button>
            </div>
            <pre className="border-2 border-border p-6 bg-card font-mono text-sm overflow-x-auto hover:border-foreground transition-colors">
              {api.exampleResponse}
            </pre>
          </section>

          {/* Authentication Notice */}
          <section className="animate-slide-in border-2 border-foreground p-8 bg-foreground text-background" style={{ animationDelay: '0.6s' }}>
            <div className="flex items-start gap-4">
              <Lock className="w-8 h-8 mt-1 flex-shrink-0" />
              <div>
                <h3 className="text-2xl font-display mb-3">Authentication Required</h3>
                <p className="text-background/80 leading-relaxed">
                  All API requests require authentication. Include your API key in the Authorization header. 
                  Contact our team to get your API credentials.
                </p>
              </div>
            </div>
          </section>
        </div>

        {/* CTA Section */}
        <div className="mt-20 pt-12 border-t-2 border-border animate-fade-in" style={{ animationDelay: '0.7s' }}>
          <div className="text-center">
            <h2 className="text-4xl font-display mb-6">Ready to Get Started?</h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Start integrating this API into your application today
            </p>
            <button className="px-8 py-4 bg-foreground text-background font-mono uppercase text-sm tracking-wider hover:bg-foreground/90 transition-all border-2 border-foreground">
              Request API Key
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApiDetail;
