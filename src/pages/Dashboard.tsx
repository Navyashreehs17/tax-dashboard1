import { useTaxes } from '../hooks/useTaxes';
import { useCountries } from '../hooks/useCountries';
import { TaxTable } from '../components/Table';
import { Loader } from '../components/UI/Loader';
import { Tax } from '../types/Tax';

interface DashboardProps {
  onEdit: (taxId: string) => void;
}

export const Dashboard = ({ onEdit }: DashboardProps) => {
  const { taxes, loading: taxesLoading } = useTaxes();
  const { loading: countriesLoading } = useCountries();

  const handleEdit = (tax: Tax) => {
    onEdit(tax.id);
  };

  if (taxesLoading || countriesLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#c5e4d9] to-[#f5c5d8] flex items-center justify-center">
        <Loader />
      </div>
    );
  }

  const filteredCount = taxes.length;
  const totalCount = taxes.length;

  return (
    <div className="min-h-screen p-12 sm:p-20 font-sans" style={{
      background: 'linear-gradient(135deg, #EAF7F3 0%, #EDE5FA 100%)',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif'
    }}>
      <div className="max-w-[1400px] mx-auto">
        {/* Header */}
        <div className="mb-16 animate-in slide-in-from-left duration-500">
          <h1 className="text-6xl font-bold mb-5 leading-tight" style={{ color: '#2C2A5F', letterSpacing: '-0.8px' }}>
            Tax Entities Dashboard
          </h1>
          <p className="text-lg font-normal leading-relaxed" style={{ color: '#6B7A99' }}>
            Manage and edit customer tax information in real-time. Showing {filteredCount} of {totalCount} Records.
          </p>
        </div>

        {/* Table */}
        <div className="animate-in fade-in zoom-in-95 duration-700">
          <TaxTable data={taxes} onEdit={handleEdit} />
        </div>
      </div>
    </div>
  );
};
