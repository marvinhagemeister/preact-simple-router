import { h, Component } from "preact";
import Loadable, { Props as LProps } from "preact-loadable";
import Rlite, { RouteHandler } from "rlite-router";

export interface Props extends Pick<LProps, "loading" | "error"> {
  routes: Record<string, any>;
  onBoot?: () => any;
}

export interface State {
  init: boolean;
  component: any;
}

export function getUrl() {
  return window.location.href.replace(window.location.origin, "");
}

export default class Router extends Component<Props, State> {
  static defaultProps = {
    onBoot: () => undefined,
    loading: () => "Loading...",
  };

  private router: RouteHandler;
  public state: State;

  constructor(props: any) {
    super(props);

    this.state = {
      init: false,
      component: undefined,
    };
  }

  componentDidMount() {
    const prepared: Record<string, any> = {};
    const { routes } = this.props;

    let err: () => void = () => undefined;
    for (const url of Object.keys(routes)) {
      const value = () => this.setState({ component: routes[url] });
      if (url === "/404") {
        err = value;
      } else {
        prepared[url] = value;
      }
    }

    this.router = Rlite(err, prepared);
    this.router(window.location.href);

    window.addEventListener("popstate", () => this.router(getUrl()));
    window.dispatchEvent(new Event("popstate", {}));
  }

  render() {
    if (this.state.component === undefined) {
      return this.props.onBoot!();
    }

    return (
      <Loadable
        fn={this.state.component}
        loading={this.props.loading}
        error={this.props.error}
      />
    );
  }
}
