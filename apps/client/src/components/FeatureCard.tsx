interface FeatureCardProps {
  icon: string;
  title: string;
  description: string;
}

function FeatureCard({ icon, title, description }: FeatureCardProps) {
  return (
    <div className='inline-flex shrink grow basis-0 flex-col items-start gap-4 self-stretch rounded-lg bg-gray-50 p-6'>
      <div className='text-[32px] font-bold text-black'>{icon}</div>
      <div className='text-lg font-bold text-black'>{title}</div>
      <div className='self-stretch text-sm font-medium text-gray-500'>
        {description}
      </div>
    </div>
  );
}

export default FeatureCard;
