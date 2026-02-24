'use client';

import { useEffect, useState } from 'react';
import { useStudyStore } from '@/store/useStudyStore';
import { DashboardMetrics } from '@/types';
import { calculateDashboardMetrics } from '@/utils/calculations';

export const useDashboardMetrics = (): DashboardMetrics | null => {
  const [metrics, setMetrics] = useState<DashboardMetrics | null>(null);
  const data = useStudyStore((state) => state.data);

  useEffect(() => {
    const calculated = calculateDashboardMetrics(data.dailyStudies);
    setMetrics(calculated);
  }, [data.dailyStudies]);

  return metrics;
};

export const useMockAverage = (): number => {
  const [average, setAverage] = useState(0);
  const mockScores = useStudyStore((state) => state.data.mockScores);

  useEffect(() => {
    if (mockScores.length === 0) {
      setAverage(0);
      return;
    }
    const total = mockScores.reduce((sum, m) => sum + m.score, 0);
    setAverage(Math.round(total / mockScores.length));
  }, [mockScores]);

  return average;
};

export const useLocalStorage = (key: string, initialValue: string) => {
  const [storedValue, setStoredValue] = useState(initialValue);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    try {
      if (typeof window !== 'undefined') {
        const item = window.localStorage.getItem(key);
        if (item) {
          setStoredValue(item);
        }
        setIsLoaded(true);
      }
    } catch (error) {
      setIsLoaded(true);
    }
  }, [key]);

  const setValue = (value: string) => {
    try {
      setStoredValue(value);
      if (typeof window !== 'undefined') {
        window.localStorage.setItem(key, value);
      }
    } catch (error) {
      // Handle error silently
    }
  };

  return [storedValue, setValue, isLoaded] as const;
};

export const useToast = () => {
  const [toast, setToast] = useState<{
    message: string;
    type: 'success' | 'error' | 'info';
    visible: boolean;
  }>({ message: '', type: 'success', visible: false });

  const showToast = (message: string, type: 'success' | 'error' | 'info' = 'success') => {
    setToast({ message, type, visible: true });
    setTimeout(() => {
      setToast((prev) => ({ ...prev, visible: false }));
    }, 3000);
  };

  return { toast, showToast };
};

export const useDebounce = <T,>(value: T, delay: number): T => {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => clearTimeout(handler);
  }, [value, delay]);

  return debouncedValue;
};
