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
import { flushSync } from 'react-dom';

const sectionHeadingClass =
  'pixel-font text-[10px] font-semibold uppercase tracking-wide text-muted-foreground mb-1';
const bodyMutedClass = 'pixel-font text-xs text-muted-foreground leading-relaxed';

function parseNonNegativeNumber(raw: string): number | null {
  if (raw === '' || raw === '.' || raw === '-.') return null;
  const parsed = Number(raw);
  if (!Number.isFinite(parsed)) return null;
  return Math.max(0, parsed);
}

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
        type="button"
        className="pixel-font"
        onClick={() => setOpen((v) => !v)}
        title={`More info: ${parameter.title}`}
        style={{
          width: 18,
          height: 18,
          background: open ? 'var(--pixel-primary, #000)' : 'transparent',
          border: '2px solid currentColor',
          color: open ? 'var(--pixel-primary-foreground, #fff)' : 'var(--muted-foreground, #888)',
          fontWeight: 'bold',
          fontSize: 10,
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
          className="pixel-border bg-background p-3 grid gap-3 shadow-lg"
        >
          <p className="pixel-font text-xs font-bold text-foreground">{parameter.title}</p>

          {parameter.details && (
            <div>
              <p className={sectionHeadingClass}>Overview</p>
              <p className={bodyMutedClass}>{parameter.details}</p>
            </div>
          )}

          {parameter.pros && (
            <div>
              <p className={sectionHeadingClass}>Pros</p>
              <div className="grid gap-1">
                {parameter.pros.map((pro, i) => (
                  <div key={i} className={`flex gap-1.5 ${bodyMutedClass}`}>
                    <span className="text-muted-foreground shrink-0">+</span>
                    <span>{pro}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {parameter.cons && (
            <div>
              <p className={sectionHeadingClass}>Cons</p>
              <div className="grid gap-1">
                {parameter.cons.map((con, i) => (
                  <div key={i} className={`flex gap-1.5 ${bodyMutedClass}`}>
                    <span className="text-muted-foreground shrink-0">−</span>
                    <span>{con}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {parameter.tip && (
            <div className="border-t border-border pt-2">
              <p className={sectionHeadingClass}>Tip</p>
              <p className={bodyMutedClass}>{parameter.tip}</p>
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
  /** Lets users type "-" for Rainbow `v_min` while the field is focused (controlled inputs otherwise reject "-"). */
  const [vMinDraft, setVMinDraft] = useState<string | null>(null);
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

  const [shouldRun, setShouldRun] = useState(false);
  const pendingRef = useRef<boolean | null>(null);

  useEffect(() => {
      if (!inputData.game || !inputData.algorithm) {
        router.push('/select');
      }
    }, [inputData, router]);

    useEffect(() => {
    if (!shouldRun) return;
    if (!pendingRef.current) return;

    const execute = async () => {
      await runAgent();
      router.push('/play');

      pendingRef.current = false;
      setShouldRun(false);
    };

    execute();
  }, [shouldRun]);

  return (
    <div className="grid gap-4 p-8">
      <h1 className="pixel-font text-xl sm:text-2xl font-bold text-center text-foreground">
        Configure the Agent
      </h1>
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
              ) : parameter.key === 'v_min' ? (
                <Input
                  id={parameter.key}
                  className="w-32"
                  type="number"
                  onFocus={() => {
                    setActiveParameter(parameter);
                    setVMinDraft(String(parameters[parameter.key as keyof Parameters] as number));
                  }}
                  onBlur={() => {
                    setActiveParameter(null);
                    const raw = vMinDraft ?? '';
                    const n = raw === '' || raw === '-' ? 0 : Number(raw);
                    if (Number.isFinite(n)) handleChange('v_min', n, false);
                    setVMinDraft(null);
                  }}
                  onChange={(e) => {
                    const raw = e.target.value;
                    setVMinDraft(raw);
                    if (raw !== '' && raw !== '-') {
                      const n = Number(raw);
                      if (Number.isFinite(n)) handleChange('v_min', n, false);
                    }
                  }}
                  value={
                    vMinDraft !== null
                      ? vMinDraft
                      : (parameters[parameter.key as keyof Parameters] as number)
                  }
                  max={parameter.max}
                  min={parameter.min}
                />
              ) : (
                <Input
                  id={parameter.key}
                  className="w-32"
                  type="number"
                  onFocus={() => setActiveParameter(parameter)}
                  onBlur={() => {
                    setActiveParameter(null);
                    const v = parameters[parameter.key as keyof Parameters] as number;
                    if (v < 0) handleChange(parameter.key, 0, false);
                  }}
                  onChange={(e) => {
                    const raw = e.target.value;
                    if (raw.trimStart().startsWith('-')) return;
                    const next = parseNonNegativeNumber(raw);
                    if (next === null) return;
                    handleChange(parameter.key, next, false);
                  }}
                  value={parameters[parameter.key as keyof Parameters]}
                  max={parameter.max}
                  min={parameter.min ?? 0}
                />
              )}
            </div>
          ))}
        </div>
        <div className="w-60 text-wrap pixel-font text-xs text-muted-foreground leading-relaxed">
          {activeParameter?.description}
        </div>
      </div>
      <div className="flex justify-center mt-4">
        <Button
          onClick={() => {
            setInputValue('parameters', parameters);

            pendingRef.current = true;
            setShouldRun(true);
          }}
        >
          Next
        </Button>
      </div>
    </div>
  );
}
