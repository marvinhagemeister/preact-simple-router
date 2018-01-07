import { h, Component, VNode } from "preact";
import { PathRegExp, MatchResult } from "@marvinh/path-to-regexp";

export interface Children {
  children?: VNode | any;
}

export interface Props extends Children {
  path: string;
  render?: (match: MatchResult & { absolute: boolean }, children: any) => any;
}

export interface State {
  match: MatchResult | null;
}

export class Route extends Component<Props, State> {
  public state: State;
  private pathReg: PathRegExp;

  constructor(props: Props, context: any) {
    super(props);
    this.pathReg = new PathRegExp(props.path);
    this.state = { match: this.pathReg.match(context.router.url) };
  }

  componentWillUpdate() {
    this.setState({ match: this.pathReg.match(this.context.router.url) });
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
      const arg = { ...this.state.match, absolute: this.pathReg.absolute };
      return this.props.render(arg, this.props.children);
    }

    return <div>{this.props.children}</div>;
  }
}
