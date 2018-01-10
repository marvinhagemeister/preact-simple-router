import { h } from "preact";
import { Route } from "./Route";
import { Context } from "./util";

export interface Props {
  children?: Route[];
}

export function Switch(props: Props, context: Context) {
  if (!props.children) return null;

  for (const child of props.children) {
    const match = child.pathReg.match(context.router.url);
    child.state.match = match;
    if (match !== null) {
      return <div>{child}</div>;
    }
  }

  return null;
}
