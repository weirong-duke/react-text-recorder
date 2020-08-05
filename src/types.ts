export enum TextChangeTypes {
  Text = "text"
}

export interface TextChange {
  diffs: TextDiff[];
  index: number;
  time: number;
  type: TextChangeTypes;
}

export interface TextDiff {
  value: string;
  replaceIndex: number;
  replaceLength: number;
}

