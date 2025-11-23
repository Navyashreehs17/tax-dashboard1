import { useState, useEffect } from 'react';
import { Tax } from '../types/Tax';
import { taxService } from '../services/taxService';

export const useTaxes = () => {
  const [taxes, setTaxes] = useState<Tax[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchTaxes = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await taxService.getAll();
      setTaxes(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTaxes();
  }, []);

  const refetch = () => {
    fetchTaxes();
  };

  return { taxes, loading, error, refetch, setTaxes };
};
