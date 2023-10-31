/* eslint-disable testing-library/no-debugging-utils */
import { act, fireEvent, render, screen } from "@testing-library/react";
import { Router } from "react-router-dom";
import { MemoryHistory, createMemoryHistory } from "history";
import userEvent from "@testing-library/user-event";

import App from "../App";

const buttons = {
  ADD_NEW_OPERATION: /add new operation/i,
};

interface RenderWithRouterProps {
  route?: string;
  history?: MemoryHistory;
}

export const renderWithRouter = (
  ui: React.ReactNode,
  {
    route = "/",
    history = createMemoryHistory({ initialEntries: [route] }),
  }: RenderWithRouterProps = {}
) => {
  return {
    ...render(
      <Router navigator={history} location={history.location}>
        {ui}
      </Router>
    ),
    history,
  };
};

describe("App Component", () => {
  it("should load application home", () => {
    renderWithRouter(<App />);

    expect(screen.getByText(buttons.ADD_NEW_OPERATION)).toBeInTheDocument();
  });

  it("should load create operation form after click add new operation button", () => {
    renderWithRouter(<App />);

    userEvent.click(screen.getByText(buttons.ADD_NEW_OPERATION));

    expect(screen.getByText(/create operation/i)).toBeInTheDocument();
    expect(screen.getByText(/choose an operation/i)).toBeInTheDocument();
    expect(screen.getByText(/amount/i)).toBeInTheDocument();
    expect(screen.getByText(/send operation/i)).toBeInTheDocument();
    expect(screen.getByText(/cancel/i)).toBeInTheDocument();
  });

  it("should load login form", async () => {
    renderWithRouter(<App />, { route: "/login" });

    expect(screen.getByText(/please sign in/i)).toBeInTheDocument();
    expect(screen.getByText(/username/i)).toBeInTheDocument();
    expect(screen.getByText(/password/i)).toBeInTheDocument();
    expect(screen.getByText(/Sign In/)).toBeInTheDocument();
    expect(screen.getByText(/dont have an account/i)).toBeInTheDocument();
    expect(screen.getByText(/register/i)).toBeInTheDocument();

    await act(() => fireEvent.click(screen.getByText(/Sign In/)));

    expect(screen.getByText(/email must be provided/i)).toBeInTheDocument();
    expect(screen.getByText(/password must be provided/i)).toBeInTheDocument();
  });
});
