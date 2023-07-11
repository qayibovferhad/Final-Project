import "../../ui/layout/mainLayout";
import "../../ui/components/sidebar";
import "../../ui/layout/directorLayout/directorLayout";

import { FlowRouter } from "meteor/ostrio:flow-router-extra";
import "../../ui/pages/home/home";
import "../../ui/layout/auth/authLayout";

FlowRouter.route("/", {
  name: "App.home",
  action() {
    BlazeLayout.render("mainLayout", {
      main: "home",
    });
  },
});

import "../../ui/pages/auth/login";
FlowRouter.route("/login", {
  name: "App.login",
  action() {
    BlazeLayout.render("authLayout", {
      main: "login",
    });
  },
});

import "../../ui/pages/admin/dashboard/dashboard";
FlowRouter.route("/admin/dashboard", {
  name: "App.dashboard",
  action() {
    BlazeLayout.render("mainLayout", {
      main: "dashboard",
    });
  },
});
import "../../ui/pages/admin/branches/branches";
FlowRouter.route("/admin/branches", {
  name: "App.branches",
  action() {
    BlazeLayout.render("mainLayout", {
      main: "branches",
    });
  },
});
import "../../ui/pages/admin/directors/directors";
FlowRouter.route("/admin/directors", {
  name: "App.directors",
  action() {
    BlazeLayout.render("mainLayout", {
      main: "directors",
    });
  },
});

import "../../ui/pages/admin/teachers/teachers";
FlowRouter.route("/admin/teachers", {
  name: "App.teachers",
  action() {
    BlazeLayout.render("mainLayout", {
      main: "teachers",
    });
  },
});

import "../../ui/pages/admin/rooms/rooms";
FlowRouter.route("/admin/rooms", {
  name: "App.rooms",
  action() {
    BlazeLayout.render("mainLayout", {
      main: "rooms",
    });
  },
});

import "../../ui/pages/directorDashboard/students/students";

FlowRouter.route("/director/students", {
  name: "App.students",
  action() {
    BlazeLayout.render("directorLayout", {
      main: "students",
    });
  },
});

import "../../ui/pages/directorDashboard/lessons/lessons";

FlowRouter.route("/director/lessons", {
  name: "App.lessons",
  action() {
    BlazeLayout.render("directorLayout", {
      main: "lessons",
    });
  },
});

import "../../ui/pages/directorDashboard/subjects/subjects";
FlowRouter.route("/director/subjects", {
  name: "App.subjects",
  action() {
    BlazeLayout.render("directorLayout", {
      main: "subjects",
    });
  },
});
