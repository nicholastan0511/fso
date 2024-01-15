describe("Blog app", () => {
  beforeEach(function () {
    cy.request("POST", "http://localhost:3003/api/testing/reset");
    const user = {
      name: "Nicholas Tan",
      username: "nicholastan",
      password: "test",
    };

    const secondUser = {
      name: "Test",
      username: "test",
      password: "test",
    };

    cy.request("POST", "http://localhost:3003/api/users", user);
    cy.request("POST", "http://localhost:3003/api/users", secondUser);
    cy.visit("http://localhost:5173");
  });

  it("Login form is shown", function () {
    cy.contains("Username");
    cy.contains("Password");
  });

  describe("logging in", () => {
    it("a user fails to log in with invalid credentials", () => {
      cy.contains("Username").find("input").type("nicholastan");
      cy.contains("Password").find("input").type("wrong");
      cy.get("#login-button").click();
      cy.contains("invalid username or password!");
      cy.get(".error").should("have.css", "background-color", "rgb(255, 0, 0)");
      cy.get("html").should("not.contain", "Nicholas Tan logged in");
    });

    it("a user can log in", () => {
      cy.contains("Username").find("input").type("nicholastan");
      cy.contains("Password").find("input").type("test");
      cy.get("#login-button").click();
      cy.contains("Nicholas Tan logged in");
    });
  });

  describe("When logged in", function () {
    beforeEach(() => {
      cy.contains("Username").find("input").type("nicholastan");
      cy.contains("Password").find("input").type("test");
      cy.get("#login-button").click();
      cy.contains("Nicholas Tan logged in");
    });

    it("A blog can be created", function () {
      cy.contains("Create New Blog").click();
      cy.contains("url:").find("input").type("test");
      cy.contains("title:").find("input").type("test");
      cy.contains("author:").find("input").type("test");
      cy.contains("save").click();
      cy.contains("test added");
    });

    describe("changing the information of the blog", function () {
      beforeEach(() => {
        cy.contains("Create New Blog").click();
        cy.contains("url:").find("input").type("test");
        cy.contains("title:").find("input").type("test");
        cy.contains("author:").find("input").type("test");
        cy.contains("save").click();

        cy.contains("view").click();
      });

      it("user can like a blog", () => {
        cy.contains("testtest")
          .parent()
          .find("div")
          .eq(1)
          .find("div")
          .eq(0)
          .find("button")
          .click();

        cy.contains("like").click();

        cy.get(".blogLikes").contains("1");
      });

      it("blog can be deleted", () => {
        cy.contains("testtest")
          .parent()
          .find("div")
          .eq(1)
          .find("div")
          .eq(0)
          .find("button")
          .click();

        cy.contains("remove").click();

        cy.get("html").should("not.contain", "testtest");
      });

      it("blog cannot be deleted by random user", () => {
        cy.contains("logout").click();

        cy.contains("Username").find("input").type("test");
        cy.contains("Password").find("input").type("test");
        cy.get("#login-button").click();

        cy.contains("testtest")
          .parent()
          .find("div")
          .eq(1)
          .find("div")
          .eq(0)
          .find("button")
          .click();

        cy.get("#rmvButton").should("not.exist");
      });

      describe("likes", () => {
        beforeEach(() => {
          cy.contains("Create New Blog").click();
          cy.contains("url:").find("input").type("mama");
          cy.contains("title:").find("input").type("mama");
          cy.contains("author:").find("input").type("mama");
          cy.contains("save").click();

          cy.get(".blog").eq(1).contains("view").click();
        });

        it.only("blogs are ordered by likes", () => {
          cy.contains("mamamama").parent().contains("like").click();

          cy.get(".blogTitle").eq(0).contains("mama");
          cy.get(".blogTitle").eq(1).contains("test");
        });
      });
    });
  });
});
