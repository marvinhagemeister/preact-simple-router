import { h, render } from "preact";
import { mount } from "tiny-enzyme";
import Link from "../Link";
import { renderer } from "./helpers";
import { MemoryRouter } from "..";

export function fakeEvent() {
  return { button: 0, preventDefault: () => undefined };
}

describe("Link", () => {
  it("should navigate", () => {
    const spy = jest.fn();
    const router = new MemoryRouter({});
    const c = new Link({ href: "/foo", onClick: spy }, { router });
    const e = fakeEvent();
    c.onClick(e as any);

    expect(spy.mock.calls[0]).toEqual([e, "/foo/"]);
    expect(router.url).toEqual("/foo/");
  });

  it("should navigate only if url is different", () => {
    const router = new MemoryRouter({});
    const c = new Link({ href: "/" }, { router });
    c.onClick(fakeEvent() as any);
    expect(router.url).toEqual("/");
  });

  it("should not push to history if url is external", () => {
    const router = new MemoryRouter({});
    const c = new Link({ href: "https://example.com" }, { router });
    c.onClick(fakeEvent() as any);
    expect(router.url).toEqual("/");
    expect(router.stack).toEqual(["/"]);
  });

  it("should render active class", () => {
    const link = (
      <MemoryRouter>
        <Link href="/" class="foo" activeClass="bar" />
      </MemoryRouter>
    );
    expect(renderer(link)).toMatchSnapshot();

    const link2 = (
      <MemoryRouter>
        <Link href="/foo" class="foo" activeClass="bar" />
      </MemoryRouter>
    );
    expect(renderer(link2)).toMatchSnapshot();
  });

  it("should render exact active class", () => {
    const link = (
      <MemoryRouter>
        <Link href="/" class="foo" activeClass="bar" exact />
      </MemoryRouter>
    );
    expect(renderer(link)).toMatchSnapshot();

    const link2 = (
      <MemoryRouter prefix="/bob">
        <Link href="/bob/foo" class="foo" activeClass="bar" exact />
      </MemoryRouter>
    );
    expect(renderer(link2)).toMatchSnapshot();
  });
});
