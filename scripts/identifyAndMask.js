/**
 * @fileoverview This script is used to identify Doordash orders and mask its data for video recording.
 */

/**
 * @description This IIFE is used to identify Doordash orders and mask its data for video recording.
 */
(() => {
    let intervalId = undefined;

    /**
     * Returns an array of order elements.
     * @returns {Array<HTMLElement>} An array of order elements.
     */
    const grabOrderElements = () => {
        return [...document.querySelectorAll(`button[data-anchor-id="OrderHistoryOrderItem"]`)];
    };

    /**
     * Returns the store name element.
     * @param {HTMLElement} orderElement
     * @returns {HTMLElement} The store name element.
     */
    const grabStoreNameElement = (orderElement) => {
        return orderElement.querySelector(`.iKPPDs`);
    };

    /**
     * Returns the element featuring the order's date, cost, and item count.
     * Inner text format: `Tue, Feb 14 • $100.99 • 1 items`
     * @param {HTMLElement} orderElement
     * @returns {HTMLElement} The element featuring the order's date, cost, and item count.
     */
    const grabMetadataElement = (orderElement) => {
        return orderElement.querySelector(`.jPYUXx[color="TextTertiary"]`);
    };

    /**
     * Return the element featuring the order's list of purchased items.
     * @param {HTMLElement} orderElement 
     * @returns {HTMLElement} The element featuring the order's list of purchased items.
     */
    const grabItemsElement = (orderElement) => {
        return orderElement.querySelector(`.buMDwO`);
    };

    /**
     * Returns the load more deliveries button.
     * @returns {HTMLElement} The load more deliveries button.
     */
    const grabLoadMoreDeliveriesButtonElement = () => {
        return document.querySelector(`button[kind="BUTTON/TERTIARY"]`);
    };

    const getStoreName = (storeNameElement) => {
        
    };

    const getDate = (dateElement) => {
    
    };

    const getCost = (costElement) => {

    };

    const getItemCount = (itemCountElement) => {

    };

    const getItems = (itemsElement) => {

    };

    const maskStoreName = (storeNameElement) => {
        storeNameElement.innerText = `Applebee's`;
    };

    const maskMetadata = (metadataElement) => {
        metadataElement.innerText = `Fri, Oct 13 • $1337.69 • 9001 items`;
    };

    const maskItems = (itemsElement) => {
        itemsElement.innerText = `Lemon Pepper Brocoli • Blackened Cajun Salmon • Mashed Potatoes • Buttered Toast • Hard Boiled Egg`;
    };

    /**
     * Change the sensitive date present in order elements to something meaningless.
     * @param {Array<HTMLElement>} orderElements
     */
    const maskOrderElements = (orderElements) => {
        orderElements.forEach((orderElement) => {
            const storeNameElement = grabStoreNameElement(orderElement);
            const metadataElement = grabMetadataElement(orderElement);
            const itemsElement = grabItemsElement(orderElement);

            maskStoreName(storeNameElement);
            maskMetadata(metadataElement);
            maskItems(itemsElement);
        });
    };
    
    const main = () => {
        intervalId = setInterval(() => {
            const loadMoreDeliveriesButton = grabLoadMoreDeliveriesButtonElement();

            if (loadMoreDeliveriesButton) {
                loadMoreDeliveriesButton.click();

                console.count(`Loaded 10 more deliveries...`);
            } else {
                clearInterval(intervalId);

                const orderElements = grabOrderElements();

                console.info("All deliveries loaded.");
        
                maskOrderElements(orderElements);
            }
        }, 3_500);

        console.debug(intervalId);
    }

    main();
})();
