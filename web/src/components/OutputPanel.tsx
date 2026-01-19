import { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Copy, Check } from "lucide-react";

interface OutputPanelProps {
  displayUrl: string; // Readable URL for display
  fullUrl: string; // Encoded URL for copying
  markdownCode: string;
  htmlCode: string;
}

export function OutputPanel({
  displayUrl,
  fullUrl,
  markdownCode,
  htmlCode,
}: OutputPanelProps) {
  const [copied, setCopied] = useState<string | null>(null);

  const copyToClipboard = useCallback(async (text: string, type: string) => {
    await navigator.clipboard.writeText(text);
    setCopied(type);
    setTimeout(() => setCopied(null), 2000);
  }, []);

  return (
    <div className="h-28 border-t border-border shrink-0 bg-card">
      <div className="h-full flex divide-x divide-border">
        {/* URL */}
        <div className="flex-1 p-3 flex flex-col min-w-0">
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs font-medium text-muted-foreground">
              URL
            </span>
            <Button
              variant="ghost"
              size="icon"
              className="h-6 w-6"
              onClick={() => copyToClipboard(fullUrl, "url")}
            >
              {copied === "url" ? (
                <Check className="h-3 w-3 text-green-500" />
              ) : (
                <Copy className="h-3 w-3" />
              )}
            </Button>
          </div>
          <code className="flex-1 text-sm font-mono bg-muted/50 rounded p-2 overflow-auto break-all leading-relaxed">
            {displayUrl}
          </code>
        </div>

        {/* Markdown */}
        <div className="flex-1 p-3 flex flex-col min-w-0">
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs font-medium text-muted-foreground">
              Markdown
            </span>
            <Button
              variant="ghost"
              size="icon"
              className="h-6 w-6"
              onClick={() => copyToClipboard(markdownCode, "markdown")}
            >
              {copied === "markdown" ? (
                <Check className="h-3 w-3 text-green-500" />
              ) : (
                <Copy className="h-3 w-3" />
              )}
            </Button>
          </div>
          <code className="flex-1 text-[11px] font-mono bg-muted/50 rounded p-2 overflow-auto break-all leading-relaxed">
            {markdownCode}
          </code>
        </div>

        {/* HTML */}
        <div className="flex-1 p-3 flex flex-col min-w-0">
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs font-medium text-muted-foreground">
              HTML
            </span>
            <Button
              variant="ghost"
              size="icon"
              className="h-6 w-6"
              onClick={() => copyToClipboard(htmlCode, "html")}
            >
              {copied === "html" ? (
                <Check className="h-3 w-3 text-green-500" />
              ) : (
                <Copy className="h-3 w-3" />
              )}
            </Button>
          </div>
          <code className="flex-1 text-[11px] font-mono bg-muted/50 rounded p-2 overflow-auto break-all leading-relaxed">
            {htmlCode}
          </code>
        </div>
      </div>
    </div>
  );
}
