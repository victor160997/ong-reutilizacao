import { ReactNode } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getAuth, signOut } from "firebase/auth";

interface MainLayoutProps {
  children?: ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const auth = getAuth();

  const isActive = (path: string) => {
    return location.pathname.startsWith(path);
  };

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      navigate('/login'); // Redireciona para a tela de login após sair
    } catch (error) {
      // Trate o erro se necessário
      console.error("Erro ao sair:", error);
    }
  };

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
          onClick={handleSignOut}
          className="ml-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
        >
          Sair
        </button>
      </footer>
    </div>
  );
};

export default MainLayout;
