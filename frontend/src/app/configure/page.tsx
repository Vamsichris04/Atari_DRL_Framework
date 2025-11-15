'use client';
import { useData } from '@/providers/data';
import { CONFIGURATIONS, PARAMETERS } from '@/constants';
import { useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Configuration } from '@/types';
import { useRouter } from 'next/navigation';

export default function Page() {
  const { inputData, setInputValue } = useData();
  const router = useRouter();
  const [availableConfigurations, setAvailableConfigurations] = useState(
    CONFIGURATIONS.filter((configuration) => configuration.game === inputData.game)
  );
  const currentParameter = useRef(-1);
  const parameterList = useRef<string[]>([]);

  const getCurrentParameterOptions = () => {
    if (currentParameter.current === -1) {
      return (
        <div className="grid gap-2">
          <h3 className="text-xl font-bold text-center">Select an Algorithm</h3>
          <div className="flex justify-center gap-2">
            {[
              ...new Set(availableConfigurations.map((configuration) => configuration.algorithm)),
            ].map((option) => (
              <Button
                key={`${currentParameter}-${option}`}
                onClick={() => {
                  setAvailableConfigurations(
                    availableConfigurations.filter(
                      (configuration) => configuration.algorithm === option
                    )
                  );
                  parameterList.current = Object.keys(
                    (
                      availableConfigurations.find(
                        (configuration) => configuration.algorithm === option
                      ) as unknown as Configuration
                    ).parameters
                  );
                  currentParameter.current = 0;
                }}
              >
                {option}
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
      );
    } else if (
      currentParameter.current >= parameterList.current.length ||
      availableConfigurations.length === 1
    ) {
      return (
        <div className="grid gap-2">
          <h3 className="text-xl font-bold text-center">Chosen Configuration:</h3>
          <div className="text-center border-2 p-2">
            <p>
              <b>Game:</b> {availableConfigurations[0].game}
            </p>
            <p>
              <b>Algorithm:</b> {availableConfigurations[0].algorithm}
            </p>
            {Object.entries(availableConfigurations[0].parameters).map(([key, value]) => (
              <p key={key}>
                <b>{key.replace(/_/g, ' ').replace(/\b[a-z]/g, (char) => char.toUpperCase())}:</b>{' '}
                {value}
              </p>
            ))}
          </div>
          <div className="flex justify-center">
            <Button
              onClick={() => {
                setInputValue('configuration', availableConfigurations[0]);
                router.push('/results');
              }}
            >
              Next
            </Button>
          </div>
        </div>
      );
    } else {
      const parameterDetails = PARAMETERS.find(
        (parameter) => parameter.key === parameterList.current[currentParameter.current]
      );
      return (
        <div className="grid gap-2">
          <h3 className="text-xl font-bold text-center">{parameterDetails?.title}</h3>
          <div className="flex justify-center gap-2">
            {[
              ...new Set(
                availableConfigurations.map(
                  (configuration) =>
                    configuration.parameters[
                      parameterList.current[
                        currentParameter.current
                      ] as keyof typeof configuration.parameters
                    ]
                )
              ),
            ].map((option: number | boolean) => (
              <Button
                key={`${currentParameter}-${option}`}
                onClick={() => {
                  setAvailableConfigurations(
                    availableConfigurations.filter(
                      (configuration) =>
                        configuration.parameters[
                          parameterList.current[
                            currentParameter.current
                          ] as keyof typeof configuration.parameters
                        ] === option
                    )
                  );
                  currentParameter.current = currentParameter.current + 1;
                }}
              >
                {typeof option === 'boolean' ? option.toString() : option}
              </Button>
            ))}
          </div>
          <p className="text-center">{parameterDetails?.description}</p>
        </div>
      );
    }
  };

  useEffect(() => {
    if (!inputData.game) {
      router.push('/select');
    }
  }, [inputData, router]);

  return (
    <div className="grid gap-4 h-100">
      <h1 className="text-3xl font-bold text-center">Configure the Agent</h1>
      <div className="flex justify-center items-center">{getCurrentParameterOptions()}</div>
    </div>
  );
}
