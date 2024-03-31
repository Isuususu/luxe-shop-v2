import React from "react";
import "./App.css";
import Layout from "./components/Layout";
import { StateContext } from "./context/StateContext";

import Home, { loader as productsLoader } from "./pages/Home/Home";
import ProductDetails, {
  loader as productLoader,
} from "./pages/ProductDetails/ProductDetails";
import {
  createBrowserRouter,
  RouterProvider,
  createRoutesFromElements,
  Route,
} from "react-router-dom";

// import function to register Swiper custom elements
import { register } from "swiper/element/bundle";
// register Swiper custom elements
register();

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route index element={<Home />} loader={productsLoader} />
      <Route
        path="/product/:slug"
        element={<ProductDetails />}
        loader={productLoader}
      />
    </Route>
  )
);

function App() {
  const windowWidth = window.innerWidth;
  const mobile = windowWidth < 500;

  return (
    <StateContext>
      {mobile ? (
        <div className="App">
          <RouterProvider router={router} />
        </div>
      ) : (
        <div className="desktop-layout">
          <div
            className={`App ${
              mobile === false ? "desktop-scale" : ""
            }`}
          >
            <RouterProvider router={router} />
          </div>
        </div>
      )}
    </StateContext>
  );
}

export default App;
