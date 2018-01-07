import { h, Component } from "preact";
import { MatchResult } from "@marvinh/path-to-regexp";
import { Route } from "./Route";
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
