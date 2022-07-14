import React, { useState, useEffect, useContext } from 'react';
import RecipeContext from '../context/RecipeContext';

function Login() {
  const { salvaEmail } = useContext(RecipeContext);

  const [desabilitaBtn, setDesabilitaBtn] = useState(true);
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  useEffect(() => { // Fazer os testes req 4
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
        value={ email }
      />
      <input
        type="password"
        placeholder="password"
        data-testid="password-input"
        onChange={ ({ target }) => setSenha(target.value) }
        value={ senha }
      />
      <button
        type="button"
        data-testid="login-submit-btn"
        disabled={ desabilitaBtn }
        onClick={ () => salvaEmail(email) }
      >
        Enter
      </button>
    </div>
  );
}

export default Login;
