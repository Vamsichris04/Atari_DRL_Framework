'use client';

import React, { useEffect, useMemo, useState } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardAction } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  CartesianGrid,
} from 'recharts';

export default function Page() {
  const [data, setData] = useState<{ [key: string]: any }>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [sortKey, setSortKey] = useState<string>('id');
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('asc');
  const [view, setView] = useState<'table' | 'grid'>('table');

  const [selectedRow, setSelectedRow] = useState<any | null>(null);

  useEffect(() => {
    async function load() {
      try {
        const imported = await import('@/app/results/tempData.json');
        console.log('Imported data:', imported);
        setData(imported.default || imported);
      } catch (err: any) {
        console.error(err);
        setError(err.message || 'Error loading data');
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  console.log('Loaded data:', data);

  const agents: Set<string> = useMemo(() => {
    return data && data['games'] ? new Set(
      Object.keys(data['games']).flatMap((game: string) => {
        return Object.keys(data['games'][game]['agents']);
      })
    ) : new Set();
  }, [data]);

  const games: Set<string> = useMemo(() => {
    return data && data['games'] ? new Set(Object.keys(data['games'])) : new Set();
  }, [data]);

  const data_by_games = useMemo(() => {
    return data && data['games'] ? Object.fromEntries(
      Object.keys(data['games']).map((game: string) => {
        return [
          game,
          Object.keys(data['games'][game]['agents']).map((agent: string) => {
            const agentData = data['games'][game]['agents'][agent];
            return {
              agent: agent,
              average_total_reward: agentData ? agentData['average_total_reward'] : null,
              high_score: agentData ? agentData['high_score'] : null,
              average_score: agentData ? agentData['average_score'] : null,
            };
          }).filter((entry) => entry.average_total_reward !== null),
        ];
      })
    ) : {};
  }, [data]);

  const data_by_agents = useMemo(() => {
    return Object.fromEntries(
      Array.from(agents).map((agent: string) => {
        return [
          agent,
          Array.from(games).map((game: string) => {
            const agentData = data['games'][game]['agents'][agent];
            return {
              game: game,
              average_total_reward: agentData ? agentData['average_total_reward'] : null,
              high_score: agentData ? agentData['high_score'] : null,
              average_score: agentData ? agentData['average_score'] : null,
            };
          }).filter((entry) => entry.average_total_reward !== null),
        ];
      })
    );
  }, [data, agents, games]);

  const columns_by_games = ['agent', 'average_total_reward', 'high_score', 'average_score'];
  const columns_by_agents = ['game', 'average_total_reward', 'high_score', 'average_score'];

  function toggleSort(col: string) {
    if (col === sortKey) setSortDir((d) => (d === 'asc' ? 'desc' : 'asc'));
    else {
      setSortKey(col);
      setSortDir('asc');
    }
  }

  function generate_table(data: { [key: string]: any }, columns: string[]) {
    console.log('Generating table for data:', data);
    return Object.keys(data).map((key: string) => {
      const sortedRows = [...data[key]].sort((a, b) => {
        const A = a[sortKey];
        const B = b[sortKey];
        if (A == null && B == null) return 0;
        if (A == null) return 1;
        if (B == null) return -1;
        if (typeof A === 'number' && typeof B === 'number') return sortDir === 'asc' ? A - B : B - A;
        const sA = String(A).toLowerCase();
        const sB = String(B).toLowerCase();
        if (sA < sB) return sortDir === 'asc' ? -1 : 1;
        if (sA > sB) return sortDir === 'asc' ? 1 : -1;
        return 0;
      });

      return (
        <div key={key} className="mb-4">
          <h3 className="text-lg font-semibold mb-2">{key}</h3>
          <table className="min-w-full divide-y">
            <thead>
              <tr>
                {columns.map((col) => (
                  <th
                    key={col}
                    className="px-3 py-2 text-left cursor-pointer select-none"
                    onClick={() => toggleSort(col)}
                  >
                    <div className="flex items-center gap-2">
                      <span className="capitalize">{col}</span>
                      {sortKey === col && <span>{sortDir === 'asc' ? '▲' : '▼'}</span>}
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {sortedRows.map((row: any) => (
                <tr
                  key={row.agent || row.game}
                  className={cn('hover:bg-gray-100 cursor-pointer', selectedRow?.id === row.id ? 'bg-slate-100' : '')}
                  onClick={() => {
                    let episodes = [];
                    if (view === 'table') {
                      episodes = data?.games?.[key]?.agents?.[row.agent]?.episodes || [];
                    } else {
                      episodes = data?.games?.[row.game]?.agents?.[key]?.episodes || [];
                    }
                    setSelectedRow({ ...row, episodes });
                  }}
                >
                  {columns.map((col) => (
                    <td key={col} className="px-3 py-2">
                      {String(row[col] ?? '')}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    });
  }

  if (loading)
    return (
      <div className="m-4">
        <Card className="p-4">
          <CardHeader>
            <CardTitle>Loading data...</CardTitle>
            <CardDescription>Please wait.</CardDescription>
          </CardHeader>
        </Card>
      </div>
    );

  if (error)
    return (
      <div className="m-4">
        <Card className="p-4">
          <CardHeader>
            <CardTitle>Error</CardTitle>
            <CardDescription>{error}</CardDescription>
          </CardHeader>
        </Card>
      </div>
    );

  return (
    <div className="p-4">
      <div className="flex gap-4 mb-4">
        <Card className="flex-1 p-2">
          <CardHeader className="flex items-center justify-between">
            <div>
              <CardTitle className="text-xl">Data Browser</CardTitle>
              <CardDescription className="text-sm"></CardDescription>
            </div>
            <CardAction>
              <Button onClick={() => setView((v) => (v === 'table' ? 'grid' : 'table'))}>
                Switch to {view === 'table' ? 'Agents' : 'Table'} view
              </Button>
            </CardAction>
          </CardHeader>

          <div className="mt-3">
            {view === 'table' ? (
              <div className="overflow-x-auto">
                {
                  generate_table(data_by_games, columns_by_games)
                }
              </div>
            ) : (
              <div className="overflow-x-auto">
                {generate_table(data_by_agents, columns_by_agents)}
              </div>
            )}
          </div>
        </Card>

        <div className="w-1/3 flex flex-col gap-4">
          <Card className="p-3 h-1/2">
            <CardHeader>
              <CardTitle className="text-lg">Chart</CardTitle>
              <CardDescription className="text-sm">Click a row to change this chart</CardDescription>
            </CardHeader>
            <div style={{ height: 220 }} className="mt-2">
            </div>
          </Card>

          <Card className="p-3 h-1/2">
            <CardHeader>
              <CardTitle className="text-lg">Trend</CardTitle>
              <CardDescription className="text-sm">A small line chart driven by selected row</CardDescription>
            </CardHeader>
            <div style={{ height: 220 }} className="mt-2">
            </div>
          </Card>
        </div>
      </div>

      <div>
        <Card className="p-3">
          <CardHeader>
            <CardTitle className="text-sm">Selected Row</CardTitle>
            <CardDescription className="text-xs">Click a table row to load into charts</CardDescription>
          </CardHeader>
          <div className="mt-2">
            <pre className="text-xs max-h-40 overflow-auto">{selectedRow ? JSON.stringify(selectedRow, null, 2) : 'No row selected'}</pre>
          </div>
        </Card>
      </div>
    </div>
  );
}
