interface InputFieldProps {
  label: string;
  type: string;
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
}

function InputField({
  label,
  type,
  value,
  onChange,
  placeholder,
}: InputFieldProps) {
  return (
    <div className='flex w-[411px] items-center justify-start gap-4'>
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
  );
}

export default InputField;
