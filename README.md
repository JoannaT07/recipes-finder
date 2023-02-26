# Recipes-finder

Web application project, which allows you to search for recipes from selected ingredients.

![Screen Shot](/client/src/assets/img/recipes-finder.png "Screen Shot")

## Project Overview 🔧

Link to the website: http://kulinarnefantazje.online/

The main purpose of the application is to help the user find a recipe or inspiration for a dish from ingredients available at home.

The project is divided into 3 modules written in TypeScript: client, server and scraper. For unit tests I used pupular testing library Jest.

### Client
Client is SPA written in React. Uses the REST API endpoints exposed by the Server. In order to handle client side routing I used react-router. I used React Hooks, e.g. useContext, useRef and created my own. One of them - useRecipes hides complexity of fetching Recipes data from server. The second useEffectUpdate hook is used to omit initial execution that we have in default useEffect with some dependencies. For selecting ingredients I implemented custom select input and for selecting category I used external library - react-select. Instead of standard pagination I decided to used infinity scroll for better user experience. To implement it I learned about InteresectionObserver API which execute action when selected element will apear on the screen.

### Server 
The server was written in Node.js using the Express framework. This module is used to process raw JSON data and to save it to MongoDB what is more created REST API serves as the connection between the database, which stores all the data, and the frontend with which the user interacts to get access to the data.

Data is stored in MongoDB in two collections - Ingredients and Recipes. I decided to separate Ingredients because of perfomance and possibility to use static config file with list of pre-defined ingredients.

### Scraper 
Scraper automatically extracts data from website containing needed informations so that it can then be stored in the form of structured JSON data. Thanks to this, the downloaded data is later used in the application. In this module I used Axios library to fetch HTML code and Cheerio library to parse it.