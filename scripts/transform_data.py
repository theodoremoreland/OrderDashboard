"""
This script is used to transform the data from the raw data to the data that can be used.
"""

# First party imports
import argparse
import json
from pprint import pprint
from datetime import datetime

parser = argparse.ArgumentParser()
parser.add_argument(
    "--file-path",
    type=str,
    default="data/raw_data.json",
    required=False,
)
parser.add_argument(
    "--output-file-path",
    type=str,
    default="data/processed_data_test.json",
    required=False,
)
parser.add_argument(
    "--verbose",
    type=bool,
    default=False,
    required=False,
)
args = parser.parse_args()

FILE_PATH = args.file_path
OUTPUT_FILE_PATH = args.output_file_path
VERBOSE = args.verbose
CURRENT_YEAR = datetime.now().year
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


def is_valid_date(day_of_week, month, day_of_month, year):
    _is_valid_date = False
    # List of days of the week for reference
    days_of_week = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]

    # Find the index of the given day_of_week
    if day_of_week not in days_of_week:
        raise ValueError("Invalid day of the week provided.")

    day_of_week_index = days_of_week.index(day_of_week)

    # Validate month and day_of_month
    if not (1 <= month <= 12):
        raise ValueError("Invalid month provided.")
    if not (1 <= day_of_month <= 31):
        raise ValueError("Invalid day of the month provided.")

    try:
        date = datetime(year, month, day_of_month)

        if date.weekday() == day_of_week_index:
            _is_valid_date = True
    except ValueError:
        pass

    return _is_valid_date


def main():
    f = open(FILE_PATH, encoding="utf-8")
    raw_data = json.load(f)

    processing = {
        "year_in_processing": CURRENT_YEAR,
    }

    for i in range(len(raw_data)):
        cost = raw_data[i]["cost"]  # $1.00
        date = raw_data[i]["date"]  # Fri, Oct 13
        item_count = raw_data[i]["itemCount"]  # 1 items
        day_of_week = date[:3]  # Fri
        month = date[5:8]  # Oct
        day = date[9:]  # 13

        identify_year_tries = 10

        while True:
            if identify_year_tries == 0:
                raise ValueError("Failed to identify the year for the given date.")

            year = processing["year_in_processing"]
            month_index = MONTH_TO_NUMBER[month]

            _is_valid_date = is_valid_date(
                day_of_week,
                month_index,
                int(day),
                year,
            )

            if _is_valid_date:
                break

            processing["year_in_processing"] -= 1
            identify_year_tries -= 1

        raw_data[i]["cost"] = float(cost.replace("$", ""))
        raw_data[i]["dayOfWeek"] = day_of_week
        raw_data[i]["itemCount"] = int(item_count.replace("items", ""))
        raw_data[i]["date"] = f'{month} {day} {str(processing["year_in_processing"])}'

        if VERBOSE:
            pprint(raw_data[i])

    with open(OUTPUT_FILE_PATH, "w") as outfile:
        json.dump(raw_data, outfile)


if __name__ == "__main__":
    main()
