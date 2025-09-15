'use client';

import { cn } from '@/lib/utils';
import { Bot } from 'lucide-react';

const JumpingRobot = () => {
  return (
    <div className="relative w-48 h-48">
      <style jsx>{`
        .robot-container {
          animation: jump 2s infinite cubic-bezier(0.5, 0.05, 1, 0.5);
        }
        .robot-shadow {
          animation: shrink 2s infinite;
        }
        @keyframes jump {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-50px);
          }
        }
        @keyframes shrink {
          0%, 100% {
            transform: scaleX(1);
            opacity: 0.5;
          }
          50% {
            transform: scaleX(0.6);
            opacity: 0.2;
          }
        }
      `}</style>
      <div className="robot-container absolute bottom-10 left-1/2 -translate-x-1/2">
        <Bot className="w-24 h-24 text-primary" />
      </div>
      <div className="robot-shadow absolute bottom-4 left-1/2 -translate-x-1/2 h-2 w-16 bg-foreground rounded-full" />
    </div>
  );
};

export default JumpingRobot;
