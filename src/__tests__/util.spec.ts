import { mergeUrl } from "../util";

describe("mergeUrl", () => {
  it("should append '/' if missing at end", () => {
    expect(mergeUrl("/", "foo/")).toEqual("/foo/");
    expect(mergeUrl("/", "foo")).toEqual("/foo/");
  });

  it("should resolve relative urls", () => {
    expect(mergeUrl("foo/", "bar")).toEqual("foo/bar/");
  });

  it("should resolve absolute urls", () => {
    expect(mergeUrl("foo/", "/bar")).toEqual("/bar/");
  });

  it("should respect prefix", () => {
    expect(mergeUrl("foo/", "/bar", "foobar.com")).toEqual("/bar/");
    expect(mergeUrl("foo/", "/foo", "bar/")).toEqual("/foo/");
  });
});
