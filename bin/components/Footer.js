import React from "react";

import state from "../state";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="content has-text-centered">
          <p>
            <strong>{state.name}</strong>
            &nbsp;
            <small>v{state.version}</small>
            {` by `}
            <a href="https://github.com/ericclemmons">Eric Clemmons</a>.
          </p>

          <p>
            &copy; {new Date().getFullYear()}
          </p>
        </div>
      </div>
    </footer>
  );
}
