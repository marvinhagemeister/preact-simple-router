import { h, Component } from "preact";
import { Route } from "./Match";
import { MatchResult } from "@marvinh/path-to-regexp";
import { mergeUrl } from "./util";

export interface Router {
  to(url: string, scrollToTop?: boolean): void;
  go(n: number): void;
}

export interface RouterProps {
  prefix?: string;
  children?: any;
}

export class BrowserRouter extends Component<RouterProps, any>
  implements Router {
  public url: string = "/";

  componentDidMount() {
    window.addEventListener("popstate", () => {
      this.url = this.getUrl();
    });
  }

  getUrl() {
    const url = window.location.href.replace(window.location.origin, "");
    return this.props.prefix ? url.slice(this.props.prefix.length) : url;
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
    return <div>{this.props.children}</div> || null;
  }
}

export class MemoryRouter extends BrowserRouter {
  stack: string[] = ["/"];

  constructor(props: RouterProps) {
    super(props);
    this.componentWillReceiveProps(props);
  }

  componentDidMount() {
    /* noop */
  }

  componentWillReceiveProps(props: RouterProps) {
    this.url = mergeUrl(this.url, "/", props.prefix);
  }

  getUrl() {
    return this.url;
  }

  to(url: string, scrollToTop: boolean = false) {
    this.url = mergeUrl(this.url, url, this.props.prefix);
    this.stack.push(this.url);
    this.forceUpdate();
  }

  go(n: number) {
    if (n === 0 || n > this.stack.length) return;
    if (n < 0) n = this.stack.length + n - 1;
    this.url = this.stack[n] || "/";
    this.forceUpdate();
  }
}
