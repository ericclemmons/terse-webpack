import React from "react";

import state from "../state";

export default function Header() {
  return (
    <section className="hero is-primary is-bold">
      <div className="hero-head">
        <div className="container">
          <nav className="nav">
            <div className="nav-left" />

            <div className="nav-center">
              <a className="nav-item" href="https://github.com/ericclemmons/terse-webpack">
                <span className="icon">
                  <i className="fa fa-github" />
                </span>
              </a>
              <a className="nav-item" href="https://twitter.com/ericclemmons">
                <span className="icon">
                  <i className="fa fa-twitter" />
                </span>
              </a>
            </div>

            <div className="nav-right" />
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
}
