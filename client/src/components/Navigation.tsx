import { useAuth } from "@/hooks/useAuth";
import { useTheme } from "@/components/ThemeProvider";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Star, Moon, Sun, Settings, User, LogOut } from "lucide-react";
import { SiDiscord } from "react-icons/si";

interface NavigationProps {
  onNavigate?: (section: string) => void;
}

export function Navigation({ onNavigate }: NavigationProps) {
  const { user, isAuthenticated } = useAuth();
  const { theme, toggleTheme } = useTheme();

  const handleNavClick = (section: string) => {
    if (onNavigate) {
      onNavigate(section);
    } else {
      const element = document.getElementById(section);
      element?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className="fixed top-0 w-full glass-morphism z-50" data-testid="navigation">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2" data-testid="logo">
            <Star className="text-accent text-2xl" />
            <span className="text-xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Starry Events
            </span>
          </div>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            <button 
              onClick={() => handleNavClick('events')}
              className="nav-link text-foreground hover:text-accent"
              data-testid="nav-events"
            >
              Events
            </button>
            <button 
              onClick={() => handleNavClick('ranking')}
              className="nav-link text-foreground hover:text-accent"
              data-testid="nav-ranking"
            >
              Ranking
            </button>
            <button 
              onClick={() => handleNavClick('faq')}
              className="nav-link text-foreground hover:text-accent"
              data-testid="nav-faq"
            >
              FAQ
            </button>
            <button 
              onClick={() => handleNavClick('support')}
              className="nav-link text-foreground hover:text-accent"
              data-testid="nav-support"
            >
              Support
            </button>
          </div>

          {/* Auth & Theme Toggle */}
          <div className="flex items-center space-x-4">
            {/* Theme Toggle */}
            <Button 
              onClick={toggleTheme}
              variant="ghost" 
              size="icon"
              className="p-2 rounded-lg bg-muted hover:bg-muted/80"
              data-testid="theme-toggle"
            >
              {theme === "light" ? (
                <Sun className="h-4 w-4 text-foreground" />
              ) : (
                <Moon className="h-4 w-4 text-foreground" />
              )}
            </Button>

            {/* Discord Auth / User Profile */}
            {!isAuthenticated ? (
              <Button
                onClick={() => window.location.href = '/api/login'}
                className="bg-primary hover:bg-primary/90 text-primary-foreground px-6 py-2 rounded-lg font-semibold transition-all transform hover:scale-105 flex items-center space-x-2"
                data-testid="connect-discord"
              >
                <SiDiscord />
                <span>Connect Discord</span>
              </Button>
            ) : (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button 
                    variant="ghost" 
                    className="flex items-center space-x-2 p-2 rounded-lg hover:bg-muted"
                    data-testid="user-profile-menu"
                  >
                    <Avatar className="w-8 h-8">
                      <AvatarImage 
                        src={user?.profileImageUrl || ''} 
                        alt="User Avatar" 
                        data-testid="user-avatar"
                      />
                      <AvatarFallback data-testid="user-avatar-fallback">
                        {user?.discordUsername?.charAt(0) || 'U'}
                      </AvatarFallback>
                    </Avatar>
                    <span className="text-sm" data-testid="user-username">
                      {user?.discordUsername || user?.firstName || 'User'}
                    </span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="glass-morphism">
                  <DropdownMenuItem data-testid="menu-profile">
                    <User className="mr-2 h-4 w-4" />
                    <span>Profile</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem data-testid="menu-settings">
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Settings</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem 
                    onClick={() => window.location.href = '/api/logout'}
                    data-testid="menu-logout"
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Logout</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
