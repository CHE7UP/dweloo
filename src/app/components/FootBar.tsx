import React from 'react';
import Link from 'next/link';
import { CustomProjectIcon, FlooringIcon, PaintingIcon, TilingIcon, TrimsIcon } from './icons/ServiceIcons';

// Define the navigation item structure
interface NavItem {
  label: string;
  href: string;
  icon: React.ReactNode;
}

interface NavItemProps {
  item: NavItem;
}

// Navigation item component that uses the pre-defined href
const NavItem: React.FC<NavItemProps> = ({ item }) => {
  return (
    <Link href={item.href}>
      <div className="flex flex-col items-center cursor-pointer">
        <div className="mb-1">{item.icon}</div>
        <span className="text-xs font-medium text-gray-700">{item.label}</span>
      </div>
    </Link>
  );
};

const FootBar: React.FC = () => {
  // Define all navigation items with their properties
  const navItems: NavItem[] = [
    {
      label: "Flooring",
      href: "/instant-flooring-quote",
      icon: (<FlooringIcon />)
    },
    {
      label: "Painting",
      href: "/instant-painting-quote",
      icon: (<PaintingIcon />)
    },
    {
      label: "Tiling",
      href: "/instant-tiling-quote",
      icon: (<TilingIcon />)
    },
    {
      label: "Trims",
      href: "/instant-trims-quote",
      icon: (<TrimsIcon />)
    },
    {
      label: "Custom Projects",
      href: "/custom-projects-quote",
      icon: (<CustomProjectIcon />)
    }
  ];

  return (
    <footer className="fixed bottom-0 left-0 w-full bg-gray-100 text-grey-700 flex justify-around items-center py-4 md:hidden z-10">
      {navItems.map((item) => (
        <NavItem key={item.label} item={item} />
      ))}
    </footer>
  );
};

export default FootBar;