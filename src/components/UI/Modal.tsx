import { ReactNode, useEffect } from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  title?: string;
}

export const Modal = ({
  isOpen,
  onClose,
  children,
  title,
}: ModalProps) => {
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

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="rounded-[28px] max-w-2xl w-full max-h-[90vh] overflow-y-auto animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
        style={{
          background: 'rgba(255, 255, 255, 0.95)',
          backdropFilter: 'blur(20px)',
          boxShadow: '0 20px 60px rgba(102, 126, 234, 0.2), 0 0 1px rgba(198, 175, 255, 0.3)',
          border: '1px solid rgba(255, 255, 255, 0.6)',
        }}
      >
        {title && (
          <div className="sticky top-0 px-8 py-5 flex items-center justify-between" style={{
            background: 'rgba(166, 207, 241, 0.1)',
            borderBottom: '1px solid rgba(166, 207, 241, 0.2)',
          }}>
            <h2 className="text-2xl font-bold" style={{ color: '#2D2D7A' }}>{title}</h2>
            <button
              onClick={onClose}
              className="transition-all p-2 rounded-full"
              style={{ color: '#9CA3AF' }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(198, 175, 255, 0.15)';
                e.currentTarget.style.color = '#2D2D7A';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'transparent';
                e.currentTarget.style.color = '#9CA3AF';
              }}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
          </div>
        )}
        <div className="p-8">{children}</div>
      </div>
    </div>
  );
};
