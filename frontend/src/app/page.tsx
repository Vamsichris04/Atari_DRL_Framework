import { Button } from '@/components/ui/pixelact-ui/button';
import Link from 'next/link';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/pixelact-ui/dialog';
import '@/components/ui/pixelact-ui/styles/styles.css';

export default function Home() {
  return (
    <div className="w-full mt-40 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold pixel-font">RL Studio</h1>
        <Link href="/select">
          <Button className="m-10 w-25 h-25 text-lg">Start</Button>
        </Link>
        <Dialog>
          <DialogTrigger asChild className="absolute top-2 right-2">
            <Button style={{ position: 'absolute' }}>Overview</Button>
          </DialogTrigger>
          <DialogContent className="text-center !w-200 !max-w-200">
            <DialogHeader>
              <DialogTitle className="text-2xl text-center">RL Studio</DialogTitle>
            </DialogHeader>
            Welcome to RL Studio!
            <br />
            <br />
            This application introduces Deep Reinforcement Learning by letting you train AI agents
            to play classic Atari games. These games are widely used in AI research because they’re
            simple to understand but challenging for computers to master. You’ll try out different
            settings to see how they change the agent’s behavior, play the games yourself to compare
            strategies, and use the built‑in chatbot to explore concepts and ask questions as you
            learn.
            <DialogFooter>
              <div>
                <h5 className="font-bold text-sm">References</h5>
                <ul className="text-xs text-muted-foreground">
                  <li className="border">
                    Farama Foundation. Gymnasium. 2023. Available at:
                    https://github.com/Farama-Foundation/Gymnasium
                  </li>
                  <li className="border">
                    Bellemare, M. G., Naddaf, Y., Veness, J., & Bowling, M. (2013). The Arcade
                    Learning Environment: An Evaluation Platform for General Agents. Journal of
                    Artificial Intelligence Research, 47, 253–279.
                  </li>
                  <li className="border">
                    Machado, M. C., Bellemare, M. G., Talvitie, E., Veness, J., Hausknecht, M., &
                    Bowling, M. (2018). Revisiting the Arcade Learning Environment: Evaluation
                    Protocols and Open Problems for General Agents. Journal of Artificial
                    Intelligence Research, 61, 523–562.
                  </li>
                </ul>
                <p className="text-center text-xs">
                  This project is not affiliated with or endorsed by Atari.
                </p>
              </div>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
