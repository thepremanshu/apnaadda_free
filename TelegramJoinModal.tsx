import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'react-hot-toast';
import { XIcon, TelegramIcon } from './Icons';

interface TelegramJoinModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const TelegramJoinModal: React.FC<TelegramJoinModalProps> = ({ isOpen, onClose }) => {
  const telegramLink = 'https://t.me/apnaaddafree';

  const handleJoin = () => {
    window.open(telegramLink, '_blank', 'noopener,noreferrer');
    onClose();
  };

  const handleMaybeLater = () => {
    toast('Ok, you will find our telegram channel link in the about us page, Thank you', {
      icon: '👍',
    });
    onClose();
  };


  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4"
        >
          <motion.div
            initial={{ scale: 0.9, y: -20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: -20 }}
            className="bg-[#1e1e1e] rounded-2xl w-full max-w-sm overflow-hidden shadow-xl text-center"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-8">
              <div className="mx-auto bg-sky-500/10 w-16 h-16 rounded-full flex items-center justify-center mb-4">
                  <div className="text-sky-400 w-10 h-10">
                      <TelegramIcon />
                  </div>
              </div>

              <h3 className="text-xl font-bold text-white">Join our Telegram Channel!</h3>
              
              <p className="text-gray-300 my-4">
                Get instant notifications about new videos and important updates from APNA ADDA.
              </p>

              <div className="flex flex-col sm:flex-row justify-center gap-3 mt-6">
                <button
                  onClick={handleMaybeLater}
                  className="bg-gray-700 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded-lg transition w-full"
                >
                  Maybe Later
                </button>
                <button
                  onClick={handleJoin}
                  className="bg-sky-500 hover:bg-sky-600 text-white font-bold py-2 px-4 rounded-lg transition flex items-center justify-center space-x-2 w-full"
                >
                  <TelegramIcon />
                  <span>Join Now</span>
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default TelegramJoinModal;