import { useEffect, useRef } from 'react';

import Button from '@/components/Button';

interface SessionSettingsDropdownProps {
  buttons: Array<{
    icon: React.ReactNode;
    label: string;
    onClick: () => void;
  }>;
  onClose: () => void;
}

function SessionSettingsDropdown({
  buttons,
  onClose,
}: SessionSettingsDropdownProps) {
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onClose]);

  return (
    <div
      ref={dropdownRef}
      className='absolute z-10 flex w-max flex-col gap-2 rounded-md bg-white p-4 shadow-lg ring-1 ring-black ring-opacity-5'
    >
      {buttons.map(({ icon, label, onClick }) => (
        <Button
          className='w-full rounded text-sm font-medium text-black transition-all duration-100 hover:bg-gray-100'
          key={label}
          onClick={() => {
            onClick();
            onClose();
          }}
        >
          <div className='flex w-full cursor-pointer flex-row items-center gap-2'>
            {icon}
            {label}
          </div>
        </Button>
      ))}
    </div>
  );
}

export default SessionSettingsDropdown;
