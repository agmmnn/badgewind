import { useState, useEffect, useCallback, useRef } from "react";
import { Button } from "@/components/ui/button";
import { ZoomIn, ZoomOut, RotateCcw } from "lucide-react";

export type ActiveSection = "icon" | "left" | "right" | null;

interface CanvasProps {
  badgeUrl: string;
  isDark: boolean;
  onSectionClick?: (section: ActiveSection) => void;
}

export function Canvas({ badgeUrl, isDark, onSectionClick }: CanvasProps) {
  const [zoom, setZoom] = useState(2);
  const [svgContent, setSvgContent] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Dots background that follows the theme
  const canvasStyle = isDark
    ? {
        backgroundColor: "#0d0e17",
        backgroundImage:
          "radial-gradient(rgba(255,255,255,0.1) 1px, transparent 1px)",
        backgroundSize: "20px 20px",
      }
    : {
        backgroundColor: "#f5f5f7",
        backgroundImage:
          "radial-gradient(rgba(0,0,0,0.08) 1px, transparent 1px)",
        backgroundSize: "20px 20px",
      };

  // Fetch SVG content
  useEffect(() => {
    const fetchSvg = async () => {
      try {
        const response = await fetch(badgeUrl);
        const text = await response.text();
        setSvgContent(text);
      } catch {
        setSvgContent(null);
      }
    };
    fetchSvg();
  }, [badgeUrl]);

  // Handle click on the SVG to detect which part was clicked
  const handleSvgClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!containerRef.current || !onSectionClick) return;

      const svg = containerRef.current.querySelector("svg");
      if (!svg) return;

      const svgRect = svg.getBoundingClientRect();
      const x = e.clientX - svgRect.left;
      const svgWidth = svgRect.width;

      // Get the nested divs structure from the SVG
      // The badge structure is: outer div > badge div > [left div, right div]
      // We use position-based detection

      // Simple heuristic: divide badge into 3 zones
      // - First 20% = icon area (if icon exists)
      // - 20-50% = left text
      // - 50-100% = right text
      const relativeX = x / svgWidth;

      if (relativeX < 0.25) {
        onSectionClick("icon");
      } else if (relativeX < 0.5) {
        onSectionClick("left");
      } else {
        onSectionClick("right");
      }
    },
    [onSectionClick],
  );

  return (
    <main className="flex-1 flex flex-col overflow-hidden bg-card border border-border rounded-xl shadow-sm relative">
      {/* Canvas Area */}
      <div
        className="flex-1 flex items-center justify-center rounded-xl overflow-hidden"
        style={canvasStyle}
      >
        <div
          ref={containerRef}
          style={{ transform: `scale(${zoom})` }}
          className="transition-transform duration-200 cursor-pointer"
          onClick={handleSvgClick}
        >
          {svgContent ? (
            <div
              dangerouslySetInnerHTML={{ __html: svgContent }}
              className="inline-block"
            />
          ) : (
            <img src={badgeUrl} alt="Badge preview" />
          )}
        </div>
      </div>

      {/* Floating Zoom Controls Island */}
      <div className="absolute bottom-3 left-3 flex items-center gap-1 bg-card/90 backdrop-blur-sm border border-border rounded-lg shadow-md px-1.5 py-1">
        <Button
          variant="ghost"
          size="icon"
          className="h-7 w-7"
          onClick={() => setZoom(Math.max(1, zoom - 1))}
        >
          <ZoomOut className="h-3.5 w-3.5" />
        </Button>
        <span className="text-xs w-10 text-center tabular-nums">
          {zoom * 100}%
        </span>
        <Button
          variant="ghost"
          size="icon"
          className="h-7 w-7"
          onClick={() => setZoom(Math.min(10, zoom + 1))}
        >
          <ZoomIn className="h-3.5 w-3.5" />
        </Button>
        <div className="w-px h-4 bg-border mx-0.5" />
        <Button
          variant="ghost"
          size="icon"
          className="h-7 w-7"
          onClick={() => setZoom(2)}
        >
          <RotateCcw className="h-3.5 w-3.5" />
        </Button>
      </div>

      {/* Click hint */}
      {onSectionClick && (
        <div className="absolute bottom-3 right-3 text-[10px] text-muted-foreground bg-card/90 backdrop-blur-sm border border-border rounded-lg px-2 py-1 shadow-md">
          Click badge to select section
        </div>
      )}
    </main>
  );
}
