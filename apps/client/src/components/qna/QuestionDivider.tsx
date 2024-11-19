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
      <hr className='flex-grow rounded-3xl border-t-[1px] border-indigo-200' />
      {description && (
        <>
          <div className='flex items-center gap-1'>
            <svg
              onClick={onClick}
              className={`ml-1 inline-block h-3 w-3 cursor-pointer text-gray-500 transition-transform ${
                isExpanded ? '' : '-rotate-180'
              }`}
              viewBox='0 0 24 24'
              fill='currentColor'
            >
              <path d='M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z' />
            </svg>
            <span className='text-sm text-gray-500'>{description}</span>
          </div>
          <hr className='flex-grow rounded-3xl border-t-[1px] border-indigo-200' />
        </>
      )}
    </div>
  );
}

export default QuestionDivider;
