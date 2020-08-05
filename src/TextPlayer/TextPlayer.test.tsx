import React from 'react'
import { render, cleanup } from '@testing-library/react'
import TextPlayer from './index';

afterEach(cleanup)

describe('This will test MyComponent', () => {
  test('renders message', () => {
    const {getByText} = render(<TextPlayer changes={[]}/>)


  })
});
