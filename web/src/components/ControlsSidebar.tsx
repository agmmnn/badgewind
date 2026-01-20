import { useEffect, useRef } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  TailwindInput,
  TailwindTextarea,
} from "@/components/ui/tailwind-input";
import { Section } from "@/components/Section";
import type { ActiveSection } from "@/components/Canvas";
import { AVAILABLE_FONTS } from "@/App";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Settings, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ControlsSidebarProps {
  leftText: string;
  rightText: string;
  badgeStyle: string;
  leftStyle: string;
  rightStyle: string;
  icon: string;
  iconStyle: string;
  textShadow: boolean;
  font: string;
  embedFont: boolean;
  importFont: boolean;
  debug: boolean;
  activeSection: ActiveSection;
  onLeftTextChange: (value: string) => void;
  onRightTextChange: (value: string) => void;
  onBadgeStyleChange: (value: string) => void;
  onLeftStyleChange: (value: string) => void;
  onRightStyleChange: (value: string) => void;
  onIconChange: (value: string) => void;
  onIconStyleChange: (value: string) => void;
  onTextShadowChange: (value: boolean) => void;
  onFontChange: (value: string) => void;
  onEmbedFontChange: (value: boolean) => void;
  onImportFontChange: (value: boolean) => void;
  onDebugChange: (value: boolean) => void;
}

export function ControlsSidebar({
  leftText,
  rightText,
  badgeStyle,
  leftStyle,
  rightStyle,
  icon,
  iconStyle,
  // textShadow,
  font,
  embedFont,
  importFont,
  debug,
  activeSection,
  onLeftTextChange,
  onRightTextChange,
  onBadgeStyleChange,
  onLeftStyleChange,
  onRightStyleChange,
  onIconChange,
  onIconStyleChange,
  // onTextShadowChange,
  onFontChange,
  onEmbedFontChange,
  onImportFontChange,
  onDebugChange,
}: ControlsSidebarProps) {
  const iconSectionRef = useRef<HTMLDivElement>(null);
  const leftTextRef = useRef<HTMLInputElement>(null);
  const rightTextRef = useRef<HTMLInputElement>(null);

  // Scroll to and focus the active section
  useEffect(() => {
    if (!activeSection) return;

    const scrollAndFocus = (element: HTMLElement | null) => {
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "center" });
        if ("focus" in element) {
          setTimeout(() => (element as HTMLInputElement).focus(), 300);
        }
      }
    };

    switch (activeSection) {
      case "icon":
        scrollAndFocus(iconSectionRef.current);
        break;
      case "left":
        scrollAndFocus(leftTextRef.current);
        break;
      case "right":
        scrollAndFocus(rightTextRef.current);
        break;
    }
  }, [activeSection]);

  const getSectionHighlight = (section: ActiveSection) => {
    if (activeSection === section) {
      return "ring-2 ring-primary ring-offset-2 ring-offset-background";
    }
    return "";
  };

  return (
    <aside className="w-72 border-r border-border flex flex-col shrink-0 overflow-y-auto">
      {/* Text Section */}
      <Section title="Text">
        <div className="space-y-1.5">
          <Label htmlFor="leftText" className="text-xs">
            Left
          </Label>
          <Input
            ref={leftTextRef}
            id="leftText"
            value={leftText}
            onChange={(e) => onLeftTextChange(e.target.value)}
            placeholder="GitHub"
            className={`h-8 text-sm transition-all ${getSectionHighlight("left")}`}
          />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="rightText" className="text-xs">
            Right
          </Label>
          <Input
            ref={rightTextRef}
            id="rightText"
            value={rightText}
            onChange={(e) => onRightTextChange(e.target.value)}
            placeholder="Stars"
            className={`h-8 text-sm transition-all ${getSectionHighlight("right")}`}
          />
        </div>
        {/* <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="textShadow"
            checked={textShadow}
            onChange={(e) => onTextShadowChange(e.target.checked)}
            className="rounded border-input h-3.5 w-3.5"
          />
          <Label
            htmlFor="textShadow"
            className="text-xs font-normal cursor-pointer"
          >
            Text shadow
          </Label>
        </div> */}
        <p className="text-[10px] text-muted-foreground">
          _ = space, __ = underscore, -- = dash
        </p>
      </Section>

      {/* Font Section */}
      <Section title="Font">
        <div className="space-y-1.5">
          <Label htmlFor="font" className="text-xs">
            Font Family
          </Label>
          <div className="flex gap-1">
            <Input
              id="font"
              value={font}
              onChange={(e) => onFontChange(e.target.value)}
              onFocus={(e) => e.target.select()}
              placeholder="verdana (or any Google Font)"
              className="h-8 text-sm"
            />
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className="h-8 w-8 p-0 shrink-0"
                >
                  <ChevronDown className="h-4 w-4" opacity={0.5} />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="end"
                className="w-[200px] h-[300px] overflow-y-auto"
              >
                <DropdownMenuLabel>Popular Fonts</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {AVAILABLE_FONTS.map((f) => (
                  <DropdownMenuItem
                    key={f.key}
                    onClick={() => onFontChange(f.key)}
                    className="cursor-pointer font-normal"
                  >
                    {f.name}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        <p className="text-[10px] text-muted-foreground">
          Select a preset or enter any Google Font ID (e.g., 'crimson-text').
        </p>
      </Section>

      {/* Icon Section */}
      <Section title="Icon">
        <div ref={iconSectionRef} className="space-y-1.5">
          <Label htmlFor="icon" className="text-xs">
            Iconify Code
          </Label>
          <Input
            id="icon"
            value={icon}
            onChange={(e) => onIconChange(e.target.value)}
            placeholder="simple-icons:github"
            className={`h-8 text-sm font-mono transition-all ${getSectionHighlight("icon")}`}
          />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="iconStyle" className="text-xs">
            Icon Style
          </Label>
          <TailwindInput
            id="iconStyle"
            value={iconStyle}
            onChange={onIconStyleChange}
            placeholder="text-white,h-5,w-5"
            className={`h-8 text-sm transition-all ${getSectionHighlight("icon")}`}
          />
        </div>
      </Section>

      {/* Advanced Styles Section */}
      <Section title="Tailwind Styles" defaultOpen={true}>
        <div className="space-y-1.5">
          <Label htmlFor="badgeStyle" className="text-xs">
            Badge
          </Label>
          <TailwindTextarea
            id="badgeStyle"
            value={badgeStyle}
            onChange={onBadgeStyleChange}
            placeholder="rounded-full,border-2"
            className=""
          />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="leftStyle" className="text-xs">
            Left
          </Label>
          <TailwindTextarea
            id="leftStyle"
            value={leftStyle}
            onChange={onLeftStyleChange}
            placeholder="bg-slate-700"
            className={`transition-all ${getSectionHighlight("left")}`}
          />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="rightStyle" className="text-xs">
            Right
          </Label>
          <TailwindTextarea
            id="rightStyle"
            value={rightStyle}
            onChange={onRightStyleChange}
            placeholder="bg-green-500"
            className={`transition-all ${getSectionHighlight("right")}`}
          />
        </div>
      </Section>

      {/* Advanced Options Section */}
      <Section title="Advanced">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="w-full h-8 text-xs bg-muted hover:bg-muted/80 rounded flex items-center justify-center gap-2 transition-colors">
              <Settings className="h-3.5 w-3.5" />
              Options
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>Advanced Options</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => onEmbedFontChange(!embedFont)}>
              <div className="flex items-center gap-2 w-full">
                <div
                  className={`h-3.5 w-3.5 rounded border ${
                    embedFont ? "bg-primary border-primary" : "border-border"
                  }`}
                >
                  {embedFont && (
                    <svg
                      className="w-full h-full text-primary-foreground p-0.5"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="3"
                    >
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  )}
                </div>
                <span>Rasterize Font</span>
              </div>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onImportFontChange(!importFont)}>
              <div className="flex items-center gap-2 w-full">
                <div
                  className={`h-3.5 w-3.5 rounded border ${
                    importFont ? "bg-primary border-primary" : "border-border"
                  }`}
                >
                  {importFont && (
                    <svg
                      className="w-full h-full text-primary-foreground p-0.5"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="3"
                    >
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  )}
                </div>
                <span>Import Font CSS</span>
              </div>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onDebugChange(!debug)}>
              <div className="flex items-center gap-2 w-full">
                <div
                  className={`h-3.5 w-3.5 rounded border ${
                    debug ? "bg-primary border-primary" : "border-border"
                  }`}
                >
                  {debug && (
                    <svg
                      className="w-full h-full text-primary-foreground p-0.5"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="3"
                    >
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  )}
                </div>
                <span>Debug Mode</span>
              </div>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <div className="mt-2 space-y-1.5">
          <div className="text-[10px] text-muted-foreground">
            <div className="flex justify-between">
              <span>Rasterize Font:</span>
              <span className="font-medium">{embedFont ? "On" : "Off"}</span>
            </div>
            <div className="flex justify-between">
              <span>Import Font CSS:</span>
              <span className="font-medium">{importFont ? "On" : "Off"}</span>
            </div>
            <div className="flex justify-between">
              <span>Debug:</span>
              <span className="font-medium">{debug ? "On" : "Off"}</span>
            </div>
          </div>
        </div>
      </Section>
    </aside>
  );
}
