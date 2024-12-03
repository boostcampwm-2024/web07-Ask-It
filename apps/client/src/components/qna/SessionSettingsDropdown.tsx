import { useEffect, useRef } from 'react';

import Button from '@/components/Button';

interface SessionSettingsDropdownProps {
  buttons: Array<{
    key: string;
    button: React.ReactNode;
    onClick: () => void;
  }>;
  triggerRef?: React.RefObject<HTMLButtonElement>;
  onClose: () => void;
}

function SessionSettingsDropdown({ buttons, triggerRef, onClose }: SessionSettingsDropdownProps) {
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        triggerRef?.current &&
        !triggerRef.current?.contains(event.target as Node)
      ) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onClose, triggerRef]);

  return (
    <div
      ref={dropdownRef}
      className='absolute z-10 flex w-max flex-col gap-2 rounded-md bg-white p-4 shadow-lg ring-1 ring-black ring-opacity-5'
    >
      {buttons.map(({ key, button, onClick }) => (
        <Button
          className='w-full rounded text-sm font-medium text-black transition-all duration-100 hover:bg-gray-100'
          key={key}
          onClick={() => {
            onClick();
            onClose();
          }}
        >
          {button}
        </Button>
      ))}
    </div>
  );
}

export default SessionSettingsDropdown;
