import { ReactNode } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from '@/contexts/AuthContext';

interface MainLayoutProps {
  children?: ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps) => {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname.startsWith(path);
  };

  const { signOut } = useAuth();


  return (
    <div className="flex flex-col h-screen bg-gray-100">
      <main className="flex-1 overflow-y-auto pb-16">
        {children ?? <Outlet />}
      </main>

      <footer className="fixed bottom-0 w-full bg-white border-t border-gray-200 flex items-center justify-between px-4">
        <Tabs
          defaultValue={isActive('/cadastro') ? 'cadastro' : 'checagem'}
          className="w-full"
          onValueChange={(value) => {
            navigate(`/${value}`);
          }}
        >
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="cadastro">
              Cadastro
            </TabsTrigger>
            <TabsTrigger value="checagem">
              Checagem
            </TabsTrigger>
          </TabsList>
        </Tabs>
        <button
          onClick={signOut}
          className="ml-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
        >
          Sair
        </button>
      </footer>
    </div>
  );
};

export default MainLayout;
