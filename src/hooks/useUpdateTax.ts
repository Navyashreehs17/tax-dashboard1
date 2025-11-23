import { useState } from 'react';
import { Tax } from '../types/Tax';
import { taxService } from '../services/taxService';
import toast from 'react-hot-toast';

export const useUpdateTax = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const updateTax = async (id: string, data: Partial<Tax>): Promise<Tax | null> => {
    try {
      setLoading(true);
      setError(null);
      const updatedTax = await taxService.update(id, data);
      toast.success('Tax entity updated successfully!');
      return updatedTax;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to update tax entity';
      setError(errorMessage);
      toast.error(errorMessage);
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { updateTax, loading, error };
};
