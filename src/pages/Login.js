import React, { useState } from "react";
import Input from "../controls/Input";
import "./Login.css";
import userService from "./../services/userService";
import { connect } from "react-redux";
import ActionTypes from "./../store/actions";
const Login = (props) => {
  const { onUserLogin } = props;
  const [message, setMessage] = useState([]);

  const usernameRef = React.createRef();
  const passwordRef = React.createRef();

  const formSubmitHandler = (e) => {
    e.preventDefault();
    const username = usernameRef.current.value;
    const password = passwordRef.current.value;
    console.log(username, password);
    userService.login(username, password).then((res) => {
      if (res.errorCode > 0) {
        setMessage(res.data);
        //this.setState({ message: res.message });
      } else {
        setMessage("bbf");
        onUserLogin(res.data.accessToken, res.data);
        window.location.href = "/";
        //props.history.push("/home");
      }
    });
  };
  // useEffect(() => {
  //   usernameRef.current.focus();
  // }, []);

  return (
    <div class="container h-100">
      <div class="row justify-content-center h-100 align-items-center">
        <div class="col-sm-8 col-lg-5">
          <div class="card bg-primary">
            <div class="card-header text-white">
              <h4 class="card-title mb-0">
                <i class="fas fa-th"></i> Login
              </h4>
            </div>
            <div class="card-body bg-white rounded-bottom">
              <form onSubmit={formSubmitHandler}>
                <div className="row">
                  <p className="text-danger text-center">{message}</p>
                </div>
                <Input
                  inputRef={usernameRef}
                  id="txtUserName"
                  name="username"
                  label="User name"
                  type="text"
                />
                <Input
                  inputRef={passwordRef}
                  id="txtPassword"
                  name="password"
                  label="Password"
                  type="password"
                />
                {/* <Input
                    id="txtTextArea"
                    name="textArea"
                    label="text Area"
                    rows="2"
                  /> */}
                <div class="row">
                  <div class="offset-sm-3 col-auto">
                    <button type="submit" className="btn btn-primary">
                      Sign in
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
const mapDispatchToProps = (dispatch) => ({
  onUserLogin: (token, currentUser) =>
    dispatch({
      type: ActionTypes.LOGIN_USER,
      token,
      currentUser,
    }),
});

export default connect(null, mapDispatchToProps)(Login);
