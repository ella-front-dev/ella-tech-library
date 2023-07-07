export default class View {
  constructor({ model }) {
    this.$target = document.createElement("div");
    this.valueModel = model;
    this.valueModel.subscribe(this.render.bind(this));
    this.render();
  }

  render() {
    const value = this.valueModel.getValue();
    this.$target.innerHTML = `
      <p>${value}</p>
    `;
  }
}
