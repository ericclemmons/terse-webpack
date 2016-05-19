const { autorun, observable } = mobx;
const { render } = ReactDOM;
const mount = document.getElementById("app");

const state = observable({
  ...window.__INITIAL_STATE__,

  title() {
    return `${this.name} v${this.version}`;
  }
});

const App = () => (
  <div>
    <Header />
    <Guide />
    <Footer />
  </div>
);

const change = (file, content) => {
  state.files[file].content = content;
  state.files[file].saved = false;
};

const Check = () => (
  <span className="icon is-medium">
    <i className="fa fa-check-circle-o"></i>
  </span>
);

const Code = ({
  mode = "javascript",
  onChange,
  value,
}) => (
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

const CreateOrUpdate = ({ file }) => {
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
};

const Footer = () => (
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

const Guide = () => (
  <section className="section">
    <div className="container">
      <p className="subtitle">
        This simple tool helps you quickly scaffold out a minimal,
        functioning isomorphic Webpack application.
      </p>

      <Step
        button={<CreateOrUpdate file="webpack.config.babel.js" />}
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
        button={<CreateOrUpdate file="webpack.config.client.babel.js" />}
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
        button={<CreateOrUpdate file="webpack.config.server.babel.js" />}
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
        button={<CreateOrUpdate file="src/server.js" />}
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
        button={<CreateOrUpdate file="src/client.js" />}
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

const Header = () => (
  <section className="hero is-primary is-bold">
    <div className="hero-head">
      <div className="container">
        <nav className="nav">
          <div className="nav-left"></div>

          <div className="nav-center">
            <a className="nav-item" href="https://github.com/ericclemmons/terse-webpack">
              <span className="icon">
                <i className="fa fa-github"></i>
              </span>
            </a>
            <a className="nav-item" href="https://twitter.com/ericclemmons">
              <span className="icon">
                <i className="fa fa-twitter"></i>
              </span>
            </a>
          </div>

          <div className="nav-right"></div>
        </nav>
      </div>
    </div>

    <div className="hero-body">
      <div className="container">
        <div className="columns is-vcentered">
          <div className="column">
            <h1 className="title is-2">
              {state.name}
            </h1>
            <h2 className="subtitle">
              {state.description}
            </h2>
          </div>
        </div>
      </div>
    </div>
  </section>
);

const save = (file) => {
  const { content } = state.files[file];

  fetch("/save", {
    method: "PUT",
    body: JSON.stringify({
      file,
      content
    })
  }).then((response) => {
    state.files[file].saved = true;
  });
};

const Step = ({
  button,
  children,
  completed,
  file,
  step,
  subtitle,
  title,
}) => (
  <div className="box">
    {button ? button : null}

    <h3 className="title is-3">
      {completed ? <Check /> : null}

      Step {step} – {title}
    </h3>

    <h4 className="subtitle">
      {subtitle}
    </h4>

    {children}
  </div>
)

autorun(() => render(<App />, mount));
