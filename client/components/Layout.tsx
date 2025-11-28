import { Link, Outlet, useNavigate } from "react-router-dom";
import { Menu, X, LogOut, LogIn, Eye } from "lucide-react";
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import Footer from "@/components/Footer";
import logoImage from "@assets/echo logo_1764343027663.png";

export default function Layout() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
    setMenuOpen(false);
  };

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <header className="bg-card border-b border-border sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link to="/" className="flex items-center gap-2">
              <img 
                src={logoImage} 
                alt="Eco Engineers Logo" 
                className="h-10 w-auto object-contain"
              />
            </Link>

            <nav className="hidden md:flex items-center gap-6">
              <Link to="/" className="hover:text-primary transition">
                Home
              </Link>
              <Link to="/admin" className="hover:text-primary transition">
                Admin Panel
              </Link>
              <a href="/echo/index1.html">
                <Button
                  variant="outline"
                  size="icon"
                  className="h-8 w-8"
                >
                  <Eye size={16} />
                </Button>
              </a>
              {isAuthenticated ? (
                <div className="flex items-center gap-4">
                  <span className="text-sm text-muted-foreground">
                    Hi, {user?.name}
                  </span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleLogout}
                    className="flex items-center gap-2"
                  >
                    <LogOut size={16} />
                    Logout
                  </Button>
                </div>
              ) : (
                <Link to="/login">
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex items-center gap-2"
                  >
                    <LogIn size={16} />
                    Login
                  </Button>
                </Link>
              )}
            </nav>

            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden p-2 hover:bg-muted rounded-lg transition"
            >
              {menuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {menuOpen && (
            <nav className="md:hidden pb-4 flex flex-col gap-3 border-t border-border pt-4">
              <Link
                to="/"
                className="block px-2 py-2 hover:bg-muted rounded transition"
                onClick={() => setMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                to="/admin"
                className="block px-2 py-2 hover:bg-muted rounded transition"
                onClick={() => setMenuOpen(false)}
              >
                Admin Panel
              </Link>
              <a href="/echo/index1.html" onClick={() => setMenuOpen(false)}>
                <Button
                  variant="outline"
                  size="icon"
                  className="h-8 w-8"
                >
                  <Eye size={16} />
                </Button>
              </a>
              {isAuthenticated ? (
                <>
                  <div className="px-2 py-2 text-sm text-muted-foreground">
                    Logged in as {user?.name}
                  </div>
                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-2 px-2 py-2 hover:bg-muted rounded transition text-destructive"
                  >
                    <LogOut size={16} />
                    Logout
                  </button>
                </>
              ) : (
                <Link
                  to="/login"
                  className="flex items-center gap-2 px-2 py-2 hover:bg-muted rounded transition"
                  onClick={() => setMenuOpen(false)}
                >
                  <LogIn size={16} />
                  Login
                </Link>
              )}
            </nav>
          )}
        </div>
      </header>

      <main className="flex-1">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}
