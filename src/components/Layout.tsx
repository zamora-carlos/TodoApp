import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import SidebarMenu from '@common/SidebarMenu';
import Header from '@components/Header';

function Layout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-white">
      <SidebarMenu
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />
      <div className="flex-1 flex flex-col overflow-x-hidden">
        <Header onOpenSidebar={() => setIsSidebarOpen(true)} />
        <main className="my-12 w-9/10 max-w-6xl mx-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default Layout;
