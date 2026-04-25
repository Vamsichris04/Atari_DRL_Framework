'use client';

import React, { JSX, useMemo, useState } from 'react';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/pixelact-ui/card';
import { Button } from '@/components/ui/pixelact-ui/button';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/pixelact-ui/select';
import { useData } from '@/providers/data';
import { ParentSize } from '@visx/responsive';
import { Group } from '@visx/group';
import { Bar, LinePath } from '@visx/shape';
import { scaleBand, scaleLinear, scaleOrdinal } from '@visx/scale';
import { AxisBottom, AxisLeft } from '@visx/axis';
import { OutputDataType } from '@/types';
import { fetchResults, fetchStatus } from '@/api/api';

type Episode = { episode_number: number; reward: number };

type GameAgentSummary = {
  game: string;
  agent: string;
  average_total_reward: number;
  high_score: number;
  average_score: number;
  episodes: Episode[];
};

function buildSummaries(data: OutputDataType): GameAgentSummary[] {
  const out: GameAgentSummary[] = [];

  for (const [game, gameData] of Object.entries(data.games)) {
    for (const [agent, stats] of Object.entries(gameData.agents)) {
      out.push({
        game,
        agent,
        average_total_reward: stats.average_total_reward,
        high_score: stats.high_score,
        average_score: stats.average_score,
        episodes: stats.episodes,
      });
    }
  }

  return out;
}

function capitalize(label: string) {
  if (!label) return label;
  return label.charAt(0).toUpperCase() + label.slice(1);
}

function ChartArea({
  children,
}: {
  children: (size: { width: number; height: number }) => JSX.Element;
}) {
  return (
    <div
      style={{
        height: 300,
        width: '100%',
        position: 'relative',
        display: 'block',
      }}
    >
      <ParentSize>{children}</ParentSize>
    </div>
  );
}

function BarChartVisX({
  data,
  xKey,
  yKey,
}: {
  data: { [_key: string]: string | number }[];
  xKey: string;
  yKey: string;
}) {
  if (!data.length) return <div className="text-xs text-gray-500">No data</div>;

  return (
    <ChartArea>
      {({ width, height }) => {
        const margin = { top: 20, right: 20, bottom: 40, left: 50 };
        const innerWidth = width - margin.left - margin.right;
        const innerHeight = height - margin.top - margin.bottom;

        const xValues = data.map((d) => String(d[xKey]));

        const xScale = scaleBand<string>({
          domain: xValues,
          padding: 0.3,
          range: [0, innerWidth],
        });

        const yMax = Math.max(...(data.map((d) => Number(d[yKey])) || [0]));

        const yScale = scaleLinear<number>({
          domain: [0, yMax || 1],
          nice: true,
          range: [innerHeight, 0],
        });

        return (
          <svg width={width} height={height}>
            <Group left={margin.left} top={margin.top}>
              {data.map((d) => {
                const xVal = String(d[xKey]);
                const yVal = Number(d[yKey]);

                const barX = xScale(xVal);
                const barWidth = xScale.bandwidth();
                const barY = yScale(yVal);
                const barHeight = innerHeight - barY;

                if (barX == null || barWidth <= 0 || barHeight <= 0) return null;

                return (
                  <Bar
                    key={xVal}
                    x={barX}
                    y={barY}
                    width={barWidth}
                    height={barHeight}
                    fill="#3b82f6"
                  />
                );
              })}
            </Group>

            <AxisBottom top={margin.top + innerHeight} left={margin.left} scale={xScale} />

            <AxisLeft top={margin.top} left={margin.left} scale={yScale} />

            <text x={width / 2} y={height - 5} textAnchor="middle" fontSize={12} fill="#555">
              {capitalize(xKey)}
            </text>

            <text
              x={15}
              y={height / 2}
              transform={`rotate(-90, 15, ${height / 2})`}
              textAnchor="middle"
              fontSize={12}
              fill="#555"
            >
              {capitalize(yKey)}
            </text>
          </svg>
        );
      }}
    </ChartArea>
  );
}

type LineSeries = {
  id: string;
  label: string;
  color: string;
  episodes: Episode[];
};

function LineLegend({ series }: { series: LineSeries[] }) {
  return (
    <div className="flex flex-wrap gap-4 mb-2">
      {series.map((s) => (
        <div key={s.id} className="flex items-center gap-2 text-sm">
          <div
            style={{
              width: 14,
              height: 14,
              backgroundColor: s.color,
              borderRadius: 3,
            }}
          />
          <span>{s.label}</span>
        </div>
      ))}
    </div>
  );
}

function LineChartVisX({ series }: { series: LineSeries[] }) {
  const allEpisodes = series.flatMap((s) => s.episodes);
  if (!allEpisodes.length) return <div className="text-xs text-gray-500">No episode data</div>;

  return (
    <ChartArea>
      {({ width, height }) => {
        const margin = { top: 20, right: 20, bottom: 40, left: 50 };
        const innerWidth = width - margin.left - margin.right;
        const innerHeight = height - margin.top - margin.bottom;

        const maxEpisode = Math.max(...allEpisodes.map((e) => e.episode_number));
        const maxReward = Math.max(...allEpisodes.map((e) => e.reward));

        const xScale = scaleLinear<number>({
          domain: [0, maxEpisode || 1],
          range: [0, innerWidth],
        });

        const yScale = scaleLinear<number>({
          domain: [0, maxReward || 1],
          nice: true,
          range: [innerHeight, 0],
        });

        return (
          <svg width={width} height={height}>
            <Group left={margin.left} top={margin.top}>
              {series.map((s) => (
                <LinePath
                  key={s.id}
                  data={s.episodes}
                  x={(d) => xScale(d.episode_number)}
                  y={(d) => yScale(d.reward)}
                  stroke={s.color}
                  strokeWidth={2}
                />
              ))}
            </Group>

            <AxisBottom top={margin.top + innerHeight} left={margin.left} scale={xScale} />

            <AxisLeft top={margin.top} left={margin.left} scale={yScale} />

            <text x={width / 2} y={height - 5} textAnchor="middle" fontSize={12} fill="#555">
              Episode Number
            </text>

            <text
              x={15}
              y={height / 2}
              transform={`rotate(-90, 15, ${height / 2})`}
              textAnchor="middle"
              fontSize={12}
              fill="#555"
            >
              Reward
            </text>
          </svg>
        );
      }}
    </ChartArea>
  );
}

export default function Page() {
  const { outputData, setOutputData } = useData();

  const summaries = useMemo(() => buildSummaries(outputData), [outputData]);

  const games = Array.from(new Set(summaries.map((s) => s.game))).sort();
  const agents = Array.from(new Set(summaries.map((s) => s.agent))).sort();

  const [view, setView] = useState<'by-game' | 'by-agent'>('by-game');

  const [selectedGame, setSelectedGame] = useState(games[0] ?? '');
  const [selectedAgent, setSelectedAgent] = useState(agents[0] ?? '');

  const [selectedAgents, setSelectedAgents] = useState<string[]>([]);
  const [selectedGames, setSelectedGames] = useState<string[]>([]);

  const colorScale = scaleOrdinal<string, string>({
    domain: agents,
    range: ['#3b82f6', '#f97316', '#22c55e', '#e11d48', '#8b5cf6', '#0ea5e9', '#facc15'],
  });

  const rows =
    view === 'by-game'
      ? summaries.filter((s) => s.game === selectedGame)
      : summaries.filter((s) => s.agent === selectedAgent);

  const comparisonSeries: LineSeries[] =
    view === 'by-game'
      ? rows
          .filter((s) =>
            selectedAgents.length ? selectedAgents.includes(s.agent) : s.agent === selectedAgent
          )
          .map((s) => ({
            id: `${s.game}-${s.agent}`,
            label: `${s.agent} on ${s.game}`,
            color: colorScale(s.agent),
            episodes: s.episodes,
          }))
      : rows
          .filter((s) =>
            selectedGames.length ? selectedGames.includes(s.game) : s.game === selectedGame
          )
          .map((s) => ({
            id: `${s.game}-${s.agent}`,
            label: `${s.agent} on ${s.game}`,
            color: colorScale(s.agent),
            episodes: s.episodes,
          }));

  const interval = setInterval(async () => {
    try {
      const status = await fetchStatus();

      if (!status?.running) {
        const results = await fetchResults();

        if (results) {
          setOutputData(results);
          clearInterval(interval);
        }
      }
    } catch (err) {
      console.error('Backend unreachable or returned an error:', err);
      clearInterval(interval);
    }
  }, 2000);

  return (
    <div className="p-4 flex flex-col gap-4">
      <Card>
        <CardHeader className="flex items-center justify-between">
          <div>
            <CardTitle className="text-xl">Agent Performance</CardTitle>
            <CardDescription className="text-xs">
              Compare agents on the same game, and the same agent across games.
            </CardDescription>
          </div>

          <div className="grid gap-4">
            <div className="flex justify-end gap-4">
              <Button
                variant={view === 'by-game' ? 'default' : 'secondary'}
                size="sm"
                onClick={() => setView('by-game')}
                disabled={view === 'by-game'}
              >
                By Game
              </Button>

              <Button
                variant={view === 'by-agent' ? 'default' : 'secondary'}
                size="sm"
                onClick={() => setView('by-agent')}
                disabled={view === 'by-agent'}
              >
                By Agent
              </Button>
            </div>

            <div>
              {view === 'by-game' && (
                <Select
                  value={selectedGame}
                  onValueChange={(v) => {
                    setSelectedGame(v);
                    setSelectedAgents([]);
                  }}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {games.map((g) => (
                        <SelectItem key={g} value={g}>
                          {g}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              )}

              {view === 'by-agent' && (
                <Select
                  value={selectedAgent}
                  onValueChange={(v) => {
                    setSelectedAgent(v);
                    setSelectedGames([]);
                  }}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {agents.map((a) => (
                        <SelectItem key={a} value={a}>
                          {a}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              )}
            </div>
          </div>
        </CardHeader>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">
            {view === 'by-game'
              ? `Average Total Reward by Agent — ${selectedGame}`
              : `Average Total Reward by Game — ${selectedAgent}`}
          </CardTitle>
          <CardDescription>
            Click a row in the table below to update the comparison trend chart.
          </CardDescription>
        </CardHeader>

        <div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <BarChartVisX
                data={
                  view === 'by-game'
                    ? rows.map((s) => ({ agent: s.agent, avg: s.average_total_reward }))
                    : rows.map((s) => ({ game: s.game, avg: s.average_total_reward }))
                }
                xKey={view === 'by-game' ? 'agent' : 'game'}
                yKey="avg"
              />
            </div>

            <div>
              <div className="text-sm font-medium mb-2">
                {view === 'by-game'
                  ? `Reward Trend — ${selectedGame}`
                  : `Reward Trend — ${selectedAgent}`}
              </div>

              <LineLegend series={comparisonSeries} />

              <LineChartVisX series={comparisonSeries} />
            </div>
          </div>
        </div>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Details</CardTitle>
          <CardDescription>Click a row to toggle it in the trend comparison.</CardDescription>
        </CardHeader>

        <div>
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead>
                <tr className="bg-gray-200 border-b border-gray-300">
                  {view === 'by-game' ? (
                    <>
                      <th className="text-left px-2 py-2 font-semibold">Agent</th>
                      <th className="text-right px-2 py-2 font-semibold">Avg Total</th>
                      <th className="text-right px-2 py-2 font-semibold">High Score</th>
                      <th className="text-right px-2 py-2 font-semibold">Avg Score</th>
                    </>
                  ) : (
                    <>
                      <th className="text-left px-2 py-2 font-semibold">Game</th>
                      <th className="text-right px-2 py-2 font-semibold">Avg Total</th>
                      <th className="text-right px-2 py-2 font-semibold">High Score</th>
                      <th className="text-right px-2 py-2 font-semibold">Avg Score</th>
                    </>
                  )}
                </tr>
              </thead>

              <tbody>
                {rows.map((s) => {
                  const isSelected =
                    view === 'by-game'
                      ? selectedAgents.includes(s.agent)
                      : selectedGames.includes(s.game);

                  return (
                    <tr
                      key={`${s.game}-${s.agent}`}
                      className={`cursor-pointer transition-colors ${
                        isSelected ? 'bg-blue-50' : 'hover:bg-gray-100'
                      }`}
                      onClick={() => {
                        if (view === 'by-game') {
                          setSelectedAgents((prev) =>
                            prev.includes(s.agent)
                              ? prev.filter((a) => a !== s.agent)
                              : [...prev, s.agent]
                          );
                        } else {
                          setSelectedGames((prev) =>
                            prev.includes(s.game)
                              ? prev.filter((g) => g !== s.game)
                              : [...prev, s.game]
                          );
                        }
                      }}
                    >
                      {view === 'by-game' ? (
                        <>
                          <td className="px-2 py-1">{s.agent}</td>
                          <td className="px-2 py-1 text-right">
                            {s.average_total_reward.toFixed(2)}
                          </td>
                          <td className="px-2 py-1 text-right">{s.high_score.toFixed(2)}</td>
                          <td className="px-2 py-1 text-right">{s.average_score.toFixed(2)}</td>
                        </>
                      ) : (
                        <>
                          <td className="px-2 py-1">{s.game}</td>
                          <td className="px-2 py-1 text-right">
                            {s.average_total_reward.toFixed(2)}
                          </td>
                          <td className="px-2 py-1 text-right">{s.high_score.toFixed(2)}</td>
                          <td className="px-2 py-1 text-right">{s.average_score.toFixed(2)}</td>
                        </>
                      )}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </Card>
    </div>
  );
}
