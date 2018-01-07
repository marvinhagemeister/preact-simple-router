import { h, render } from "preact";
import { mount } from "tiny-enzyme";
import { MemoryRouter } from "../MemoryRouter";
import { Route } from "../Route";

describe("Route", () => {
  let div: HTMLElement;

  beforeEach(() => {
    div = document.createElement("div");
    document.body.appendChild(div);

    window.history.pushState = (data: any, title: any, url?: any) => {
      window.location.href = window.location.origin + url.slice(1);
      window.dispatchEvent(new Event("popstate", { bubbles: true }));
    };
  });

  afterEach(() => {
    document.body.removeChild(div);
  });

  it("should only render content on match", () => {
    const Node = (
      <MemoryRouter>
        <Route path="foo/:name">Hello</Route>
      </MemoryRouter>
    );
    const res = render(Node, div);
    expect(res.textContent).toEqual("");

    // Trigger update
    (res as any)._component.to("foo/bar");
    expect(res.textContent).toEqual("Hello");
  });

  it("should support render prop", () => {
    const spy = jest.fn();
    const Node = (
      <MemoryRouter>
        <Route path="foo/:name" render={spy}>
          Hello
        </Route>
      </MemoryRouter>
    );
    const res = render(Node, div);
    expect(res.textContent).toEqual("");

    // Trigger update
    (res as any)._component.to("foo/bar");
    expect(spy.mock.calls[0]).toEqual([
      {
        absolute: false,
        matched: "foo/bar",
        params: {
          name: "bar",
        },
      },
      ["Hello"],
    ]);
  });
});
