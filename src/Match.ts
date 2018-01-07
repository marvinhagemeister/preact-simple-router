import { Component, VNode } from "preact";

export interface MatchResult {
  matched: string;
  absolute: boolean;
  params: Record<string, string>;
}
export type Matcher = (url: string) => MatchResult | null;

export interface Children {
  children?: VNode | any;
}

export interface Props extends Children {
  path: Matcher;
  match?: MatchResult | null;
}

export interface State {
  match: MatchResult | null;
}

export class Route extends Component<Props, State> {
  public state: State = { match: null };

  getChildContext() {
    return {
      ...this.context.router,
      match: this.state.match,
    };
  }

  render() {
    return this.state.match ? this.props.children : null;
  }
}

export class Switch extends Route {
  render() {
    if (this.state.match !== null) {
      for (const child of this.props.children) {
        const match = child.attributes.path(this.context.router.url);

        if (match !== null) {
          child.attributes.match = match;
          return child;
        }
      }
    }

    return null;
  }
}
