import { StaticImageData } from 'next/image';

export interface InputDataType {
  game: string;
}

export interface OutputDataType {
  game: string;
}

export interface DataContextType {
  inputData: InputDataType;
  outputData: OutputDataType;
  setInputValue: (parameter: string, value: string) => void;
  setOutputData: (outputData: OutputDataType) => void;
}

export interface Game {
  name: string;
  description: string;
  image: StaticImageData;
  actions: {
    key?: string;
    action: number;
    label: string;
  }[];
  twoActionColumns?: boolean;
}
