/**
 * Establish logic necessary for Python web scraper to identify information on my DoorDash order history.
 * This file will also be used to mask said history from viewers, subsequently allowing them to see my interactions
 * with the history page enough to understand what is needed for the aforementioned Python web scraper.
 */ 


/**
 * Immediately invoked function expression (IIFE) to prevent global scope pollution when executing directly in browser dev console.
 */
(() =>  {
    let intervalId = undefined;

    /** Grab each order DOM element.
     * @returns {Array} An array of DOM elements, each representing a single order.
     */
    const grabOrderElements = () => {
        return [...document.querySelectorAll(`[data-anchor-id="OrderHistoryOrderItem"]`)];
    }

    /**
     * Returns the DOM element containing the name of the order.
     * @param {Element} orderElement 
     * @returns {Element} The DOM element containing the name of the order.
     */
    const grabNameElement = (orderElement) => {
        return orderElement.querySelector(".iKPPDs");
    }

    /**
     * Returns the DOM element containing the date of the order.
     * @param {Element} orderElement 
     * @returns {Element} The DOM element containing the date of the order.
     */
    const grabDateElement = (orderElement) => {
        return orderElement.querySelector(`.jPYUXx[color="TextTertiary"]`);
    }

    /**
     * Returns the DOM element containing the cost of the order.
     * @param {Element} orderElement 
     * @returns {Element} The DOM element containing the cost of the order.
     */
    const grabCostElement = (orderElement) => {
        return orderElement.querySelector(`.jPYUXx[color="TextTertiary"]`);
    }

    /**
     * Returns the DOM element containing the item count of the order.
     * @param {Element} orderElement 
     * @returns {Element} The DOM element containing the item count of the order.
     */
    const grabItemCountElement = (orderElement) => {
        return orderElement.querySelector(`.jPYUXx[color="TextTertiary"]`);
    }

    /**
     * Return the DOM element containing the items of the order.
     * @param {Element} orderElement 
     * @returns {Element} The DOM element containing the items of the order.
     */
    const grabItemsElement = (orderElement) => {
        return orderElement.querySelector(".buMDwO");
    }

    /**
     * Checks to see if order was cancelled.
     * @param {Element} orderElement 
     * @returns {Boolean} True if order was cancelled, false otherwise.
     */
    const checkWasCancelled = (orderElement) => {
        if (orderElement.querySelector(".gQhqKn") !== null) {
            return true;
        };

        return false;
    }

    /**
     * Masks the name of the order.
     */
    const maskName = (nameElement) => {
        nameElement.innerText = "Cat Express";
    }

    /**
     * Masks the date of the order.
     * @param {Element} dateElement 
     */
    const maskDate = (dateElement) => {
        const elementTextArray = dateElement
            .innerText
            .split(" • ");

        elementTextArray[0] = "Fri, Oct 13";

        dateElement.innerText = elementTextArray.join(" • ");
    }

    /**
     * Masks the cost of the order.
     * @param {Element} costElement 
     */
    const maskCost = (costElement) => {
        const elementTextArray = costElement
            .innerText
            .split(" • ");

        elementTextArray[1] = "$15.99";

        costElement.innerText = elementTextArray.join(" • ");
    }

    /**
     * Masks the item count of the order.
     * @param {Element} itemCountElement 
     */
    const maskItemCount = (itemCountElement) => {
        const elementTextArray = itemCountElement
            .innerText
            .split(" • ");

        elementTextArray[2] = "99";

        itemCountElement.innerText = elementTextArray.join(" • ");
    }

    /**
     * Masks the items of the order.
     * @param {Element} itemsElement 
     */
    const maskItems = (itemsElement) => {
        itemsElement.innerText = "Mac & Cheese • Cheesecake  • Salmon  • Broccoli";
    }

    /**
     * Masks the order.
     * @param {Element} orderElement 
     */
    const maskOrder = (orderElement) => {
        const nameElement = grabNameElement(orderElement);
        const dateElement = grabDateElement(orderElement);
        const costElement = grabCostElement(orderElement);
        const itemCountElement = grabItemCountElement(orderElement);
        const itemsElement = grabItemsElement(orderElement);

        maskName(nameElement);
        maskDate(dateElement);
        maskCost(costElement);
        maskItemCount(itemCountElement);
        maskItems(itemsElement);
    }

    const main = () => {
        const loadMoreDeliveriesButton = document.querySelector(`button[kind="BUTTON/TERTIARY"]`);

        if (loadMoreDeliveriesButton !== null) {
            loadMoreDeliveriesButton.click();
        } else {
            clearInterval(intervalId);

            console.log("Loaded all deliveries!");

            const orderElements = grabOrderElements();

            for (const orderElement of orderElements) {
                maskOrder(orderElement);
            }
    
            console.log("Masked all orders!"); 
        }
    }

    intervalId = setInterval(main, 7_000);

    console.debug(intervalId);
})();