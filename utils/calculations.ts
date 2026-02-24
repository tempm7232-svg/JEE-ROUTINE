import { DailyStudy, DashboardMetrics } from '@/types';

export const getDateString = (date: Date): string => {
  return date.toISOString().split('T')[0];
};

export const getLastNDays = (n: number): Date[] => {
  const dates: Date[] = [];
  for (let i = 0; i < n; i++) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    dates.push(date);
  }
  return dates.reverse();
};

export const getTodayDate = (): string => {
  return getDateString(new Date());
};

export const getYesterdayDate = (): string => {
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  return getDateString(yesterday);
};

export const calculateTodayHours = (studies: DailyStudy[]): number => {
  const today = getTodayDate();
  const todayStudy = studies.find((s) => s.date === today);
  if (!todayStudy) return 0;
  return (
    todayStudy.physics +
    todayStudy.maths +
    todayStudy.chemistry +
    todayStudy.recovery +
    todayStudy.revision
  );
};

export const calculateWeeklyHours = (studies: DailyStudy[]): number => {
  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

  return studies
    .filter((s) => new Date(s.date) >= sevenDaysAgo)
    .reduce(
      (sum, s) => sum + s.physics + s.maths + s.chemistry + s.recovery + s.revision,
      0
    );
};

export const calculateMonthlyHours = (studies: DailyStudy[]): number => {
  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

  return studies
    .filter((s) => new Date(s.date) >= thirtyDaysAgo)
    .reduce(
      (sum, s) => sum + s.physics + s.maths + s.chemistry + s.recovery + s.revision,
      0
    );
};

export const calculateCurrentStreak = (studies: DailyStudy[]): number => {
  let streak = 0;
  let currentDate = new Date();

  while (true) {
    const dateStr = getDateString(currentDate);
    const study = studies.find((s) => s.date === dateStr);

    const totalHours =
      (study?.physics || 0) +
      (study?.maths || 0) +
      (study?.chemistry || 0) +
      (study?.recovery || 0) +
      (study?.revision || 0);

    if (totalHours === 0) break;

    streak++;
    currentDate.setDate(currentDate.getDate() - 1);
  }

  return streak;
};

export const getWeakestSubject = (studies: DailyStudy[]): string => {
  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

  const recentStudies = studies.filter((s) => new Date(s.date) >= sevenDaysAgo);

  const totals = {
    physics: recentStudies.reduce((sum, s) => sum + s.physics, 0),
    maths: recentStudies.reduce((sum, s) => sum + s.maths, 0),
    chemistry: recentStudies.reduce((sum, s) => sum + s.chemistry, 0),
  };

  const minSubject = Object.entries(totals).reduce((min, [subject, hours]) =>
    hours < min[1] ? [subject, hours] : min
  );

  return minSubject[0].charAt(0).toUpperCase() + minSubject[0].slice(1);
};

export const calculateProductivityRating = (
  studies: DailyStudy[]
): 'Low' | 'Strong' | 'Elite' => {
  const weeklyHours = calculateWeeklyHours(studies);
  const problemsSolved = studies
    .filter((s) => {
      const sevenDaysAgo = new Date();
      sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
      return new Date(s.date) >= sevenDaysAgo;
    })
    .reduce((sum, s) => sum + s.problemsSolved, 0);

  if (weeklyHours >= 55 && problemsSolved >= 600) return 'Elite';
  if (weeklyHours >= 45) return 'Strong';
  return 'Low';
};

export const calculateProblemsSolvedThisWeek = (studies: DailyStudy[]): number => {
  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

  return studies
    .filter((s) => new Date(s.date) >= sevenDaysAgo)
    .reduce((sum, s) => sum + s.problemsSolved, 0);
};

export const hasSevenDayStreak = (streak: number): boolean => {
  return streak >= 7;
};

export const countLowPerformanceDays = (studies: DailyStudy[]): number => {
  const threeDaysAgo = new Date();
  threeDaysAgo.setDate(threeDaysAgo.getDate() - 3);

  let lowDays = 0;
  for (let i = 0; i < 3; i++) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    const dateStr = getDateString(date);
    const study = studies.find((s) => s.date === dateStr);

    const totalHours =
      (study?.physics || 0) +
      (study?.maths || 0) +
      (study?.chemistry || 0) +
      (study?.recovery || 0) +
      (study?.revision || 0);

    if (totalHours === 0) lowDays++;
  }

  return lowDays;
};

export const calculateDashboardMetrics = (studies: DailyStudy[]): DashboardMetrics => {
  const todayHours = calculateTodayHours(studies);
  const weeklyHours = calculateWeeklyHours(studies);
  const monthlyHours = calculateMonthlyHours(studies);
  const currentStreak = calculateCurrentStreak(studies);
  const productivityRating = calculateProductivityRating(studies);
  const weakestSubject = getWeakestSubject(studies);
  const problemsSolvedThisWeek = calculateProblemsSolvedThisWeek(studies);
  const hasStreak = hasSevenDayStreak(currentStreak);
  const lowPerformanceDays = countLowPerformanceDays(studies);

  return {
    todayHours,
    weeklyHours,
    monthlyHours,
    currentStreak,
    productivityRating,
    weakestSubject,
    problemsSolvedThisWeek,
    hasSevenDayStreak: hasStreak,
    lowPerformanceDays,
  };
};

export const getSubjectTotalHours = (
  studies: DailyStudy[],
  subject: 'physics' | 'maths' | 'chemistry'
): number => {
  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

  return studies
    .filter((s) => new Date(s.date) >= sevenDaysAgo)
    .reduce((sum, s) => sum + s[subject], 0);
};

export const getChartDataLastSevenDays = (
  studies: DailyStudy[]
): Array<{ date: string; hours: number }> => {
  const days = getLastNDays(7);
  return days.map((date) => {
    const dateStr = getDateString(date);
    const study = studies.find((s) => s.date === dateStr);
    const hours = study
      ? study.physics + study.maths + study.chemistry + study.recovery + study.revision
      : 0;
    return {
      date: new Date(dateStr).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
      }),
      hours,
    };
  });
};

export const getMockTrendData = (
  mockScores: Array<{ date: string; score: number }>
): Array<{ date: string; score: number }> => {
  return mockScores
    .map((m) => ({
      date: new Date(m.date).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
      }),
      score: m.score,
    }))
    .slice(-10);
};

export const getAverageMockScore = (
  mockScores: Array<{ date: string; score: number }>
): number => {
  if (mockScores.length === 0) return 0;
  const total = mockScores.reduce((sum, m) => sum + m.score, 0);
  return Math.round(total / mockScores.length);
};
