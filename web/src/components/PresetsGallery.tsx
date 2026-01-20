import { useCallback, useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

// Full badge presets with live preview - extracted from README examples
export interface BadgePreset {
  name: string;
  leftText: string;
  rightText: string;
  badgeStyle: string;
  leftStyle: string;
  rightStyle: string;
  icon: string;
  iconStyle: string;
  textShadow: boolean;
  font?: string;
  embedFont?: boolean;
  importFont?: boolean;
  debug?: boolean;
}

export const badgePresets: BadgePreset[] = [
  // Basic styles
  {
    name: "Default",
    leftText: "Badge",
    rightText: "Wind",
    badgeStyle: "",
    leftStyle: "",
    rightStyle: "",
    icon: "",
    iconStyle: "",
    textShadow: true,
  },
  {
    name: "Default Border",
    leftText: "Badge",
    rightText: "Wind",
    badgeStyle: "border-b-2,border-slate-700,bg-slate-700",
    leftStyle: "",
    rightStyle: "",
    icon: "",
    iconStyle: "",
    textShadow: true,
  },
  {
    name: "GitHub",
    leftText: "GitHub",
    rightText: "Stars",
    badgeStyle: "",
    leftStyle: "",
    rightStyle: "",
    icon: "simple-icons:github",
    iconStyle: "",
    textShadow: true,
  },
  {
    name: "Icon Only",
    leftText: "",
    rightText: "",
    badgeStyle: "",
    leftStyle: "rounded-full",
    rightStyle: "",
    icon: "simple-icons:github",
    iconStyle: "text-sky-200,h-5,w-5,m-1",
    textShadow: true,
  },
  // Branded styles
  {
    name: "Spotify",
    leftText: "Spotify",
    rightText: "Listen",
    badgeStyle: "bg-slate-700,p-1,border-0,rounded-full",
    leftStyle: "rounded-l-full,mr-1",
    rightStyle: "rounded-r-full,bg-[#1ed760],text-slate-700",
    icon: "simple-icons:spotify",
    iconStyle: "text-[#1ed760]",
    textShadow: true,
  },
  {
    name: "Discord",
    leftText: "",
    rightText: "Midjourney",
    badgeStyle: "border-0,rounded-full",
    leftStyle: "rounded-full,mr-1,bg-[#525dea]",
    rightStyle: "rounded-r-full,rounded-l,bg-,pl-0,pr-2",
    icon: "simple-icons:discord",
    iconStyle: "text-white",
    textShadow: true,
  },
  {
    name: "React",
    leftText: "",
    rightText: "Reactive",
    badgeStyle: "rounded-full",
    leftStyle: "rounded-full",
    rightStyle: "bg-transparent,font-black,w-16",
    icon: "simple-icons:react",
    iconStyle: "text-[#61dafb],w-5,h-5",
    textShadow: true,
  },
  {
    name: "Vercel",
    leftText: "Triangle",
    rightText: "Company",
    badgeStyle: "rounded-none,border-2,p-0",
    leftStyle: "rounded-none,bg-zinc-100,text-zinc-800,mr-0",
    rightStyle: "rounded-none,bg-zinc-800,text-white",
    icon: "mdi:triangle",
    iconStyle: "",
    textShadow: false,
  },
  // Version badges
  {
    name: "Version Pill",
    leftText: "Project",
    rightText: "v1.2.3",
    badgeStyle: "p-0,rounded-full",
    leftStyle: "rounded-l-full,mr-0",
    rightStyle: "rounded-r-full,bg-zinc-800,text-white",
    icon: "mdi:triangle",
    iconStyle: "text-white",
    textShadow: true,
  },
  {
    name: "Purple Version",
    leftText: "Project",
    rightText: "Version v1.2.3",
    badgeStyle: "p-0,rounded-full",
    leftStyle: "rounded-l-full,mr-0",
    rightStyle: "rounded-r-full,bg-purple-800,text-white",
    icon: "feather:code",
    iconStyle: "text-white,bg-purple-800,rounded-full",
    textShadow: true,
  },
  // Flat/Border styles
  {
    name: "Border Only",
    leftText: "Supported",
    rightText: "Tailwind",
    badgeStyle: "border-2,border-slate-600,text-white,rounded-none,bg-",
    leftStyle: "bg-",
    rightStyle: "bg-,border-l,border-slate-600",
    icon: "devicon:tailwindcss",
    iconStyle: "",
    textShadow: false,
  },
  {
    name: "Lime Accent",
    leftText: "agmmnn",
    rightText: "",
    badgeStyle: "text-lime-200",
    leftStyle: "",
    rightStyle: "",
    icon: "simple-icons:github",
    iconStyle: "",
    textShadow: true,
  },
  // Hero badge
  {
    name: "Hero Badge",
    leftText: "Badge",
    rightText: "Wind",
    badgeStyle: "bg-,border,text-[27px],border-cyan-500,rounded-full,text-2xl",
    leftStyle: "bg-,text-rose-50,p-2,rounded-l-xl,h-full,text-2xl",
    rightStyle:
      "bg-,rounded-r-xl,italic,h-full,text-2xl,px-3,border-l,border-cyan-500",
    icon: "ri:windy-line",
    iconStyle: "text-cyan-500,h-11,w-11",
    textShadow: true,
  },
  // ============ NEW CREATIVE PRESETS ============
  // Neon styles
  {
    name: "Neon Pink",
    leftText: "NEON",
    rightText: "GLOW",
    badgeStyle: "bg-[#0a0a0a],border-2,border-[#ff00ff],rounded-lg",
    leftStyle: "bg-,text-[#ff00ff]",
    rightStyle: "bg-,text-[#ff00ff],border-l,border-[#ff00ff]",
    icon: "mdi:lightning-bolt",
    iconStyle: "text-[#ff00ff],h-4,w-4",
    textShadow: false,
  },
  {
    name: "Neon Cyan",
    leftText: "CYBER",
    rightText: "PUNK",
    badgeStyle: "bg-[#0f172a],border-2,border-[#00ffff],rounded-none",
    leftStyle: "bg-,text-[#00ffff]",
    rightStyle: "bg-,text-[#00ffff],border-l,border-[#00ffff]",
    icon: "mdi:robot",
    iconStyle: "text-[#00ffff],h-4,w-4",
    textShadow: false,
  },
  // Gradient-look (simulated)
  {
    name: "Sunset",
    leftText: "Sunset",
    rightText: "Vibes",
    badgeStyle: "bg-[#f97316],border-0,rounded-full",
    leftStyle: "bg-[#ea580c],rounded-l-full",
    rightStyle: "bg-[#dc2626],rounded-r-full,text-white",
    icon: "mdi:weather-sunset",
    iconStyle: "text-yellow-200,h-4,w-4",
    textShadow: true,
  },
  {
    name: "Ocean",
    leftText: "Deep",
    rightText: "Ocean",
    badgeStyle: "bg-[#0891b2],border-0,rounded-full",
    leftStyle: "bg-[#0e7490],rounded-l-full",
    rightStyle: "bg-[#1e40af],rounded-r-full,text-white",
    icon: "mdi:waves",
    iconStyle: "text-cyan-200,h-4,w-4",
    textShadow: true,
  },
  // Minimal styles
  {
    name: "Minimal Dark",
    leftText: "minimal",
    rightText: "",
    badgeStyle: "bg-[#111],border-0,rounded-md,text-white",
    leftStyle: "bg-,p-2",
    rightStyle: "",
    icon: "mdi:minus",
    iconStyle: "text-white,h-3,w-3",
    textShadow: false,
  },
  {
    name: "Minimal Light",
    leftText: "clean",
    rightText: "",
    badgeStyle: "bg-white,border,border-[#e5e7eb],rounded-md,text-[#374151]",
    leftStyle: "bg-,p-2",
    rightStyle: "",
    icon: "mdi:checkbox-blank-circle-outline",
    iconStyle: "text-[#6b7280],h-3,w-3",
    textShadow: false,
  },
  // Tech brands
  {
    name: "TypeScript",
    leftText: "TypeScript",
    rightText: "5.0",
    badgeStyle: "bg-[#3178c6],border-0,rounded-md",
    leftStyle: "bg-[#3178c6],text-white",
    rightStyle: "bg-[#235a97],text-white,rounded-r-md",
    icon: "simple-icons:typescript",
    iconStyle: "text-white,h-3.5,w-3.5",
    textShadow: false,
  },
  {
    name: "Rust",
    leftText: "Rust",
    rightText: "Safe",
    badgeStyle: "bg-[#000],border-0,rounded-md",
    leftStyle: "bg-[#b7410e],text-white",
    rightStyle: "bg-[#000],text-[#b7410e],rounded-r-md",
    icon: "simple-icons:rust",
    iconStyle: "text-white,h-3.5,w-3.5",
    textShadow: false,
  },
  {
    name: "Python",
    leftText: "Python",
    rightText: "3.12",
    badgeStyle: "bg-[#306998],border-0,rounded-md",
    leftStyle: "bg-[#ffd43b],text-[#306998]",
    rightStyle: "bg-[#306998],text-white,rounded-r-md",
    icon: "simple-icons:python",
    iconStyle: "text-[#306998],h-3.5,w-3.5",
    textShadow: false,
  },
  {
    name: "Node.js",
    leftText: "Node",
    rightText: "LTS",
    badgeStyle: "bg-[#333],border-0,rounded-md",
    leftStyle: "bg-[#5fa04e],text-white",
    rightStyle: "bg-[#333],text-[#5fa04e],rounded-r-md",
    icon: "simple-icons:nodedotjs",
    iconStyle: "text-white,h-3.5,w-3.5",
    textShadow: false,
  },
  // Status badges
  {
    name: "Build Passing",
    leftText: "build",
    rightText: "passing",
    badgeStyle: "rounded-md,border-0",
    leftStyle: "bg-[#555],text-white",
    rightStyle: "bg-[#4c1],text-white,rounded-r-md",
    icon: "",
    iconStyle: "",
    textShadow: false,
  },
  {
    name: "Build Failing",
    leftText: "build",
    rightText: "failing",
    badgeStyle: "rounded-md,border-0",
    leftStyle: "bg-[#555],text-white",
    rightStyle: "bg-[#e05d44],text-white,rounded-r-md",
    icon: "",
    iconStyle: "",
    textShadow: false,
  },
  {
    name: "Coverage",
    leftText: "coverage",
    rightText: "95%",
    badgeStyle: "rounded-md,border-0",
    leftStyle: "bg-[#555],text-white",
    rightStyle: "bg-[#97ca00],text-white,rounded-r-md",
    icon: "",
    iconStyle: "",
    textShadow: false,
  },
  // Creative shapes
  {
    name: "Tag",
    leftText: "v2.0",
    rightText: "",
    badgeStyle: "bg-[#6366f1],border-0,rounded-full",
    leftStyle: "bg-,text-white,px-3,py-1",
    rightStyle: "",
    icon: "mdi:tag",
    iconStyle: "text-white,h-3.5,w-3.5",
    textShadow: false,
  },
  {
    name: "Star Badge",
    leftText: "Featured",
    rightText: "",
    badgeStyle: "bg-[#fbbf24],border-0,rounded-full",
    leftStyle: "bg-,text-[#78350f],px-3,py-1,font-bold",
    rightStyle: "",
    icon: "mdi:star",
    iconStyle: "text-[#78350f],h-4,w-4",
    textShadow: false,
  },
  {
    name: "Fire",
    leftText: "Hot",
    rightText: "New",
    badgeStyle: "bg-[#dc2626],border-0,rounded-full",
    leftStyle: "bg-,text-white",
    rightStyle: "bg-[#f97316],text-white,rounded-r-full",
    icon: "mdi:fire",
    iconStyle: "text-[#fbbf24],h-4,w-4",
    textShadow: true,
  },
  // Social
  {
    name: "Twitter/X",
    leftText: "Follow",
    rightText: "@user",
    badgeStyle: "bg-[#000],border-0,rounded-full,p-0.5",
    leftStyle: "bg-,text-white,rounded-l-full",
    rightStyle: "bg-[#1d9bf0],text-white,rounded-r-full",
    icon: "simple-icons:x",
    iconStyle: "text-white,h-3,w-3,ml-1",
    textShadow: false,
  },
  {
    name: "YouTube",
    leftText: "Subscribe",
    rightText: "1.2M",
    badgeStyle: "bg-[#ff0000],border-0,rounded-md",
    leftStyle: "bg-,text-white",
    rightStyle: "bg-[#282828],text-white,rounded-r-md",
    icon: "simple-icons:youtube",
    iconStyle: "text-white,h-3.5,w-3.5",
    textShadow: false,
  },
];

// Generate preview URL for a preset
function getPresetPreviewUrl(preset: BadgePreset): string {
  const text = preset.rightText
    ? `${preset.leftText}-${preset.rightText}`
    : preset.leftText || "-";
  const params = new URLSearchParams();
  if (preset.badgeStyle) params.set("badgeStyle", preset.badgeStyle);
  if (preset.leftStyle) params.set("leftStyle", preset.leftStyle);
  if (preset.rightStyle) params.set("rightStyle", preset.rightStyle);
  if (preset.icon) params.set("icon", preset.icon);
  if (preset.iconStyle) params.set("iconStyle", preset.iconStyle);
  if (!preset.textShadow) params.set("textShadow", "false");
  if (preset.font && preset.font !== "verdana") params.set("font", preset.font);
  if (preset.embedFont === false) params.set("embedFont", "false");
  if (preset.debug) params.set("debug", "true");
  const queryString = params.toString();
  // Use /api prefix only in development (Vite proxy)
  const isDev =
    window.location.hostname === "localhost" ||
    window.location.hostname === "127.0.0.1";
  const prefix = isDev ? "/api" : "";
  return `${prefix}/${encodeURIComponent(text)}${queryString ? `?${queryString}` : ""}`;
}

// LocalStorage key for saved designs
const SAVED_DESIGNS_KEY = "badgewind-saved-designs";

// Load saved designs from localStorage
function loadSavedDesigns(): BadgePreset[] {
  try {
    const saved = localStorage.getItem(SAVED_DESIGNS_KEY);
    return saved ? JSON.parse(saved) : [];
  } catch {
    return [];
  }
}

// Save designs to localStorage
function saveSavedDesigns(designs: BadgePreset[]): void {
  localStorage.setItem(SAVED_DESIGNS_KEY, JSON.stringify(designs));
}

interface PresetsGalleryProps {
  onApplyPreset: (preset: BadgePreset) => void;
  currentDesign?: BadgePreset;
}

export function PresetsGallery({
  onApplyPreset,
  currentDesign,
}: PresetsGalleryProps) {
  const [savedDesigns, setSavedDesigns] = useState<BadgePreset[]>(() =>
    loadSavedDesigns(),
  );
  const [isNaming, setIsNaming] = useState(false);
  const [newName, setNewName] = useState("");

  const handleClick = useCallback(
    (preset: BadgePreset) => {
      onApplyPreset(preset);
    },
    [onApplyPreset],
  );

  const handleSaveDesign = useCallback(() => {
    if (!currentDesign) return;
    setIsNaming(true);
    setNewName(
      currentDesign.rightText
        ? `${currentDesign.leftText} ${currentDesign.rightText}`
        : currentDesign.leftText || "My Design",
    );
  }, [currentDesign]);

  const handleConfirmSave = useCallback(() => {
    if (!currentDesign || !newName.trim()) return;

    const design: BadgePreset = {
      ...currentDesign,
      name: newName.trim(),
    };

    const updated = [design, ...savedDesigns];
    setSavedDesigns(updated);
    saveSavedDesigns(updated);
    setIsNaming(false);
    setNewName("");
  }, [currentDesign, newName, savedDesigns]);

  const handleDeleteDesign = useCallback(
    (index: number, e: React.MouseEvent) => {
      e.stopPropagation();
      const updated = savedDesigns.filter((_, i) => i !== index);
      setSavedDesigns(updated);
      saveSavedDesigns(updated);
    },
    [savedDesigns],
  );

  const handleCancelSave = useCallback(() => {
    setIsNaming(false);
    setNewName("");
  }, []);

  return (
    <aside className="w-64 bg-card border border-border rounded-xl shadow-sm flex flex-col shrink-0 overflow-hidden">
      {/* Save Design Section */}
      <div className="px-3 py-2.5 border-b border-border">
        {isNaming ? (
          <div className="flex gap-1">
            <Input
              type="text"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              placeholder="Design name"
              className="h-full"
              autoFocus
              onKeyDown={(e) => {
                if (e.key === "Enter") handleConfirmSave();
                if (e.key === "Escape") handleCancelSave();
              }}
            />
            <Button onClick={handleConfirmSave} variant="default" size="sm">
              Save
            </Button>
            <Button onClick={handleCancelSave} variant="secondary" size="sm">
              ✕
            </Button>
          </div>
        ) : (
          <Button
            onClick={handleSaveDesign}
            disabled={!currentDesign}
            className="w-full h-8 text-xs"
          >
            Save Current Design
          </Button>
        )}
      </div>

      <div className="flex-1 overflow-y-auto scrollbar-hide">
        {/* Saved Designs */}
        {savedDesigns.length > 0 && (
          <div className="p-3 border-b border-border">
            <div className="text-[10px] font-medium text-muted-foreground uppercase tracking-wide mb-2">
              Saved Designs
            </div>
            <div className="grid grid-cols-2 gap-2">
              {savedDesigns.map((preset, index) => (
                <button
                  key={`saved-${index}`}
                  onClick={() => handleClick(preset)}
                  className="group relative flex flex-col items-center gap-1.5 p-2 rounded-md border border-primary/30 bg-primary/5 hover:border-primary/50 hover:bg-primary/10 transition-all"
                >
                  <button
                    onClick={(e) => handleDeleteDesign(index, e)}
                    className="absolute -top-1 -right-1 w-4 h-4 bg-destructive text-destructive-foreground rounded-full text-[10px] opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"
                    title="Delete"
                  >
                    ✕
                  </button>
                  <div className="h-6 flex items-center justify-center overflow-hidden">
                    <img
                      src={getPresetPreviewUrl(preset)}
                      alt={preset.name}
                      className="max-h-6 max-w-full"
                    />
                  </div>
                  <span className="text-[10px] text-muted-foreground group-hover:text-foreground transition-colors truncate w-full text-center">
                    {preset.name}
                  </span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Built-in Presets */}
        <div className="p-3">
          <div className="text-[10px] font-medium text-muted-foreground uppercase tracking-wide mb-2">
            Presets
          </div>
          <div className="grid grid-cols-2 gap-2">
            {badgePresets.map((preset) => (
              <button
                key={preset.name}
                onClick={() => handleClick(preset)}
                className="group flex flex-col items-center gap-1.5 p-2 rounded-md border border-border hover:border-primary/50 hover:bg-muted/50 transition-all"
              >
                <div className="h-6 flex items-center justify-center overflow-hidden">
                  <img
                    src={getPresetPreviewUrl(preset)}
                    alt={preset.name}
                    className="max-h-6 max-w-full"
                  />
                </div>
                <span className="text-[10px] text-muted-foreground group-hover:text-foreground transition-colors truncate w-full text-center">
                  {preset.name}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </aside>
  );
}
