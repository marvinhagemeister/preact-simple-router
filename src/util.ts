import { Router } from "./BrowserRouter";
import { PathRegExp, MatchResult } from "@marvinh/path-to-regexp";

export interface Context {
  router: Router & { url: string };
}

export const PROTOCOL_REG = /^[a-z]+:\/\/(.*)$/g;

export function mergeUrl(current: string, next: string, prefix?: string) {
  if (!next.endsWith("/")) next = next + "/";
  if (prefix) current = current.replace(prefix, "");
  if (next.startsWith("/")) {
    if (prefix) next = next.replace(prefix, "");
  } else {
    next = current + next;
  }

  return next;
}

export function matches(
  pathReg: PathRegExp,
  url: string,
  exact: boolean = false,
) {
  const match = pathReg.match(url);
  return {
    match,
    result: match !== null && ((exact && match.matched === "") || !exact),
  };
}
