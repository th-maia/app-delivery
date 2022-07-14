import React from 'react';

function Login() {
  return (
    <div>
      <input
        type="email"
        placeholder="email"
        data-testid="email-input"
      />
      <input
        type="password"
        placeholder="password"
        data-testid="password-input"
      />
      <button
        type="button"
        data-testid="login-submit-btn"
      >
        Enter
      </button>
    </div>
  );
}

export default Login;
