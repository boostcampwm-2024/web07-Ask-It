import { GrValidate } from 'react-icons/gr';

import { User } from '@/features/session/session.type';

interface ParticipantProps {
  user: User;
  onSelect: () => void;
}

function Participant({
  user: { nickname, isHost },
  onSelect,
}: ParticipantProps) {
  return (
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions
    <div
      onClick={onSelect}
      className='w-full cursor-pointer rounded hover:bg-gray-200'
    >
      <div className='flex w-full flex-row items-center gap-2 p-2'>
        <GrValidate
          className={`flex-shrink-0 ${isHost ? 'text-indigo-600' : 'text-black-200'}`}
        />
        <span className='font-medium'>{nickname}</span>
      </div>
    </div>
  );
}

export default Participant;
