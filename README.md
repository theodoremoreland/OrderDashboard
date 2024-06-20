# Doordash Dashboard

A dashboard for visualizing doordash order history data and scripts to collect and transform aforementioned data into appropriate format.

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

## Dashboard metrics

# Pies

Checkboxes for showing two pies at a time.

- Total spend by year (x)(x)
- Total spend by day of week (x)(x)
- Total spend by month (x)(x)

# Scatter

Dropdown for switching between scatter6 charts

- Total spent across all of Doordash history (by day) (x)(x)
- Total purchases across all of Doordash history (by day) (x)(x)

# KPIs

Radio button lets user alternate between averages vs totals

### Averages

(Each row being a shared KPI)

- Average number of purchases per day (x)(x) / Average spend per day (x)(x)
- Average number of purchases per week (x)(x) / Average spend per week (x)(x)
- Average number of purchases per month (x)(x) / Average spend per month (x)(x)
- Average number of purchases per year (x)(x) / Average spend per year (x)(x)

### Totals

- Total spent (x)(x)
- Total number of purchases (x)(x)
- Total number of stores purchased from (x)(x)
- Total number of days a purchase was made (x)(x)
- (optional / bonus) Total number of items purchased (x)(x)

# Conveyor

Displays on a conveyor that stops moving when you hover over it.

- Top 5 Longest streak without purchases (x)(x)
- Top 5 Longest purchase streaks (x)(x)

# Lists

List auto scroll until you hover over

- Top 10, 20, 40 stores (by total spent) (x)(x)
- Top 10, 20, 40 stores (by number of purchases)(x)(x)
- Top 10, 20, 40 stores (by number of items purchased) (x)(x)
