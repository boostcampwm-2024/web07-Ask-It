import { Button } from '@/components';

function Header() {
  return (
    <div className='h-16 w-full bg-white px-4 py-4 shadow'>
      <div className='mx-auto flex h-full w-full max-w-[1194px] items-center justify-between px-4'>
        <button
          className="font-['Pretendard'] text-2xl font-bold text-indigo-600"
          type='button'
        >
          Ask-It
        </button>
        <div className='flex items-center justify-center gap-2.5'>
          <Button className='hover:bg-gray-200 hover:text-white hover:transition-all'>
            <div className="font-['Pretendard'] text-base font-bold text-black">
              로그인
            </div>
          </Button>
          <Button className='bg-indigo-600'>
            <div className="font-['Pretendard'] text-base font-bold text-white">
              회원 가입
            </div>
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Header;
