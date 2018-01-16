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
    const url = mergeUrl(this.state.url, "/", props.prefix);
    this.setState({ url });
  }

  getUrl() {
    return this.state.url;
  }

  to = (url: string, scrollToTop: boolean = false) => {
    this.state.url = mergeUrl(this.state.url, url, this.props.prefix);
    this.stack.push(this.state.url);
    this.forceUpdate();
  };

  go = (n: number) => {
    if (n === 0 || n > this.stack.length) return;
    if (n < 0) n = this.stack.length + n - 1;
    this.state.url = this.stack[n] || "/";
    this.forceUpdate();
  };
}
