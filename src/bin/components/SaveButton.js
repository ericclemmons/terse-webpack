import React from "react";

import state from "../state";

const save = (file) => {
  const { content } = state.files[file];

  fetch("/save", {
    method: "PUT",
    body: JSON.stringify({
      file,
      content,
    }),
  }).then((response) => {
    state.files[file].saved = true;
  });
};

export default function SaveButton({ file }) {
  const { exists, saved } = state.files[file];

  return (
    <a
      className={[
        "button",
        saved ? "is-success" : "is-info",
        "is-pulled-right",
      ].filter(Boolean).join(" ")}
      onClick={() => save(file)}
    >
      {saved ? "Saved!" : exists ? "Update" : "Create"}
    </a>
  );
}
