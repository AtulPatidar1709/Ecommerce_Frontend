import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface SideBannerProps {
  title: string;
  label: string;
  gradient: string;
  image: string;
}

export function SideBanner({ title, label, gradient, image }: SideBannerProps) {
  return (
    <Card className='rounded-2xl overflow-hidden shadow-lg'>
      <CardContent
        className={`relative p-6 h-full bg-linear-to-br ${gradient}`}
      >
        <p className='text-sm uppercase text-white/80'>{label}</p>
        <h2 className='mt-2 text-xl font-semibold text-white'>{title}</h2>
        <Button variant='link' className='mt-2 px-0 text-white'>
          Shop Now →
        </Button>
        <img
          src={image}
          alt={title}
          className='absolute right-2 bottom-2 w-20 md:w-28'
        />
      </CardContent>
    </Card>
  );
}
