import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import ShareButton from '../components/ShareButton';
import copy from 'clipboard-copy';
import userEvent from '@testing-library/user-event';


jest.mock('clipboard-copy');
copy.mockImplementation( (url) => console.log(url));
describe('Teste do Component ShareButton', () => {
    beforeEach(() => {
        render(<ShareButton type="food" id="52771" dataTestid="share-btn" />);
    });

    it('Teste se o componente é renderizado', () => {
        expect(screen.getByTestId('share-btn')).toBeInTheDocument();
        expect(screen.getByTestId('share-btn')).toHaveAttribute('src', 'shareIcon.svg');
    });

    it('Teste se ao clicar no botão, a função copy é chamada', async () => {
        userEvent.click(screen.getByTestId('share-btn'));
        await waitFor(() => {
            expect(copy).toHaveBeenCalled();
            expect(screen.getByText('Link copied!')).toBeInTheDocument();
        });
        await waitFor(() => {
            expect(screen.queryByText('Link copied!')).not.toBeInTheDocument();
        });
    });

})