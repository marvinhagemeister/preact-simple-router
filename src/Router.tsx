import { h, Component } from "preact";
import Rlite, { RouteHandler } from "rlite-router";
import { getUrl } from "./util";

export interface Props {
  routes: Record<string, any>;
  loading: () => JSX.Element;
  error: (err: Error) => JSX.Element;
}

export interface State {
  component?: JSX.Element;
}

export default class Router extends Component<Props, State> {
  private router: RouteHandler;
  public state: State;

  constructor(props: Props) {
    super(props);
    this.state = {
      component: undefined,
    };
  }

  componentDidMount() {
    const prepared: Record<string, any> = {};
    const { routes } = this.props;

    let errCb: () => void = () => undefined;
    for (const url of Object.keys(routes)) {
      const value = (...args: any[]) => {
        this.setState({ component: this.props.loading() });
        return routes[url](args)
          .then((component: any) => this.setState({ component }))
          .catch((err: Error) =>
            this.setState({ component: this.props.error(err) }),
          );
      };

      if (url === "/404") {
        errCb = value;
      } else {
        prepared[url] = value;
      }
    }

    this.router = Rlite(errCb, prepared);
    this.router(window.location.href);

    window.addEventListener("popstate", () => this.router(getUrl()));
    window.dispatchEvent(new Event("popstate", {}));
  }

  render() {
    if (this.state.component === undefined) {
      return null;
    }

    return this.state.component;
  }
}
