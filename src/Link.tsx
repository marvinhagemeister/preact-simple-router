import { h, Component } from "preact";
import { getUrl } from "./Router";

export interface Props {
  class?: string;
  activeClass?: string;
  href: string;
  children?: any;
  exact?: boolean;
}

export interface State {
  current: string;
}

export default class Link extends Component<Props, State> {
  static defaultProps = {
    exact: false,
    class: "",
    activeClass: "",
  };

  public state: State;
  constructor(props: Props) {
    super(props);

    this.state = {
      current: getUrl(),
    };
  }

  componentDidMount() {
    window.addEventListener("popstate", () =>
      this.setState({ current: getUrl() }),
    );
  }

  onClick = (e: Event) => {
    // TODO: does this prevent ctrl + click?
    e.preventDefault();
    window.history.pushState({}, "foo", this.props.href);
    window.dispatchEvent(new Event("popstate", {}));
  };

  render() {
    const { exact, href, children, activeClass } = this.props;
    const css = this.props.class || "";
    const active =
      (exact && href === getUrl()) || (!exact && getUrl().startsWith(href))
        ? " " + activeClass
        : "";

    return (
      <a href={href} onClick={this.onClick} class={css + active}>
        {children}
      </a>
    );
  }
}
