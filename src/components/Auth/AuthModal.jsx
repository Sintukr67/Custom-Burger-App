import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';

const AuthModal = ({ isOpen, onClose, initialForm = 'login' }) => {
  const [currentForm, setCurrentForm] = useState(initialForm);

  // Reset form when modal opens
  useEffect(() => {
    if (isOpen) {
      setCurrentForm(initialForm);
    }
  }, [isOpen, initialForm]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div className="absolute inset-0 bg-black bg-opacity-50" onClick={onClose} />
      
      <div className="absolute inset-0 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <h2 className="text-xl font-bold text-secondary-800">
              {currentForm === 'login' ? 'Sign In' : 'Create Account'}
            </h2>
            <button
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-gray-600 transition-colors duration-200"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          <div className="p-6">
            {currentForm === 'login' ? (
              <LoginForm
                onToggleForm={() => setCurrentForm('register')}
                onClose={onClose}
              />
            ) : (
              <RegisterForm
                onToggleForm={() => setCurrentForm('login')}
                onClose={onClose}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthModal;