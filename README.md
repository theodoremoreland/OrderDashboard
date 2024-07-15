# Order Dashboard

I rather enjoy being referred to as a "DoorDash VIP" when I call their customer support, despite the fact that being a DoorDash VIP is probably not a good thing. I knew my DoorDash spending habits were bad, but how bad warranted VIP status?

I wrote a couple scripts to web scrape and transform my order history data from the DoorDash website. The data (in the form of a JSON file) can be supplied to the dashboard and the dashboard will display analytics for said JSON file.

The dashboard is initialized with random data. The data can be shuffled by clicking the refresh icon in the navbar or real data can be supplied via clicking the attach/add icon in the navbar.

The dashboard is deployed [here](https://main.d1rdpoich583rp.amplifyapp.com/)

<img src="presentation/thumbnail.webp" width="700">

[Visit the website](https://main.d1rdpoich583rp.amplifyapp.com/)

## Table of Contents

- [Technologies Used](#technologies-used)
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

## Getting the order data

The method I used to get my order data is relatively primitive and volatile, considering it isn't fully automated and is based on a particular version of the DoorDash website. If DoorDash updates the order history page, the script used to grab the order history will likely fail. This was sufficient for the scope of the project as I didn't anticipate much value in repeating this process. The value being to recognizes spending habits, not to monitor changes to those habits.

Two scripts were used to get my order data. One script parses the data (`webScraper.js`). The other script transforms that data into a format better suited for performing analysis (`transform_data.py`). The exact steps for using the scripts can be found below:

### Web scraping

1. Log in to your DoorDash account via the DoorDash website.
2. Visit the order history page on the DoorDash website.
3. Open the developer tools from the order history page.
4. Copy and paste the JavaScript from `webScraper.js` into the dev console.
5. Press Enter key and wait for script to finish running.
6. Once the script is complete, copy the message printed in the dev console into a JSON file.

### Transforming data

1. Run the `transform_data.py` script and point it to the JSON file created of the order data printed from `webScraper.js`.

## Screenshots

### Desktop

#### Default view
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

<img src="https://dj8eg5xs13hf6.cloudfront.net/order-dashboard/8.png" width="650">

<img src="https://dj8eg5xs13hf6.cloudfront.net/order-dashboard/9.png" width="650">

<img src="https://dj8eg5xs13hf6.cloudfront.net/order-dashboard/10.png" width="650">

<img src="https://dj8eg5xs13hf6.cloudfront.net/order-dashboard/11.png" width="650">

<img src="https://dj8eg5xs13hf6.cloudfront.net/order-dashboard/12.png" width="650">

<img src="https://dj8eg5xs13hf6.cloudfront.net/order-dashboard/13.png" width="650">

<img src="https://dj8eg5xs13hf6.cloudfront.net/order-dashboard/14.png" width="650">

<img src="https://dj8eg5xs13hf6.cloudfront.net/order-dashboard/15.png" width="650">

<img src="https://dj8eg5xs13hf6.cloudfront.net/order-dashboard/16.png" width="650">

<img src="https://dj8eg5xs13hf6.cloudfront.net/order-dashboard/17.png" width="650">

<img src="https://dj8eg5xs13hf6.cloudfront.net/order-dashboard/18.png" width="650">

### Mobile

#### Top of the page (mobile)
<img src="https://dj8eg5xs13hf6.cloudfront.net/order-dashboard/19.png" width="250">

#### Middle of the page (mobile)
<img src="https://dj8eg5xs13hf6.cloudfront.net/order-dashboard/20.png" width="250">

#### Bottom of the page (mobile)
<img src="https://dj8eg5xs13hf6.cloudfront.net/order-dashboard/21.png" width="250">
