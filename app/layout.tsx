import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'SPRNG Energy DSM Portal',
  description: 'Unified DSM Automation & Renewable Energy Management System',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <header className="bg-gray-800 p-4 border-b border-gray-700">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-yellow-500 rounded-full flex items-center justify-center">
                <span className="text-2xl">⚡</span>
              </div>
              <div>
                <h1 className="text-xl font-bold text-white">SPRNG Energy DSM Portal</h1>
                <p className="text-xs text-gray-400">Unified Management System</p>
              </div>
            </div>
          </div>
        </header>
        <main>{children}</main>
        <footer className="bg-gray-800 p-4 border-t border-gray-700 mt-12">
          <div className="max-w-7xl mx-auto text-center text-sm text-gray-400">
            © 2025 SPRNG Energy. CERC DSM 2024 Compliant | Replaces RE50Hertz, Reconnect, Regent Climate
          </div>
        </footer>
      </body>
    </html>
  );
}
