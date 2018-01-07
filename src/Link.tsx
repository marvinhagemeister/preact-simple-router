import { h, Component } from "preact";
import { PROTOCOL_REG } from "./util";

export interface LinkProps {
  class?: string;
  target?: string;
  activeClass?: string;
  onClick?: (e: KeyboardEvent | MouseEvent, url: string) => void;
  href: string;
  children?: any;
  exact?: boolean;
}

export default class Link extends Component<LinkProps, any> {
  onClick = (e: KeyboardEvent | MouseEvent) => {
    const router = this.context.router;
    // Only change history if the url has actually changed
    if (this.props.href !== router.url) {
      // Do nothing on ctrl+click and the like
      if (
        e.ctrlKey ||
        e.metaKey ||
        e.altKey ||
        e.shiftKey ||
        (e as any).button !== 0
      ) {
        return;
      }

      e.preventDefault();
      if (!PROTOCOL_REG.test(this.props.href)) router.to(this.props.href);
    }

    if (this.props.onClick) this.props.onClick(e, router.url);
  };

  render() {
    const { exact, href, children, activeClass, target } = this.props;
    const current = this.context.router.url;
    const css = this.props.class || "";

    const active =
      (exact && href === current) || (!exact && current.startsWith(href))
        ? " " + (activeClass || "")
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
