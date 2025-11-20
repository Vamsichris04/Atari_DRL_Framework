'use client';
import { Button } from '@/components/ui/button';
import { useData } from '@/providers/data';
import { useRouter } from 'next/navigation';

export default function Page() {
  const { setInputValue } = useData();
  const router = useRouter();

  return (
    <div className="grid gap-4 h-100">
      <h1 className="text-3xl font-bold text-center">Select an Algorithm</h1>
      <div className="flex justify-center items-center">
        <div className="grid gap-2">
          <div className="flex justify-center gap-2">
            {['DQN', 'Rainbow', 'PPO'].map((algorithm) => (
              <Button
                key={algorithm}
                onClick={() => {
                  setInputValue('algorithm', algorithm);
                  router.push('/configure');
                }}
              >
                {algorithm}
              </Button>
            ))}
          </div>
          <p className="text-center">
            <b>DQN:</b> Stores past experiences and replays them to learn which actions lead to the
            best rewards.
          </p>
          <p className="text-center">
            <b>Rainbow:</b> An improved version of DQN designed to learn faster and perform better.
          </p>
          <p className="text-center">
            <b>PPO:</b> Learns how to act from recent experiences only, and carefully updates its
            strategy to stay stable.
          </p>
        </div>
      </div>
    </div>
  );
}
