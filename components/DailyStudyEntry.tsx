'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Save, Check } from 'lucide-react';
import { useStudyStore } from '@/store/useStudyStore';
import { DailyStudy } from '@/types';
import { getTodayDate } from '@/utils/calculations';
import { cn } from '@/utils/cn';
import { useToast } from '@/hooks';

const InputField: React.FC<{
  label: string;
  value: number;
  onChange: (value: number) => void;
  unit?: string;
}> = ({ label, value, onChange, unit = '' }) => (
  <motion.div
    className="space-y-2"
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
  >
    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">{label}</label>
    <div className="relative">
      <input
        type="number"
        min="0"
        step="0.5"
        value={value}
        onChange={(e) => onChange(parseFloat(e.target.value) || 0)}
        className={cn(
          'w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600',
          'bg-white dark:bg-gray-800 text-gray-900 dark:text-white',
          'focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none',
          'transition-all duration-200'
        )}
      />
      {unit && (
        <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400 text-sm font-medium">
          {unit}
        </span>
      )}
    </div>
  </motion.div>
);

export const DailyStudyEntry: React.FC = () => {
  const { toast, showToast } = useToast();
  const addDailyStudy = useStudyStore((state) => state.addDailyStudy);
  const getDailyStudyByDate = useStudyStore((state) => state.getDailyStudyByDate);

  const today = getTodayDate();
  const [formData, setFormData] = useState<DailyStudy>({
    date: today,
    physics: 0,
    maths: 0,
    chemistry: 0,
    recovery: 0,
    revision: 0,
    problemsSolved: 0,
  });

  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const existingStudy = getDailyStudyByDate(today);
    if (existingStudy) {
      setFormData(existingStudy);
    }
  }, [today, getDailyStudyByDate]);

  const handleSave = () => {
    if (
      formData.physics < 0 ||
      formData.maths < 0 ||
      formData.chemistry < 0 ||
      formData.recovery < 0 ||
      formData.revision < 0 ||
      formData.problemsSolved < 0
    ) {
      showToast('Values cannot be negative!', 'error');
      return;
    }

    addDailyStudy(formData);
    setSaved(true);
    showToast('Study entry saved successfully!', 'success');

    setTimeout(() => setSaved(false), 2000);
  };

  const totalHours =
    formData.physics +
    formData.maths +
    formData.chemistry +
    formData.recovery +
    formData.revision;

  return (
    <motion.div
      className="p-6 space-y-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="space-y-1">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Today&apos;s Study Log</h2>
        <p className="text-sm text-gray-600 dark:text-gray-400">{today}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <InputField
          label="Physics"
          value={formData.physics}
          onChange={(value) => setFormData({ ...formData, physics: value })}
          unit="hrs"
        />
        <InputField
          label="Maths"
          value={formData.maths}
          onChange={(value) => setFormData({ ...formData, maths: value })}
          unit="hrs"
        />
        <InputField
          label="Chemistry"
          value={formData.chemistry}
          onChange={(value) => setFormData({ ...formData, chemistry: value })}
          unit="hrs"
        />
        <InputField
          label="11th Recovery"
          value={formData.recovery}
          onChange={(value) => setFormData({ ...formData, recovery: value })}
          unit="hrs"
        />
        <InputField
          label="Revision/Test"
          value={formData.revision}
          onChange={(value) => setFormData({ ...formData, revision: value })}
          unit="hrs"
        />
        <InputField
          label="Problems Solved"
          value={formData.problemsSolved}
          onChange={(value) => setFormData({ ...formData, problemsSolved: value })}
          unit="count"
        />
      </div>

      <motion.div
        className="p-4 rounded-lg bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <p className="text-sm font-medium text-blue-900 dark:text-blue-200">
          Total Hours: <span className="text-lg font-bold">{totalHours.toFixed(1)}</span> hrs
        </p>
      </motion.div>

      <motion.button
        onClick={handleSave}
        className={cn(
          'w-full py-3 px-4 rounded-lg font-semibold flex items-center justify-center gap-2',
          'transition-all duration-300',
          saved
            ? 'bg-green-500 text-white'
            : 'bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:shadow-lg'
        )}
        whileHover={{ scale: saved ? 1 : 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        {saved ? (
          <>
            <Check size={20} />
            Saved!
          </>
        ) : (
          <>
            <Save size={20} />
            Save Entry
          </>
        )}
      </motion.button>

      {toast.visible && (
        <motion.div
          className={cn(
            'p-4 rounded-lg',
            toast.type === 'success'
              ? 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200'
              : 'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-200'
          )}
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 10, opacity: 0 }}
        >
          <p className="text-sm font-medium">{toast.message}</p>
        </motion.div>
      )}
    </motion.div>
  );
};

