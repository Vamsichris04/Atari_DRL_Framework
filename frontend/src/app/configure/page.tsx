'use client';
import { useData } from '@/providers/data';
import { CONFIGURATIONS, PARAMETERS } from '@/constants';
import { useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Configuration } from '@/types';

export default function Page() {
  const { inputData } = useData();
  const [availableConfigurations, setAvailableConfigurations] = useState(
    CONFIGURATIONS.filter((configuration) => configuration.game === inputData.game)
  );
  const currentParameter = useRef(-1);
  const parameterList = useRef<string[]>([]);

  const getCurrentParameterOptions = () => {
    if (currentParameter.current === -1) {
      return (
        <div>
          <p>Algorithm</p>
          {availableConfigurations
            .map((configuration) => configuration.algorithm)
            .map((option) => (
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
      );
    } else if (
      currentParameter.current >= parameterList.current.length ||
      availableConfigurations.length === 1
    ) {
      return <Button>Next</Button>;
    } else {
      const parameterDetails = PARAMETERS.find(
        (parameter) => parameter.key === parameterList.current[currentParameter.current]
      );
      return (
        <div>
          <h3 className="text-xl font-bold text-center">{parameterDetails?.title}</h3>
          <p className="text-center">{parameterDetails?.description}</p>
          {availableConfigurations
            .map(
              (configuration) =>
                configuration.parameters[
                  parameterList.current[
                    currentParameter.current
                  ] as keyof typeof configuration.parameters
                ]
            )
            .map((option: number | boolean) => (
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
      );
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold text-center">Configure the Agent</h1>
      <div>{getCurrentParameterOptions()}</div>
    </div>
  );
}
