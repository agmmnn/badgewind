import { useState, useCallback, useMemo, useEffect } from "react";
import { Header } from "@/components/Header";
import { ControlsSidebar } from "@/components/ControlsSidebar";
import { Canvas, type ActiveSection } from "@/components/Canvas";
import { OutputPanel } from "@/components/OutputPanel";
import { PresetsGallery, type BadgePreset } from "@/components/PresetsGallery";

// Available fonts (Verdana is default)
export const AVAILABLE_FONTS = [
  { key: "verdana", name: "Verdana" },
  { key: "inter", name: "Inter" },
  { key: "roboto", name: "Roboto" },
  { key: "poppins", name: "Poppins" },
  { key: "fira-code", name: "Fira Code" },
  { key: "jetbrains-mono", name: "JetBrains Mono" },
  { key: "ibm-plex-mono", name: "IBM Plex Mono" },
  { key: "source-code-pro", name: "Source Code Pro" },
  { key: "nunito", name: "Nunito" },
  { key: "lato", name: "Lato" },
  { key: "open-sans", name: "Open Sans" },
  { key: "montserrat", name: "Montserrat" },
  { key: "raleway", name: "Raleway" },
  { key: "ubuntu", name: "Ubuntu" },
  { key: "dm-sans", name: "DM Sans" },
  { key: "space-grotesk", name: "Space Grotesk" },
  { key: "gravitas-one", name: "Gravitas One" },
] as const;

function App() {
  const [leftText, setLeftText] = useState("Badge");
  const [rightText, setRightText] = useState("Wind");
  const [badgeStyle, setBadgeStyle] = useState("");
  const [leftStyle, setLeftStyle] = useState("");
  const [rightStyle, setRightStyle] = useState("");
  const [icon, setIcon] = useState("");
  const [iconStyle, setIconStyle] = useState("");
  const [textShadow, setTextShadow] = useState(true);
  const [font, setFont] = useState("verdana");
  const [embedFont, setEmbedFont] = useState(true);
  const [importFont, setImportFont] = useState(false);
  const [debug, setDebug] = useState(false);
  const [isDark, setIsDark] = useState(true);
  const [activeSection, setActiveSection] = useState<ActiveSection>(null);

  // Apply dark mode
  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDark);
  }, [isDark]);

  // Clear active section after a delay
  useEffect(() => {
    if (activeSection) {
      const timer = setTimeout(() => setActiveSection(null), 2000);
      return () => clearTimeout(timer);
    }
  }, [activeSection]);

  // Build the badge URL (encoded for actual image src)
  const badgeUrl = useMemo(() => {
    const text = rightText ? `${leftText}-${rightText}` : leftText;
    const params = new URLSearchParams();

    if (badgeStyle) params.set("badgeStyle", badgeStyle);
    if (leftStyle) params.set("leftStyle", leftStyle);
    if (rightStyle) params.set("rightStyle", rightStyle);
    if (icon) params.set("icon", icon);
    if (iconStyle) params.set("iconStyle", iconStyle);
    if (!textShadow) params.set("textShadow", "false");
    if (font && font !== "verdana") params.set("font", font);
    if (!embedFont) params.set("embedFont", "false");
    if (importFont) params.set("importFont", "true");
    if (debug) params.set("debug", "true");

    const queryString = params.toString();
    // Use /api prefix only in development (Vite proxy)
    const isDev =
      window.location.hostname === "localhost" ||
      window.location.hostname === "127.0.0.1";
    const prefix = isDev ? "/api" : "";
    return `${prefix}/${encodeURIComponent(text)}${queryString ? `?${queryString}` : ""}`;
  }, [
    leftText,
    rightText,
    badgeStyle,
    leftStyle,
    rightStyle,
    icon,
    iconStyle,
    textShadow,
    font,
    embedFont,
    importFont,
    debug,
  ]);

  // Readable URL for display (not encoded, shows actual Tailwind classes)
  const displayUrl = useMemo(() => {
    const baseUrl = window.location.origin;
    const text = rightText ? `${leftText}-${rightText}` : leftText;
    const params: string[] = [];

    if (badgeStyle) params.push(`badgeStyle=${badgeStyle}`);
    if (leftStyle) params.push(`leftStyle=${leftStyle}`);
    if (rightStyle) params.push(`rightStyle=${rightStyle}`);
    if (icon) params.push(`icon=${icon}`);
    if (iconStyle) params.push(`iconStyle=${iconStyle}`);
    if (!textShadow) params.push(`textShadow=false`);
    if (font && font !== "verdana") params.push(`font=${font}`);
    if (!embedFont) params.push(`embedFont=false`);
    if (importFont) params.push(`importFont=true`);
    if (debug) params.push(`debug=true`);

    const queryString = params.join("&");
    return `${baseUrl}/${text}${queryString ? `?${queryString}` : ""}`;
  }, [
    leftText,
    rightText,
    badgeStyle,
    leftStyle,
    rightStyle,
    icon,
    iconStyle,
    textShadow,
    font,
    embedFont,
    importFont,
    debug,
  ]);

  // Full URL for copying (encoded for actual use)
  const fullUrl = useMemo(() => {
    const baseUrl = window.location.origin;
    // Remove /api prefix if present (from dev mode)
    const path = badgeUrl.startsWith("/api/") ? badgeUrl.slice(4) : badgeUrl;
    return `${baseUrl}${path}`;
  }, [badgeUrl]);

  // Base64 URL (compact, URL-safe encoding of all style params)
  const base64Url = useMemo(() => {
    const baseUrl = window.location.origin;
    const text = rightText ? `${leftText}-${rightText}` : leftText;

    const styleObj: Record<string, string> = {};
    if (badgeStyle) styleObj.badgeStyle = badgeStyle;
    if (leftStyle) styleObj.leftStyle = leftStyle;
    if (rightStyle) styleObj.rightStyle = rightStyle;
    if (icon) styleObj.icon = icon;
    if (iconStyle) styleObj.iconStyle = iconStyle;
    if (!textShadow) styleObj.textShadow = "false";
    if (font && font !== "verdana") styleObj.font = font;
    if (!embedFont) styleObj.embedFont = "false";
    if (importFont) styleObj.importFont = "true";
    if (debug) styleObj.debug = "true";

    // Only generate base64 if there are style params
    if (Object.keys(styleObj).length === 0) {
      return `${baseUrl}/${encodeURIComponent(text)}`;
    }

    // URL-safe base64 encoding
    const jsonStr = JSON.stringify(styleObj);
    const base64 = btoa(jsonStr)
      .replace(/\+/g, "-")
      .replace(/\//g, "_")
      .replace(/=+$/, ""); // Remove padding

    return `${baseUrl}/${encodeURIComponent(text)}?s=${base64}`;
  }, [
    leftText,
    rightText,
    badgeStyle,
    leftStyle,
    rightStyle,
    icon,
    iconStyle,
    textShadow,
    font,
    embedFont,
    importFont,
    debug,
  ]);

  // Apply a full badge preset
  const applyBadgePreset = useCallback((preset: BadgePreset) => {
    setLeftText(preset.leftText);
    setRightText(preset.rightText);
    setBadgeStyle(preset.badgeStyle);
    setLeftStyle(preset.leftStyle);
    setRightStyle(preset.rightStyle);
    setIcon(preset.icon);
    setIconStyle(preset.iconStyle);
    setTextShadow(preset.textShadow);
    if (preset.font) setFont(preset.font);
    if (preset.embedFont !== undefined) setEmbedFont(preset.embedFont);
    if (preset.importFont !== undefined) setImportFont(preset.importFont);
    if (preset.debug !== undefined) setDebug(preset.debug);
  }, []);

  // Handle section click from canvas
  const handleSectionClick = useCallback((section: ActiveSection) => {
    setActiveSection(section);
  }, []);

  return (
    <div className="h-screen w-screen flex flex-col overflow-hidden bg-background">
      <Header isDark={isDark} onToggleTheme={() => setIsDark(!isDark)} />

      <div className="flex-1 flex overflow-hidden">
        <ControlsSidebar
          leftText={leftText}
          rightText={rightText}
          badgeStyle={badgeStyle}
          leftStyle={leftStyle}
          rightStyle={rightStyle}
          icon={icon}
          iconStyle={iconStyle}
          textShadow={textShadow}
          font={font}
          embedFont={embedFont}
          importFont={importFont}
          debug={debug}
          activeSection={activeSection}
          onLeftTextChange={setLeftText}
          onRightTextChange={setRightText}
          onBadgeStyleChange={setBadgeStyle}
          onLeftStyleChange={setLeftStyle}
          onRightStyleChange={setRightStyle}
          onIconChange={setIcon}
          onIconStyleChange={setIconStyle}
          onTextShadowChange={setTextShadow}
          onFontChange={setFont}
          onEmbedFontChange={setEmbedFont}
          onImportFontChange={setImportFont}
          onDebugChange={setDebug}
        />

        <div className="flex-1 flex flex-col overflow-hidden">
          <Canvas
            badgeUrl={badgeUrl}
            isDark={isDark}
            onSectionClick={handleSectionClick}
          />
          <OutputPanel
            displayUrl={displayUrl}
            fullUrl={fullUrl}
            base64Url={base64Url}
            leftText={leftText}
            rightText={rightText}
            badgeStyle={badgeStyle}
            leftStyle={leftStyle}
            rightStyle={rightStyle}
            icon={icon}
            iconStyle={iconStyle}
            textShadow={textShadow}
            font={font}
            embedFont={embedFont}
            importFont={importFont}
            debug={debug}
          />
        </div>

        <PresetsGallery
          onApplyPreset={applyBadgePreset}
          currentDesign={{
            name: "",
            leftText,
            rightText,
            badgeStyle,
            leftStyle,
            rightStyle,
            icon,
            iconStyle,
            textShadow,
            font,
            embedFont,
            importFont,
            debug,
          }}
        />
      </div>
    </div>
  );
}

export default App;
