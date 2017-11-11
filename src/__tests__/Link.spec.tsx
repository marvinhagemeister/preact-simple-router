import { h, render } from "preact";
import Link from "../Link";
import { renderer } from "./helpers";
import { mount } from "./enzyme";

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

describe("Link", () => {
  let counter = 0;
  const handler = () => counter++;

  beforeAll(() => {
    counter = 0;
    window.addEventListener("popstate", handler);
  });

  afterAll(() => window.removeEventListener("popstate", handler));

  beforeEach(() => {
    counter = 0;
    Object.defineProperty(window.location, "href", {
      writable: true,
      value: "/",
    });
    Object.defineProperty(window.location, "hostname", {
      writable: true,
      value: "localhost",
    });
    Object.defineProperty(window.location, "protocol", {
      writable: true,
      value: "http",
    });

    window.history.pushState = (data: any, title: any, url?: any) => {
      window.location.href = url;
    };
  });

  it("should navigate", () => {
    const root = mount(<Link href="/foo" />).simulate("click");

    expect(window.location.href).toEqual("/foo");
    expect(counter).toEqual(1);
  });

  it("should navigate only if url is different", () => {
    const root = mount(<Link href="/" />).simulate("click");

    expect(window.location.href).toEqual("/");
    expect(counter).toEqual(0);
  });

  it("should not push to history if url is external", () => {
    mount(<Link href="http://example.com" />).simulate("click");

    expect(window.location.href).toEqual("http://example.com");
    expect(counter).toEqual(0);
  });

  it("should render active class", () => {
    const link = <Link href="/" class="foo" activeClass="bar" />;
    expect(renderer(link)).toMatchSnapshot();

    const link2 = <Link href="/foo" class="foo" activeClass="bar" />;
    expect(renderer(link2)).toMatchSnapshot();
  });

  it("should render exact active class", () => {
    const link = <Link href="/" class="foo" activeClass="bar" exact />;
    expect(renderer(link)).toMatchSnapshot();

    window.location.href = "/bob";
    const link2 = <Link href="/bob/foo" class="foo" activeClass="bar" exact />;
    expect(renderer(link2)).toMatchSnapshot();
  });
});
