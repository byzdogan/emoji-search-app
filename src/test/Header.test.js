import * as React from 'react';
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import App from '../App'

describe('Is Header rendered?', () => {

    test('header test', () => {
        render(<App />)
        
        const title = screen.getByText('Emoji Search')
        const img1 = screen.getByAltText('img1')
        const img2 = screen.getByAltText('img2')

        expect(title).toBeInTheDocument()
        expect(img1).toBeInTheDocument()
        expect(img2).toBeInTheDocument()
    })
})