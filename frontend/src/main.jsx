import { StrictMode } from "react";
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
import PrivateRoute from "./components/PrivateRoute.jsx";
import BookContainer from "./components/Book/BookContainer.jsx";
import SelectBook from "./components/Book/selectBook.jsx";
import Translate from "./components/translate/Translate.jsx";
import Translate2 from "./components/translate/Translate2.jsx";
import VedBooks from "./components/vedBooks/VedBooks.jsx";
import PDFViewer from "./components/Book/Book2.jsx";
// import ThreeCanvas from "./components/fire/ThreeCanvas.jsx";
import Intro from "./components/features/Intro.jsx";
import Sparks from "./components/features/FireSparkles.jsx";
import QuizPage from "./components/Quiz/quiz.jsx";
function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path="login" element={<Login />} />
        <Route path="/" element={<Layout />}>
          <Route
            path=""
            element={
              <>
                <Home />
              </>
            }
          />
          <Route
            path="book"
            element={
              <>
                <BookContainer />
              </>
            }
          />
          <Route
            path="quiz"
            element={
              <>
                <QuizPage />
              </>
            }
          />
          <Route
            path="intro"
            element={
              <>
                <Intro />
              </>
            }
          />
          <Route
            path="vedbooks"
            element={
              <>
                <VedBooks />
              </>
            }
          />
          <Route
            path="animated-stories"
            element={
              <>
                <Sparks />
              </>
            }
          />
          <Route
            path="bookstype"
            element={
              <>
                <SelectBook />
              </>
            }
          />
          <Route
            path="uploadBook"
            element={
              <>
                <PDFViewer />
              </>
            }
          />

          <Route
            path="meta"
            element={
              <PrivateRoute>
                <Meta />
              </PrivateRoute>
            }
          />
          <Route
            path="translate"
            element={
              <>
                <Translate2 />
              </>
            }
          />
          <Route
            path="translate2"
            element={
              <>
                <Translate />
              </>
            }
          />
          {/* <Route
            path="story"
            element={
              <PrivateRoute>
                <ThreeCanvas />
              </PrivateRoute>
            }
          /> */}
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
