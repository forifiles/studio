'use client';

import { cn } from '@/lib/utils';
import { Bot } from 'lucide-react';
import React from 'react';

const JumpingRobot = ({ className, animationDelay }: { className?: string, animationDelay?: string }) => {
  return (
    <div className={cn('relative w-16 h-16', className)}>
      <style>
        {`
          @keyframes jump {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-20px); }
          }
          .robot-shadow {
            animation: shadow-jump 1.5s infinite;
            animation-delay: ${animationDelay || '0s'};
          }
          @keyframes shadow-jump {
            0%, 100% { transform: scaleX(1); opacity: 0.5; }
            50% { transform: scaleX(0.8); opacity: 0.3; }
          }
          .robot-body {
            animation: jump 1.5s infinite;
            animation-delay: ${animationDelay || '0s'};
          }
        `}
      </style>
      <div
        className="robot-body absolute bottom-4 left-1/2 -translate-x-1/2"
      >
        <Bot className="w-12 h-12 text-primary/80" />
      </div>
      <div
        className="robot-shadow absolute bottom-2 left-1/2 -translate-x-1/2 w-8 h-2 bg-black/50 rounded-full"
      />
    </div>
  );
};

export default JumpingRobot;
