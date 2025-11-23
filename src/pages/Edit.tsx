import { useState, useEffect } from 'react';
import { ArrowLeft, ChevronDown } from 'lucide-react';
import { useUpdateTax } from '../hooks/useUpdateTax';
import { useTaxes } from '../hooks/useTaxes';
import { useCountries } from '../hooks/useCountries';

interface EditProps {
  taxId: string;
  onBack: () => void;
}

export const Edit = ({ taxId, onBack }: EditProps) => {
  const { taxes } = useTaxes();
  const { countries } = useCountries();
  const [entity, setEntity] = useState('');
  const [country, setCountry] = useState('');
  const [errors, setErrors] = useState<{ entity?: string; country?: string }>({});
  const { updateTax, loading } = useUpdateTax();

  const tax = taxes.find(t => t.id === taxId);

  useEffect(() => {
    if (tax) {
      setEntity(tax.entity || '');
      setCountry(tax.country || '');
      setErrors({});
    }
  }, [tax]);

  const validate = () => {
    const newErrors: { entity?: string; country?: string } = {};
    
    if (!entity.trim()) {
      newErrors.entity = 'Name is required';
    }
    
    if (!country) {
      newErrors.country = 'Country is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!tax || !validate()) {
      return;
    }

    const result = await updateTax(tax.id, {
      entity: entity.trim(),
      country,
    });

    if (result) {
      onBack();
    }
  };

  const handleCancel = () => {
    if (!loading) {
      onBack();
    }
  };

  if (!tax) {
    return null;
  }

  return (
    <div
      className="min-h-screen px-8 py-16 sm:px-16 sm:py-20 lg:px-24 lg:py-24"
      style={{
        background: 'linear-gradient(135deg, #E0F7F4 0%, #F0E5FA 50%, #FFE8F0 100%)',
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
      }}
    >
      <div className="max-w-[800px] mx-auto">
        {/* Back Button */}
        <button
          onClick={handleCancel}
          disabled={loading}
          className="mb-12 inline-flex items-center gap-3 px-6 py-3.5 rounded-full text-base font-medium transition-all duration-300"
          style={{
            background: 'white',
            color: '#1F2937',
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
            cursor: loading ? 'not-allowed' : 'pointer',
            opacity: loading ? 0.6 : 1,
          }}
          onMouseEnter={(e) => {
            if (!loading) {
              e.currentTarget.style.transform = 'translateX(-4px)';
              e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.12)';
            }
          }}
          onMouseLeave={(e) => {
            if (!loading) {
              e.currentTarget.style.transform = 'translateX(0)';
              e.currentTarget.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.08)';
            }
          }}
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Dashboard</span>
        </button>

        {/* Page Title */}
        <h1 className="text-5xl font-bold mb-14" style={{ color: '#2D2D7A', letterSpacing: '-0.8px' }}>
          Edit Customer
        </h1>

        {/* Main Form Card */}
        <div
          className="rounded-[30px] p-12 sm:p-16"
          style={{
            background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(250, 248, 255, 0.92) 50%, rgba(255, 240, 245, 0.9) 100%)',
            backdropFilter: 'blur(20px)',
            boxShadow: '0 20px 60px rgba(99, 102, 241, 0.2), 0 0 0 1px rgba(255, 255, 255, 0.8)',
          }}
        >
          {/* Record ID */}
          <div className="text-center mb-12">
            <p className="text-base font-medium" style={{ color: '#6B7280' }}>
              Record ID: <span className="font-semibold" style={{ color: '#374151' }}>{tax.id}</span>
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-10">
            {/* Name Field */}
            <div>
              <label className="block text-base font-semibold mb-3" style={{ color: '#374151' }}>
                Name<span style={{ color: '#EF4444' }}>*</span>
              </label>
              <input
                type="text"
                value={entity}
                onChange={(e) => {
                  setEntity(e.target.value);
                  if (errors.entity) setErrors({ ...errors, entity: undefined });
                }}
                placeholder="Enter customer name"
                disabled={loading}
                className="w-full px-6 py-5 rounded-[20px] text-base font-normal transition-all duration-200 focus:outline-none"
                style={{
                  background: 'white',
                  color: '#1F2937',
                  border: errors.entity ? '2px solid #EF4444' : '1px solid rgba(209, 213, 219, 0.5)',
                  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)',
                  cursor: loading ? 'not-allowed' : 'text',
                  opacity: loading ? 0.6 : 1,
                }}
                onFocus={(e) => {
                  if (!errors.entity && !loading) {
                    e.currentTarget.style.borderColor = '#C6AFFF';
                    e.currentTarget.style.boxShadow = '0 0 0 4px rgba(198, 175, 255, 0.15), 0 2px 8px rgba(0, 0, 0, 0.04)';
                  }
                }}
                onBlur={(e) => {
                  if (!errors.entity) {
                    e.currentTarget.style.borderColor = 'rgba(209, 213, 219, 0.5)';
                    e.currentTarget.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.04)';
                  }
                }}
              />
              {errors.entity && (
                <p className="mt-2 text-sm font-medium" style={{ color: '#EF4444' }}>
                  {errors.entity}
                </p>
              )}
            </div>

            {/* Country Field */}
            <div>
              <label className="block text-base font-semibold mb-3" style={{ color: '#374151' }}>
                Country<span style={{ color: '#EF4444' }}>*</span>
              </label>
              <div className="relative">
                <select
                  value={country}
                  onChange={(e) => {
                    setCountry(e.target.value);
                    if (errors.country) setErrors({ ...errors, country: undefined });
                  }}
                  disabled={loading}
                  className="w-full px-6 py-5 rounded-[20px] text-base font-normal appearance-none cursor-pointer transition-all duration-200 focus:outline-none"
                  style={{
                    background: 'white',
                    color: country ? '#1F2937' : '#9CA3AF',
                    border: errors.country ? '2px solid #EF4444' : '1px solid rgba(209, 213, 219, 0.5)',
                    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)',
                    cursor: loading ? 'not-allowed' : 'pointer',
                    opacity: loading ? 0.6 : 1,
                  }}
                  onFocus={(e) => {
                    if (!errors.country && !loading) {
                      e.currentTarget.style.borderColor = '#C6AFFF';
                      e.currentTarget.style.boxShadow = '0 0 0 4px rgba(198, 175, 255, 0.15), 0 2px 8px rgba(0, 0, 0, 0.04)';
                    }
                  }}
                  onBlur={(e) => {
                    if (!errors.country) {
                      e.currentTarget.style.borderColor = 'rgba(209, 213, 219, 0.5)';
                      e.currentTarget.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.04)';
                    }
                  }}
                >
                  <option value="">Select country</option>
                  {countries.map((c) => (
                    <option key={c.id} value={c.name}>
                      {c.name}
                    </option>
                  ))}
                </select>
                <ChevronDown
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 pointer-events-none"
                  style={{ color: '#9CA3AF' }}
                />
              </div>
              {errors.country && (
                <p className="mt-2 text-sm font-medium" style={{ color: '#EF4444' }}>
                  {errors.country}
                </p>
              )}
            </div>

            {/* Divider Arrow */}
            <div className="flex justify-center py-8">
              <ChevronDown className="w-6 h-6" style={{ color: '#C6AFFF', opacity: 0.4 }} />
            </div>

            {/* Buttons Section */}
            <div className="flex gap-5 pt-4">
              {/* Cancel Button */}
              <button
                type="button"
                onClick={handleCancel}
                disabled={loading}
                className="flex-1 px-8 py-5 rounded-full text-base font-semibold transition-all duration-300"
                style={{
                  background: 'white',
                  color: '#6B7280',
                  border: '2px solid #E5E7EB',
                  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)',
                  cursor: loading ? 'not-allowed' : 'pointer',
                  opacity: loading ? 0.6 : 1,
                }}
                onMouseEnter={(e) => {
                  if (!loading) {
                    e.currentTarget.style.background = '#F9FAFB';
                    e.currentTarget.style.borderColor = '#D1D5DB';
                    e.currentTarget.style.transform = 'translateY(-2px)';
                    e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.08)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!loading) {
                    e.currentTarget.style.background = 'white';
                    e.currentTarget.style.borderColor = '#E5E7EB';
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.04)';
                  }
                }}
              >
                Cancel
              </button>

              {/* Save Changes Button */}
              <button
                type="submit"
                disabled={loading}
                className="flex-1 px-8 py-5 rounded-full text-base font-bold transition-all duration-300 flex items-center justify-center gap-2"
                style={{
                  background: loading ? '#D1D5DB' : 'linear-gradient(135deg, #667EEA 0%, #764BA2 100%)',
                  color: 'white',
                  boxShadow: loading ? 'none' : '0 8px 24px rgba(102, 126, 234, 0.4)',
                  cursor: loading ? 'not-allowed' : 'pointer',
                  opacity: loading ? 0.7 : 1,
                }}
                onMouseEnter={(e) => {
                  if (!loading) {
                    e.currentTarget.style.transform = 'translateY(-2px)';
                    e.currentTarget.style.boxShadow = '0 12px 32px rgba(102, 126, 234, 0.5)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!loading) {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 8px 24px rgba(102, 126, 234, 0.4)';
                  }
                }}
              >
                {loading ? (
                  <>
                    <div className="w-5 h-5 border-3 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Saving...</span>
                  </>
                ) : (
                  'Save Changes'
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
