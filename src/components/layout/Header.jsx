// Header.jsx
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/images/logo.png";
import Icon from "../ui/Icon.jsx";
import SearchFill from "../../assets/icons/fill/SearchFill.jsx";
import UserFill from "../../assets/icons/fill/UserFill.jsx";
import BarsFill from "../../assets/icons/fill/BarsFill.jsx";
import MobileMenu from "./MobileMenu.jsx";
import SearchOverlay from "../search/SearchBox.jsx";

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow =
      isMobileMenuOpen || isSearchOpen ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen, isSearchOpen]);

  return (
    <>
      <header className="bg-white xl:p-8 xl:rounded-3xl flex justify-between items-center p-4 rounded-xl">
        {/* Navigation Links */}
        <nav className="xl:flex items-center gap-4 font-semibold hidden">
          <Link to="collection/all-products">All Products</Link>
          <Link to="collection/cardboard-boxes">Cardboard Boxes</Link>
          <Link to="collection/mailing-bags">Mailing Bags</Link>
          <Link to="collection/envelopes">Envelopes</Link>
          <Link to="collection/tapes">Tapes</Link>
          <Link to="collection/labels">Labels</Link>
        </nav>

        {/* Mobile Menu Icon */}
        <div className="block xl:hidden">
          <Icon variant="text" onClick={() => setIsMobileMenuOpen(true)}>
            <BarsFill />
          </Icon>
        </div>

        {isMobileMenuOpen && (
          <button
            type="button"
            aria-label="Close mobile menu"
            className="xl:hidden fixed inset-0 z-40 bg-black/60"
            onClick={() => setIsMobileMenuOpen(false)}
          />
        )}

        <MobileMenu
          isOpen={isMobileMenuOpen}
          onClose={() => setIsMobileMenuOpen(false)}
        />

        {/* Logo */}
        <div className="xl:w-32 xl:h-8 w-20 h-5">
          <Link to="/">
            <img src={logo} alt="logo" />
          </Link>
        </div>

        {/* Right Side Icons & Cart Count */}
        <div className="flex xl:gap-10 items-center gap-3">
          <Icon variant="text" onClick={() => setIsSearchOpen(true)}>
            <SearchFill />
          </Icon>
          <Icon variant="text">
            <UserFill />
          </Icon>
          <div className="w-8 h-8 bg-(--color-yellow) flex items-center justify-center rounded-full">
            <p>1</p>
          </div>
        </div>
      </header>

      <SearchOverlay
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
      />
    </>
  );
};

export default Header;