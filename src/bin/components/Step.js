import React from "react";

import Check from "./Check";

export default function Step({
  button,
  children,
  completed,
  file,
  step,
  subtitle,
  title,
}) {
  return (
    <div className="box">
      {button || null}

      <h3 className="title is-3">
        {completed ? <Check /> : null}

        Step {step} – {title}
      </h3>

      <h4 className="subtitle">
        {subtitle}
      </h4>

      {children}
    </div>
  );
}
