/** @jsxImportSource hono/jsx */
import type { FC } from "hono/jsx";
import { twMerge } from "tailwind-merge";

/**
 * Parse SVG attributes string into an object
 */
function parseAttributes(attrString: string): Record<string, string> {
  const props: Record<string, string> = {};
  const attrRegex = /([\w-]+)=["']([^"']*)["']/g;
  let match;

  while ((match = attrRegex.exec(attrString)) !== null) {
    const [, name, value] = match;
    // Convert kebab-case to camelCase for JSX (except data- and aria-)
    if (!name.startsWith("data-") && !name.startsWith("aria-")) {
      const camelName = name.replace(/-([a-z])/g, (_, letter) =>
        letter.toUpperCase(),
      );
      props[camelName] = value;
    } else {
      props[name] = value;
    }
  }

  return props;
}

/**
 * Parse SVG string and extract viewBox, width, height, and inner content (paths, etc.)
 */
function parseSvg(svgString: string): {
  viewBox: string;
  width: string;
  height: string;
  innerContent: string;
} | null {
  // Extract viewBox
  const viewBoxMatch = svgString.match(/viewBox=["']([^"']*)["']/);
  const widthMatch = svgString.match(/\swidth=["']([^"']*)["']/);
  const heightMatch = svgString.match(/\sheight=["']([^"']*)["']/);

  // Extract inner content (everything between <svg> and </svg>)
  const innerMatch = svgString.match(/<svg[^>]*>([\s\S]*)<\/svg>/);

  if (!innerMatch) return null;

  return {
    viewBox: viewBoxMatch?.[1] || "0 0 24 24",
    width: widthMatch?.[1] || "1em",
    height: heightMatch?.[1] || "1em",
    innerContent: innerMatch[1],
  };
}

/**
 * Parse SVG inner content and convert to JSX elements
 */
function parseSvgContent(content: string): any[] {
  const elements: any[] = [];

  // Match self-closing tags: <path .../>, <circle .../>, <rect .../>, etc.
  const selfClosingRegex = /<(\w+)\s+([^>]*?)\/>/g;
  // Match open+close tags: <g ...>...</g>
  const groupRegex = /<g([^>]*)>([\s\S]*?)<\/g>/g;

  let match;

  // Parse self-closing elements
  while ((match = selfClosingRegex.exec(content)) !== null) {
    const [, tagName, attributes] = match;
    const props = parseAttributes(attributes);

    if (tagName === "path") {
      elements.push(<path key={elements.length} {...props} />);
    } else if (tagName === "circle") {
      elements.push(<circle key={elements.length} {...props} />);
    } else if (tagName === "rect") {
      elements.push(<rect key={elements.length} {...props} />);
    } else if (tagName === "line") {
      elements.push(<line key={elements.length} {...props} />);
    } else if (tagName === "polyline") {
      elements.push(<polyline key={elements.length} {...props} />);
    } else if (tagName === "polygon") {
      elements.push(<polygon key={elements.length} {...props} />);
    } else if (tagName === "ellipse") {
      elements.push(<ellipse key={elements.length} {...props} />);
    }
  }

  // Parse group elements (simplified - handles one level of nesting)
  while ((match = groupRegex.exec(content)) !== null) {
    const [, attributes, innerContent] = match;
    const props = parseAttributes(attributes);
    const children = parseSvgContent(innerContent);
    elements.push(
      <g key={elements.length} {...props}>
        {children}
      </g>,
    );
  }

  return elements;
}

interface IconElementProps {
  svg: string;
  iconStyle?: string;
}

const IconElement: FC<IconElementProps> = ({ svg, iconStyle }) => {
  const parsed = parseSvg(svg);
  if (!parsed) return null;

  const svgElements = parseSvgContent(parsed.innerContent);
  const tw = iconStyle ? { tw: iconStyle } : {};

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox={parsed.viewBox}
      fill="currentColor"
      {...tw}
    >
      {svgElements}
    </svg>
  );
};

const processStyle = (styleText: string | null): string | undefined => {
  if (styleText) {
    const processedText = styleText
      .replace("(", "[")
      .replace(")", "]")
      .replace("@", "#");
    return processedText.split("|").join(" ");
  }
};

function processText(text: string): [string, string | undefined] {
  const parts = text.split(/(?<!-)-(?!-)/);
  const replacedParts = parts.map((part) => {
    let replacedPart = part.replace(/__(?=[^ ])/g, "_");
    replacedPart = replacedPart.replace(/--/g, "-");
    replacedPart = replacedPart.replace(/_/g, " ");
    return replacedPart;
  });
  return [replacedParts[0], replacedParts[1]];
}

interface BadgeProps {
  text: string;
  query: URLSearchParams;
  iconData?: { icon: string } | null;
}

const Badge: FC<BadgeProps> = ({ text, query, iconData }) => {
  const [left, right] = processText(text);
  const badgeStyle = processStyle(query.get("badgeStyle"));
  const leftStyle = processStyle(query.get("leftStyle"));
  const rightStyle = processStyle(query.get("rightStyle"));
  const icon = query.get("icon");
  const iconStyle = processStyle(query.get("iconStyle"));

  const textShadow = query.get("textShadow");
  const textStyle =
    textShadow === "true" ? { textShadow: "0px 1px 0px rgba(1,1,1, 0.3)" } : {};

  return (
    <div
      style={{
        display: "flex",
        backgroundColor: "transparent",
        textRendering: "geometricPrecision",
      }}
    >
      <div
        // @ts-ignore - tw is a Satori extension
        tw={twMerge(
          "flex bg-transparent text-white rounded-md items-center leading-3 text-[11px]",
          badgeStyle,
        )}
      >
        <div
          // @ts-ignore - tw is a Satori extension
          tw={twMerge(
            "flex bg-[#445d87] rounded-l-md p-1 justify-center items-center text-[11px]",
            left && right ? "rounded-l-md" : "rounded-md",
            leftStyle,
          )}
        >
          {icon && iconData && (
            <IconElement
              svg={iconData.icon}
              iconStyle={twMerge(
                "h-3.5 w-3.5",
                left || right ? "mr-1" : "",
                left === "" && "mr-0",
                iconStyle && iconStyle,
              )}
            />
          )}
          {left && <div style={textStyle}>{left}</div>}
        </div>

        {right && (
          <div
            // @ts-ignore - tw is a Satori extension
            tw={twMerge(
              "flex bg-[#2f86cf] p-1 items-center leading-3 text-[11px]",
              left && right ? "rounded-r-md" : "",
              rightStyle,
            )}
          >
            <div style={textStyle}>{right}</div>
          </div>
        )}
      </div>
    </div>
  );
};

export { Badge, processStyle, processText };
