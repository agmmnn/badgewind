import { useEffect, useRef } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Section } from "@/components/Section";
import type { ActiveSection } from "@/components/Canvas";
import { AVAILABLE_FONTS } from "@/App";

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
}

export function ControlsSidebar({
  leftText,
  rightText,
  badgeStyle,
  leftStyle,
  rightStyle,
  icon,
  iconStyle,
  textShadow,
  font,
  activeSection,
  onLeftTextChange,
  onRightTextChange,
  onBadgeStyleChange,
  onLeftStyleChange,
  onRightStyleChange,
  onIconChange,
  onIconStyleChange,
  onTextShadowChange,
  onFontChange,
}: ControlsSidebarProps) {
  const iconSectionRef = useRef<HTMLDivElement>(null);
  const leftTextRef = useRef<HTMLInputElement>(null);
  const rightTextRef = useRef<HTMLInputElement>(null);
  const leftStyleRef = useRef<HTMLTextAreaElement>(null);
  const rightStyleRef = useRef<HTMLTextAreaElement>(null);

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
        <div className="flex items-center gap-2">
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
        </div>
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
          <select
            id="font"
            value={font}
            onChange={(e) => onFontChange(e.target.value)}
            className="w-full h-8 text-sm rounded-md border border-input bg-background px-2 py-1 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
          >
            {AVAILABLE_FONTS.map((f) => (
              <option key={f.key} value={f.key}>
                {f.name}
              </option>
            ))}
          </select>
        </div>
        <p className="text-[10px] text-muted-foreground">
          Note: Web fonts work in browsers but may not render in GitHub READMEs
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
            placeholder="text-white|h-5|w-5"
            className={`h-8 text-sm font-mono transition-all ${getSectionHighlight("icon")}`}
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
            placeholder="rounded-full|border-2"
            className="min-h-[60px] text-xs font-mono resize-none"
          />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="leftStyle" className="text-xs">
            Left
          </Label>
          <Textarea
            ref={leftStyleRef}
            id="leftStyle"
            value={leftStyle}
            onChange={(e) => onLeftStyleChange(e.target.value)}
            placeholder="bg-slate-700"
            className={`min-h-[60px] text-xs font-mono resize-none transition-all ${getSectionHighlight("left")}`}
          />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="rightStyle" className="text-xs">
            Right
          </Label>
          <Textarea
            ref={rightStyleRef}
            id="rightStyle"
            value={rightStyle}
            onChange={(e) => onRightStyleChange(e.target.value)}
            placeholder="bg-green-500"
            className={`min-h-[60px] text-xs font-mono resize-none transition-all ${getSectionHighlight("right")}`}
          />
        </div>
        <p className="text-[10px] text-muted-foreground">
          | = space, () = [], @ = #
        </p>
      </Section>
    </aside>
  );
}
