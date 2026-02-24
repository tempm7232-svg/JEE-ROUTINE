'use client';

import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Download, Upload, AlertTriangle } from 'lucide-react';
import { useStudyStore } from '@/store/useStudyStore';

export const BackupRestore: React.FC = () => {
  const { showToast } = useToast();
  const exportData = useStudyStore((state) => state.exportData);
  const importData = useStudyStore((state) => state.importData);
  const resetAllData = useStudyStore((state) => state.resetAllData);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [showResetConfirm, setShowResetConfirm] = useState(false);

  const handleExport = () => {
    try {
      const data = exportData();
      const element = document.createElement('a');
      element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(data));
      element.setAttribute('download', `jee-study-backup-${new Date().toISOString().split('T')[0]}.json`);
      element.style.display = 'none';
      document.body.appendChild(element);
      element.click();
      document.body.removeChild(element);
      showToast('Backup exported successfully!', 'success');
    } catch (error) {
      showToast('Failed to export backup!', 'error');
    }
  };

  const handleImportClick = () => {
    fileInputRef.current?.click();
  };

  const handleImportFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const content = e.target?.result as string;
        const success = importData(content);

        if (success) {
          showToast('Backup restored successfully! Refresh the page.', 'success');
          setTimeout(() => window.location.reload(), 2000);
        } else {
          showToast('Invalid backup file format!', 'error');
        }
      } catch (error) {
        showToast('Failed to import backup!', 'error');
      }
    };
    reader.readAsText(file);

    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleReset = () => {
    resetAllData();
    setShowResetConfirm(false);
    showToast('All data has been reset!', 'success');
    setTimeout(() => window.location.reload(), 1500);
  };

  return (
    <motion.div
      className="p-6 space-y-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="space-y-1">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Backup & Restore</h2>
        <p className="text-sm text-gray-600 dark:text-gray-400">Manage your study data</p>
      </div>

      {/* Export Section */}
      <motion.div
        className="p-6 rounded-2xl border border-green-200 dark:border-green-800 bg-green-50 dark:bg-green-900/20 space-y-4"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <h3 className="text-lg font-semibold text-green-900 dark:text-green-200">Export Backup</h3>
        <p className="text-sm text-green-800 dark:text-green-300">
          Download your entire study data as a JSON file for safe backup
        </p>
        <motion.button
          onClick={handleExport}
          className="w-full py-3 px-4 bg-green-600 hover:bg-green-700 text-white rounded-lg font-semibold flex items-center justify-center gap-2 transition-all"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <Download size={20} />
          Export as JSON
        </motion.button>
      </motion.div>

      {/* Import Section */}
      <motion.div
        className="p-6 rounded-2xl border border-blue-200 dark:border-blue-800 bg-blue-50 dark:bg-blue-900/20 space-y-4"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-200">Import Backup</h3>
        <p className="text-sm text-blue-800 dark:text-blue-300">
          Restore your study data from a previously exported JSON file
        </p>
        <input
          ref={fileInputRef}
          type="file"
          accept=".json"
          onChange={handleImportFile}
          className="hidden"
        />
        <motion.button
          onClick={handleImportClick}
          className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold flex items-center justify-center gap-2 transition-all"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <Upload size={20} />
          Import from JSON
        </motion.button>
      </motion.div>

      {/* Reset Section */}
      <motion.div
        className="p-6 rounded-2xl border border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-900/20 space-y-4"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <div className="flex items-center gap-3">
          <AlertTriangle className="text-red-600 dark:text-red-400" size={24} />
          <h3 className="text-lg font-semibold text-red-900 dark:text-red-200">Reset All Data</h3>
        </div>
        <p className="text-sm text-red-800 dark:text-red-300">
          Permanently delete all study data and start fresh. This action cannot be undone!
        </p>

        {showResetConfirm ? (
          <motion.div
            className="space-y-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <p className="text-sm font-medium text-red-900 dark:text-red-200">
              Are you sure? This will delete all your data.
            </p>
            <div className="flex gap-3">
              <motion.button
                onClick={handleReset}
                className="flex-1 py-2 px-4 bg-red-600 hover:bg-red-700 text-white rounded-lg font-semibold transition-all"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Yes, Reset Everything
              </motion.button>
              <motion.button
                onClick={() => setShowResetConfirm(false)}
                className="flex-1 py-2 px-4 bg-gray-600 hover:bg-gray-700 text-white rounded-lg font-semibold transition-all"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Cancel
              </motion.button>
            </div>
          </motion.div>
        ) : (
          <motion.button
            onClick={() => setShowResetConfirm(true)}
            className="w-full py-3 px-4 bg-red-600 hover:bg-red-700 text-white rounded-lg font-semibold flex items-center justify-center gap-2 transition-all"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <AlertTriangle size={20} />
            Reset All Data
          </motion.button>
        )}
      </motion.div>

      {/* Info Section */}
      <motion.div
        className="p-4 rounded-lg bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        <p className="text-xs text-gray-700 dark:text-gray-300">
          <span className="font-semibold">ℹ️ Note:</span> Your data is automatically saved to your browser&apos;s local storage. Use backup & restore to transfer data across devices or browsers.
        </p>
      </motion.div>
    </motion.div>
  );
};





