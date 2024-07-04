# Order Dashboard

I rather enjoy being referred to as a "DoorDash VIP" when I call their customer support, despite the fact that being a DoorDash VIP is probably not a good thing. I knew my DoorDash spending habits were bad, but how bad warranted VIP status? DoorDash didn't have the tools for analyzing my spending, so my curiosity led me to leveraging my programming skills for insight. I wrote some scripts to get my order history data, then I created my own analytics dashboard.

## Table of Contents

- [Technologies Used](#technologies-used)
- [Getting the order data](#getting-the-order-data)

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

The method I used to get my order data is relatively primitive and violatile, considering it isn't fully automated and is based on a particular version of the DoorDash website. If DoorDash updates the order history page, the script used to grab the order history will likely fail. This was suffucient for the scope of the project as I didn't anticipate much value in repeating this process. The value being to recognizes spending habits, not to monitor changes to those habits.

Two scripts were used to get my order data. One script parses the data (`webScraper.js`). The other script transforms that data into a format better suited for performing analysis (`transform_data.py`). The exact steps for using the scripts can be found below:

1.
2.
3.
4.
