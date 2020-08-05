import React, {FC, useRef, useState} from "react";
import {FaPlay} from 'react-icons/fa';
import useInterval from "assets/useInterval";
import {TextChange} from "types";
import {DEFAULT_TICK_RATE_MILLISECONDS} from 'utils/constants';
import {stringSplice} from 'utils/helpers';

import './TextPlayer.scss';

interface TextPlayerProps {
  changes: TextChange[] | null;
  className?: string;
  tickRate?: number;
}

const TextPlayer: FC<TextPlayerProps> = ({ changes , className, tickRate = DEFAULT_TICK_RATE_MILLISECONDS}) => {
  const [elapsedTime, setElapsedTime] = useState<number>(0);
  const [playText, setPlayText] = useState<boolean>(false);
  const [textValue, setTextValue] = useState<string>("");

  const visitedChanges = useRef<number[]>([]);

  const latestTime = changes?.[changes.length - 1]?.time || 0;

  useInterval(
    () => {
      if (elapsedTime <= latestTime + 1) {
        const timeRangeChanges = changes!.filter(
          change =>
            change.time <= elapsedTime &&
            !visitedChanges.current.includes(change.index)
        );
        let tempString = textValue;
        for (const rangeChange of timeRangeChanges) {

          const { diffs } = rangeChange;
          for (const diff of diffs) {
            const { replaceIndex, value, replaceLength } = diff;
            tempString = stringSplice(
              tempString,
              replaceIndex,
              replaceLength,
              value
            );
          }
        }
        setTextValue(tempString);
        visitedChanges.current = [
          ...visitedChanges.current,
          ...timeRangeChanges.map(change => change.index)
        ];
      }
      setElapsedTime(elapsedTime + tickRate / 1000)

    },
    changes && playText ? tickRate : null
  );

  const handlePlayText = () => {
    setPlayText(!playText);
  };

  return (
    <div className={`TextPlayer`}>
      <button onClick={handlePlayText}><FaPlay/></button>
      <div className={className || ''}>{textValue}</div>
    </div>
  );
};

export default TextPlayer;
