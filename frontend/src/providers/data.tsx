'use client';

import { createContext, ReactNode, useContext, useState } from 'react';
import { DataContextType, InputDataType, OutputDataType } from '@/types/types';
import { DefaultInputValues, DefaultOutputValues } from '@/constants/constants';

const DataContext = createContext<DataContextType | undefined>(undefined);

export function DataProvider({ children }: { children: ReactNode }) {
  const [inputData, setInputData] = useState<InputDataType>(DefaultInputValues);
  const [outputData, setOutputData] = useState<OutputDataType>(DefaultOutputValues);

  const setInputValue = (parameter: string, value: string) => {
    setInputData((existingData) => ({
      ...existingData,
      [parameter]: value,
    }));
  };

  return (
    <DataContext.Provider value={{ inputData, outputData, setInputValue, setOutputData }}>
      {children}
    </DataContext.Provider>
  );
}

export function useData() {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
}
