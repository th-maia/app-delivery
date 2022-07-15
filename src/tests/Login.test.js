import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import useEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../helper/renderWithRouter';
// import Login from '../components/Login';

describe('Desenvolva testes para atingir 50% de cobertura total da aplicação', () => {
  it('Verifica se existem caixas de entradas e botão na tela login', () => {
    renderWithRouter(<App />);

    const inputEmail = screen.getByTestId('email-input');
    const inputSenha = screen.getByTestId('password-input');
    const btnEntre = screen.getByTestId('login-submit-btn');
    
    const email = 'lima_bigs@yahoo.com.br';

    useEvent.type(inputEmail, email);

    expect(inputEmail).toHaveValue(email);

    expect(inputEmail).toBeInTheDocument();
    expect(inputSenha).toBeInTheDocument();
    expect(btnEntre).toBeInTheDocument();
  });

  it('Verifica se ao efetuar o login, somos direcionado para pag de receitas', async() => {
    const { history } = renderWithRouter(<App />);

    const inputEmail = screen.getByTestId('email-input');
    const inputSenha = screen.getByTestId('password-input');
    const btnEntre = screen.getByTestId('login-submit-btn');
    
    const email = 'lima_bigs@yahoo.com.br';
    
    useEvent.type(inputEmail, email);
    useEvent.type(inputSenha, '1234567');
    await waitFor(() =>{
        expect(btnEntre).not.toBeDisabled();
        useEvent.click(btnEntre);
    }); 
    const textFoods = screen.getByText('Foods');
    expect(textFoods).toBeInTheDocument();
    expect(history.location.pathname).toBe('/foods');
  });
}) 
