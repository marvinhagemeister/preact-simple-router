import { Component } from "preact";
import { Route } from "./Match";

export interface Router {
  to(url: string, scrollToTop?: boolean): void;
  go(n: number): void;
  register(comp: any): () => void;
}

export interface BrowserProps {
  prefix?: string;
  children?: any;
}

export class BrowserRouter extends Component<BrowserProps, any>
  implements Router {
  private routes: Route[] = [];

  componentDidMount() {
    window.addEventListener("popstate", this.update);
  }

  update = () => {
    let url = this.getUrl();
    for (const route of this.routes) {
      const match = route.props.path(url);
      if (match !== null) {
        url = url.slice(match.matched.length);
        route.setState({ params: match.params });
      } else {
        route.setState({ params: null });
      }
    }
  };

  getUrl() {
    const url = window.location.href.replace(window.location.origin, "");
    return this.props.prefix ? url.slice(this.props.prefix.length) : url;
  }

  register(comp: any) {
    this.routes.push(comp);
    return () => {
      const idx = this.routes.findIndex(comp);
      this.routes = this.routes.splice(idx, 1);
    };
  }

  to(url: string, scrollToTop: boolean = true) {
    window.history.pushState({}, "", url);
    window.dispatchEvent(new Event("popstate", { bubbles: true }));
    if (scrollToTop) window.scrollTo(0, 0);
  }

  go(n: number) {
    return window.history.go(n);
  }

  getChildContext() {
    return { router: this as any };
  }

  render() {
    return this.props.children || null;
  }
}

export class MemoryRouter extends BrowserRouter {
  url: string = "";
  stack: string[] = [];

  componentDidMount() {
    /* noop */
  }

  to(url: string, scrollToTop: boolean = false) {
    this.stack.push(url);
    this.url = url;
    this.forceUpdate();
  }

  go(n: number) {
    this.url = this.stack[n];
    this.forceUpdate();
  }
}
