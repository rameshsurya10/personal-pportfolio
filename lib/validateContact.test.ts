import { describe, it, expect } from "vitest";
import { validateContact } from "./validateContact";

describe("validateContact", () => {
  it("accepts a complete valid form", () => {
    const errors = validateContact({
      name: "Ada", email: "ada@example.com", subject: "Hi", message: "Hello there",
    });
    expect(errors).toEqual({});
  });

  it("flags an empty name", () => {
    const errors = validateContact({
      name: "  ", email: "ada@example.com", subject: "Hi", message: "Hello there",
    });
    expect(errors.name).toBeDefined();
  });

  it("flags an invalid email", () => {
    const errors = validateContact({
      name: "Ada", email: "not-an-email", subject: "Hi", message: "Hello there",
    });
    expect(errors.email).toBeDefined();
  });

  it("flags a too-short message", () => {
    const errors = validateContact({
      name: "Ada", email: "ada@example.com", subject: "Hi", message: "hey",
    });
    expect(errors.message).toBeDefined();
  });
});
