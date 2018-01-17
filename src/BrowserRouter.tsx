import { h, Component } from "preact";
import { MatchResult } from "@marvinh/path-to-regexp";
import { Route } from "./Route";
import { mergeUrl } from "./util";

export interface Router {
  to: (url: string, scrollToTop?: boolean) => void;
  go: (n: number) => void;
}

export interface RouterProps {
  prefix?: string;
  children?: any;
}

export interface RouterState {
  url: string;
}

export class BrowserRouter extends Component<RouterProps, RouterState>
  implements Router {
  public state: RouterState;

  constructor(props: RouterProps) {
    super(props);

    this.state = {
      url: "/",
    };
  }

  update = () => this.setState({ url: this.getUrl() });

  componentDidMount() {
    this.update();
    window.addEventListener("popstate", this.update);
  }

  componentWillUnmount() {
    window.removeEventListener("popstate", this.update);
  }

  getUrl() {
    const url = window.location.href.replace(window.location.origin, "");
    return mergeUrl("/", url, this.props.prefix);
  }

  to = (url: string, scrollToTop: boolean = true) => {
    url = mergeUrl(this.state.url, url, this.props.prefix);

    if (url === this.getUrl()) return;

    window.history.pushState({}, "", url);
    window.dispatchEvent(new Event("popstate", { bubbles: true }));
    if (scrollToTop) window.scrollTo(0, 0);
  };

  go = (n: number) => {
    return window.history.go(n);
  };

  getChildContext() {
    return { router: { ...(this as any), url: this.state.url } };
  }

  render() {
    return <div>{this.props.children}</div> || null;
  }
}
