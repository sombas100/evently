import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import configureStore from "redux-mock-store";
import SideBarNavigation from "./SideBarNavigation";
import "@testing-library/jest-dom";

const mockStore = configureStore([]);

describe("SideBarNavigation", () => {
  let store: any;

  beforeEach(() => {
    store = mockStore({
      auth: { isAuthenticated: true },
    });
  });

  it("renders the sidebar navigation links correctly", () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <SideBarNavigation />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText("Events")).toBeInTheDocument();
    expect(screen.getByText("Login")).toBeInTheDocument();
    expect(screen.getByText("Logout")).toBeInTheDocument();
  });

  it("shows logout button when user is authenticated", () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <SideBarNavigation />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText("Logout")).toBeInTheDocument();
  });
});
