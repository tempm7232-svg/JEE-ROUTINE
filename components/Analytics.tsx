'use client';

import React from 'react';
import { motion } from 'framer-motion';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { useStudyStore } from '@/store/useStudyStore';
import { getChartDataLastSevenDays, getMockTrendData, getSubjectTotalHours } from '@/utils/calculations';

export const Analytics: React.FC = () => {
  const dailyStudies = useStudyStore((state) => state.data.dailyStudies);
  const mockScores = useStudyStore((state) => state.data.mockScores);

  const sevenDayData = getChartDataLastSevenDays(dailyStudies);
  const mockTrendData = getMockTrendData(mockScores);

  const physicsHours = getSubjectTotalHours(dailyStudies, 'physics');
  const mathsHours = getSubjectTotalHours(dailyStudies, 'maths');
  const chemistryHours = getSubjectTotalHours(dailyStudies, 'chemistry');

  const subjectDistribution = [
    { name: 'Physics', value: physicsHours },
    { name: 'Maths', value: mathsHours },
    { name: 'Chemistry', value: chemistryHours },
  ];

  const chartConfig = {
    margin: { top: 5, right: 30, left: 0, bottom: 5 },
    stroke: '#8b5cf6',
    fill: '#3b82f6',
  };

  return (
    <motion.div
      className="p-6 space-y-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="space-y-1">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Analytics</h2>
        <p className="text-sm text-gray-600 dark:text-gray-400">Your study performance insights</p>
      </div>

      {/* Daily Study Hours Chart */}
      <motion.div
        className="p-6 rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Last 7 Days Study Hours
        </h3>
        {sevenDayData.length > 0 ? (
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={sevenDayData} {...chartConfig}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="date" stroke="#6b7280" />
              <YAxis stroke="#6b7280" />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#1f2937',
                  border: '1px solid #374151',
                  borderRadius: '8px',
                }}
                labelStyle={{ color: '#f3f4f6' }}
              />
              <Legend />
              <Line
                type="monotone"
                dataKey="hours"
                stroke="#3b82f6"
                strokeWidth={3}
                dot={{ fill: '#3b82f6', r: 5 }}
                activeDot={{ r: 7 }}
                isAnimationActive={true}
              />
            </LineChart>
          </ResponsiveContainer>
        ) : (
          <div className="h-80 flex items-center justify-center text-gray-500">
            <p>No data available yet</p>
          </div>
        )}
      </motion.div>

      {/* Subject Distribution Chart */}
      <motion.div
        className="p-6 rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Subject Distribution (Last 7 Days)
        </h3>
        {subjectDistribution.some((s) => s.value > 0) ? (
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={subjectDistribution} {...chartConfig}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="name" stroke="#6b7280" />
              <YAxis stroke="#6b7280" />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#1f2937',
                  border: '1px solid #374151',
                  borderRadius: '8px',
                }}
                labelStyle={{ color: '#f3f4f6' }}
              />
              <Bar dataKey="value" fill="#8b5cf6" isAnimationActive={true} radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        ) : (
          <div className="h-80 flex items-center justify-center text-gray-500">
            <p>No data available yet</p>
          </div>
        )}
      </motion.div>

      {/* Mock Score Trend Chart */}
      <motion.div
        className="p-6 rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Mock Score Progression
        </h3>
        {mockTrendData.length > 0 ? (
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={mockTrendData} {...chartConfig}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="date" stroke="#6b7280" />
              <YAxis stroke="#6b7280" domain={[0, 300]} />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#1f2937',
                  border: '1px solid #374151',
                  borderRadius: '8px',
                }}
                labelStyle={{ color: '#f3f4f6' }}
                formatter={(value) => `${value}/300`}
              />
              <Legend />
              <Line
                type="monotone"
                dataKey="score"
                stroke="#ec4899"
                strokeWidth={3}
                dot={{ fill: '#ec4899', r: 5 }}
                activeDot={{ r: 7 }}
                isAnimationActive={true}
              />
            </LineChart>
          </ResponsiveContainer>
        ) : (
          <div className="h-80 flex items-center justify-center text-gray-500">
            <p>No mock scores yet. Start tracking to see trends!</p>
          </div>
        )}
      </motion.div>

      {/* Subject Stats */}
      <motion.div
        className="grid grid-cols-1 md:grid-cols-3 gap-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        {subjectDistribution.map((subject, index) => (
          <motion.div
            key={subject.name}
            className="p-4 rounded-xl bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/30 dark:to-blue-800/30 border border-blue-200 dark:border-blue-700"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 + index * 0.1 }}
          >
            <p className="text-sm font-medium text-blue-900 dark:text-blue-200 mb-1">
              {subject.name}
            </p>
            <p className="text-2xl font-bold text-blue-600 dark:text-blue-300">
              {subject.value.toFixed(1)}
            </p>
            <p className="text-xs text-blue-600 dark:text-blue-400 mt-1">hours (7 days)</p>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
};
