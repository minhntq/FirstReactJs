import React, { Fragment } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import Header from "./Header";
import routes from "../Routes";
import { connect } from "react-redux";

const DefaultLayout = (props) => {
  const { isLoggedIn } = props;

  return (
    console.log("gfgf"),
    (
      <>
        {!isLoggedIn ? (
          <Navigate to="/login" />
        ) : (
          <>
            <Header />
            <Routes>
              {routes.map((route, idx) => (
                <Route key={idx} path={route.path} element={route.element} />
              ))}
            </Routes>
          </>
        )}
      </>
    )
  );
};

const mapStateToProps = (state) => ({
  isLoggedIn: state.auth.isLoggedIn,
});

export default connect(mapStateToProps)(DefaultLayout);
