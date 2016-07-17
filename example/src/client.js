import React from "react";
import { render } from "react-dom";

render((
  <section class="hero">
    <div class="hero-body">
      <div class="container has-text-centered">
        <h1 class="title">
          Welcome to
          <br />
          <span class="tag is-info is-large">@terse/webpack</span>
        </h1>
      </div>
    </div>
  </section>
), document.getElementById("app"));
