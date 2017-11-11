import { h, Component } from "preact";
import { isExternal, getUrl } from "./util";

export interface Props {
  class?: string;
  target?: string;
  activeClass?: string;
  href: string;
  children?: any;
  exact?: boolean;
}

export interface State {
  current: string;
  external: boolean;
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
      external: isExternal(props.href),
    };
  }

  componentWillReceiveProps(props: Props) {
    if (props.href !== this.props.href) {
      this.setState({ external: isExternal(props.href) });
    }
  }

  update = () => {
    this.setState({
      current: getUrl(),
      external: isExternal(this.props.href),
    });
  };

  componentDidMount() {
    window.addEventListener("popstate", this.update);
  }

  componentWillUnmount() {
    window.removeEventListener("popstate", this.update);
  }

  onClick = (e: Event) => {
    // Only change history if the url has actually changes and the url
    // is not external
    if (this.props.href !== window.location.href && !this.state.external) {
      // Do nothing on ctrl+click and the like
      if (
        (e instanceof KeyboardEvent &&
          (e.ctrlKey || e.metaKey || e.altKey || e.shiftKey)) ||
        (e instanceof MouseEvent && e.button !== 0)
      ) {
        return;
      }

      e.preventDefault();
      window.history.pushState({}, "foo", this.props.href);
      window.dispatchEvent(new Event("popstate", { bubbles: true }));
    } else if (this.state.external) {
      window.location.href = this.props.href;
    }
  };

  render() {
    const { exact, href, children, activeClass, target } = this.props;
    const { current } = this.state;
    const css = this.props.class || "";

    const active =
      (exact && href === current) || (!exact && current.startsWith(href))
        ? " " + activeClass
        : "";

    return (
      <a
        href={href}
        onClick={this.onClick}
        class={css + active}
        target={target}
      >
        {children}
      </a>
    );
  }
}
