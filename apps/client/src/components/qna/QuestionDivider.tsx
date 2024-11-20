interface QuestionDividerProps {
  description?: string;
  isExpanded?: boolean;
  onClick?: () => void;
}

function QuestionDivider({
  description,
  isExpanded,
  onClick,
}: QuestionDividerProps) {
  return (
    <div className='my-4 flex w-full items-center gap-2'>
      <hr
        className={`flex-grow rounded-3xl border-t-[1px] ${
          isExpanded ? 'border-indigo-300' : 'border-gray-300'
        }`}
      />
      {description && (
        <>
          <div className='flex items-center gap-1'>
            <svg
              onClick={onClick}
              className={`inline-block h-3 w-3 cursor-pointer transition-transform ${
                isExpanded
                  ? 'font-semibold text-indigo-600'
                  : '-rotate-180 font-normal text-gray-500'
              }`}
              viewBox='0 0 24 24'
              fill='currentColor'
            >
              <path d='M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z' />
            </svg>
            <span
              className={`text-sm ${
                isExpanded
                  ? 'font-semibold text-indigo-600'
                  : 'font-normal text-gray-500'
              }`}
            >
              {description}
            </span>
          </div>
          <hr
            className={`flex-grow rounded-3xl border-t-[1px] ${
              isExpanded ? 'border-indigo-300' : 'border-gray-300'
            }`}
          />
        </>
      )}
    </div>
  );
}

export default QuestionDivider;
