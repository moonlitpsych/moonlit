import { ReactNode, useState } from 'react';

interface TooltipProps {
  children: ReactNode;
  content: string;
  delay?: number;
}

export function Tooltip({ children, content, delay = 200 }: TooltipProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout>();

  const showTooltip = () => {
    const id = setTimeout(() => setIsVisible(true), delay);
    setTimeoutId(id);
  };

  const hideTooltip = () => {
    if (timeoutId) clearTimeout(timeoutId);
    setIsVisible(false);
  };

  return (
    <div className="relative inline-block">
      <div
        onMouseEnter={showTooltip}
        onMouseLeave={hideTooltip}
        onFocus={showTooltip}
        onBlur={hideTooltip}
      >
        {children}
      </div>
      {isVisible && (
        <div className="absolute z-10 px-3 py-2 text-sm text-white bg-gray-900 rounded-md shadow-sm bottom-full left-1/2 transform -translate-x-1/2 -translate-y-2 w-64">
          <div className="relative">
            {content}
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-full">
              <div className="border-8 border-transparent border-t-gray-900" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 