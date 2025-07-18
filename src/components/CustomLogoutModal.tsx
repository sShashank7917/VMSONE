import React from 'react';
import { AlertTriangle, X } from 'lucide-react';
import './styles/LogoutModal.css';

interface LogoutModalProps {
  isOpen: boolean;
  onConfirm: () => void;
  onCancel: () => void;
  title?: string;
  message?: string;
  confirmText?: string;
  cancelText?: string;
}

const LogoutModal: React.FC<LogoutModalProps> = ({
  isOpen,
  onConfirm,
  onCancel,
  title = "Are you sure?",
  message = "Going back will log you out of your current session. You'll need to sign in again to continue.",
  confirmText = "Yes, log me out",
  cancelText = "Stay here"
}) => {
  if (!isOpen) return null;

  return (
    <div className="logout-modal-overlay">
      <div className="logout-modal-container">
        {/* Header */}
        <div className="logout-modal-header">
          <div className="logout-modal-title-section">
            <AlertTriangle size={24} className="logout-modal-icon" />
            <h2 className="logout-modal-title">{title}</h2>
          </div>
          <button
            onClick={onCancel}
            className="logout-modal-close-btn"
            aria-label="Close modal"
          >
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="logout-modal-content">
          <p className="logout-modal-message">{message}</p>
        </div>

        {/* Actions */}
        <div className="logout-modal-actions">
          <button
            onClick={onCancel}
            className="logout-modal-cancel-btn"
          >
            {cancelText}
          </button>
          <button
            onClick={onConfirm}
            className="logout-modal-confirm-btn"
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default LogoutModal;