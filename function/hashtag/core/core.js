import Model from "./sample/Model.js";
import View from "./sample/View.js";
import Action from "./sample/Action.js";

const root = document.querySelector("#root");

const valueModel = new Model();
const valueView = new View({ model: valueModel });
const valueAction = new Action({ model: valueModel });

root.appendChild(valueView.$target);
root.appendChild(valueAction.$target);
