import { h } from "preact";
import { MemoryRouter } from "../Router";

describe("MemoryRouter", () => {
  it("should set default url to /", () => {
    const router = new MemoryRouter({});
    expect(router.url).toEqual("/");
  });

  it("should allow prefix", () => {
    const router = new MemoryRouter({ prefix: "foo" });
    expect(router.url).toEqual("foo/");
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
});
