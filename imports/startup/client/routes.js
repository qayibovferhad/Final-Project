import "../../ui/layout/mainLayout";
import "../../ui/components/sidebar";
import { FlowRouter } from "meteor/ostrio:flow-router-extra";
import "../../ui/pages/home/home";
FlowRouter.route("/", {
  name: "App.home",
  action() {
    BlazeLayout.render("mainLayout", {
      main: "home",
    });
  },
});
import "../../ui/pages/dashboard/dashboard";
FlowRouter.route("/dashboard", {
  name: "App.dashboard",
  action() {
    BlazeLayout.render("mainLayout", {
      main: "dashboard",
    });
  },
});
