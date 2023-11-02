"""
This script is used to transform the data from the raw data to the data that can be used.
"""
# First party imports
import json
from pprint import pprint

MONTH_TO_NUMBER = {
    "Jan": 1,
    "Feb": 2,
    "Mar": 3,
    "Apr": 4,
    "May": 5,
    "Jun": 6,
    "Jul": 7,
    "Aug": 8,
    "Sep": 9,
    "Oct": 10,
    "Nov": 11,
    "Dec": 12,
}


def main():
    f = open("data/raw_data.json")
    raw_data = json.load(f)

    processing = {
        "year_in_processing": 2023,
        "month_in_processing": "Oct",
        "months_processed": [],
    }

    for i in range(len(raw_data)):
        cost = raw_data[i]["cost"]  # $1.00
        date = raw_data[i]["date"]  # Fri, Oct 13
        item_count = raw_data[i]["itemCount"]  # 1 items

        raw_data[i]["cost"] = float(cost.replace("$", ""))
        raw_data[i]["dayOfWeek"] = date[:3]
        raw_data[i]["itemCount"] = int(item_count.replace("items", ""))

        month = date[5:8]
        day = date[9:]

        # If month currently being processed
        is_month_currently_being_processed = month == processing["month_in_processing"]

        # If month isn't currently being processed but has been processed before
        has_month_been_processed_before = month in processing["months_processed"]

        # If month is new
        is_month_new = (
            has_month_been_processed_before == False
            and is_month_currently_being_processed == False
        )

        # ! Logic below breaks if skipping exactly 12 months or more
        if is_month_new:
            # Add old month to months processed
            processing["months_processed"].append(processing["month_in_processing"])
            # Set new month
            processing["month_in_processing"] = month
            # Add current year to date
            raw_data[i][
                "date"
            ] = f'{month} {day} {str(processing["year_in_processing"])}'
        elif is_month_currently_being_processed and not has_month_been_processed_before:
            # Cool, we're still processing the same month
            raw_data[i][
                "date"
            ] = f'{month} {day} {str(processing["year_in_processing"])}'
        elif is_month_currently_being_processed and has_month_been_processed_before:
            # Not cool, we're in a different year
            processing["year_in_processing"] -= 1
            processing["month_in_processing"] = month
            processing["months_processed"] = []
            raw_data[i][
                "date"
            ] = f'{month} {day} {str(processing["year_in_processing"])}'
        elif (
            is_month_currently_being_processed == False
            and has_month_been_processed_before
        ):
            # Not cool, we're in a different year
            processing["year_in_processing"] -= 1
            processing["month_in_processing"] = month
            processing["months_processed"] = []
            raw_data[i][
                "date"
            ] = f'{month} {day} {str(processing["year_in_processing"])}'
        elif (
            MONTH_TO_NUMBER[month] > MONTH_TO_NUMBER[processing["month_in_processing"]]
        ):
            # Not cool, we're in a different year
            processing["year_in_processing"] -= 1
            processing["month_in_processing"] = month
            processing["months_processed"] = []
            raw_data[i][
                "date"
            ] = f'{month} {day} {str(processing["year_in_processing"])}'

    with open("data/processed_data.json", "w") as outfile:
        json.dump(raw_data, outfile)


if __name__ == "__main__":
    # TODO test output data for two edge cases...
    # TODO 1. (...con) If year increases at any point while going through the orders.
    # TODO 2. (...con) If year fails to decrease when month increases
    main()
