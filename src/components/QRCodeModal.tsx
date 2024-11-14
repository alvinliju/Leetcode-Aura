import React from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { X } from 'lucide-react';

interface QRCodeModalProps {
  username: string;
  onClose: () => void;
}

export function QRCodeModal({ username, onClose }: QRCodeModalProps) {
  const shareUrl = `${window.location.origin}?u=${encodeURIComponent(username)}`;

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-white/5 border border-white/10 rounded-2xl p-6 max-w-sm w-full relative">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-white/60 hover:text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
        
        <div className="text-center space-y-4">
          <h3 className="text-xl font-medium text-white">Share Aura Card</h3>
          <p className="text-white/60 text-sm">Scan to view {username}'s Aura Card</p>
          
          <div className="bg-white p-4 rounded-xl inline-block">
            <QRCodeSVG
              value={shareUrl}
              size={200}
              level="H"
              includeMargin={true}
            />
          </div>
          
          <div className="pt-2">
            <p className="text-white/40 text-xs break-all">{shareUrl}</p>
          </div>
        </div>
      </div>
    </div>
  );
}