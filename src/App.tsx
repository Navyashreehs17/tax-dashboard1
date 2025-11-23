import { useState, useEffect } from 'react';
import { Toaster } from 'react-hot-toast';
import { Dashboard } from './pages/Dashboard';
import { Edit } from './pages/Edit';
import './index.css';

type Page = 'dashboard' | 'edit';

function App() {
  const [currentPage, setCurrentPage] = useState<Page>('dashboard');
  const [editTaxId, setEditTaxId] = useState<string | null>(null);

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.slice(1);
      if (hash.startsWith('edit/')) {
        const id = hash.split('/')[1];
        setEditTaxId(id);
        setCurrentPage('edit');
      } else {
        setCurrentPage('dashboard');
        setEditTaxId(null);
      }
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleNavigateToEdit = (taxId: string) => {
    window.location.hash = `edit/${taxId}`;
  };

  const handleNavigateToDashboard = () => {
    window.location.hash = '';
  };

  return (
    <>
      {currentPage === 'dashboard' ? (
        <Dashboard onEdit={handleNavigateToEdit} />
      ) : currentPage === 'edit' && editTaxId ? (
        <Edit taxId={editTaxId} onBack={handleNavigateToDashboard} />
      ) : null}
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3000,
          style: {
            background: '#fff',
            color: '#1e293b',
            padding: '16px',
            borderRadius: '12px',
            boxShadow: '0 10px 40px rgba(0, 0, 0, 0.2)',
            fontWeight: '600',
          },
          success: {
            iconTheme: {
              primary: '#10b981',
              secondary: '#fff',
            },
          },
          error: {
            iconTheme: {
              primary: '#ef4444',
              secondary: '#fff',
            },
          },
        }}
      />
    </>
  );
}

export default App;
