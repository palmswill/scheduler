import React from "react";

import { render, cleanup } from "@testing-library/react";

import Appointment from "components/Appointment";

import Application from "components/Application";

afterEach(cleanup);

it("renders without crashing", () => {
  render(<Application />);
});

describe("Appointment", () => {
  it("renders without crashing", () => {
    render(<Appointment />);
  });
});
