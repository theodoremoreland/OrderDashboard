/**
 * @fileoverview This file contains the web scraper functions.
 */

/**
 * @description An IIFE that creates a closure for the scraping functions.
 */
(() => {
    const DELIMITER = ` • `;
    let intervalId = undefined;
    // * ---- Functions for grabbing order HTML/DOM elements from www.doordash.com/orders page. ----

    /**
     * Returns order HTML/DOM elements containing order data of interest:
     * store name, date of order, cost of order, quantity of items ordered, name of items ordered.
     * @returns {Array<HTMLElement>} An array of DOM elements featuring order data.
     */
    const grabOrderElements = () => {
        return [...document.querySelectorAll(`button[data-anchor-id="OrderHistoryOrderItem"]`)];
    };

    /**
     * Returns the HTML Element housing the store name of the order.
     * @param {HTMLElement} orderElement
     * @returns {HTMLElement} The HTML Element housing store name of order.
     */
    const grabStoreNameElement = (orderElement) => {
        return orderElement.querySelector(`.iKPPDs`);
    };

    /**
      * Returns the HTML Element housing the date, cost, and quantity of items
      * of the order.
      * @param {HTMLElement} orderElement
      * @returns {HTMLElement} The HTML Element housing date, cost, and quantity of items of order.
      */
    const grabMetadataElement = (orderElement) => {
        return orderElement.querySelector(`.jPYUXx[color="TextTertiary"]`);
    };

    /**
      * Returns the HTML Element housing the item names of the order.
      * @param {HTMLElement} orderElement
      * @returns {HTMLElement} The HTML Element housing item names of the order.
      */
    const grabItemsElement = (orderElement) => {
        return orderElement.querySelector(`.buMDwO`);
    };

    /**
     * Returns the HTML Element for the load more deliveries button.
     * @returns {HTMLElement} The HTML Element for the load more deliveries button.
     */
    const grabLoadMoreDeliveriesButton = () => {
        return document.querySelector(`button[kind="BUTTON/TERTIARY"]`);
    };

    /**
     * Returns true if the order was cancelled, false otherwise.
     * @param {HTMLElement} orderElement
     * @returns {boolean} true if order was cancelled, false otherwise.
     */
    const wasOrderCancelled = (orderElement) => {
        return orderElement.innerText.includes(`Order Cancelled`);
    };

    // * ---- Functions for masking/altering order data in the HTML/DOM. ----

    /**
     * Masks/alters the store name of given order HTML/DOM element to hide information from viewer.
     * @param {HTMLElement} storeNameElement
     * @returns {void} 
     */
    const maskStoreName = (storeNameElement) => {
        storeNameElement.innerText = `Bob's Burgers`;
    };

    /**
     * Masks/alters the date, cost, and quantity of items of given order
     * HTML/DOM element to hide information from viewer.
     * @param {HTMLElement} metadataElement
     * @returns {void}
     */
    const maskMetadata = (metadataElement) => {
        metadataElement.innerText = `Fri, Oct 13 • $9000.01 • 0 items`;
    };

    /**
     * Masks/alters items of given element to hide information from viewer.
     * @param {HTMLElement} itemsElement
     * @returns {void}
     */
    const maskItems = (itemsElement) => {
        itemsElement.innerText = `Chemical X • Brain Blast`;
    };

    // * ---- Functions for getting the order data from the HTML/DOM. ----

    /**
     * Returns the store name of the given storeName HTML/DOM element.
     * @param {HTMLElement} storeNameElement
     * @returns {string} The store name of the order. 
     */
    const getStoreName = (storeNameElement) => {
        return storeNameElement.innerText;
    };

    /**
     * Returns the date of the given metadataElement HTML/DOM element.
     * Has to extract date from metadataElement's innerText which is of
     * following format: `date • cost • item count`.
     * @param {HTMLElement} metadataElement
     * @returns {string} The date of the order (e.g. Mon, Jan 1). 
     */
    const getDate = (metadataElement) => {
        return metadataElement.innerText.split(DELIMITER)[0];
    };

    /**
     * Returns the cost of the given metadataElement HTML/DOM element.
     * Has to extract date from metadataElement's innerText which is of
     * following format: `date • cost • item count`.
     * @param {HTMLElement} metadataElement
     * @returns {string} The cost of the order (e.g. $9000.01).
     */
    const getCost = (metadataElement) => {
        return metadataElement.innerText.split(DELIMITER)[1];
    }; 

    /**
     * Returns the item count of the given metadataElement HTML/DOM element.
     * Has to extract date from metadataElement's innerText which is of
     * following format: `date • cost • item count`.
     * @param {HTMLElement} metadataElement
     * @returns {string} The item count of the order (e.g. 123 items). 
     */
    const getItemCount = (metadataElement) => {
        return metadataElement.innerText.split(DELIMITER)[2];
    };

    /**
     * Returns the items of the given itemsElement HTML/DOM element.
     * @param {HTMLElement} itemsElement
     * @returns {Array<string>} The items of the order (e.g. [Buttered Toast, Hard Boiled Egg, Krabby Patty]).
     */
    const getItems = (itemsElement) => {
        return itemsElement.innerText.split(DELIMITER);
    };

    // * ---- Functions for running code. ----

    /**
     * Prompts the execution of the web scraper and automatic masking without
     * clicking on the load more deliveries button.
     * @returns {void}
     */
    const test = () => {
        const data = [];
        const orderElements = grabOrderElements();

        orderElements.forEach((orderElement) => {
            const storeNameElement = grabStoreNameElement(orderElement);
            const metadataElement = grabMetadataElement(orderElement);
            const itemsElement = grabItemsElement(orderElement);

            maskStoreName(storeNameElement);
            maskMetadata(metadataElement);
            maskItems(itemsElement);

            data.push({
                storeName: getStoreName(storeNameElement),
                date: getDate(metadataElement),
                cost: getCost(metadataElement),
                itemCount: getItemCount(metadataElement),
                items: getItems(itemsElement),
                wasCancelled: wasOrderCancelled(orderElement),
            });
        });

        console.info(data);
    };

    /**
     * Prompts the execution of the web scraper prints out the order data
     * to developer tools console.
     */
    const main = () => {
        intervalId = setInterval(() => {
            const loadMoreDeliveriesButton = grabLoadMoreDeliveriesButton();

            if (loadMoreDeliveriesButton) {
                loadMoreDeliveriesButton.click();
            } else {
                clearInterval(intervalId);

                const data = [];
                const orderElements = grabOrderElements();
        
                orderElements.forEach((orderElement) => {
                    const storeNameElement = grabStoreNameElement(orderElement);
                    const metadataElement = grabMetadataElement(orderElement);
                    const itemsElement = grabItemsElement(orderElement);
        
                    data.push({
                        storeName: getStoreName(storeNameElement),
                        date: getDate(metadataElement),
                        cost: getCost(metadataElement),
                        itemCount: getItemCount(metadataElement),
                        items: getItems(itemsElement),
                        wasCancelled: wasOrderCancelled(orderElement),
                    });
                });
        
                console.info(data);
            }
        }, 3_500);
    };

    // test();
    main();
})();