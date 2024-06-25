# Order Dashboard

I grew concerned about how much money I was spending on DoorDash, but DoorDash didn't have tools that made it easy for me to get insight into my spending habits. So, I wrote some scripts to get my order history data and dashboard to visualize my order history.

## Table of Contents

- [Technologies Used](#technologies-used)
- [Web scraping](#web-scraping)
- [Data transformation](#transforming-data)
- [Video](#video)

## Technologies Used

- TypeScript
- JavaScript
- Firefox
  - Firefox Developer Tools
- Python
- React
- HTML
- CSS

## How it works

In some circumstances, a program can be used to log into Doordash's website (@ doordash.com), visit the order history page, and collect all of the user's order
history on its own. However, websites such as doordash.com make doing so via a program tricky by imploring "are you a robot" like prevention mechanisms. In other words, the website tries to prevent bots from scraping data. Under these circumstances, I decided the simplest approach was a semi-automated alternative in which a small JavaScript program would be copied into the
development console while the user is already logged in and is already on the order history page. Once the script is executed, it will
click the "Load More Deliveries" button until all of the user's doordash orders appear on the page. Once all of the orders are present, the script will then
print all of the order data into the development console. From there, there user can copy said order data into a file of their choosing and save the data onto their computer. If I have time, I will create a UI that allows the user to render a dashboard of said data.

## Web scraping

A JavaScript file for scraping the user's order history page. The contents of the file need to be copied into the developer tool's console while the user is logged in and currently on their order history page. Once the script is executed, it will
click the "Load More Deliveries" button until all of the user's doordash orders appear on the page. Once all of the orders are present, the script will then
print all of the order data into the development console. From there, there user can copy said order data into a file of their choosing and save the data onto their computer.

The key subjects of the file include:

- An IIFE that wraps all of the JavaScript code to create a closure that allows the code to be rerun without refreshing the page.
- Functions for grabbing the DOM elements featuring the order data.
- Function for identifying whether or not an order was cancelled.
- Function for grabbing the Load More Deliveries button.
- Functions for masking/altering the order data on the DOM.
- Functions for getting the order data from their corresponding DOM elements.
- Test function for demonstrating efficacy of essential script functions.
- Main function that leverages setInterval for printing order data to screen after loading all deliveries to page.

## Transforming data

A Python script that transforms the data created from the aforementioned web scraping script into a more useable format.

## Dashboard inspiration

- https://dribbble.com/shots/23589425-Oplata-Admin-Dashboard
- https://dribbble.com/shots/18018508-Financial-Web-App-Dashboard-page-concept
- https://apexcharts.com/javascript-chart-demos/
