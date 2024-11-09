import { ValidationStatus } from '@/features/session';

interface InputFieldProps {
  label: string;
  type: string;
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  validationStatus?: ValidationStatus;
  invalidMessage?: string;
  validMessage?: string;
}

const validationStyle: Record<ValidationStatus, string> = {
  PENDING: 'max-h-0 opacity-0',
  VALID: 'max-h-10 text-indigo-500 opacity-100',
  INVALID: 'max-h-10 text-rose-500 opacity-100',
};

function InputField({
  label,
  type,
  value,
  onChange,
  placeholder,
  validationStatus,
  invalidMessage = '유효하지 않은 입력입니다.',
  validMessage = '유효한 입력입니다.',
}: InputFieldProps) {
  return (
    <div className='flex w-full flex-col items-center'>
      <div className='gap-4r flex w-full flex-row items-center justify-start'>
        <div className="w-[60px] font-['Pretendard'] text-sm font-medium text-black">
          {label}
        </div>
        <div className='flex h-[41px] shrink grow basis-0 items-center justify-start rounded-md border border-gray-200 bg-white p-3'>
          <input
            type={type}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="w-full font-['Pretendard'] text-sm font-medium text-gray-500 focus:outline-none"
            placeholder={placeholder}
            aria-label={label}
          />
        </div>
      </div>
      <div
        className={`w-full text-right font-['Pretendard'] text-sm font-medium transition-all duration-500 ease-in-out ${
          validationStyle[validationStatus ?? 'PENDING']
        } overflow-hidden`}
      >
        {validationStatus === 'INVALID' ? invalidMessage : validMessage}
      </div>
    </div>
  );
}

export default InputField;
