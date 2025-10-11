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
