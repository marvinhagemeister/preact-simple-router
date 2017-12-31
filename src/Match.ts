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
  params?: Record<string, string>;
}

export interface State {
  params: Record<string, string> | null;
}

export class Route extends Component<Props, State> {
  public state: State = { params: null };
  private destroy: () => void = () => undefined;

  componentDidMount() {
    this.destroy = this.context.router.register(this);
  }

  componentWillUnmount() {
    this.destroy();
  }

  render() {
    return this.state.params ? this.props.children : null;
  }
}

export function Switch(props: Children, context: any) {
  for (const child of props.children as VNode[]) {
    const params = child.attributes.path(context.router.url);

    if (params !== null) {
      child.attributes.params = params;
      return child;
    }
  }

  return null;
}
