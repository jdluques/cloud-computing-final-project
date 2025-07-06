def validate_body(products, totalPrice):
    if not products or len(products) == 0:
        raise ValueError("products must contain at least one item")
    
    if totalPrice is None or totalPrice <= 0:
        raise ValueError("totalPrice must be greater than 0")
