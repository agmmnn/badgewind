import { useState, useCallback, useEffect, useMemo } from "react";
import { UrlHighlight } from "@/components/ui/tailwind-input";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuLabel,
  DropdownMenuCheckboxItem,
} from "@/components/ui/dropdown-menu";
import {
  Copy,
  Check,
  Share2,
  Code,
  FileCode,
  Link,
  Braces,
} from "lucide-react";

interface OutputPanelProps {
  displayUrl: string; // Readable URL for display (decoded)
  fullUrl: string; // Encoded URL for copying
  base64Url: string; // Compact base64 encoded URL
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
}

export function OutputPanel({
  displayUrl,
  fullUrl,
  base64Url,
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
  importFont: _importFont,
  debug,
}: OutputPanelProps) {
  const [copied, setCopied] = useState(false);
  const [urlEncoded, setUrlEncoded] = useState(true);

  // Compute markdown and HTML with both URL formats
  const alt = rightText ? `${leftText} ${rightText}` : leftText;

  // Decoded URL (readable, shows Tailwind classes clearly)
  const decodedUrl = displayUrl;

  // URL to use based on encoding preference
  const activeUrl = urlEncoded ? fullUrl : displayUrl;

  // Normal URL embeds (use encoded URL for actual embedding)
  const markdownNormal = `![${alt}](${urlEncoded ? fullUrl : displayUrl})`;
  const htmlNormal = `<img src="${urlEncoded ? fullUrl : displayUrl}" alt="${alt}" />`;

  // Base64 URL embeds
  const markdownBase64 = `![${alt}](${base64Url})`;
  const htmlBase64 = `<img src="${base64Url}" alt="${alt}" />`;

  // JSON config for developers
  const jsonConfig = useMemo(() => {
    const config: Record<string, string | boolean> = {};
    if (badgeStyle) config.badgeStyle = badgeStyle;
    if (leftStyle) config.leftStyle = leftStyle;
    if (rightStyle) config.rightStyle = rightStyle;
    if (icon) config.icon = icon;
    if (iconStyle) config.iconStyle = iconStyle;
    if (!textShadow) config.textShadow = false;
    if (font && font !== "verdana") config.font = font;
    if (!embedFont) config.embedFont = false;
    if (debug) config.debug = true;
    return JSON.stringify(config, null, 2);
  }, [
    badgeStyle,
    leftStyle,
    rightStyle,
    icon,
    iconStyle,
    textShadow,
    font,
    embedFont,
    debug,
  ]);

  const copyToClipboard = useCallback(async (text: string) => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
  }, []);

  // Reset copied state after delay
  useEffect(() => {
    if (copied) {
      const timer = setTimeout(() => setCopied(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [copied]);

  return (
    <div className="min-h-16 bg-card border border-border rounded-xl shadow-sm shrink-0 px-4 py-3">
      <div className="h-full flex items-center gap-4">
        {/* URL Display - always shows decoded/readable URL with syntax highlighting */}
        <div className="flex-1 min-w-0">
          <div className="bg-muted/50 rounded-lg px-3 py-2 break-all">
            <UrlHighlight url={decodedUrl} />
          </div>
        </div>

        {/* Copy URL Button */}
        <Button
          variant="outline"
          size="sm"
          className="gap-2"
          onClick={() => copyToClipboard(displayUrl)}
        >
          {copied ? (
            <>
              <Check className="h-4 w-4 text-green-500" />
              Copied
            </>
          ) : (
            <>
              <Copy className="h-4 w-4" />
              Copy
            </>
          )}
        </Button>

        {/* Share Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="default" size="sm" className="gap-2">
              <Share2 className="h-4 w-4" />
              Share
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            {/* URL Encoding Toggle */}
            <DropdownMenuCheckboxItem
              checked={urlEncoded}
              onCheckedChange={setUrlEncoded}
              className="text-xs"
            >
              URL Encoded
            </DropdownMenuCheckboxItem>

            <DropdownMenuSeparator />

            {/* URL Options */}
            <DropdownMenuLabel className="text-xs text-muted-foreground">
              URL
            </DropdownMenuLabel>
            <DropdownMenuItem
              className="gap-2 cursor-pointer"
              onClick={() => copyToClipboard(activeUrl)}
            >
              <Link className="h-4 w-4" />
              Copy URL
            </DropdownMenuItem>
            <DropdownMenuItem
              className="gap-2 cursor-pointer"
              onClick={() => copyToClipboard(base64Url)}
            >
              <Link className="h-4 w-4 opacity-60" />
              Copy URL (Base64)
            </DropdownMenuItem>

            <DropdownMenuSeparator />

            {/* Markdown Options */}
            <DropdownMenuLabel className="text-xs text-muted-foreground">
              Markdown
            </DropdownMenuLabel>
            <DropdownMenuItem
              className="gap-2 cursor-pointer"
              onClick={() => copyToClipboard(markdownNormal)}
            >
              <FileCode className="h-4 w-4" />
              Copy Markdown
            </DropdownMenuItem>
            <DropdownMenuItem
              className="gap-2 cursor-pointer"
              onClick={() => copyToClipboard(markdownBase64)}
            >
              <FileCode className="h-4 w-4 opacity-60" />
              Copy Markdown (Base64)
            </DropdownMenuItem>

            <DropdownMenuSeparator />

            {/* HTML Options */}
            <DropdownMenuLabel className="text-xs text-muted-foreground">
              HTML
            </DropdownMenuLabel>
            <DropdownMenuItem
              className="gap-2 cursor-pointer"
              onClick={() => copyToClipboard(htmlNormal)}
            >
              <Code className="h-4 w-4" />
              Copy HTML
            </DropdownMenuItem>
            <DropdownMenuItem
              className="gap-2 cursor-pointer"
              onClick={() => copyToClipboard(htmlBase64)}
            >
              <Code className="h-4 w-4 opacity-60" />
              Copy HTML (Base64)
            </DropdownMenuItem>

            <DropdownMenuSeparator />

            {/* Developer Options */}
            <DropdownMenuLabel className="text-xs text-muted-foreground">
              Developer
            </DropdownMenuLabel>
            <DropdownMenuItem
              className="gap-2 cursor-pointer"
              onClick={() => copyToClipboard(jsonConfig)}
            >
              <Braces className="h-4 w-4" />
              Copy JSON Config
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}
