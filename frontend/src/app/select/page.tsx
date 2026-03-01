'use client';
import { useData } from '@/providers/data';
import { Button } from '@/components/ui/pixelact-ui/button';
import { useRouter } from 'next/navigation';
import { GAMES } from '@/constants';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/pixelact-ui/card';
import Image from 'next/image';
import { Input } from '@/components/ui/pixelact-ui/input';
import { useState } from 'react';
import '@/components/ui/pixelact-ui/styles/styles.css';

export default function Page() {
  const { setInputValue } = useData();
  const router = useRouter();
  const [matchingGames, setMatchingGames] = useState(GAMES);

  return (
    <div className="grid grid-cols-1 gap-4">
      <h1 className="text-xl font-bold text-center pixel-font">Select a Game</h1>
      <Input
        onChange={(event) => {
          setMatchingGames(
            GAMES.filter((game) =>
              game.name.toLowerCase().includes(event.target.value.toLowerCase())
            )
          );
        }}
        placeholder="Start typing to search for games by name."
        autoFocus={true}
      />
      {matchingGames.length > 0 ? (
        <div className="grid grid-cols-5 gap-2">
          {matchingGames.map((game) => (
            <Card key={game.name} className="flex justify-between w-full max-w-sm gap-2">
              <CardHeader>
                <CardTitle className="text-xl text-center">
                  {game.name
                    .replace(/ALE\//g, '')
                    .replace(/-v\d+/g, '')
                    .replace(/([A-Z])/g, ' $1')
                    .replace('Tic Tac Toe3 D', 'Tic Tac Toe 3D')
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
                    router.push('/algorithm');
                  }}
                  className="w-full"
                >
                  Select
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : (
        <h3 className="text-xl font-bold text-center">No games match your search criteria.</h3>
      )}
    </div>
  );
}
