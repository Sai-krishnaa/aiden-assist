import { Shield } from 'lucide-react';

export function SafetyFooter() {
  return (
    <footer className="bg-muted/50 border-t border-border py-6 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-start gap-3 justify-center text-center">
          <Shield className="h-5 w-5 text-muted-foreground flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-sm text-muted-foreground">
              <strong>Important:</strong> This tool does not provide medical diagnosis or advice. 
              It is designed to help organize information for emergency responders. 
              Always call emergency services directly in life-threatening situations.
            </p>
          </div>
        </div>
        <div className="mt-4 text-center">
          <p className="text-xs text-muted-foreground/70">
            © {new Date().getFullYear()} Emergency Triage Assistant • MVP Prototype
          </p>
        </div>
      </div>
    </footer>
  );
}
