#React Text Recorder

I was doing some coding challenges and algorithm-based problems on Leetcode, Hackerrank, etc, and it occured to me that it might be an interesting idea to have a component that records the user typing and exports that recording as some type of file to be played back later. This would be useful to truly see how someone writes (or codes in this case); their mistakes as well as how they overcome those mistakes would be clear to see and follow.

I initially had this working with two textareas, but realized that you cannot have higher level styling within a textarea (which would completely defeat the ideal of being able to use this as a base for any coding challenge). Additionally, I added react-testing-library (new and hip!) but realized that it has some limitations on testing contenteditables. Namely, that js-dom does not support contenteditable testing yet: https://github.com/testing-library/dom-testing-library/pull/235

Anyway, I think this is a pretty interesting concept that could be utilized in a variety of ways. The base component should be lightweight, efficient (stores diffs efficiently, not the whole blob of text constantly), and highly malleable (very little necessary CSS, the user of the component should be able to update it how they like)




This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).


## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.
