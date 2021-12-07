import React from "react";
import { Link, useNavigate } from "react-router-dom";
import ActionTypes from "./../store/actions";
import { connect } from "react-redux";
const Header = (props) => {
  const navigate = useNavigate();
  const { userInfo, onUserLogout } = props;

  const LogOut = (e) => {
    e.preventDefault();
    onUserLogout();
    navigate("/login");
  };
  return (
    <nav class="navbar navbar-expand-md navbar-dark bg-primary">
      <div class="container">
        <Link className="navbar-brand" to="/">
          Instructors Management
        </Link>
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav me-auto">
            <li class="nav-item">
              <Link class="nav-link" to="/home">
                Home
              </Link>
            </li>
            <li class="nav-item">
              <Link class="nav-link" to="/majors">
                Major
              </Link>
            </li>
            <li class="nav-item">
              <Link class="nav-link" to="/instructors">
                Instructor
              </Link>
            </li>
            <li class="nav-item">
              <Link class="nav-link" to="/students">
                Student
              </Link>
            </li>
          </ul>
          <ul class="navbar-nav">
            <li class="nav-item">
              <a className="nav-link" href="/#">
                welcome to ...{userInfo.fullname}
              </a>
            </li>
            <li class="nav-item">
              <a href="/#" class="nav-link" onClick={LogOut}>
                <i class="fas fa-sign-out-alt"></i>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};
const mapStateToProps = (state) => ({
  userInfo: state.auth.currentUser,
});
const mapDispatchToProps = (dispatch) => ({
  onUserLogout: () => dispatch({ type: ActionTypes.LOGOUT_USER }),
});
export default connect(mapStateToProps, mapDispatchToProps)(Header);
