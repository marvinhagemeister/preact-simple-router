import { BrowserRouter } from "../BrowserRouter";

const delay = (ms: number) => new Promise(res => setTimeout(res, ms));

describe("BrowserRouter", () => {
  it("should set default url from window", () => {
    window.history.pushState({}, "", "foo");
    const router = new BrowserRouter({});
    expect(router.getUrl()).toEqual("/foo/");
    window.history.back();
  });

  it("should set prefix", () => {
    window.history.pushState({}, "", "foo");
    const router = new BrowserRouter({ prefix: "foo/" });
    expect(router.getUrl()).toEqual("/");
    window.history.back();
  });

  it("should getUrl", () => {
    const router = new BrowserRouter({});
    // TODO: Reset jsdom history somehow
    expect(router.getUrl()).toEqual("/foo/");
    window.history.pushState({}, "", "foo/bar");
    expect(router.getUrl()).toEqual("/foo/bar/");
    window.history.back();
  });

  // TODO: JSDOM history api doesn't support go method
  // We'll skip these testes for now
  it.skip("should navigate", () => {
    // router.go(-1);
    // expect(router.url).toEqual("/");
    // router.go(1);
    // expect(router.url).toEqual("/foo/");
    // router.go(0);
    // expect(router.url).toEqual("/foo/");
  });

  it("should route by relative url", async () => {
    const router = new BrowserRouter({});
    router.componentDidMount();
    router.to("foo");
    expect(router.url).toEqual("/foo/");
  });

  it("should route by absolute url", () => {
    const router = new BrowserRouter({});
    router.componentDidMount();
    router.to("bar");
    router.to("/foo");
    expect(router.url).toEqual("/foo/");
  });

  it("should keep functions when using Object.assign", () => {
    const res = { router: { ...new BrowserRouter({}) } };
    expect(typeof res.router.to).toEqual("function");
    expect(typeof res.router.go).toEqual("function");
  });
});
