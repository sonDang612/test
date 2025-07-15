import { AnimatePresence, motion } from "framer-motion";
import React from "react";

type Props = {
  title?: string;
  isOpen: boolean;
  children?: React.ReactNode;
  className?: string;
  showHeader?: boolean;
  onClose: () => void;
};

const backdropVariants = {
  visible: { opacity: 1 },
  hidden: { opacity: 0 },
};

const modalVariants = {
  hidden: {
    y: "-100vh",
    opacity: 0,
  },
  visible: {
    y: "0",
    opacity: 1,
    transition: { type: "tween", duration: 0.2, ease: "easeOut" },
  },
  exit: {
    y: "100vh",
    opacity: 0,
  },
};

const Modal = ({
  isOpen,
  title,
  children,
  className,
  showHeader = true,
  onClose,
}: Props) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-[rgba(0,0,0,0.1)] bg-opacity-50 flex items-center justify-center z-50"
          variants={backdropVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
          onClick={onClose}
        >
          <motion.div
            className={`bg-white shadow-lg border-2 border-solid border-blue-900 ${className}`}
            variants={modalVariants as any}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={(e) => e.stopPropagation()}
          >
            {showHeader && (
              <div className="flex justify-between items-center border-b-2 p-4 border-b-blue-900 sticky top-0 bg-white z-10">
                {title && <h3 className="text-2xl font-medium">{title}</h3>}
                <button
                  onClick={onClose}
                  className="text-white size-8 bg-blue-400 rounded-full border-solid border-2 border-blue-950 cursor-pointer"
                >
                  ✕
                </button>
              </div>
            )}
            <div className="p-4">{children}</div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Modal;
