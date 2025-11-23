import { createColumnHelper } from '@tanstack/react-table';
import { Tax } from '../../types/Tax';
import { formatDate } from '../../utils/formatDate';
import { LucidePencil } from 'lucide-react';

const columnHelper = createColumnHelper<Tax>();

export const columns = (onEdit: (tax: Tax) => void) => [
  columnHelper.accessor('entity', {
    header: 'Entity',
    cell: (info) => {
      const value = info.getValue();
      return (
        <span className="font-semibold text-base cursor-pointer hover:underline transition-all" style={{ color: '#6366F1', lineHeight: '1.6' }}>
          {value || 'N/A'}
        </span>
      );
    },
  }),
  columnHelper.accessor('gender', {
    header: 'Gender',
    cell: (info) => {
      const gender = info.getValue();
      if (!gender) {
        return (
          <span className="inline-flex items-center justify-center gap-1.5 px-4 py-1.5 rounded-full text-xs min-w-[95px] font-semibold" style={{ background: '#E5E7EB', color: '#6B7280' }}>
            N/A
          </span>
        );
      }
      
      let styleProps;
      let icon;

      if (gender.toLowerCase() === 'male') {
        styleProps = {
          background: 'rgba(165, 243, 252, 0.6)',
          color: '#0891b2',
          boxShadow: 'none',
        };
        icon = '♂';
      } else if (gender.toLowerCase() === 'female') {
        styleProps = {
          background: 'rgba(252, 231, 243, 0.7)',
          color: '#ec4899',
          boxShadow: 'none',
        };
        icon = '♀';
      } else {
        styleProps = {
          background: '#E5E7EB',
          color: '#6B7280',
        };
        icon = '•';
      }

      return (
        <span
          className="inline-flex items-center justify-center gap-2 px-5 py-2 rounded-full text-xs min-w-[100px] font-semibold"
          style={{
            ...styleProps,
            boxShadow: styleProps.boxShadow || '0 1px 3px rgba(0, 0, 0, 0.05)',
          }}
        >
          <span style={{ fontSize: '0.95em' }}>{icon}</span>
          <span className="capitalize">{gender}</span>
        </span>
      );
    },
  }),
  columnHelper.accessor('requestDate', {
    header: 'Request Date',
    cell: (info) => {
      const value = info.getValue();
      return (
        <span className="font-normal text-sm" style={{ color: '#6B7280', lineHeight: '1.6' }}>
          {value ? formatDate(value) : 'N/A'}
        </span>
      );
    },
  }),
  columnHelper.accessor('country', {
    header: 'Country',
    cell: (info) => {
      const value = info.getValue();
      return (
        <span className="font-normal text-sm" style={{ color: '#374151', lineHeight: '1.6' }}>
          {value || 'N/A'}
        </span>
      );
    },
  }),
  columnHelper.display({
    id: 'actions',
    header: 'Edit',
    cell: (info) => (
      <button
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          console.log('Edit clicked for:', info.row.original);
          onEdit(info.row.original);
        }}
        className="w-11 h-11 rounded-full transition-all duration-200 flex items-center justify-center focus:outline-none group relative cursor-pointer"
        style={{
          background: 'rgba(199, 210, 254, 0.6)',
          boxShadow: '0 2px 6px rgba(99, 102, 241, 0.15)',
          border: '1px solid rgba(99, 102, 241, 0.1)',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'translateY(-2px) scale(1.08)';
          e.currentTarget.style.background = 'rgba(199, 210, 254, 0.9)';
          e.currentTarget.style.boxShadow = '0 4px 12px rgba(99, 102, 241, 0.25)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'translateY(0) scale(1)';
          e.currentTarget.style.background = 'rgba(199, 210, 254, 0.6)';
          e.currentTarget.style.boxShadow = '0 2px 6px rgba(99, 102, 241, 0.15)';
        }}
        title="Edit customer"
        type="button"
      >
        <LucidePencil className="w-4 h-4 group-hover:rotate-12 transition-transform" style={{ color: '#6366F1' }} />
      </button>
    ),
  }),
];
