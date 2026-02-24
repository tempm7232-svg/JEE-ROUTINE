'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Trash2 } from 'lucide-react';
import { useStudyStore } from '@/store/useStudyStore';
import { useMockAverage } from '@/hooks';
import { MockScore } from '@/types';
import { getTodayDate } from '@/utils/calculations';
import { cn } from '@/utils/cn';
import { useToast } from '@/hooks';

export const MockTracker: React.FC = () => {
  const { toast, showToast } = useToast();
  const addMockScore = useStudyStore((state) => state.addMockScore);
  const mockScores = useStudyStore((state) => state.data.mockScores);
  const average = useMockAverage();

  const [score, setScore] = useState('');
  const [date, setDate] = useState(getTodayDate());

  const handleAddScore = () => {
    const parsedScore = parseInt(score);

    if (!score || isNaN(parsedScore)) {
      showToast('Please enter a valid score!', 'error');
      return;
    }

    if (parsedScore < 0 || parsedScore > 300) {
      showToast('Score must be between 0 and 300!', 'error');
      return;
    }

    addMockScore({ date, score: parsedScore });
    setScore('');
    setDate(getTodayDate());
    showToast('Mock score added!', 'success');
  };

  const sortedScores = [...mockScores].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  const getScorePercentage = (scoreValue: number): number => {
    return Math.round((scoreValue / 300) * 100);
  };

  const getScoreColor = (percentage: number): string => {
    if (percentage >= 85) return 'from-green-500 to-emerald-600';
    if (percentage >= 75) return 'from-blue-500 to-cyan-600';
    if (percentage >= 65) return 'from-yellow-500 to-orange-600';
    if (percentage >= 50) return 'from-orange-500 to-red-600';
    return 'from-red-500 to-red-600';
  };

  return (
    <motion.div
      className="p-6 space-y-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="space-y-1">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Mock Tests</h2>
        <p className="text-sm text-gray-600 dark:text-gray-400">Track your mock exam scores</p>
      </div>

      <motion.div
        className="p-6 rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 space-y-4"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Add New Score</h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-1">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Date
            </label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className={cn(
                'w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600',
                'bg-white dark:bg-gray-700 text-gray-900 dark:text-white',
                'focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none'
              )}
            />
          </div>

          <div className="space-y-1">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Score (/300)
            </label>
            <input
              type="number"
              min="0"
              max="300"
              placeholder="Enter score"
              value={score}
              onChange={(e) => setScore(e.target.value)}
              className={cn(
                'w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600',
                'bg-white dark:bg-gray-700 text-gray-900 dark:text-white',
                'focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none'
              )}
            />
          </div>

          <div className="flex items-end">
            <motion.button
              onClick={handleAddScore}
              className="w-full py-2 px-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg font-semibold flex items-center justify-center gap-2 hover:shadow-lg transition-all"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Plus size={18} />
              Add
            </motion.button>
          </div>
        </div>
      </motion.div>

      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 gap-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
      >
        <div className="p-6 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 text-white">
          <p className="text-sm font-medium opacity-90">Average Score</p>
          <p className="text-4xl font-bold mt-2">{average}</p>
          <p className="text-xs mt-2 opacity-75">{mockScores.length} attempts</p>
        </div>

        <div className="p-6 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-600 text-white">
          <p className="text-sm font-medium opacity-90">Percentage</p>
          <p className="text-4xl font-bold mt-2">
            {average > 0 ? Math.round((average / 300) * 100) : 0}%
          </p>
          <p className="text-xs mt-2 opacity-75">Based on average</p>
        </div>
      </motion.div>

      <div className="space-y-3">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Test History</h3>

        {sortedScores.length === 0 ? (
          <motion.div
            className="text-center py-12 text-gray-500 dark:text-gray-400"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <p className="text-sm">No mock scores yet. Start tracking!</p>
          </motion.div>
        ) : (
          <div className="space-y-3">
            {sortedScores.map((mock, index) => {
              const percentage = getScorePercentage(mock.score);
              const color = getScoreColor(percentage);

              return (
                <motion.div
                  key={mock.date + index}
                  className="flex items-center gap-4 p-4 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <div className={cn('flex-shrink-0 w-16 h-16 rounded-lg bg-gradient-to-br', color, 'flex items-center justify-center text-white font-bold text-lg')}>
                    {percentage}%
                  </div>

                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-gray-900 dark:text-white">{mock.score} / 300</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {new Date(mock.date).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric',
                      })}
                    </p>
                  </div>

                  <motion.div
                    className="w-20 h-1 bg-gray-300 dark:bg-gray-600 rounded-full overflow-hidden"
                    initial={{ width: 0 }}
                    animate={{ width: 80 }}
                  >
                    <motion.div
                      className={cn('h-full bg-gradient-to-r', color)}
                      initial={{ width: 0 }}
                      animate={{ width: `${percentage}%` }}
                      transition={{ delay: 0.3, duration: 0.8 }}
                    />
                  </motion.div>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </motion.div>
  );
};
