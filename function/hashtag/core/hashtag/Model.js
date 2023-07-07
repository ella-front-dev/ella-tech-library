import Observer from "./observer.js";

export default class Model extends Observer {
  constructor() {
    super();
    this.value = 0;
  }

  getValue() {
    console.log(this.value);
    return this.value;
  }

  setValue(value) {
    console.log(value);
    this.value = value;
    this.notify();
  }
}
