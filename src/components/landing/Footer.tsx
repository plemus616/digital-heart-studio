import { Heart } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-12 border-t border-border/50">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo */}
          <a href="#" className="flex items-center gap-3">
            <img
              src="/logo.png"
              alt="GCloud"
              className="w-8 h-8 object-contain"
            />
            <span className="font-bold text-lg text-gradient">
              GCloud
            </span>
          </a>

          {/* Links */}
          <div className="flex items-center gap-8 text-sm text-muted-foreground">
            <a href="#servicios" className="hover:text-foreground transition-colors">
              Servicios
            </a>
            <a href="#proceso" className="hover:text-foreground transition-colors">
              Proceso
            </a>
            <a href="#nosotros" className="hover:text-foreground transition-colors">
              Nosotros
            </a>
            <a href="#contacto" className="hover:text-foreground transition-colors">
              Contacto
            </a>
          </div>

          {/* Copyright */}
          <div className="flex items-center gap-1 text-sm text-muted-foreground">
            <span>© {currentYear} GCloud</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
