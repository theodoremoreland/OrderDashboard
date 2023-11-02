# Doordash Dashboard

## Table of Contents

- [Overview](#overview)
- [Technologies Used](#technologies-used)
- [Web scraping](#web-scraping)
- [Data transformation](#transforming-data)
- [Video](#video)

## Overview

A project for getting essential data for deriving insight into a user's Doordash spending habits. The result is a JSON file featuring
data concerning every Doordash order listed on the user's Doordash order history page via doordash.com. Said JSON file can be used
to create visualizations such as a dashboard.

## Technologies Used

- JavaScript
- Firefox
  - Firefox Developer Tools
- Python
- React
- HTML
- CSS

## How it works

In some circumstances, a program can be used to log into Doordash's website (@ doordash.com), visit the order history page, and collect all of the user's order
history on its own. However, websites such as doordash.com makes doing so via a program tricky by preventing remote controlled web browsers from logging into the
website. Under these circumstances, I decided the simplest approach was a semi-automated alternative in which a small JavaScript script would be copied into the
development console of a standard web browser while the user is already logged in and is already on the order history page. Once the script is executed, it will
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

A Python program that transforms that data created from the aforementioned web scraping script into a simpler format. Also includes
feature for masking/alternating data and saving given alterations to a special JSON file.

## Video

Why writing the code for this project, I will be recording myself in a video. The purpose of the video is to demonstrate what coding up a few simple programs is like. The focus will be on narrating thought process while exposing a few programming and web development concepts without an opinion piece on the nature of programming as a career and without instruction or lecturing on the steps involved. The video becomes too long and "rambly" otherwise. I may or may not publish and link the video(s) somewhere in this repository.
