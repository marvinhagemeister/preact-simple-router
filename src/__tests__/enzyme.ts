import { render } from "preact";

export function mount(node: JSX.Element) {
  // Cleanup first
  const body = document.body;
  while (body.firstChild) {
    body.removeChild(body.firstChild);
  }

  // Create a clean state
  const div = document.createElement("div");
  div.id = "root";
  document.body.appendChild(div);
  const top = document.getElementById("root")!;
  const root = render(node, top);

  return new EnzymeElement(root);
}

export class EnzymeElement {
  private el: Element[];
  constructor(el: Element | Element[]) {
    this.el = Array.isArray(el) ? el : [el];
  }

  simulate(name: string) {
    const event = new MouseEvent(name, {
      view: window,
      bubbles: true,
      cancelable: true,
    });

    this.el.map(x => x.dispatchEvent(event));
    return this;
  }

  find(selector: string) {
    const found = Array.from(this.el[0].querySelectorAll(selector));
    return new EnzymeElement(found.length === 1 ? found[0] : found);
  }
}
