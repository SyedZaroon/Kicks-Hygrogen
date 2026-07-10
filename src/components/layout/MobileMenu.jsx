import React from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/images/logo.png";

const MobileMenu = ({ isOpen, onClose }) => {
  const menuItems = [
    { label: "All Products", to: "/collection/all-products" },
    { label: "Cardboard Boxes", to: "/collection/cardboard-boxes" },
    { label: "Mailing Bags", to: "/collection/mailing-bags" },
    { label: "Envelopes", to: "/collection/envelopes" },
    { label: "Tapes", to: "/collection/tapes" },
    { label: "Labels", to: "/collection/labels" },
  ];

  return (
    <div
      className={`xl:hidden fixed inset-y-0 left-0 z-50 w-[80%] max-w-[320px] bg-white shadow-2xl transition-transform duration-300 ease-out ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      <div className="flex items-center justify-between border-b border-(--color-gray) px-4 py-4">
        <div className="xl:w-32 xl:h-8 w-20 h-5">
          <Link to="/">
            <img src={logo} alt="logo" />
          </Link>
        </div>
        <button
          type="button"
          aria-label="Close menu"
          onClick={onClose}
          className="text-2xl leading-none"
        >
          ×
        </button>
      </div>

      <nav className="flex flex-col gap-2 p-4">
        {menuItems.map((item) => (
          <Link
            key={item.to}
            to={item.to}
            onClick={onClose}
            className="rounded-xl px-3 py-3 text-base font-medium text-(--color-darkgray) transition hover:bg-(--color-gray)"
          >
            {item.label}
          </Link>
        ))}
      </nav>
    </div>
  );
};

export default MobileMenu;
