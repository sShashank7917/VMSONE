import React, { useEffect, useState } from "react";
import "./FaceScan.css";

interface FaceScanModalProps {
  open: boolean;
  onClose: () => void;
  onCapture: (imageData: string) => void;
}

const FaceScanModal: React.FC<FaceScanModalProps> = ({ open, onClose, onCapture }) => {
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);

  useEffect(() => {
    if (open && !capturedImage) {
      startCamera();
    }
    
    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, [open]);

  const startCamera = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: 'user' },
        audio: false 
      });
      setStream(mediaStream);
      
      const video = document.getElementById('camera-video') as HTMLVideoElement;
      if (video) {
        video.srcObject = mediaStream;
      }
    } catch (err) {
      console.error('Error accessing camera:', err);
      alert('Unable to access camera. Please check permissions.');
    }
  };

  const capturePhoto = () => {
    const video = document.getElementById('camera-video') as HTMLVideoElement;
    const canvas = document.getElementById('capture-canvas') as HTMLCanvasElement;
    
    if (video && canvas) {
      const ctx = canvas.getContext('2d');
      if (ctx) {
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        ctx.drawImage(video, 0, 0);
        
        const imageData = canvas.toDataURL('image/jpeg', 0.8);
        setCapturedImage(imageData);
        
        // Stop camera stream
        if (stream) {
          stream.getTracks().forEach(track => track.stop());
          setStream(null);
        }
      }
    }
  };

  const retakePhoto = () => {
    setCapturedImage(null);
    startCamera();
  };

  const submitPhoto = () => {
    if (capturedImage) {
      onCapture(capturedImage);
      setCapturedImage(null);
      onClose();
    }
  };

  const handleClose = () => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      setStream(null);
    }
    setCapturedImage(null);
    onClose();
  };

  if (!open) return null;

  return (
    <div className="face-scan-overlay">
      {/* Header with close button */}
      <div className="face-scan-header">
        <button 
          onClick={handleClose}
          className="close-button"
          aria-label="Close face scan"
        >
          ✕
        </button>
      </div>

      <div className="face-scan-container">
        <h2 className="face-scan-title">
          Face Scan Verification
        </h2>

        {/* Camera/Image Display */}
        <div className="camera-container">
          {!capturedImage ? (
            <video
              id="camera-video"
              autoPlay
              playsInline
              muted
              className="camera-video"
            />
          ) : (
            <img
              src={capturedImage}
              alt="Captured face"
              className="captured-image"
            />
          )}
          
          {/* Face outline overlay */}
          <div className="face-outline" />
        </div>

        {/* Instructions */}
        <p className="instructions">
          {!capturedImage 
            ? "Position your face within the outline and capture" 
            : "Review your photo and submit or retake"}
        </p>

        {/* Action Buttons */}
        <div className="action-buttons">
          {!capturedImage ? (
            <button
              onClick={capturePhoto}
              className="capture-button"
              aria-label="Capture photo"
            >
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/>
                <circle cx="12" cy="13" r="4"/>
              </svg>
            </button>
          ) : (
            <>
              <button
                onClick={retakePhoto}
                className="retake-button"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"/>
                  <path d="M21 3v5h-5"/>
                  <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16"/>
                  <path d="M3 21v-5h5"/>
                </svg>
                Retake
              </button>
              <button
                onClick={submitPhoto}
                className="submit-button"
              >
                Submit Photo
              </button>
            </>
          )}
        </div>
      </div>

      {/* Hidden canvas for capturing */}
      <canvas id="capture-canvas" style={{ display: 'none' }} />

      {/* Bottom branding */}
      <div className="face-scan-branding">
        <div className="branding-text">
          <div>Powered By</div>
          <div>VMSONE</div>
        </div>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="3"/>
          <path d="M12 1v6M12 17v6M4.22 4.22l4.24 4.24M15.54 15.54l4.24 4.24M1 12h6M17 12h6M4.22 19.78l4.24-4.24M15.54 8.46l4.24-4.24"/>
        </svg>
      </div>
    </div>
  );
};

export default FaceScanModal;