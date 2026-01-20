import * as React from "react";
import { cn } from "@/lib/utils";

// Tailwind class categories for syntax highlighting
const classPatterns = {
  // Colors - must be checked first as they're part of other patterns
  colors:
    /\b(slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose|white|black|transparent)(?:-(\d{2,3}))?\b/,
  // Arbitrary values
  arbitrary: /\[([^\]]+)\]/,
  // Background
  bg: /\bbg-/,
  // Text
  text: /\btext-/,
  // Border
  border: /\bborder(?:-[lrtbxy])?-?/,
  // Spacing (padding/margin)
  spacing: /\b[pm][xytblr]?-/,
  // Size (width/height)
  size: /\b[hw]-/,
  // Flex
  flex: /\b(flex|items-|justify-|gap-)/,
  // Border radius
  rounded: /\brounded/,
  // Font
  font: /\b(font-|italic|bold)/,
  // Other utilities
  other: /\b(shadow|opacity|overflow|relative|absolute|fixed|z-)/,
};

// Color palette for different class types - using neutral/muted tones
const syntaxColors = {
  bg: "text-foreground",
  text: "text-foreground",
  border: "text-foreground/80",
  spacing: "text-foreground/70",
  size: "text-foreground/70",
  rounded: "text-foreground/80",
  flex: "text-foreground/70",
  font: "text-foreground/80",
  arbitrary: "text-foreground font-medium",
  color: "text-foreground",
  separator: "text-muted-foreground/40",
  default: "text-foreground/60",
};

// URL syntax colors - neutral theme
const urlColors = {
  protocol: "text-muted-foreground/60",
  domain: "text-muted-foreground",
  path: "text-foreground font-medium",
  paramKey: "text-muted-foreground",
  paramValue: "text-foreground",
  separator: "text-muted-foreground/40",
};

/**
 * Categorize a Tailwind class and return its color
 */
function getClassColor(className: string): string {
  if (classPatterns.arbitrary.test(className)) {
    return syntaxColors.arbitrary;
  }
  if (classPatterns.bg.test(className)) {
    return syntaxColors.bg;
  }
  if (classPatterns.text.test(className)) {
    return syntaxColors.text;
  }
  if (classPatterns.border.test(className)) {
    return syntaxColors.border;
  }
  if (classPatterns.spacing.test(className)) {
    return syntaxColors.spacing;
  }
  if (classPatterns.size.test(className)) {
    return syntaxColors.size;
  }
  if (classPatterns.rounded.test(className)) {
    return syntaxColors.rounded;
  }
  if (classPatterns.flex.test(className)) {
    return syntaxColors.flex;
  }
  if (classPatterns.font.test(className)) {
    return syntaxColors.font;
  }
  return syntaxColors.default;
}

/**
 * Render highlighted Tailwind classes (comma-separated)
 */
export function TailwindClassHighlight({ value }: { value: string }) {
  if (!value) return null;

  const classes = value.split(",");

  return (
    <span className="font-mono">
      {classes.map((cls, i) => (
        <React.Fragment key={i}>
          <span className={getClassColor(cls.trim())}>{cls.trim()}</span>
          {i < classes.length - 1 && (
            <span className={syntaxColors.separator}>,</span>
          )}
        </React.Fragment>
      ))}
    </span>
  );
}

/**
 * Render highlighted URL with Tailwind classes in query params
 */
export function UrlHighlight({ url }: { url: string }) {
  if (!url) return null;

  try {
    // Pre-process URL to handle unencoded '#' which breaks URL parsing (treats as hash)
    // Replace '#' with '%23' ONLY in the query string part for parsing purposes
    let urlString = url;
    if (url.includes("#") && !url.includes("%23")) {
      // Simple heuristic: if we have a '?' and '#' appears after it, it's likely part of a param
      const queryIndex = url.indexOf("?");
      if (queryIndex !== -1) {
        const path = url.slice(0, queryIndex);
        const query = url.slice(queryIndex);
        urlString = path + query.replace(/#/g, "%23");
      }
    }

    // Parse the URL
    const urlObj = new URL(urlString, window.location.origin);
    const protocol = urlObj.protocol + "//";
    const host = urlObj.host;
    const pathname = decodeURIComponent(urlObj.pathname);

    // Parse query params
    const params: Array<{ key: string; value: string }> = [];
    urlObj.searchParams.forEach((value, key) => {
      params.push({ key, value: decodeURIComponent(value) });
    });

    return (
      <span className="font-mono text-sm">
        <span className={urlColors.protocol}>{protocol}</span>
        <span className={urlColors.domain}>{host}</span>
        <span className={urlColors.path}>{pathname}</span>
        {params.length > 0 && (
          <>
            <span className={urlColors.separator}>?</span>
            {params.map((param, i) => (
              <React.Fragment key={param.key}>
                <span className={urlColors.paramKey}>{param.key}</span>
                <span className={urlColors.separator}>=</span>
                {param.key.includes("Style") || param.key === "icon" ? (
                  <TailwindClassHighlight value={param.value} />
                ) : (
                  <span className={urlColors.paramValue}>{param.value}</span>
                )}
                {i < params.length - 1 && (
                  <span className={urlColors.separator}>&</span>
                )}
              </React.Fragment>
            ))}
          </>
        )}
      </span>
    );
  } catch {
    // Fallback for invalid URLs
    return <span className="font-mono text-sm">{url}</span>;
  }
}

/**
 * Custom Input with Tailwind syntax overlay
 * Shows highlighted Tailwind classes while allowing editing
 */
interface TailwindInputProps extends Omit<
  React.ComponentProps<"input">,
  "onChange"
> {
  value: string;
  onChange: (value: string) => void;
}

export function TailwindInput({
  value,
  onChange,
  className,
  ...props
}: TailwindInputProps) {
  const [isFocused, setIsFocused] = React.useState(false);

  return (
    <div className="relative">
      {/* Visible highlighted layer (behind input) */}
      {!isFocused && value && (
        <div
          className={cn(
            "absolute inset-0 flex items-center px-3 py-1 pointer-events-none overflow-hidden",
            "border border-transparent rounded-md",
            className,
          )}
        >
          <TailwindClassHighlight value={value} />
        </div>
      )}

      {/* Actual input */}
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        className={cn(
          "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm font-mono",
          "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
          "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
          // Make text transparent when showing highlight layer
          !isFocused && value ? "text-transparent caret-foreground" : "",
          className,
        )}
        {...props}
      />
    </div>
  );
}

/**
 * Custom Textarea with Tailwind syntax overlay
 */
interface TailwindTextareaProps extends Omit<
  React.ComponentProps<"textarea">,
  "onChange"
> {
  value: string;
  onChange: (value: string) => void;
}

export function TailwindTextarea({
  value,
  onChange,
  className,
  ...props
}: TailwindTextareaProps) {
  const [isFocused, setIsFocused] = React.useState(false);
  const textareaRef = React.useRef<HTMLTextAreaElement>(null);

  // Auto-resize textarea to fit content
  React.useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "auto";
      textarea.style.height = `${textarea.scrollHeight}px`;
    }
  }, [value]);

  return (
    <div className="relative">
      {/* Visible highlighted layer (behind textarea) */}
      {!isFocused && value && (
        <div
          className={cn(
            "absolute inset-0 flex items-start px-3 py-2 pointer-events-none",
            "border border-transparent rounded-md text-xs leading-relaxed break-all",
            className,
          )}
        >
          <TailwindClassHighlight value={value} />
        </div>
      )}

      {/* Actual textarea */}
      <textarea
        ref={textareaRef}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        className={cn(
          "placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input w-full min-w-0 rounded-md border bg-transparent px-3 py-2 text-xs shadow-xs transition-[color,box-shadow] outline-none disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 font-mono resize-none leading-relaxed overflow-hidden",
          "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
          "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
          // Make text transparent when showing highlight layer
          !isFocused && value ? "text-transparent caret-foreground" : "",
          className,
        )}
        {...props}
      />
    </div>
  );
}
