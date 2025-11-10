import React, { useState, useRef, useEffect } from 'react';
import { Camera, X, Keyboard } from 'lucide-react';

interface BarcodeScannerProps {
  onScan: (barcode: string) => void;
  onClose: () => void;
}

export default function BarcodeScanner({ onScan, onClose }: BarcodeScannerProps) {
  const [manualInput, setManualInput] = useState('');
  const [scanMode, setScanMode] = useState<'camera' | 'manual'>('manual');
  const [error, setError] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const scanIntervalRef = useRef<number | null>(null);

  useEffect(() => {
    if (scanMode === 'camera') {
      startCamera();
    } else {
      stopCamera();
    }

    return () => {
      stopCamera();
    };
  }, [scanMode]);

  const startCamera = async () => {
    try {
      setError(null);
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'environment' }
      });

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        streamRef.current = stream;
        
        // Wait for video to be ready
        videoRef.current.onloadedmetadata = () => {
          videoRef.current?.play();
          startBarcodeDetection();
        };
      }
    } catch (err: any) {
      console.error('Camera access error:', err);
      setError('Unable to access camera. Please use manual input or check camera permissions.');
      setScanMode('manual');
    }
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }

    if (scanIntervalRef.current) {
      clearInterval(scanIntervalRef.current);
      scanIntervalRef.current = null;
    }
  };

  const startBarcodeDetection = () => {
    // Check if BarcodeDetector is supported
    if ('BarcodeDetector' in window) {
      const barcodeDetector = new (window as any).BarcodeDetector({
        formats: ['ean_13', 'ean_8', 'code_128', 'code_39', 'qr_code', 'upc_a', 'upc_e']
      });

      scanIntervalRef.current = window.setInterval(async () => {
        if (videoRef.current && videoRef.current.readyState === videoRef.current.HAVE_ENOUGH_DATA) {
          try {
            const barcodes = await barcodeDetector.detect(videoRef.current);
            if (barcodes.length > 0) {
              const barcode = barcodes[0].rawValue;
              stopCamera();
              onScan(barcode);
            }
          } catch (err) {
            console.error('Barcode detection error:', err);
          }
        }
      }, 100);
    } else {
      setError('Barcode scanning not supported in this browser. Please use manual input.');
      setScanMode('manual');
    }
  };

  const handleManualSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (manualInput.trim()) {
      onScan(manualInput.trim());
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-2xl w-full">
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-xl font-bold">Scan Barcode</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <div className="p-4">
          {error && (
            <div className="mb-4 bg-yellow-50 border border-yellow-200 text-yellow-700 px-4 py-3 rounded">
              {error}
            </div>
          )}

          <div className="flex gap-2 mb-4">
            <button
              onClick={() => setScanMode('camera')}
              className={`flex-1 flex items-center justify-center gap-2 py-2 px-4 rounded-lg ${
                scanMode === 'camera'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              <Camera className="h-5 w-5" />
              Camera Scan
            </button>
            <button
              onClick={() => setScanMode('manual')}
              className={`flex-1 flex items-center justify-center gap-2 py-2 px-4 rounded-lg ${
                scanMode === 'manual'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              <Keyboard className="h-5 w-5" />
              Manual Input
            </button>
          </div>

          {scanMode === 'camera' ? (
            <div className="space-y-4">
              <div className="relative bg-black rounded-lg overflow-hidden" style={{ aspectRatio: '4/3' }}>
                <video
                  ref={videoRef}
                  className="w-full h-full object-cover"
                  playsInline
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="border-2 border-white w-64 h-32 rounded-lg"></div>
                </div>
              </div>
              <p className="text-sm text-gray-600 text-center">
                Position the barcode within the frame. Scanning will happen automatically.
              </p>
            </div>
          ) : (
            <form onSubmit={handleManualSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Enter Barcode Manually
                </label>
                <input
                  type="text"
                  value={manualInput}
                  onChange={(e) => setManualInput(e.target.value)}
                  placeholder="Scan or type barcode here..."
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg"
                  autoFocus
                />
                <p className="mt-2 text-sm text-gray-500">
                  You can also use a USB barcode scanner - just scan the barcode and press Enter
                </p>
              </div>
              <button
                type="submit"
                disabled={!manualInput.trim()}
                className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed font-medium"
              >
                Use This Barcode
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
