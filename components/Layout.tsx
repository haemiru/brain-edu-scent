
import React from 'react';

interface LayoutProps {
  children: React.ReactNode;
  title: string;
}

const Layout: React.FC<LayoutProps> = ({ children, title }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xs">SK</span>
            </div>
            <h1 className="font-bold text-xl text-slate-800 tracking-tight">SensoryKids</h1>
          </div>
          <div className="text-sm font-medium text-slate-500">{title}</div>
        </div>
      </header>
      <main className="flex-1 max-w-4xl w-full mx-auto px-4 py-8">
        {children}
      </main>
      <footer className="bg-white border-t border-slate-200 py-6">
        <div className="max-w-4xl mx-auto px-4 text-center text-slate-400 text-sm">
          &copy; 2024 SensoryKids. 아동 감각 발달 지원 솔루션.
        </div>
      </footer>
    </div>
  );
};

export default Layout;
