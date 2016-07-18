import "codemirror/lib/codemirror.css!";
import "codemirror/mode/javascript/javascript";
import "codemirror/theme/monokai.css!";

import CodeMirror from "codemirror";
import React from "react";
import Codemirror from "react-codemirror";

export default function Code({
  mode = "javascript",
  onChange,
  value,
}) {
  return (
    <Codemirror
      {...{ onChange, value }}
      autoSave
      codeMirrorInstance={CodeMirror}
      options={{
        lineNumbers: true,
        mode: "javascript",
        theme: "monokai",
      }}
    />
  );
}
