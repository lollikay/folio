import React from "react";
import { createRoot } from 'react-dom/client';
import { App } from "./App";

const els = {
  instance: "[data-js-react-example]"
};

export default class ReactExample {
  constructor() {
    this.instance = document.querySelector(els.instance);
    if(this.instance) {
      this.render();
    }
  }

  render() {
    const root = createRoot(this.instance);
    root.render(<App />);
  }

}