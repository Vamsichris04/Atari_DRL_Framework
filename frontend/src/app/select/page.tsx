'use client';
import { useData } from '@/providers/data';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { GAMES } from '@/constants/constants';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import Image from 'next/image';

export default function Page() {
  const { setInputValue } = useData();
  const router = useRouter();
  return (
    <div className="grid grid-cols-1 gap-4">
      <h1 className="text-3xl font-bold text-center">Select a Game</h1>
      <div className="grid grid-cols-5 gap-2">
        {GAMES.map((game) => (
          <Card key={game.name} className="flex justify-between w-full max-w-sm gap-2">
            <CardHeader>
              <CardTitle className="text-2xl text-center">
                {game.name
                  .replace(/ALE\//g, '')
                  .replace(/-v\d+/g, '')
                  .replace(/([A-Z])/g, ' $1')
                  .trim()}
              </CardTitle>
            </CardHeader>
            <CardContent className="flex justify-center">
              <Image src={game.image} width={200} height={150} alt="Picture of the game" />
            </CardContent>
            <CardFooter>
              <Button
                key={game.name}
                onClick={() => {
                  setInputValue('game', game.name);
                  router.push('/play');
                }}
                className="w-full"
              >
                Play
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
