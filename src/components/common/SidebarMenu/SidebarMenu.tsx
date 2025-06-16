import { useEffect, useRef } from 'react';
import { NavLink } from 'react-router-dom';
import { RxDashboard } from 'react-icons/rx';
import { FiCheckSquare } from 'react-icons/fi';
import { IoClose } from 'react-icons/io5';
import useClickOutside from '@hooks/useClickOutside';
import useFocusTrap from '@hooks/useFocusTrap';

type SidebarMenuProps = {
  isOpen: boolean;
  onClose: () => void;
};

function SidebarMenu({ isOpen, onClose }: SidebarMenuProps) {
  const sidebarRef = useRef<HTMLElement>(null);

  useFocusTrap(sidebarRef, isOpen);
  useClickOutside(sidebarRef, () => {
    if (isOpen) onClose();
  });

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // Close sidebar on Escape key press
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    }

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const menuItems = [
    { name: 'Todos', icon: FiCheckSquare, to: '/' },
    { name: 'Dashboard', icon: RxDashboard, to: '/dashboard' },
  ];

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-slate-400/50 z-40 2xl:hidden transition-opacity"
          aria-hidden="true"
        />
      )}

      {/* Sidebar */}
      <aside
        ref={sidebarRef}
        className={`
          sidebar-content fixed 2xl:static top-0 bottom-0 left-0 z-50 w-9/10 max-w-[20rem]
          bg-white border-r border-slate-200 shadow-lg 2xl:shadow-none
          transform transition-transform duration-300 ease-in-out
          2xl:transform-none 2xl:translate-x-0
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        `}
      >
        {/* Mobile Close Button */}
        <button
          onClick={onClose}
          className="absolute top-2 right-2 w-8 h-8 flex items-center justify-center border border-slate-300 rounded-xl hover:bg-slate-100 group cursor-pointer 2xl:hidden transition-colors"
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

              return (
                <li key={item.name}>
                  <NavLink
                    to={item.to}
                    onClick={onClose}
                    className={({ isActive }) => `
                      flex items-center gap-3 px-4 py-3 rounded-lg transition-colors duration-200
                      text-left w-full group cursor-pointer border border-transparent
                      ${
                        isActive
                          ? 'bg-indigo-50 text-indigo-600 border border-indigo-200'
                          : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                      }
                    `}
                  >
                    {({ isActive }) => (
                      <>
                        <IconComponent
                          className={`
                            min-w-5 h-auto transition-colors
                            ${isActive ? 'text-indigo-500' : 'text-slate-400 group-hover:text-slate-600'}
                          `}
                        />
                        <span className="font-medium">{item.name}</span>
                      </>
                    )}
                  </NavLink>
                </li>
              );
            })}
          </ul>
        </nav>
      </aside>
    </>
  );
}

export default SidebarMenu;
