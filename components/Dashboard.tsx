'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Flame, TrendingUp, Award, Target, AlertCircle } from 'lucide-react';
import { useDashboardMetrics } from '@/hooks';
import { DashboardMetrics } from '@/types';
import { cn } from '@/utils/cn';

const AnimatedCounter: React.FC<{ value: number }> = ({ value }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const end = value;
    const duration = 1000;
    const increment = end / (duration / 16);

    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);

    return () => clearInterval(timer);
  }, [value]);

  return <span>{count}</span>;
};

const MetricCard: React.FC<{
  icon: React.ReactNode;
  label: string;
  value: string | number;
  subtext?: string;
  gradient: string;
}> = ({ icon, label, value, subtext, gradient }) => (
  <motion.div
    className={cn(
      'relative p-6 rounded-2xl border backdrop-blur-md overflow-hidden',
      'group hover:shadow-2xl transition-all duration-300'
    )}
    whileHover={{ y: -5, scale: 1.02 }}
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
  >
    <div
      className={cn(
        'absolute inset-0 opacity-10 group-hover:opacity-15 transition-opacity',
        gradient
      )}
    />
    <div className="relative z-10">
      <div className="flex items-center justify-between mb-2">
        <p className="text-sm font-medium text-gray-600 dark:text-gray-400">{label}</p>
        <div className="text-blue-600 dark:text-blue-400">{icon}</div>
      </div>
      <p className="text-3xl font-bold text-gray-900 dark:text-white mb-1">
        {typeof value === 'number' ? <AnimatedCounter value={value} /> : value}
      </p>
      {subtext && <p className="text-xs text-gray-500 dark:text-gray-500">{subtext}</p>}
    </div>
    <div className={cn('absolute top-0 right-0 w-20 h-20 rounded-full blur-2xl opacity-20', gradient)} />
  </motion.div>
);

const RatingBadge: React.FC<{ rating: 'Low' | 'Strong' | 'Elite' }> = ({ rating }) => {
  const config = {
    Elite: { bg: 'bg-gradient-to-br from-purple-500 to-pink-500', icon: '👑' },
    Strong: { bg: 'bg-gradient-to-br from-blue-500 to-cyan-500', icon: '⚡' },
    Low: { bg: 'bg-gradient-to-br from-orange-500 to-red-500', icon: '📈' },
  };

  return (
    <motion.div
      className={cn(
        'flex items-center justify-center gap-3 p-6 rounded-2xl text-white',
        config[rating].bg
      )}
      whileHover={{ scale: 1.05 }}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
    >
      <span className="text-3xl">{config[rating].icon}</span>
      <div>
        <p className="text-sm font-medium opacity-90">Productivity</p>
        <p className="text-2xl font-bold">{rating}</p>
      </div>
    </motion.div>
  );
};

const StreakBadge: React.FC<{ streak: number; hasSevenDayStreak: boolean }> = ({
  streak,
  hasSevenDayStreak,
}) => (
  <motion.div
    className="flex items-center gap-3 p-6 rounded-2xl bg-gradient-to-br from-orange-400 to-red-500 text-white"
    whileHover={{ scale: 1.05 }}
    initial={{ opacity: 0, scale: 0.9 }}
    animate={{ opacity: 1, scale: 1 }}
  >
    <motion.div animate={{ rotate: 360 }} transition={{ duration: 2, repeat: Infinity }}>
      <Flame size={32} />
    </motion.div>
    <div>
      <p className="text-sm font-medium opacity-90">Current Streak</p>
      <p className="text-2xl font-bold">{streak} days</p>
      {hasSevenDayStreak && <p className="text-xs mt-1">🏆 Achievement Unlocked!</p>}
    </div>
  </motion.div>
);

export const Dashboard: React.FC = () => {
  const metrics = useDashboardMetrics();
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    if (metrics && metrics.lowPerformanceDays >= 3) {
      setShowAlert(true);
    } else {
      setShowAlert(false);
    }
  }, [metrics]);

  if (!metrics) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-gray-500">Loading metrics...</div>
      </div>
    );
  }

  return (
    <motion.div
      className="p-6 space-y-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {showAlert && (
        <motion.div
          className="flex items-center gap-3 p-4 bg-red-100 dark:bg-red-900/30 border border-red-300 dark:border-red-700 rounded-lg text-red-800 dark:text-red-200"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
        >
          <AlertCircle size={20} />
          <p className="text-sm font-medium">Warning: Low activity in last 3 days!</p>
        </motion.div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <MetricCard
          icon={<Target size={24} />}
          label="Today's Hours"
          value={metrics.todayHours}
          gradient="bg-blue-500"
        />
        <MetricCard
          icon={<TrendingUp size={24} />}
          label="Weekly Hours"
          value={metrics.weeklyHours}
          gradient="bg-green-500"
        />
        <MetricCard
          icon={<Award size={24} />}
          label="Monthly Hours"
          value={metrics.monthlyHours}
          gradient="bg-purple-500"
        />
        <MetricCard
          icon={<Flame size={24} />}
          label="Problems Solved"
          value={metrics.problemsSolvedThisWeek}
          subtext="This week"
          gradient="bg-orange-500"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <RatingBadge rating={metrics.productivityRating} />
        <StreakBadge streak={metrics.currentStreak} hasSevenDayStreak={metrics.hasSevenDayStreak} />
      </div>

      <motion.div
        className="p-6 rounded-2xl bg-gradient-to-br from-slate-100 to-slate-200 dark:from-gray-800 dark:to-gray-900 border border-slate-300 dark:border-gray-700"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <div className="flex items-center gap-3 mb-2">
          <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Weakest Subject</p>
        </div>
        <p className="text-3xl font-bold text-gray-900 dark:text-white">
          {metrics.weakestSubject}
        </p>
        <p className="text-xs text-gray-500 dark:text-gray-500 mt-2">Focus on this subject</p>
      </motion.div>
    </motion.div>
  );
};
