import { ValidationStatus, ValidationStatusWithMessage } from '@/shared';

interface InputFieldProps {
  label: string;
  type: string;
  value: string;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  onChange: (value: string) => void;
  placeholder: string;
  validationStatus?: ValidationStatusWithMessage;
}

const validationStyle: Record<ValidationStatus, string> = {
  INITIAL: 'max-h-0 opacity-0',
  PENDING: 'max-h-10 opacity-50',
  VALID: 'max-h-10 text-indigo-500 opacity-100',
  INVALID: 'max-h-10 text-rose-500 opacity-100',
};

function InputField({ label, type, value, onKeyDown, onChange, placeholder, validationStatus }: InputFieldProps) {
  return (
    <div className='flex w-full flex-col items-center'>
      <div className='gap-4r flex w-full flex-row items-center justify-start'>
        <div className='w-[60px] text-sm font-medium text-black'>{label}</div>
        <div className='flex h-[41px] shrink grow basis-0 items-center justify-start rounded-md border border-gray-200 bg-white p-3'>
          <input
            type={type}
            value={value}
            onKeyDown={(e) => onKeyDown?.(e)}
            onChange={(e) => onChange(e.target.value)}
            className='w-full text-sm font-medium text-gray-500 focus:outline-none'
            placeholder={placeholder}
            aria-label={label}
          />
        </div>
      </div>
      <div
        className={`w-full text-right text-sm font-medium transition-all duration-500 ease-in-out ${
          validationStyle[validationStatus?.status ?? 'PENDING']
        } overflow-hidden`}
      >
        {validationStatus?.message}
      </div>
    </div>
  );
}

export default InputField;
