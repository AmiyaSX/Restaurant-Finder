# Restaurant-Finder

Use TypeScript, create-react-app, google places api create an SPA which will show a list of 10 nearby restaurants and the distance in kilometers from your current location.  

## CORS Problem
*If your browser doesn't allow CORS, you wont see any data successfully fetched. 
The easy way is to add Allow CORS extension on your browser, restart and it shall work.

## How to Setup

1. Install packages and dependencies

```
npm install
```

2. Create config.ts file and put your own google place api key in it

```
const key = "YOUR KEY";
export default key;
```

3. Start development server

```
npm start
```

4. You can find the application running on

http://localhost:3000

## What is been done

- Fetch 10 nearby restaurants based on the user's current location.
- Show the restaurants in grid items, and calculate the distance from user's location.
- Show the restaurants in the map and enable interactive function with user.
