import { BrowserRouter, RouterProps } from "./BrowserRouter";
import { mergeUrl } from "./util";

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
