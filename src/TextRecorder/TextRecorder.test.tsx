import React from 'react'
import { render, cleanup, screen, fireEvent} from '@testing-library/react'
import TextRecorder from './index';

afterEach(cleanup)

describe('This will test MyComponent', () => {
  test('renders message', () => {
    const {getByText} = render(
      <TextRecorder
        className="recorder ide"
        contentClassName={"ide__content"}
        onSubmit={() => {
        }}/>)

    const content = screen.getByTestId('text-recorder-content')
    expect(screen.getByTestId('text-recorder-content').textContent).toBe('')
    fireEvent.input(content, {target: {value: "TEST"}})
    // expect(content.value).toEqual(upper.toUpperCase())
  });
});
