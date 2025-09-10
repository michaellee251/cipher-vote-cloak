import { Lock, Shield, Settings, Vote } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLocation } from "react-router-dom";
import { ConnectButton } from '@rainbow-me/rainbowkit';

const Header = () => {
  const location = useLocation();
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-card/80 backdrop-blur-sm">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo/Brand */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 bg-gradient-to-r from-purple-600 to-blue-600 p-2 rounded-lg">
            <Lock className="h-5 w-5 text-white" />
            <Shield className="h-4 w-4 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              🔒 Cipher Vote Cloak
            </h1>
            <p className="text-xs text-muted-foreground">FHE Protected Voting</p>
          </div>
        </div>

        {/* Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          <a 
            href="/" 
            className={`transition-colors ${
              location.pathname === "/" 
                ? "text-foreground font-medium" 
                : "text-muted-foreground hover:text-primary"
            }`}
          >
            <Vote className="h-4 w-4 inline mr-1" />
            Vote Sessions
          </a>
          <a 
            href="/create" 
            className={`transition-colors ${
              location.pathname === "/create" 
                ? "text-foreground font-medium" 
                : "text-muted-foreground hover:text-primary"
            }`}
          >
            Create Session
          </a>
          <a 
            href="/results" 
            className={`transition-colors ${
              location.pathname === "/results" 
                ? "text-foreground font-medium" 
                : "text-muted-foreground hover:text-primary"
            }`}
          >
            Results
          </a>
        </nav>

        {/* Right side */}
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="sm">
            <Settings className="h-4 w-4" />
          </Button>
          <ConnectButton />
        </div>
      </div>
    </header>
  );
};

export default Header;
