'use client';
import { useData } from '@/providers/data';

export default function Page() {
  const { inputData } = useData();
  return (
    <div>
      <p>Results Page</p>
      <p>{JSON.stringify(inputData.configuration)}</p>
    </div>
  );
}
