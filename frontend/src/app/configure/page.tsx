'use client';
import { useData } from '@/providers/data';
import { PARAMETERS } from '@/constants';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { Algorithm, Parameter, ParameterKeys, Parameters } from '@/types';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useAgent } from '@/api/api';

export default function Page() {
  const { inputData, setInputValue } = useData();
  const router = useRouter();
  const { runAgent } = useAgent();
  const algorithm = inputData.algorithm;
  const [activeParameter, setActiveParameter] = useState<Parameter | null>(null);
  const [parameters, setParameters] = useState<Parameters>(() => {
    const initial: Partial<Parameters> = {};
    PARAMETERS.filter((p) => p.algorithms.includes(algorithm as Algorithm)).forEach((p) => {
      if (p.isBoolean) {
        // @ts-expect-error False is valid
        initial[p.key as keyof Parameters] = false;
      } else {
        initial[p.key as keyof Parameters] = 0;
      }
    });
    return initial as Parameters;
  });

  const handleChange = (key: ParameterKeys, value: number | boolean, isBoolean: boolean) => {
    if (isBoolean) {
      setParameters((prev) => ({
        ...prev,
        [key]: value,
      }));
    } else {
      setParameters((prev) => ({
        ...prev,
        [key]: value,
      }));
    }
  };

  useEffect(() => {
    if (!inputData.game || !inputData.algorithm) {
      router.push('/select');
    }
  }, [inputData, router]);

  return (
    <div className="grid gap-4">
      <h1 className="text-3xl font-bold text-center">Configure the Agent</h1>
      <div className="flex justify-center items-center gap-20">
        <div className="grid gap-2 w-100">
          {PARAMETERS.filter((parameter) =>
            parameter.algorithms.includes(algorithm as Algorithm)
          ).map((parameter) => (
            <div key={parameter.key} className="flex justify-between">
              <Label title={parameter.description} htmlFor={parameter.key}>
                {parameter.title}
              </Label>
              {parameter.isBoolean ? (
                <Select
                  onValueChange={(value) => {
                    handleChange(parameter.key, Boolean(value), true);
                  }}
                  value={parameters[parameter.key as keyof Parameters].toString()}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select an option" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="true">Yes</SelectItem>
                    <SelectItem value="false">No</SelectItem>
                  </SelectContent>
                </Select>
              ) : (
                <Input
                  id={parameter.key}
                  className="w-50"
                  type="number"
                  onFocus={() => {
                    setActiveParameter(parameter);
                  }}
                  onBlur={() => {
                    setActiveParameter(null);
                  }}
                  onChange={(e) => {
                    handleChange(parameter.key, Number(e.target.value), false);
                  }}
                  value={parameters[parameter.key as keyof Parameters]}
                  max={parameter.max}
                  min={parameter.min}
                />
              )}
            </div>
          ))}
        </div>
        <div className="w-100 text-wrap">{activeParameter?.description}</div>
      </div>
      <div className="flex justify-center">
        <Button
          onClick={async () => {
            setInputValue('parameters', parameters);
            await runAgent();
            router.push('/play');
          }}
        >
          Next
        </Button>
      </div>
    </div>
  );
}
