import React, { useState } from 'react';
import { Sparkles, CircuitBoard, QrCode } from 'lucide-react';
import { QRCodeModal } from './QRCodeModal';

interface AuraCardProps {
  aura: number;
  username: string;
  stats: {
    easy: number;
    medium: number;
    hard: number;
  };
}

export function AuraCard({ aura, username, stats }: AuraCardProps) {
  const [showQR, setShowQR] = useState(false);

  return (
    <>
      <div className="perspective-1000 w-full max-w-md mx-auto">
        <div className="relative w-full aspect-[1.586/1] rounded-2xl bg-gradient-to-br from-white/10 to-white/5 p-[1px] transition-transform hover:scale-105 hover:rotate-1 group">
          <div className="absolute inset-[1px] rounded-2xl bg-black">
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iZ3JpZCIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48cGF0aCBkPSJNIDQwIDAgTCAwIDAgMCA0MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJyZ2JhKDI1NSwyNTUsMjU1LDAuMSkiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')] opacity-20"></div>
          </div>
          <div className="relative h-full rounded-2xl p-6 flex flex-col justify-between backdrop-blur-xl">
            {/* Card Header */}
            <div className="flex justify-between items-start">
              <div className="flex items-center space-x-2">
                <Sparkles className="w-8 h-8 text-white/40 group-hover:text-white/60 transition-colors" />
                <div>
                  <h3 className="text-white/80 text-sm font-medium">LeetCode Aura</h3>
                  <p className="text-white/40 text-xs">Mystical Rating</p>
                </div>
              </div>
              <button
                onClick={() => setShowQR(true)}
                className="p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors group"
                title="Share QR Code"
              >
                <QrCode className="w-6 h-6 text-white/40 group-hover:text-white/60 transition-colors" />
              </button>
            </div>

            {/* Aura Display */}
            <div className="mt-6 flex items-baseline justify-center">
              <span className="text-5xl font-bold text-white tracking-wider font-mono">
                {aura.toLocaleString()}
              </span>
              <span className="ml-2 text-xl text-white/60 font-medium tracking-widest">
                AURA
              </span>
            </div>

            {/* Stats */}
            <div className="mt-6 grid grid-cols-3 gap-2 px-2">
              <div className="text-center">
                <p className="text-white/40 text-xs">Easy</p>
                <p className="text-white/80 font-mono">{stats.easy}</p>
              </div>
              <div className="text-center">
                <p className="text-white/40 text-xs">Medium</p>
                <p className="text-white/80 font-mono">{stats.medium}</p>
              </div>
              <div className="text-center">
                <p className="text-white/40 text-xs">Hard</p>
                <p className="text-white/80 font-mono">{stats.hard}</p>
              </div>
            </div>

            {/* Card Footer */}
            <div className="flex justify-between items-end mt-6">
              <div>
                <p className="text-white/40 text-xs uppercase mb-1">Card Holder</p>
                <p className="text-white/90 font-medium tracking-wide">{username || 'LEETCODER'}</p>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 rounded-full bg-white/10 group-hover:bg-white/20 transition-colors"></div>
                <div className="w-8 h-8 rounded-full bg-white/20 group-hover:bg-white/30 transition-colors -ml-4"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {showQR && (
        <QRCodeModal
          username={username}
          onClose={() => setShowQR(false)}
        />
      )}
    </>
  );
}