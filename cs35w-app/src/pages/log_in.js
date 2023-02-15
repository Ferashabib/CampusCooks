import React from 'react';


const Login = () => {
  return (
    <div>
      <h1>Login Here!</h1>
      <form>
        <div>
          <label>
            User Name:
            <input type="text" name="username" />
          </label>
        </div>

        <br />
        <div>
          <label>
            Password :
            <input type="text" name="password" />
          </label>
        </div>
        <br />
        <input type="submit" value="Submit" />
      </form>
    </div>
  );
};


export default Login;