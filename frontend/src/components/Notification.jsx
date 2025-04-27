import React, { useState, useEffect } from "react";

const Notification = ({ message, type, onClose }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    if (message) {
      setIsVisible(true);
      const timer = setTimeout(() => {
        setIsVisible(false);
        if (onClose) {
          onClose();
        }
      }, 3000); // La notificación desaparece después de 3 segundos
      return () => clearTimeout(timer);
    } else {
      setIsVisible(false);
    }
  }, [message, onClose]);

  if (!isVisible || !message) {
    return null;
  }

  const bgColorClass = type === "success" ? "bg-green-500" : "bg-red-500";
  const textColorClass = "text-white";

  return (
    <div
      className={`fixed top-1/8 left-1/2 transform -translate-x-1/2 z-50 ${bgColorClass} ${textColorClass} py-3 px-6 text-lg rounded-md shadow-lg`}
    >
      {message}
    </div>
  );
};

export default Notification;
