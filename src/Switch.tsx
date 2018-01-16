import { h, VNode } from "preact";
import { PathRegExp, MatchResult } from "@marvinh/path-to-regexp";
import { Route, cache } from "./Route";
import { Context, matches } from "./util";

export interface SwitchProps {
  children?: VNode[];
}

export function Switch(props: SwitchProps, context: Context) {
  if (!props.children) return null;

  for (const child of props.children) {
    const { path, exact } = child.attributes;
    if (!cache.has(path)) {
      cache.set(path, new PathRegExp(path));
    }

    const pathReg = cache.get(path) as PathRegExp;
    const match = matches(pathReg, context.router.url, exact);
    if (match.result) {
      return <div>{child}</div>;
    }
  }

  return null;
}
