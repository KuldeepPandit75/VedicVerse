import { StrictMode, useState } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router";
import { Provider } from "react-redux";
import store from "./App/store.js";
import Login from "./components/login/Login.jsx";
import Layout from "./Layout.jsx";
import Meta from "./components/meta/Meta.jsx";
import Home from "./components/home/Home.jsx";

function App() {
  const [isAuthenticated, isUserAuthenticated] = useState(false);

  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route
          path="login"
          element={<Login isUserAuthenticated={isUserAuthenticated} />}
        />
        <Route path="/" element={<Layout isAuthenticated={isAuthenticated} />}>
          <Route path="" element={<Home />} />
          <Route path="meta" element={<Meta />} />
        </Route>
      </>
    )
  );

  return (
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  );
}

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);
