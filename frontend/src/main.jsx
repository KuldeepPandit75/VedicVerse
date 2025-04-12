import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";

import store from "./App/store.js";
import Layout from "./Layout.jsx";
import { Provider} from "react-redux";
import Cloud from "./components/Cloud.jsx";
import PrivateRoute from "./components/PrivateRoute.jsx";
import Home from "./components/home/Home.jsx"
import Login from "./components/login/Login.jsx"
import BookContainer from './components/Book/BookContainer.jsx'
import QuizPage from './components/Quiz/quiz.jsx'
import Intro from './components/features/Intro.jsx'
import VedBooks from './components/vedBooks/VedBooks.jsx'
import Sparks from './components/features/FireSparkles.jsx'
import IntroVedas from './components/AboutVedas/introVedas.jsx'
import SelectBook from './components/Book/selectBook.jsx'
import PDFViewer from './components/Book/Book2.jsx'
import Meta from './components/meta/Meta.jsx'
import Translate from './components/translate/Translate.jsx'
import Translate2 from './components/translate/Translate2.jsx'

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path="login" element={<Login />} />
        <Route path="/" element={<Layout />}>
          <Route
            path=""
            element={
              <PrivateRoute>
                <Home />
              </PrivateRoute>
            }
          />
          <Route
            path="book"
            element={
              <PrivateRoute>
                <BookContainer />
              </PrivateRoute>
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
              <PrivateRoute>
                <Intro />
              </PrivateRoute>
            }
          />
          <Route
            path="vedbooks"
            element={
              <PrivateRoute>
                <VedBooks />
              </PrivateRoute>
            }
          />
          <Route
            path="animated-stories"
            element={
              <PrivateRoute>
                <Sparks />
              </PrivateRoute>
            }
          />
          <Route
            path="Vedasintro"
            element={
              <>
                <IntroVedas />
              </>
            }
          />
          <Route
            path="bookstype"
            element={
              <PrivateRoute>
                <SelectBook />
              </PrivateRoute>
            }
          />
          <Route
            path="uploadBook"
            element={
              <PrivateRoute>
                <PDFViewer />
              </PrivateRoute>
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
              <PrivateRoute>
                <Translate2 />
              </PrivateRoute>
            }
          />

          <Route
            path="translate2"
            element={
              <PrivateRoute>
                <Translate />
              </PrivateRoute>
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
      <Cloud />
      <RouterProvider router={router} />
    </Provider>
  );
}

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);
