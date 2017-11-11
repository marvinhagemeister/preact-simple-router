import { h, Component } from "preact";
import Rlite, { RouteHandler } from "rlite-router";
import { getUrl } from "./util";

export type RouteFn = (
  params?: Record<string, any>,
  state?: any,
  url?: string,
) => Promise<any>;

export interface Props {
  routes: Record<string, RouteFn>;
  loading: (params?: Record<string, any>, state?: any, url?: string) => any;
  error: (err: Error) => any;
}

export interface State {
  component?: any;
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
        this.setState({ component: this.props.loading(...args) });
        return routes[url](args[0], args[1], args[2])
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

    return this.state.component as any;
  }
}
