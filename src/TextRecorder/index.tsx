import React, {FC, ReactElement, useRef, useState} from "react";
import {FaCircle, FaArrowCircleUp} from 'react-icons/fa';
import fastDiff from "fast-diff";

import {TextChange, TextChangeTypes, TextDiff} from 'types';
import {ENTER_STRING, TAB_STRING} from 'utils/constants';

import './TextRecorder.scss';

type TextRecorderOnKeydownType =
  (e: React.KeyboardEvent,
    recorderRef: React.RefObject<HTMLDivElement>,
    handleOnChange: (e: React.FormEvent<HTMLDivElement> | null, overrideValue?: string) => void) => void;

interface KeyDownHandlersType {
  [key: string]: TextRecorderOnKeydownType
}

const insertAtCursor = (key: string) => {
  const selection = window?.getSelection();
  const range = selection?.getRangeAt(0);

  range?.deleteContents();

  const tabNode = document.createTextNode(key);
  range?.insertNode(tabNode);
  range?.setStartAfter(tabNode);
  range?.setEndAfter(tabNode);
};

const tabHandler: TextRecorderOnKeydownType = (e, recorderRef, handleOnChange) => {
  e.preventDefault();
  insertAtCursor(TAB_STRING);
  recorderRef?.current && handleOnChange(null, recorderRef.current.innerText)
};

const enterHandler: TextRecorderOnKeydownType = (e, recorderRef, handleOnChange) => {
  e.preventDefault();
  const selection = window?.getSelection();
  const range = selection?.getRangeAt(0);

  range?.deleteContents();
  let spaceNode: Node | null = null;
  const refText = recorderRef?.current?.innerText;
  if (!refText || (!(refText).includes('\n') && range?.endOffset === refText.length)) {
    spaceNode = document.createTextNode(' ');
    range?.insertNode(spaceNode);
  }
  const textNode = document.createTextNode(ENTER_STRING)
  range?.insertNode(textNode);

  range?.setStartAfter(textNode);
  range?.setEndAfter(textNode);

  recorderRef?.current && handleOnChange(null, recorderRef.current.innerText)
};

const keyDownHanders: KeyDownHandlersType = {
  "Enter": enterHandler,
  "Tab": tabHandler
};

interface TextRecorderProps {
  className?: string;
  contentClassName?: string;
  onSubmit(changes: TextChange[]): void;
  recordComponent?: ReactElement;
  submitComponent?: ReactElement;
  submitText?: string;
}

const TextRecorder: FC<TextRecorderProps> = (
  {
    className,
    contentClassName,
    onSubmit,
    recordComponent,
    submitComponent,
    submitText
  }) => {
  const [changes, setChanges] = useState<TextChange[]>([]);
  const [isRecording, setIsRecording] = useState<boolean>(false);

  const initialTime = useRef(Date.now());
  const textRecorderRef = useRef<HTMLDivElement>(null);
  const textValue = useRef<string>('');

  const handleOnKeyDown = (e: React.KeyboardEvent) => {
    if (e?.key && keyDownHanders[e.key]) {
      keyDownHanders[e.key](e, textRecorderRef, handleOnChange);
    }
  };

  const handleOnChange = (e: React.FormEvent<HTMLDivElement> | null, overrideValue?: string) => {
    if (!isRecording) return;
    let sanitizedText = e ? e.currentTarget.textContent || '' : overrideValue || '';
    const changeTime = Date.now();
    const diffArray = fastDiff(textValue.current, sanitizedText);
    const diffTime = Math.abs(changeTime - initialTime.current) / 1000;
    console.log('fisrt and second', textValue.current, '||||', sanitizedText)
    console.log('diffarray', diffArray)

    let oldWord = "";
    let formattedDiffs: TextDiff[] = [];


    for (
      let subDiffIndex = 0;
      subDiffIndex < diffArray.length;
      subDiffIndex++
    ) {
      const subDiff = diffArray[subDiffIndex];
      // 0 is same
      // -1 is delete
      // 1 is add
      const diffResponse = subDiff[0];
      const diffText = subDiff[1];
      switch (diffResponse) {
        case -1:
          const isReplaced =
            diffArray[subDiffIndex + 1] && diffArray[subDiffIndex + 1][0] === 1;
          const nextValue = isReplaced ? diffArray[subDiffIndex + 1][1] : "";
          formattedDiffs.push({
            value: nextValue,
            replaceIndex: oldWord.length,
            replaceLength: diffText.length
          });
          oldWord += nextValue;
          if (isReplaced) subDiffIndex += 1;
          break;
        case 0:
          oldWord += diffText;
          break;
        case 1:
          formattedDiffs.push({
            value: diffText,
            replaceIndex: oldWord.length,
            replaceLength: 0
          });
          oldWord += diffText;
          break;
        default:
          break;
      }
    }

    const formattedChange: TextChange = {
      diffs: formattedDiffs,
      index: changes.length,
      time: diffTime,
      type: TextChangeTypes.Text
    };
    if (textValue) {
      textValue.current = sanitizedText;
    }

    setChanges([...changes, formattedChange]);
  };

  const handleToggleRecord = () => {
    setIsRecording(!isRecording);
  };

  const handleOnSubmit = () => {
    onSubmit?.(changes);
  };


  return (
    <div className={`TextRecorder ${className || ''}`}>
      <div className={`TextRecorder__content ${contentClassName || ''}`} contentEditable data-testid="text-recorder-content" ref={textRecorderRef} onInput={handleOnChange} onKeyDown={handleOnKeyDown} />
      <div className={"TextRecorder__actions"}>
        {isRecording && <div className="TextRecorder__actions--active" ><FaCircle/></div>}
        {recordComponent ? React.cloneElement(recordComponent, {onClick: handleToggleRecord}) : <div className="action action--record" onClick={handleToggleRecord}><FaCircle/></div>}
        {submitComponent ? React.cloneElement(submitComponent, {onClick: handleOnSubmit}) : <div className="action action--submit" onClick={handleOnSubmit}>{submitText || <FaArrowCircleUp/>}</div>}
      </div>
    </div>
  );
};

export default TextRecorder;
