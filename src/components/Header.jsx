import { useState } from "react";
import Logo from "../assets/images/Logo.png";
import { NavLink } from "react-router-dom";

const navLinks = [
  { to: "/home", label: "Home" },
  { to: "/Our-menu", label: "Our Menu" },
  { to: "/Contact-Us", label: "Contact Us" },
];

const navLinkClass = ({ isActive }) =>
  `relative font-nunito text-base lg:text-lg font-semibold transition-colors after:absolute after:bottom-[-4px] after:left-0 after:h-0.5 after:rounded-sm after:bg-gradient-to-r after:from-[#F03328] after:to-[#FF9E0C] after:transition-all ${
    isActive
      ? "text-[#F03328] after:w-full"
      : "text-white after:w-0 hover:text-[#FF9E0C] hover:after:w-full"
  }`;

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="sticky top-0 z-1100 mt-1 bg-[rgba(16,17,19,0.8)] text-white backdrop-blur-md border-b border-white/10 rounded-b-2xl lg:rounded-b-3xl px-4 py-2 sm:px-6 -mx-4 sm:-mx-5 shadow-[0_12px_40px_rgba(0,0,0,0.12)]">
      <div className="flex justify-between items-center gap-4">
        <NavLink to="/home" className="flex gap-2 sm:gap-3 items-center shrink-0" onClick={closeMenu}>
          <div className="w-16 sm:w-20 md:w-24 lg:w-28">
            <img 
              src={Logo} 
              alt="Gala Garden Cinema loqosu" 
              className="w-full h-auto" 
            />
          </div>
        </NavLink>

        <nav className="hidden lg:flex gap-6 xl:gap-12">
          {navLinks.map((link) => (
            <NavLink key={link.to} to={link.to} className={navLinkClass}>
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <button
            type="button"
            className="lg:hidden w-10 h-10 flex items-center justify-center rounded-xl border border-white/10 bg-white/6 text-white text-xl"
            onClick={() => setMenuOpen((prev) => !prev)}
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
          >
            <i className={`fa-solid ${menuOpen ? "fa-xmark" : "fa-bars"}`} />
          </button>
        </div>
      </div>

      {menuOpen && (
        <nav className="lg:hidden mt-4 pt-4 border-t border-white/10 flex flex-col gap-1">
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `nunito text-base font-medium px-3 py-3 rounded-xl transition-colors ${
                  isActive ? "text-white bg-white/10" : "text-white hover:bg-white/6"
                }`
              }
              onClick={closeMenu}
            >
              {link.label}
            </NavLink>
          ))}
        </nav>
      )}
    </header>
  );
}

export default Header;
