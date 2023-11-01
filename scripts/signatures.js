/**
 * @fileoverview This file contains the web scraper functions.
 */

/**
 * @description An IIFE that creates a closure for the scraping functions.
 */
(() => {

    // * ---- Functions for grabbing order HTML/DOM elements from www.doordash.com/orders page. ----

    /**
     * 
     * @returns {Array} An array of DOM elements featuring order data.
     */
    const grabOrderElements = () => {

    };

    /**
     * Returns the HTML Element housing the store name of the order.
     * @param {HTMLElement} orderElement
     * @returns {HTMLElement} The HTML Element housing store name of order.
     */
    const grabStoreNameElement = (orderElement) => {

    };


    /**
     * Returns the HTML Element housing the date of the order.
     * @param {HTMLElement} orderElement
     * @returns {HTMLElement} The HTML Element housing date of order.
     */
    const grabMetadataElement = (orderElement) => {

    };

    /**
     * Returns the HTML Element housing the cost of the order.
     * @param {HTMLElement} orderElement
     * @returns {HTMLElement} The HTML Element housing the cost of the order.
     */
    const grabItemsElement = (orderElement) => {

    };

    /**
     * Returns the HTML Element for the load more deliveries button.
     * @returns {HTMLElement} The HTML Element for the load more deliveries button.
     */
    const grabLoadMoreDeliveriesButton = () => {
            
    };

    /**
     * Returns true if the order was cancelled, false otherwise.
     * @param {HTMLElement} orderElement
     * @returns {boolean} true if order was cancelled, false otherwise.
     */
    const wasOrderCancelled = (orderElement) => {

    };

    // * ---- Functions for masking/altering order data in the HTML/DOM. ----

    /**
     * Masks/alters the store name of given order HTML/DOM element to hide information from viewer.
     * @param {HTMLElement} storeNameElement
     * @returns {void} 
     */
    const maskStoreName = (storeNameElement) => {
            
    };

    /**
     * Masks/alters the date of given order HTML/DOM element to hide information from viewer.
     * @param {HTMLElement} dateElement
     * @returns {void}
     */
    const maskDate = (dateElement) => {

    };

    /**
     * Masks/alters the cost of given order HTML/DOM element to hide information from viewer.
     * @param {HTMLElement} costElement
     * @returns {void}
     */
    const maskCost = (costElement) => {
            
    };

    /**
     * Masks/alters the item count of given HTML/DOM element to hide information from viewer.
     * @param {HTMLElement} itemCountElement
     * @returns {void} 
     */
    const maskItemCount = (itemCountElement) => {     

    };

    /**
     * Masks/alters items of given element to hide information from viewer.
     * @param {HTMLElement} itemsElement
     * @returns {void}
     */
    const maskItems = (itemsElement) => {

    }; 

    // * ---- Functions for getting the literal order data from the HTML/DOM. ----

    /**
     * Returns the store name of the given storeName HTML/DOM element.
     * @param {HTMLElement} storeNameElement
     * @returns {string} The store name of the order. 
     */
    const getStoreName = (storeNameElement) => {

    };

    /**
     * Returns the date of the given dateElement HTML/DOM element.
     * @param {HTMLElement} dateElement
     * @returns {string} The date of the order. 
     */
    const getDate = (dateElement) => {

    };

    /**
     * Returns the cost of the given costElement HTML/DOM element.
     * @param {HTMLElement} costElement
     * @returns {string} The cost of the order.
     */
    const getCost = (costElement) => {

    }; 

    /**
     * Returns the item count of the given itemCountElement HTML/DOM element.
     * @param {HTMLElement} itemCountElement
     * @returns {string} The item count of the order. 
     */
    const getItemCount = (itemCountElement) => {

    };

    /**
     * Prompts the execution of the web scraper and automatic masking without
     * clicking on the load more deliveries button.
     * @returns {void}
     */
    const test = () => {
        
    };
})();
