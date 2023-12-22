import * as React from 'react';
import { fireEvent, render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import emojiList from "../emojiList.json";
import App from '../App'

describe('Emoji test', () => {

    // this part executes before each text
    beforeEach(() => {
        render(<App />)
    })

    test('Is emoji list rendered?', () => {
        
        // there are 20 emojis at the beginning
        const initialEmojiList = emojiList.slice(0,19);

        initialEmojiList.map((emoji) => {
            expect(screen.getByText(emoji.title)).toBeInTheDocument()
        })


        // another way for the test : checking by added data-testid
        //const emojiList = screen.getByTestId('emojiList')
        // expect(emojiList).toBeInTheDocument()
    })

    test('Is emoji list rendered succesfully after filtered?', () => {
        
        // get input
        const input = screen.getByTestId('test-input')
        
        // deciding search text for testing we expect 20 results for this search
        const inputText = 'heart'
    
        fireEvent.change(input, { target: { value: inputText } })
        // there are 2 images in header so there should be 22 images in total
        expect(screen.getAllByRole('img')).toHaveLength(22)
    })

    test('Is emoji copied', () => {
        
        // getting each row by the added test Id
        const emojis = screen.getAllByTestId('test-copy')

        // mapping through each row to test all of them one by one
        emojis.map((emoji, index) => {
            fireEvent.click(emoji)
            expect(emoji.getAttribute("data-clipboard-text").length).toBeGreaterThan(0)
            expect(emoji.getAttribute("data-clipboard-text")).toMatch(emojiList[index].symbol)
        })
    })
})