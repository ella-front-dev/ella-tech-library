export default class View {
  constructor({ model }) {
    this.$target = document.createElement("div");
    this.valueModel = model;
    this.render();
    this.$target
      .querySelector(".btn-increase")
      .addEventListener("click", () => this.increase());
    this.$target
      .querySelector(".btn-decrease")
      .addEventListener("click", () => this.decrease());
  }

  render() {
    console.log("this.current", this.valueModel.getValue());
    this.$target.innerHTML = `
      <button class="btn-increase">Increase</button>
      <button class="btn-decrease">Decrease</button>
    `;
  }

  increase() {
    const current = this.valueModel.getValue();
    this.valueModel.setValue(current + 1);
  }

  decrease() {
    const current = this.valueModel.getValue();
    this.valueModel.setValue(current - 1);
  }
}
