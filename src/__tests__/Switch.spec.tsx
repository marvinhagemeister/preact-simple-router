import { h } from "preact";
import { renderer } from "./helpers";
import { Switch } from "../Switch";
import { Route } from "../Route";

describe("Switch", () => {
  it("should set state", () => {
    // TODO
  });

  it("should only match one Route", () => {
    renderer(
      <Switch>
        <Route path="/foo" />
        <Route path="/bar" />
      </Switch>,
    );
    // TODO
  });
});
