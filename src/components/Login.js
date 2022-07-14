import React, { useState, useEffect } from 'react';

function Login() {
  const [desabilitaBtn, setDesabilitaBtn] = useState(true);
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  useEffect(() => {
    const emailValido = /\S+@\S+\.\S+/.test(email);
    const minimoDeCaracterers = 6;
    if (senha.length > minimoDeCaracterers && emailValido) {
      setDesabilitaBtn(false);
    } else {
      setDesabilitaBtn(true);
    }
  }, [email, senha]);

  return (
    <div>
      <input
        type="email"
        placeholder="email"
        data-testid="email-input"
        onChange={ ({ target }) => setEmail(target.value) }
      />
      <input
        type="password"
        placeholder="password"
        data-testid="password-input"
        onChange={ ({ target }) => setSenha(target.value) }
      />
      <button
        type="button"
        data-testid="login-submit-btn"
        disabled={ desabilitaBtn }
      >
        Enter
      </button>
    </div>
  );
}

export default Login;
