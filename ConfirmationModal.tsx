import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { XIcon } from './Icons';

interface ConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void | Promise<void>;
  title: string;
  message: React.ReactNode;
  confirmButtonText?: string;
  cancelButtonText?: string;
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmButtonText = 'Confirm',
  cancelButtonText = 'Cancel',
}) => {
  const [isConfirming, setIsConfirming] = useState(false);

  const handleConfirm = () => {
    if (isConfirming) return;
    setIsConfirming(true);

    Promise.resolve(onConfirm())
      .catch(e => {
        console.error("Confirmation action failed", e);
        // The onConfirm function is expected to handle its own error UI (e.g., toasts)
      })
      .finally(() => {
        // This will always run after the promise from onConfirm settles.
        onClose();
        setIsConfirming(false);
      });
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, y: -20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: -20 }}
            className="bg-[#1e1e1e] rounded-2xl w-full max-w-md overflow-hidden shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold text-white">{title}</h3>
                <button onClick={onClose} className="text-gray-400 hover:text-white">
                  <XIcon />
                </button>
              </div>
              <div className="text-gray-300 mb-6">{message}</div>
              <div className="flex justify-end space-x-4">
                <button
                  onClick={onClose}
                  disabled={isConfirming}
                  className="bg-gray-700 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded-lg transition disabled:opacity-50"
                >
                  {cancelButtonText}
                </button>
                <button
                  onClick={handleConfirm}
                  disabled={isConfirming}
                  className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg transition w-32 text-center disabled:bg-red-800/50 disabled:cursor-not-allowed"
                >
                  {isConfirming ? 'Processing...' : confirmButtonText}
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ConfirmationModal;