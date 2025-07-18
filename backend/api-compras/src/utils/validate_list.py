def validate_limit(limit):
    if limit is None or limit <= 0:
        raise ValueError("limit must be greater than 0")
