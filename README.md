# F1 Race Visualiser

![Preview](./preview.gif)

## Setup

```npm install```

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run cypress`


Runs a cypress test in a headless browser.

## More Info

I really enjoyed working on this project! I've been wanting to do something F1 related for a while, and with Ergast API, I had access to a really clean dataset which I was able to visualise, using the DaisyUI tailwindcss library.

I've written some unit & e2e tests to demonstrate my general approach to testing.

Other enchancements I'd consider if I had more time is indiviudal driver performance within a race, using some clever algorithms to determine if a lap time is good, if a driver lost a position to an overtake undertake etc.
