import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Wind, Sun, Moon, ExternalLink } from "lucide-react";

interface HeaderProps {
  isDark: boolean;
  onToggleTheme: () => void;
}

export function Header({ isDark, onToggleTheme }: HeaderProps) {
  return (
    <header className="h-12 border-b border-border flex items-center justify-between px-4 shrink-0">
      <div className="flex items-center gap-2">
        <Wind className="h-5 w-5 text-primary" />
        <span className="font-semibold">
          Badge<span className="text-primary">wind</span> Studio
        </span>
      </div>

      <div className="flex items-center gap-2">
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8"
          onClick={onToggleTheme}
        >
          {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
        </Button>
        <Separator orientation="vertical" className="h-6" />
        <a
          href="https://icon-sets.iconify.design/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Button variant="ghost" size="sm" className="h-8 gap-1.5 text-xs">
            Icons <ExternalLink className="h-3 w-3" />
          </Button>
        </a>
        <a
          href="https://github.com/jaredh159/tailwind-react-native-classnames/blob/master/supported-utilities.md"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Button variant="ghost" size="sm" className="h-8 gap-1.5 text-xs">
            Tailwind <ExternalLink className="h-3 w-3" />
          </Button>
        </a>
      </div>
    </header>
  );
}
