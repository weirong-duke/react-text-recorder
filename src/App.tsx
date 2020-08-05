import React, {useState} from "react";

import TextRecorder from 'TextRecorder';
import TextPlayer from 'TextPlayer';
import {TextChange} from 'types';

const App = () => {
  const [changes, setChanges] = useState<TextChange[] | null>(null);
  const handleSubmitTextRecorder = (data: TextChange[]) => {
    setChanges(data);
  };
  return (
    <div className={"Example"}>
      <TextRecorder
        className="recorder ide"
        contentClassName={"ide__content"}
        onSubmit={handleSubmitTextRecorder} />
      <TextPlayer
        className="recorder ansi"
        // contentClassName={"ansi__content"}
        changes={changes}
        // submitClassName={"ansi__submit"}
      />
    </div>
  );
};

export default App
