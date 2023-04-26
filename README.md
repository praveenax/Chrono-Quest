# Chrono Quest

My entry to Gamedev.js Jam 2023.

## How to run locally

You can use it as a typical React application

### npm install
### npm start

## Data Entry for more historical events

One thing I was concerned was how to add more events to the game. There is a file named readExcel.js. Its a nodejs script to read from Book.xlsx file and will printout the JSON required for the game to utilise. 

1) Populate Book.xlsx file with more or different events
2) Run *"node readExcel.js"* to get the json in the terminal.
3) Copy the json into *cards.json* which is inside src.
4) Test the application to reflect the new data in the game.

