import { GrValidate } from 'react-icons/gr';

interface ParticipantProps {
  name: string;
  isHost: boolean;
  onSelect: () => void;
}

function Participant({ name, isHost, onSelect }: ParticipantProps) {
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
        <span className='font-medium'>{name}</span>
      </div>
    </div>
  );
}

export default Participant;
