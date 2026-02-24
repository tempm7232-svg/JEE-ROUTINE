'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Save, Check } from 'lucide-react';
import { useStudyStore } from '@/store/useStudyStore';
import { WeeklyRoutine } from '@/types';
import { cn } from '@/utils/cn';
import { useToast } from '@/hooks';

const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
const SUBJECTS = ['physics', 'maths', 'chemistry', 'recovery', 'revision'] as const;
const SUBJECT_LABELS = {
  physics: 'Physics',
  maths: 'Maths',
  chemistry: 'Chemistry',
  recovery: '11th Recovery',
  revision: 'Revision/Test',
};

interface DayRoutine {
  [key: string]: number;
}

export const WeeklyRoutineSection: React.FC = () => {
  const { toast, showToast } = useToast();
  const getWeeklyRoutine = useStudyStore((state) => state.getWeeklyRoutine);
  const updateWeeklyRoutine = useStudyStore((state) => state.updateWeeklyRoutine);

  const [routine, setRoutine] = useState<WeeklyRoutine>(() => getWeeklyRoutine());
  const [saved, setSaved] = useState(false);

  const handleSubjectHoursChange = (day: string, subject: string, value: number) => {
    setRoutine((prev) => ({
      ...prev,
      [day]: {
        ...prev[day],
        [subject]: value,
      },
    }));
  };

  const handleSave = () => {
    const isValid = Object.values(routine).every((day: DayRoutine) =>
      SUBJECTS.every((subject) => {
        const value = day[subject as string] || 0;
        return value >= 0 && value <= 24;
      })
    );

    if (!isValid) {
      showToast('Hours must be between 0 and 24!', 'error');
      return;
    }

    updateWeeklyRoutine(routine);
    setSaved(true);
    showToast('Weekly routine updated!', 'success');
    setTimeout(() => setSaved(false), 2000);
  };

  const calculateDayTotal = (day: string): number => {
    const dayRoutine = routine[day];
    return SUBJECTS.reduce((sum, subject) => sum + (dayRoutine[subject as string] || 0), 0);
  };

  return (
    <motion.div
      className="p-6 space-y-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="space-y-1">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Weekly Routine</h2>
        <p className="text-sm text-gray-600 dark:text-gray-400">Set your study plan for the week</p>
      </div>

      <div className="space-y-4">
        {DAYS.map((day, dayIndex) => (
          <motion.div
            key={day}
            className="p-4 rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: dayIndex * 0.05 }}
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{day}</h3>
              <span className="text-sm font-medium text-blue-600 dark:text-blue-400">
                {calculateDayTotal(day).toFixed(1)} hrs
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-3">
              {SUBJECTS.map((subject) => (
                <div key={subject} className="space-y-1">
                  <label className="text-xs font-medium text-gray-600 dark:text-gray-400">
                    {SUBJECT_LABELS[subject]}
                  </label>
                  <input
                    type="number"
                    min="0"
                    max="24"
                    step="0.5"
                    value={routine[day][subject] || 0}
                    onChange={(e) =>
                      handleSubjectHoursChange(day, subject, parseFloat(e.target.value) || 0)
                    }
                    className={cn(
                      'w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600',
                      'bg-white dark:bg-gray-700 text-gray-900 dark:text-white',
                      'focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none',
                      'text-sm font-medium'
                    )}
                  />
                </div>
              ))}
            </div>

            <motion.div
              className="mt-3 pt-3 border-t border-gray-200 dark:border-gray-700"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <p className="text-xs text-gray-500 dark:text-gray-500">
                Daily target: {calculateDayTotal(day).toFixed(1)} hours
              </p>
            </motion.div>
          </motion.div>
        ))}
      </div>

      <motion.div
        className="p-4 rounded-lg bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <p className="text-sm font-medium text-purple-900 dark:text-purple-200">
          Weekly Total: <span className="text-lg font-bold">{DAYS.reduce((sum, day) => sum + calculateDayTotal(day), 0).toFixed(1)}</span> hrs
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
            Save Routine
          </>
        )}
      </motion.button>
    </motion.div>
  );
};
