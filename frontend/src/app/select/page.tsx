'use client';
import { useData } from '@/providers/data';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { GAMES } from '@/constants/constants';

export default function Page() {
  const { setInputValue } = useData();
  const router = useRouter();
  return (
    <div>
      {GAMES.map((game) => (
        <Button
          key={game.name}
          onClick={() => {
            setInputValue('game', game.name);
            router.push('/play');
          }}
        >
          {game.name
            .replace(/-v\d+/g, '')
            .replace(/([A-Z])/g, ' $1')
            .trim()}
        </Button>
      ))}
    </div>
  );
}
