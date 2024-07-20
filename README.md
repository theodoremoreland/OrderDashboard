# Order Dashboard

I rather enjoy being referred to as a "DoorDash VIP" when I call their customer support, despite the fact that being a DoorDash VIP is probably not a good thing. I knew my DoorDash spending habits were bad, but how bad warranted VIP status?

I wrote a couple scripts to web scrape and transform my order history data from the DoorDash website. The data (in the form of a JSON file) can be supplied to the dashboard.

The dashboard is initialized with random data. The randomized data can be shuffled by clicking the refresh icon in the navbar. Actual data in the form of a properly formatted JSON file can be supplied to the dashboard via clicking the attach/add icon in the navbar.

[View the web application](https://main.d1rdpoich583rp.amplifyapp.com/)

<img src="https://dj8eg5xs13hf6.cloudfront.net/order-dashboard/4.png" width="700">

## Table of Contents

[View the web application](https://main.d1rdpoich583rp.amplifyapp.com/)
- [Technologies Used](#technologies-used)
- [How to run locally](#how-to-run-locally)
- [Getting the order data](#getting-the-order-data)
- [Screenshots](#screenshots)
  - [Desktop](#desktop)
  - [Mobile](#mobile)

## Technologies Used

- React
- TypeScript
- JavaScript
- Firefox
  - Firefox Developer Tools
- Python
- HTML
- CSS
- Material UI (for inputs)
- Material UI X Charts (for charts and data grid)
- Zod

## How to run locally

**Note: [Node](https://nodejs.org/en) is required to run the dashboard locally. This was developed using Node version `v20.3.0`. [git](https://git-scm.com/) is used to download this repository in the steps below. It is assumed you are already familiar with both.**

**It is assumed all command line commands will be executed in a UNIX based command line environment.**

1. "git clone" this repository

2. Run the following commands from the root of this project on your local machine
```
cd app/
npm i
npm run start
```

## Getting the order data

If you're interested, you can use my scripts and follow the method I used to grab my order history data (for your order history data). However, the method I used is relatively primitive and volatile, considering it isn't fully automated and is based on a particular version of the DoorDash website. If DoorDash updates the order history page, the script used to grab the order history will likely fail. This was sufficient for the scope of the project as I didn't anticipate much value in repeating this process (I wanted to identify trends but not monitor them).

Two scripts are used to get the order history and prepare the data for analysis. One script parses the data [`scripts/webScraper.js`](https://github.com/theodoremoreland/OrderDashboard/blob/main/scripts/webScraper.js). The other script transforms that data into a format better suited for performing analysis [`scripts/transform_data.py`](https://github.com/theodoremoreland/OrderDashboard/blob/main/scripts/transform_data.py).

### Web scraping

1. Log in to your DoorDash account via the DoorDash website.
2. Visit the Order History page on the DoorDash website.
3. Open the "developer tools" from the Order History page.
4. Copy and paste the JavaScript from [`scripts/webScraper.js`](https://github.com/theodoremoreland/OrderDashboard/blob/main/scripts/webScraper.js) into the dev console.
5. Press Enter key and wait for script to finish running.
6. Once the script is complete, copy the message printed in the dev console into an empty JSON file.

### Transforming data

The data created from the [web scraping](#web-scraping) steps need to be transformed before performing analytics. The file @ [`scripts/transform_data.py`](https://github.com/theodoremoreland/OrderDashboard/blob/main/scripts/transform_data.py) is used to transform the data.

**Note: Python is required to run the `transform_data.py` script.**

1. Run the `transform_data.py` script and point it to the JSON file created of the order data printed from `webScraper.js`.

## Screenshots

### Desktop

#### Default view (data for all years)
<img src="https://dj8eg5xs13hf6.cloudfront.net/order-dashboard/1.png" width="650">

#### After toggling KPIs from Totals to Averages
<img src="https://dj8eg5xs13hf6.cloudfront.net/order-dashboard/2.png" width="650">

#### Dropdown for switching between years for visualizations
<img src="https://dj8eg5xs13hf6.cloudfront.net/order-dashboard/3.png" width="650">

#### After switching to the year 2018
<img src="https://dj8eg5xs13hf6.cloudfront.net/order-dashboard/4.png" width="650">

#### Dropdown for Activity scatter chart
<img src="https://dj8eg5xs13hf6.cloudfront.net/order-dashboard/5.png" width="650">

#### After clicking Total Items option for scatter chart dropdown 
<img src="https://dj8eg5xs13hf6.cloudfront.net/order-dashboard/6.png" width="650">

#### Dropdown for Top Streaks list
<img src="https://dj8eg5xs13hf6.cloudfront.net/order-dashboard/7.png" width="650">

#### After switching to No Orders for Top Streaks list
<img src="https://dj8eg5xs13hf6.cloudfront.net/order-dashboard/8.png" width="650">

#### Hovering over dropdown for Top Stores bar chart
<img src="https://dj8eg5xs13hf6.cloudfront.net/order-dashboard/9.png" width="650">

#### After selecting "by Total Items" for Top Stores bar chart
<img src="https://dj8eg5xs13hf6.cloudfront.net/order-dashboard/10.png" width="650">

#### Hovering over Totals by Month pie chart
<img src="https://dj8eg5xs13hf6.cloudfront.net/order-dashboard/11.png" width="650">

#### Hovering over Totals by Weekday pie chart
<img src="https://dj8eg5xs13hf6.cloudfront.net/order-dashboard/12.png" width="650">

#### After clicking arrow on data grid to view items 11-15
<img src="https://dj8eg5xs13hf6.cloudfront.net/order-dashboard/13.png" width="650">

#### Hovering over randomize button
<img src="https://dj8eg5xs13hf6.cloudfront.net/order-dashboard/14.png" width="650">

#### After randomizing data via clicking randomize button
<img src="https://dj8eg5xs13hf6.cloudfront.net/order-dashboard/15.png" width="650">

#### Dialog for supplying JSON file to dashboard
<img src="https://dj8eg5xs13hf6.cloudfront.net/order-dashboard/16.png" width="650">

#### Setting List to display 7 items and Bar Chart to display 10 items
<img src="https://dj8eg5xs13hf6.cloudfront.net/order-dashboard/17.png" width="650">

#### After setting List to display 7 items and Bar Chart to display 10 items
<img src="https://dj8eg5xs13hf6.cloudfront.net/order-dashboard/18.png" width="650">

### Mobile

#### Top of the page (mobile)
<img src="https://dj8eg5xs13hf6.cloudfront.net/order-dashboard/19.png" width="250">

#### Middle of the page (mobile)
<img src="https://dj8eg5xs13hf6.cloudfront.net/order-dashboard/20.png" width="250">

#### Bottom of the page (mobile)
<img src="https://dj8eg5xs13hf6.cloudfront.net/order-dashboard/21.png" width="250">
