import { h, VNode } from "preact";
import { PathRegExp, MatchResult } from "@marvinh/path-to-regexp";
import { Route, cache } from "./Route";
import { Context } from "./util";

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
    const match = pathReg.match(context.router.url, exact);
    child.attributes.match = match;
    if (match !== null) {
      return <div>{child}</div>;
    }
  }

  return null;
}
