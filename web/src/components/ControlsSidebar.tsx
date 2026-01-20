import { useEffect, useRef } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
import { ChevronDown, HelpCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "./ui/textarea";
import { Switch } from "@/components/ui/switch";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

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
  altChars: boolean;
  onAltCharsChange: (value: boolean) => void;
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
  altChars,
  onAltCharsChange,
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
    <aside className="w-72 bg-card border border-border rounded-xl shadow-sm flex flex-col shrink-0 overflow-y-auto scrollbar-hide">
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
        <p className="text-[10px] text-muted-foreground leading-relaxed">
          Use <code className="bg-muted px-1 rounded">_</code> for space,{" "}
          <code className="bg-muted px-1 rounded">__</code> for{" "}
          <code className="bg-muted px-1 rounded">_</code>, and{" "}
          <code className="bg-muted px-1 rounded">--</code> for{" "}
          <code className="bg-muted px-1 rounded">-</code>.
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
          <Input
            id="iconStyle"
            value={iconStyle}
            onChange={(e) => onIconStyleChange(e.target.value)}
            placeholder="text-white,h-5,w-5"
            className="transition-all font-mono"
          />
        </div>
      </Section>

      {/* Advanced Styles Section */}
      <Section title="Tailwind Styles" defaultOpen={true}>
        <div className="space-y-1.5">
          <Label htmlFor="badgeStyle" className="text-xs">
            Badge
          </Label>
          <Textarea
            id="badgeStyle"
            value={badgeStyle}
            onChange={(e) => onBadgeStyleChange(e.target.value)}
            placeholder="rounded-full,border-2"
            className="transition-all font-mono"
          />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="leftStyle" className="text-xs">
            Left
          </Label>
          <Textarea
            id="leftStyle"
            value={leftStyle}
            onChange={(e) => onLeftStyleChange(e.target.value)}
            placeholder="bg-slate-700"
            className="transition-all font-mono"
          />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="rightStyle" className="text-xs">
            Right
          </Label>
          <Textarea
            id="rightStyle"
            value={rightStyle}
            onChange={(e) => onRightStyleChange(e.target.value)}
            placeholder="bg-green-500"
            className="transition-all font-mono"
          />
        </div>
      </Section>

      {/* Advanced Options Section */}
      <Section title="Advanced">
        <div className="space-y-3">
          {/* Alternative Characters */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <Label htmlFor="altChars" className="text-xs cursor-pointer">
                Alternative Characters
              </Label>
              <Tooltip>
                <TooltipTrigger asChild>
                  <HelpCircle className="h-3 w-3 text-muted-foreground cursor-help" />
                </TooltipTrigger>
                <TooltipContent side="right" className="max-w-[220px]">
                  Use () for [] and @ for # in URLs. Example: bg-(@1ed760)
                  instead of bg-[#1ed760]
                </TooltipContent>
              </Tooltip>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] text-muted-foreground w-6">
                {altChars ? "On" : "Off"}
              </span>
              <Switch
                id="altChars"
                checked={altChars}
                onCheckedChange={onAltCharsChange}
              />
            </div>
          </div>

          {/* Rasterize Font */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <Label htmlFor="embedFont" className="text-xs cursor-pointer">
                Rasterize Font
              </Label>
              <Tooltip>
                <TooltipTrigger asChild>
                  <HelpCircle className="h-3 w-3 text-muted-foreground cursor-help" />
                </TooltipTrigger>
                <TooltipContent side="right" className="max-w-[220px]">
                  Embed font glyphs directly into SVG for consistent rendering
                  across all platforms.
                </TooltipContent>
              </Tooltip>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] text-muted-foreground w-6">
                {embedFont ? "On" : "Off"}
              </span>
              <Switch
                id="embedFont"
                checked={embedFont}
                onCheckedChange={onEmbedFontChange}
              />
            </div>
          </div>

          {/* Import Font CSS */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <Label htmlFor="importFont" className="text-xs cursor-pointer">
                Import Font CSS
              </Label>
              <Tooltip>
                <TooltipTrigger asChild>
                  <HelpCircle className="h-3 w-3 text-muted-foreground cursor-help" />
                </TooltipTrigger>
                <TooltipContent side="right" className="max-w-[220px]">
                  Add @import CSS rule to load the font from a CDN. Useful when
                  rasterization is disabled.
                </TooltipContent>
              </Tooltip>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] text-muted-foreground w-6">
                {importFont ? "On" : "Off"}
              </span>
              <Switch
                id="importFont"
                checked={importFont}
                onCheckedChange={onImportFontChange}
              />
            </div>
          </div>

          {/* Debug Mode */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <Label htmlFor="debug" className="text-xs cursor-pointer">
                Debug Mode
              </Label>
              <Tooltip>
                <TooltipTrigger asChild>
                  <HelpCircle className="h-3 w-3 text-muted-foreground cursor-help" />
                </TooltipTrigger>
                <TooltipContent side="right" className="max-w-[220px]">
                  Show bounding boxes and layout debugging information in the
                  SVG output.
                </TooltipContent>
              </Tooltip>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] text-muted-foreground w-6">
                {debug ? "On" : "Off"}
              </span>
              <Switch
                id="debug"
                checked={debug}
                onCheckedChange={onDebugChange}
              />
            </div>
          </div>
        </div>
      </Section>
    </aside>
  );
}
