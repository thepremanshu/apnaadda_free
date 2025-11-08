import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { XIcon } from './Icons';

interface LoginPromptModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const LoginPromptModal: React.FC<LoginPromptModalProps> = ({ isOpen, onClose }) => {
  const navigate = useNavigate();

  const handleRedirect = () => {
    onClose();
    navigate('/auth');
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
                <h3 className="text-xl font-bold text-white">Authentication Required</h3>
                <button onClick={onClose} className="text-gray-400 hover:text-white">
                  <XIcon />
                </button>
              </div>
              <div className="text-gray-300 mb-6">
                <p>You need to be logged in to access this feature. Please log in or create an account to continue.</p>
              </div>
              <div className="flex justify-end space-x-4">
                <button
                  onClick={onClose}
                  className="bg-gray-700 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded-lg transition"
                >
                  Cancel
                </button>
                <button
                  onClick={handleRedirect}
                  className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg transition"
                >
                  Login / Signup
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LoginPromptModal;
