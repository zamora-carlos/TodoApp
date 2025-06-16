import { useState, useEffect, useRef } from 'react';
import { HiOutlineMenuAlt2 } from 'react-icons/hi';
import { RxDashboard } from 'react-icons/rx';
import { FiCheckSquare } from 'react-icons/fi';
import { IoClose } from 'react-icons/io5';
import useClickOutside from '@hooks/useClickOutside';
import useFocusTrap from '@hooks/useFocusTrap';

function SidebarMenu() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeLink, setActiveLink] = useState('Dashboard');
  const sidebarRef = useRef<HTMLElement>(null);

  useFocusTrap(sidebarRef, isMobileMenuOpen);
  useClickOutside(sidebarRef, () => {
    if (isMobileMenuOpen) {
      setIsMobileMenuOpen(false);
    }
  });

  const menuItems = [
    { name: 'Dashboard', icon: RxDashboard },
    { name: 'Todos', icon: FiCheckSquare },
  ];

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  // Close sidebar on Escape key press
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape' && isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
    }

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isMobileMenuOpen]);

  const handleLinkClick = (linkName: string) => {
    setActiveLink(linkName);
    setIsMobileMenuOpen(false); // Close mobile menu when link is clicked
  };

  return (
    <div className="flex min-h-screen bg-slate-50">
      {/* Mobile Hamburger Button */}
      <button
        onClick={() => setIsMobileMenuOpen(true)}
        className="hamburger-btn fixed top-4 left-4 z-50 xl:hidden w-10 h-10 flex items-center justify-center bg-white border border-slate-300 rounded-lg shadow-sm hover:bg-slate-50 transition-colors cursor-pointer"
        aria-label="Open menu"
      >
        <HiOutlineMenuAlt2 className="w-5 h-5 text-slate-600" />
      </button>

      {/* Mobile Backdrop */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-slate-400/50 z-40 xl:hidden transition-opacity"
          aria-hidden="true"
        />
      )}

      {/* Sidebar */}
      <aside
        ref={sidebarRef}
        className={`
          sidebar-content fixed xl:static top-0 bottom-0 left-0 z-50 w-9/10 max-w-[24rem]
          bg-white border-r border-slate-200 shadow-lg xl:shadow-none
          transform transition-transform duration-300 ease-in-out
          xl:transform-none xl:translate-x-0
          ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}
        `}
      >
        {/* Mobile Close Button */}
        <button
          onClick={() => setIsMobileMenuOpen(false)}
          className="absolute top-2 right-2 w-8 h-8 flex items-center justify-center border border-slate-300 rounded-xl hover:bg-slate-100 group cursor-pointer xl:hidden transition-colors"
          aria-label="Close menu"
        >
          <IoClose className="text-slate-500 group-hover:rotate-90 transition-transform" />
        </button>

        {/* Sidebar Header */}
        <div className="p-6 border-b border-slate-100">
          <h2 className="text-xl font-semibold text-slate-800">Navigation</h2>
        </div>

        {/* Navigation Links */}
        <nav className="p-4">
          <ul className="space-y-2">
            {menuItems.map(item => {
              const IconComponent = item.icon;
              const isActive = activeLink === item.name;

              return (
                <li key={item.name}>
                  <button
                    onClick={() => handleLinkClick(item.name)}
                    className={`
                      flex items-center gap-3 px-4 py-3 rounded-lg transition-colors duration-200
                      text-left w-full group cursor-pointer border border-transparent
                      ${
                        isActive
                          ? 'bg-indigo-50 text-indigo-600 border border-indigo-200'
                          : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                      }
                    `}
                    aria-current={isActive ? 'page' : undefined}
                  >
                    <IconComponent
                      className={`
                        w-5 h-5 transition-colors
                        ${isActive ? 'text-indigo-500' : 'text-slate-400 group-hover:text-slate-600'}
                      `}
                    />
                    <span className="font-medium">{item.name}</span>
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>
      </aside>
    </div>
  );
}

export default SidebarMenu;
