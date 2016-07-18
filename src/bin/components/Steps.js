import React from "react";

import Code from "./Code";
import SaveButton from "./SaveButton";
import state from "../state";
import Step from "./Step";

const change = (file, content) => {
  state.files[file].content = content;
  state.files[file].saved = false;
};

export default function Steps() {
  return (
    <section className="section">
      <div className="container">
        <p className="subtitle">
          This simple tool helps you quickly scaffold out a minimal,
          functioning isomorphic Webpack application.
        </p>

        <Step
          button={<SaveButton file="webpack.config.babel.js" />}
          completed={state.files["webpack.config.babel.js"].exists}
          file="webpack.config.babel.js"
          step={1}
          subtitle="webpack.config.babel.js"
          title="Webpack Build Config"
        >
          <Code
            onChange={(content) => change("webpack.config.babel.js", content)}
            value={state.files["webpack.config.babel.js"].content}
          />
        </Step>

        <Step
          button={<SaveButton file="webpack.config.client.babel.js" />}
          completed={state.files["webpack.config.client.babel.js"].exists}
          file="webpack.config.client.babel.js"
          step={2}
          subtitle="webpack.config.client.babel.js"
          title="Webpack Client Config"
        >
          <Code
            onChange={(content) => change("webpack.config.client.babel.js", content)}
            value={state.files["webpack.config.client.babel.js"].content}
          />
        </Step>

        <Step
          button={<SaveButton file="webpack.config.server.babel.js" />}
          completed={state.files["webpack.config.server.babel.js"].exists}
          file="webpack.config.server.babel.js"
          step={3}
          subtitle="webpack.config.server.babel.js"
          title="Webpack Server Config"
        >
          <Code
            onChange={(content) => change("webpack.config.server.babel.js", content)}
            value={state.files["webpack.config.server.babel.js"].content}
          />
        </Step>

        <Step
          button={<SaveButton file="src/server.js" />}
          completed={state.files["src/server.js"].exists}
          file="src/server.js"
          step={4}
          subtitle="src/server.js"
          title="Example Server"
        >
          <Code
            onChange={(content) => change("src/server.js", content)}
            value={state.files["src/server.js"].content}
          />
        </Step>

        <Step
          button={<SaveButton file="src/client.js" />}
          completed={state.files["src/client.js"].exists}
          file="src/client.js"
          step={5}
          subtitle="src/client.js"
          title="Example Client"
        >
          <Code
            onChange={(content) => change("src/client.js", content)}
            value={state.files["src/client.js"].content}
          />
        </Step>

        <Step
          step={6}
          subtitle="Run Webpack"
          title="Last Step!"
        >
          <Code value="$(npm bin)/webpack" />
        </Step>
      </div>
    </section>
  );
}
