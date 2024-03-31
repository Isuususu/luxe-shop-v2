import React, { useEffect, useRef, useState } from "react";
import Navbar from "./Navbar/Navbar";
import Footer from "./Footer/Footer";
import { Outlet } from "react-router-dom";
import Search from "./Search/Search";
import { Toaster } from "react-hot-toast";

const Layout = () => {
  const windowWidth = window.innerWidth;
  const mobile = windowWidth < 500;

  const [innerWrapperReference, setInnerWrapperReference] =
    useState(null);

  const innerWrapperRef = useRef(null);

  useEffect(() => {
    if (innerWrapperRef !== null) {
      setInnerWrapperReference(innerWrapperRef);
    }
  }, []);
  console.log(innerWrapperReference);

  return (
    <>
      <Toaster />
      <Navbar mobile={mobile} />
      <Search ref={innerWrapperReference} />
      <div
        className={!mobile ? "desktop-layout__inner-wrapper" : ""}
        id="inner-wrapper"
        ref={innerWrapperRef}
      >
        <img
          src={require("../images/notch.png")}
          alt=""
          width={113}
          height={30}
          style={{
            zIndex: "99",
            position: "absolute",
            left: "50%",
            top: "20px",
            transform: "translate(-50%)",
          }}
        />
        <Outlet />
      </div>
      {/* <Footer /> */}
    </>
  );
};

export default Layout;
