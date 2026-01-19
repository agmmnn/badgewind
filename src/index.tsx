/** @jsxImportSource hono/jsx */
import { Hono } from "hono";
import { cache } from "hono/cache";
import { cors } from "hono/cors";
import satori from "satori";

import { Badge } from "./components/Badge";

// Verdana font URL (default font - fastest and most compatible)
const VERDANA_FONT_URL =
  "https://raw.githubusercontent.com/eellak/OpenLab_Website/refs/heads/master/fonts/Verdana/Verdana.woff";

// Fontsource fonts via jsDelivr - direct WOFF file links
// Format: https://cdn.jsdelivr.net/npm/@fontsource/{font}/files/{font}-latin-400-normal.woff
const FONTSOURCE_FONTS: Record<
  string,
  { package: string; displayName: string }
> = {
  inter: { package: "inter", displayName: "Inter" },
  roboto: { package: "roboto", displayName: "Roboto" },
  poppins: { package: "poppins", displayName: "Poppins" },
  "fira-code": { package: "fira-code", displayName: "Fira Code" },
  "jetbrains-mono": {
    package: "jetbrains-mono",
    displayName: "JetBrains Mono",
  },
  "ibm-plex-mono": { package: "ibm-plex-mono", displayName: "IBM Plex Mono" },
  "source-code-pro": {
    package: "source-code-pro",
    displayName: "Source Code Pro",
  },
  nunito: { package: "nunito", displayName: "Nunito" },
  lato: { package: "lato", displayName: "Lato" },
  "open-sans": { package: "open-sans", displayName: "Open Sans" },
  montserrat: { package: "montserrat", displayName: "Montserrat" },
  raleway: { package: "raleway", displayName: "Raleway" },
  ubuntu: { package: "ubuntu", displayName: "Ubuntu" },
  "dm-sans": { package: "dm-sans", displayName: "DM Sans" },
  "space-grotesk": { package: "space-grotesk", displayName: "Space Grotesk" },
  "gravitas-one": { package: "gravitas-one", displayName: "Gravitas One" },
};

// Cache for font data
const fontDataCache = new Map<string, ArrayBuffer>();

async function getFontData(
  fontKey?: string,
): Promise<{ data: ArrayBuffer; name: string }> {
  // Default to Verdana (or no font specified)
  if (!fontKey || fontKey === "verdana") {
    const cacheKey = "verdana";
    if (fontDataCache.has(cacheKey)) {
      return { data: fontDataCache.get(cacheKey)!, name: "Verdana" };
    }

    try {
      const response = await fetch(VERDANA_FONT_URL);
      if (!response.ok) {
        throw new Error(`Failed to fetch Verdana: ${response.status}`);
      }
      const data = await response.arrayBuffer();
      fontDataCache.set(cacheKey, data);
      return { data, name: "Verdana" };
    } catch (e) {
      console.error("Failed to fetch Verdana font:", e);
      // Fallback to Inter if Verdana fails
      return getFontData("inter");
    }
  }

  // Fontsource font via jsDelivr
  const fontConfig = FONTSOURCE_FONTS[fontKey];
  if (!fontConfig) {
    // Unknown font, fallback to Verdana
    return getFontData("verdana");
  }

  if (fontDataCache.has(fontKey)) {
    return {
      data: fontDataCache.get(fontKey)!,
      name: fontConfig.displayName,
    };
  }

  try {
    // Fetch WOFF file directly from Fontsource via jsDelivr npm
    const fontUrl = `https://cdn.jsdelivr.net/npm/@fontsource/${fontConfig.package}/files/${fontConfig.package}-latin-400-normal.woff`;
    const fontResponse = await fetch(fontUrl);

    if (!fontResponse.ok) {
      console.error(`Failed to fetch font ${fontKey}: ${fontResponse.status}`);
      return getFontData("verdana");
    }

    const data = await fontResponse.arrayBuffer();
    fontDataCache.set(fontKey, data);
    return { data, name: fontConfig.displayName };
  } catch (e) {
    console.error("Failed to fetch font:", e);
    return getFontData("verdana");
  }
}

// Generate Fontsource @import CSS for SVG embedding
function getFontImport(fontKey?: string): string {
  if (!fontKey || fontKey === "verdana") return "";

  const fontConfig = FONTSOURCE_FONTS[fontKey];
  if (!fontConfig) return "";

  // Use Fontsource CSS via jsDelivr for @import in SVG
  return `@import url('https://cdn.jsdelivr.net/fontsource/fonts/${fontConfig.package}@latest/latin.css');`;
}

// Cache for icon data
const iconCache = new Map<string, string>();

async function getIconData(
  iconSet: string,
  iconName: string,
): Promise<{ icon: string } | null> {
  const cacheKey = `${iconSet}:${iconName}`;
  try {
    if (iconCache.has(cacheKey)) {
      return { icon: iconCache.get(cacheKey)! };
    }

    // Fetch raw SVG from Iconify
    const response = await fetch(
      `https://api.iconify.design/${iconSet}/${iconName}.svg`,
    );
    if (!response.ok) return null;

    const svgText = await response.text();
    if (!svgText.startsWith("<svg")) return null;

    iconCache.set(cacheKey, svgText);
    return { icon: svgText };
  } catch (e) {
    console.error("Failed to fetch icon:", e);
    return null;
  }
}

const app = new Hono();

// Enable CORS for badge embedding
app.use("*", cors());

// Cache badges at the edge for 1 year (they're immutable based on URL)
app.get("/:text", async (c, next) => {
  const url = new URL(c.req.url);
  if (url.hostname === "localhost" || url.hostname === "127.0.0.1") {
    await next();
  } else {
    return cache({
      cacheName: "badgewind",
      cacheControl: "public, max-age=31536000, immutable",
    })(c, next);
  }
});

// Main badge route
app.get("/:text", async (c) => {
  const text = c.req.param("text");
  const query = new URL(c.req.url).searchParams;

  // Get icon data if specified
  const iconParam = query.get("icon");
  let iconData = null;

  if (iconParam) {
    const [iconSet, iconName] = iconParam.split(":");
    if (iconSet && iconName) {
      iconData = await getIconData(iconSet, iconName);
    }
  }

  // Get font data (supports ?font=inter, ?font=roboto, etc.)
  const fontKey = query.get("font")?.toLowerCase();
  const { data: fontData, name: fontName } = await getFontData(fontKey);
  const fontImport = getFontImport(fontKey);

  // @ts-ignore - satori 0.12.1 doesn't require height/width but types still expect it
  let svg = await satori(
    <Badge text={text} query={query} iconData={iconData} />,
    // @ts-ignore
    {
      embedFont: false,
      fonts: [
        {
          name: fontName,
          data: fontData,
        },
      ],
    },
  );

  // Fix font-family in SVG output
  svg = svg.replaceAll(
    'font-family="serif"',
    `font-family="${fontName}, sans-serif" text-rendering="geometricPrecision"`,
  );

  // Inject Google Fonts @import into SVG if using a web font
  if (fontImport) {
    svg = svg.replace("<svg ", `<svg `);
    // Inject defs with style for font import
    const defsStyle = `<defs><style type="text/css">${fontImport}</style></defs>`;
    svg = svg.replace(/>/, `>${defsStyle}`);
  }

  // Fix the SVG viewBox to match actual content dimensions
  const innerWidthMatch = svg.match(
    /<div[^>]*style="[^"]*width:\s*(\d+(?:\.\d+)?)px/,
  );
  const innerHeightMatch = svg.match(
    /<div[^>]*style="[^"]*height:\s*(\d+(?:\.\d+)?)px/,
  );

  if (innerWidthMatch && innerHeightMatch) {
    const contentWidth = Math.ceil(parseFloat(innerWidthMatch[1]));
    const contentHeight = Math.ceil(parseFloat(innerHeightMatch[1]));

    svg = svg
      .replace(/width="\d+"/, `width="${contentWidth}"`)
      .replace(/height="\d+"/, `height="${contentHeight}"`)
      .replace(
        /viewBox="[^"]*"/,
        `viewBox="0 0 ${contentWidth} ${contentHeight}"`,
      );
  }

  return c.body(svg, {
    headers: {
      "Content-Type": "image/svg+xml",
      // do not cache when it is localhost
      "Cache-Control":
        c.req.url.includes("localhost") || c.req.url.includes("127.0.0.1")
          ? "no-cache, no-store, must-revalidate"
          : "public, max-age=31536000, immutable",
    },
  });
});

// Home route - simple info page (will be replaced with badge studio later)
app.get("/", (c) => {
  return c.html(``);
});

export default app;
