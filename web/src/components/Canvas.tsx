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
  const [zoom, setZoom] = useState(3);
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
    <main className="flex-1 flex flex-col overflow-hidden">
      {/* Canvas Toolbar */}
      <div className="h-10 border-b border-border flex items-center justify-between px-3 shrink-0 bg-muted/30">
        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="icon"
            className="h-7 w-7"
            onClick={() => setZoom(Math.max(1, zoom - 1))}
          >
            <ZoomOut className="h-3.5 w-3.5" />
          </Button>
          <span className="text-xs w-12 text-center tabular-nums">
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
          <Button
            variant="ghost"
            size="icon"
            className="h-7 w-7"
            onClick={() => setZoom(3)}
          >
            <RotateCcw className="h-3.5 w-3.5" />
          </Button>
        </div>
        {onSectionClick && (
          <span className="text-[10px] text-muted-foreground">
            Click badge to select section
          </span>
        )}
      </div>

      {/* Canvas Area */}
      <div
        className="flex-1 flex items-center justify-center"
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
    </main>
  );
}
