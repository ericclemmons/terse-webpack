import { autorun } from "mobx";
import React from "react";
import { render } from "react-dom";

import App from "./components/App";

autorun(() => render(<App />, document.getElementById("app")));
