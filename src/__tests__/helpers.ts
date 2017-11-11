import { JsxRenderer, createRenderer } from "preact-server-renderer";

export const renderer = createRenderer(new JsxRenderer({ indent: 2 }));
