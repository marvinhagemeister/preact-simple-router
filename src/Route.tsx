import { h, Component, VNode } from "preact";
import { PathRegExp, MatchResult } from "@marvinh/path-to-regexp";
import { Context } from "./util";

export interface Children {
  children?: VNode | any;
}

export interface RouteProps extends Children {
  path: string;
  exact?: boolean;
  render?: (match: MatchResult, children: any) => any;
  match?: MatchResult;
}

export interface State {
  match: MatchResult | null;
}

export const cache = new Map<string, PathRegExp>();

export class Route extends Component<RouteProps, State> {
  public state: State;
  public pathReg: PathRegExp;

  constructor(props: RouteProps, context: Context) {
    super(props);
    if (!cache.has(props.path)) {
      cache.set(props.path, new PathRegExp(props.path));
    }

    this.pathReg = cache.get(props.path) as PathRegExp;
    this.state = {
      match: this.pathReg.match(context.router.url),
    };
  }

  componentWillUpdate() {
    const match =
      this.props.match ||
      this.pathReg.match(this.context.router.url, this.props.exact);
    this.setState({ match });
  }

  getChildContext() {
    const { router } = this.context;
    if (this.state.match === null) return this.context;

    return {
      router: {
        ...router,
        url: router.url.replace(this.state.match.matched, ""),
      },
    };
  }

  render() {
    if (this.state.match === null) return null;

    if (this.props.render) {
      return this.props.render(this.state.match, this.props.children);
    }

    return <div>{this.props.children}</div>;
  }
}
