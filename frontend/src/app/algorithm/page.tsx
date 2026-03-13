'use client';
import { Button } from '@/components/ui/pixelact-ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/pixelact-ui/card';
import { useData } from '@/providers/data';
import { useRouter } from 'next/navigation';
import '@/components/ui/pixelact-ui/styles/styles.css';

export default function Page() {
  const { setInputValue } = useData();
  const router = useRouter();

  return (
    <div className="grid gap-4 h-100">
      <h1 className="text-3xl font-bold text-center pixel-font">Select an Algorithm</h1>
      <div className="flex justify-center items-center">
        <div className="flex gap-2">
          <Card className="text-center flex flex-col justify-between">
            <CardHeader>
              <CardTitle className="text-xl">DQN</CardTitle>
            </CardHeader>
            <CardContent>
              Stores past experiences and replays them to learn which actions lead to the best
              rewards.
            </CardContent>
            <CardFooter>
              <Button
                onClick={() => {
                  setInputValue('algorithm', 'DQN');
                  router.push('/configure');
                }}
                className="w-full"
              >
                Select
              </Button>
            </CardFooter>
          </Card>
          <Card className="text-center flex flex-col justify-between">
            <CardHeader>
              <CardTitle className="text-xl">Rainbow</CardTitle>
            </CardHeader>
            <CardContent>
              An improved version of DQN designed to learn faster and perform better.
            </CardContent>
            <CardFooter>
              <Button
                onClick={() => {
                  setInputValue('algorithm', 'Rainbow');
                  router.push('/configure');
                }}
                className="w-full"
              >
                Select
              </Button>
            </CardFooter>
          </Card>
          <Card className="text-center flex flex-col justify-between">
            <CardHeader>
              <CardTitle className="text-xl">PPO</CardTitle>
            </CardHeader>
            <CardContent>
              Learns how to act from recent experiences only, and carefully updates its strategy to
              stay stable.
            </CardContent>
            <CardFooter>
              <Button
                onClick={() => {
                  setInputValue('algorithm', 'PPO');
                  router.push('/configure');
                }}
                className="w-full"
              >
                Select
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
}
