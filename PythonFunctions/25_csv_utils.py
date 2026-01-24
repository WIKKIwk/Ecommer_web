"""CSV utility functions"""
import csv


def read_csv(filepath: str) -> list:
    """Read CSV file"""
    with open(filepath, 'r') as f:
        return list(csv.DictReader(f))


def write_csv(filepath: str, data: list, fieldnames: list):
    """Write CSV file"""
    with open(filepath, 'w', newline='') as f:
        writer = csv.DictWriter(f, fieldnames=fieldnames)
        writer.writeheader()
        writer.writerows(data)


def csv_to_dict_list(filepath: str) -> list:
    """Convert CSV to list of dictionaries"""
    return read_csv(filepath)
