import { autorun } from "mobx";
import React from "react";
import { render } from "react-dom";

import App from "./components/App";
import state from "./state";

autorun(() => render(<App />, document.getElementById("app")));
