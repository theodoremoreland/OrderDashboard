/**
 * Establish logic necessary for Python web scraper to identify information on my DoorDash order history.
 * This file will also be used to mask said history from viewers, subsequently allowing them to see my interactions
 * with the history page enough to understand what is needed for the aforementioned Python web scraper.
 */ 


(() =>  {
    let intervalId = undefined;

    const grabOrderElements = () => {
        return [...document.querySelectorAll(`[data-anchor-id="OrderHistoryOrderItem"]`)];
    }

    const grabNameElement = (orderElement) => {
        return orderElement.querySelector(".iKPPDs");
    }

    const grabDateElement = (orderElement) => {
        return orderElement.querySelector(`.jPYUXx[color="TextTertiary"]`);
    }

    const grabCostElement = (orderElement) => {
        return orderElement.querySelector(`.jPYUXx[color="TextTertiary"]`);
    }

    const grabItemCountElement = (orderElement) => {
        return orderElement.querySelector(`.jPYUXx[color="TextTertiary"]`);
    }

    const grabItemsElement = (orderElement) => {
        return orderElement.querySelector(".buMDwO");
    }

    const checkWasCancelled = (orderElement) => {
        if (orderElement.querySelector(".gQhqKn") !== null) {
            return true;
        };

        return false;
    }

    const maskName = (nameElement) => {
        nameElement.innerText = "Cat Express";
    }

    const maskDate = (dateElement) => {
        const elementTextArray = dateElement
            .innerText
            .split(" • ");

        elementTextArray[0] = "Fri, Oct 13";

        dateElement.innerText = elementTextArray.join(" • ");
    }

    const maskCost = (costElement) => {
        const elementTextArray = costElement
            .innerText
            .split(" • ");

        elementTextArray[1] = "$15.99";

        costElement.innerText = elementTextArray.join(" • ");
    }

    const maskItemCount = (itemCountElement) => {
        const elementTextArray = itemCountElement
            .innerText
            .split(" • ");

        elementTextArray[2] = "99";

        itemCountElement.innerText = elementTextArray.join(" • ");
    }

    const maskItems = (itemsElement) => {
        itemsElement.innerText = "Mac & Cheese • Cheesecake  • Salmon  • Broccoli";
    }

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