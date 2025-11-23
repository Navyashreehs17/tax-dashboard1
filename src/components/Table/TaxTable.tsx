import { useState } from 'react';
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  flexRender,
  SortingState,
  ColumnFiltersState,
} from '@tanstack/react-table';
import { Tax } from '../../types/Tax';
import { columns } from './columns';
import { LucideArrowUp, LucideArrowDown, LucideFilter } from 'lucide-react';

interface TaxTableProps {
  data: Tax[];
  onEdit: (tax: Tax) => void;
}

export const TaxTable = ({ data, onEdit }: TaxTableProps) => {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [filterValue, setFilterValue] = useState('');
  const [showFilter, setShowFilter] = useState(false);

  const table = useReactTable({
    data,
    columns: columns(onEdit),
    state: {
      sorting,
      columnFilters,
    },
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  });

  const handleCountryFilter = (value: string) => {
    setFilterValue(value);
    if (value) {
      setColumnFilters([{ id: 'country', value }]);
    } else {
      setColumnFilters([]);
    }
  };

  const uniqueCountries = Array.from(
    new Set(data.map((item) => item.country).filter(Boolean))
  ).sort();

  return (
    <div className="w-full">
      <div
        className="rounded-[30px] overflow-hidden"
        style={{
          background: 'rgba(255, 255, 255, 0.75)',
          backdropFilter: 'blur(20px)',
          boxShadow: '0 10px 40px rgba(99, 102, 241, 0.1), 0 2px 12px rgba(99, 102, 241, 0.05)',
          border: '1px solid rgba(255, 255, 255, 0.8)',
        }}
      >
        <div className="overflow-x-auto">
          <table className="w-full min-w-[800px]">
            <thead className="sticky top-0 z-10">
              <tr
                style={{
                  background: 'linear-gradient(90deg, rgba(180, 230, 230, 0.4) 0%, rgba(240, 200, 230, 0.4) 100%)',
                  borderBottom: 'none',
                }}
              >
                {table.getHeaderGroups().map((headerGroup) =>
                  headerGroup.headers.map((header) => (
                    <th
                      key={header.id}
                      className="px-8 py-6 text-left text-xs font-bold uppercase tracking-wider"
                      style={{ color: '#4B5563', letterSpacing: '0.1em' }}
                    >
                      <div className="flex items-center gap-2">
                        {header.isPlaceholder ? null : (
                          <>
                            <div
                              className={`flex items-center gap-2 ${
                                header.column.getCanSort() ? 'cursor-pointer select-none' : ''
                              }`}
                              onClick={header.column.getToggleSortingHandler()}
                            >
                              {flexRender(
                                header.column.columnDef.header,
                                header.getContext()
                              )}
                              {header.column.getCanSort() && (
                                <span style={{ color: '#64748b' }}>
                                  {header.column.getIsSorted() === 'asc' ? (
                                    <LucideArrowUp className="w-4 h-4" />
                                  ) : header.column.getIsSorted() === 'desc' ? (
                                    <LucideArrowDown className="w-4 h-4" />
                                  ) : (
                                    <span className="text-lg opacity-70">⇅</span>
                                  )}
                                </span>
                              )}
                            </div>
                            {header.column.id === 'country' && (
                              <div className="relative">
                                <button
                                  onClick={() => setShowFilter(!showFilter)}
                                  className="p-1.5 rounded-full transition-all"
                                  style={{
                                    background: showFilter ? 'rgba(123, 77, 255, 0.15)' : 'transparent',
                                    boxShadow: showFilter ? '0 0 12px rgba(123, 77, 255, 0.3)' : 'none',
                                  }}
                                  title="Filter by country"
                                >
                                  <LucideFilter className="w-4 h-4" style={{ color: '#7B4DFF' }} />
                                </button>
                                {showFilter && (
                                  <div
                                    className="absolute right-0 mt-2 w-64 bg-white rounded-2xl shadow-2xl z-50 border-2 border-indigo-100 overflow-hidden"
                                    style={{ maxHeight: '300px' }}
                                  >
                                    <div className="p-4 bg-gradient-to-r from-indigo-50 to-purple-50 border-b-2 border-indigo-100">
                                      <p className="text-sm font-bold text-slate-900">Filter by Country</p>
                                      {filterValue && (
                                        <button
                                          onClick={() => handleCountryFilter('')}
                                          className="text-xs text-indigo-600 hover:text-indigo-800 font-semibold mt-1"
                                        >
                                          Clear Filter
                                        </button>
                                      )}
                                    </div>
                                    <div className="overflow-y-auto" style={{ maxHeight: '250px' }}>
                                      {uniqueCountries.map((country) => (
                                        <button
                                          key={country}
                                          onClick={() => {
                                            handleCountryFilter(country);
                                            setShowFilter(false);
                                          }}
                                          className={`w-full text-left px-4 py-3 hover:bg-indigo-50 transition-colors ${
                                            filterValue === country
                                              ? 'bg-indigo-100 font-bold text-indigo-700'
                                              : 'text-slate-800'
                                          }`}
                                        >
                                          {country}
                                        </button>
                                      ))}
                                    </div>
                                  </div>
                                )}
                              </div>
                            )}
                          </>
                        )}
                      </div>
                    </th>
                  ))
                )}
              </tr>
            </thead>
            <tbody>
              {table.getRowModel().rows.map((row, index) => (
                <tr
                  key={row.id}
                  className="transition-all duration-300 border-b last:border-0"
                  style={{
                    borderColor: 'rgba(237, 229, 250, 0.3)',
                    animation: `fadeIn 0.4s ease-out ${index * 0.05}s backwards`,
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.5)';
                    e.currentTarget.style.transform = 'translateY(-1px)';
                    e.currentTarget.style.boxShadow = '0 2px 8px rgba(99, 102, 241, 0.08)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'transparent';
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                >
                  {row.getVisibleCells().map((cell) => (
                    <td
                      key={cell.id}
                      className="px-8 py-7 text-slate-900 align-middle"
                    >
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
