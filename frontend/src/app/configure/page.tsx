'use client';
import { useData } from '@/providers/data';
import { PARAMETERS } from '@/constants';
import { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { Algorithm, Parameter, ParameterKeys, Parameters } from '@/types';
import { useAgent } from '@/api/api';
import { Button } from '@/components/ui/pixelact-ui/button';
import { Input } from '@/components/ui/pixelact-ui/input';
import { Label } from '@/components/ui/pixelact-ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/pixelact-ui/select';
import '@/components/ui/pixelact-ui/styles/styles.css';

function InfoTooltip({ parameter }: { parameter: Parameter }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [open]);

  return (
    <div ref={ref} style={{ position: 'relative', display: 'inline-block', marginLeft: 6 }}>
      <button
        onClick={() => setOpen((v) => !v)}
        title={`More info: ${parameter.title}`}
        style={{
          width: 18,
          height: 18,
          background: open ? 'var(--pixel-primary, #000)' : 'transparent',
          border: '2px solid currentColor',
          color: open ? 'var(--pixel-primary-foreground, #fff)' : 'var(--muted-foreground, #888)',
          fontFamily: 'inherit',
          fontWeight: 'bold',
          fontSize: 11,
          cursor: 'pointer',
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          lineHeight: 1,
          padding: 0,
          flexShrink: 0,
        }}
      >
        i
      </button>

      {open && (
        <div
          style={{
            position: 'absolute',
            left: '50%',
            transform: 'translateX(-50%)',
            top: 24,
            zIndex: 100,
            width: 320,
          }}
          className="pixel-border bg-background text-foreground p-3 text-sm grid gap-3 shadow-lg"
        >
          {/* Title */}
          <p className="pixel-font font-bold text-xs">{parameter.title}</p>

          {/* Overview */}
          {parameter.details && (
            <div>
              <p className="pixel-font text-[9px] font-semibold mb-1">OVERVIEW</p>
              <p className="text-muted-foreground leading-relaxed">{parameter.details}</p>
            </div>
          )}

          {/* Pros */}
          {parameter.pros && (
            <div>
              <p className="pixel-font text-[9px] font-semibold mb-1 text-green-600 dark:text-green-400">
                ✓ PROS
              </p>
              <div className="grid gap-1">
                {parameter.pros.map((pro, i) => (
                  <div key={i} className="flex gap-1.5 text-muted-foreground">
                    <span className="text-green-500 shrink-0">+</span>
                    <span>{pro}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Cons */}
          {parameter.cons && (
            <div>
              <p className="pixel-font text-[9px] font-semibold mb-1 text-red-600 dark:text-red-400">
                ✗ CONS
              </p>
              <div className="grid gap-1">
                {parameter.cons.map((con, i) => (
                  <div key={i} className="flex gap-1.5 text-muted-foreground">
                    <span className="text-red-500 shrink-0">−</span>
                    <span>{con}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tip */}
          {parameter.tip && (
            <div className="border-t pt-2 flex gap-1.5 text-muted-foreground">
              <span className="text-yellow-500 shrink-0">★</span>
              <span>{parameter.tip}</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

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
      setParameters((prev) => ({ ...prev, [key]: value }));
    } else {
      setParameters((prev) => ({ ...prev, [key]: value }));
    }
  };

  useEffect(() => {
    if (!inputData.game || !inputData.algorithm) {
      router.push('/select');
    }
  }, [inputData, router]);

  return (
    <div className="grid gap-4 p-8">
      <h1 className="text-3xl font-bold text-center pixel-font">Configure the Agent</h1>
      <div className="flex justify-center items-start gap-20">
        <div className="grid gap-2 w-100">
          {PARAMETERS.filter((parameter) =>
            parameter.algorithms.includes(algorithm as Algorithm)
          ).map((parameter) => (
            <div key={parameter.key} className="flex justify-between items-center gap-4">
              <div className="flex items-center">
                <Label title={parameter.description} htmlFor={parameter.key}>
                  {parameter.title}
                </Label>
                <InfoTooltip parameter={parameter} />
              </div>
              {parameter.isBoolean ? (
                <Select
                  onValueChange={(value: string) => {
                    handleChange(parameter.key, value === 'true', true);
                  }}
                  value={parameters[parameter.key as keyof Parameters].toString()}
                >
                  <SelectTrigger className="w-32">
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
                  className="w-32"
                  type="number"
                  onFocus={() => setActiveParameter(parameter)}
                  onBlur={() => setActiveParameter(null)}
                  onChange={(e) => handleChange(parameter.key, Number(e.target.value), false)}
                  value={parameters[parameter.key as keyof Parameters]}
                  max={parameter.max}
                  min={parameter.min}
                />
              )}
            </div>
          ))}
        </div>
        <div className="w-60 text-wrap text-sm text-muted-foreground">
          {activeParameter?.description}
        </div>
      </div>
      <div className="flex justify-center mt-4">
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
