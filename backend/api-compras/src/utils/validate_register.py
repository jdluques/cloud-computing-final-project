def validate_body(tenant_id, user_id, products, totalPrice):
    if not tenant_id:
        raise ValueError("missing tenant_id")
    
    if len(products) == 0:
        raise ValueError("products must contain at least one item")
    
    if totalPrice <= 0:
        raise ValueError("totalPrice must be greater than 0")