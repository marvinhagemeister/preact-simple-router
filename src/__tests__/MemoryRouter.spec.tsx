import { h } from "preact";
import { MemoryRouter } from "../MemoryRouter";

describe("MemoryRouter", () => {
  it("should set default url to /", () => {
    const router = new MemoryRouter({});
    expect(router.url).toEqual("/");
  });

  it("should allow prefix", () => {
    const router = new MemoryRouter({ prefix: "foo" });
    expect(router.url).toEqual("/");
  });

  it("should getUrl", () => {
    const router = new MemoryRouter({});
    expect(router.getUrl()).toEqual("/");
    router.to("foo");
    expect(router.getUrl()).toEqual("/foo/");
  });

  it("should navigate", () => {
    const router = new MemoryRouter({});
    router.to("foo");
    expect(router.url).toEqual("/foo/");
    router.go(-1);
    expect(router.url).toEqual("/");
    router.go(1);
    expect(router.url).toEqual("/foo/");
    router.go(0);
    expect(router.url).toEqual("/foo/");
  });

  it("should route by relative url", () => {
    const router = new MemoryRouter({});
    router.to("foo");
    expect(router.url).toEqual("/foo/");
    router.to("bar");
    expect(router.url).toEqual("/foo/bar/");
  });

  it("should route by absolute url", () => {
    const router = new MemoryRouter({});
    router.to("foo");
    expect(router.url).toEqual("/foo/");
    router.to("/bar");
    expect(router.url).toEqual("/bar/");
  });

  it("should keep functions when using Object.assign", () => {
    const res = { router: { ...new MemoryRouter({}) } };
    expect(typeof res.router.to).toEqual("function");
    expect(typeof res.router.go).toEqual("function");
  });
});
