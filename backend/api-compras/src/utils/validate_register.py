def validate_body(products, total_price):
    if not isinstance(products, list) or len(products) == 0:
        raise ValueError("products must be a non-empty list")

    for i, product in enumerate(products):
        if not isinstance(product, dict):
            raise ValueError(f"Each product must be a JSON object (error at index {i})")

        product_id = product.get("product_id")
        quantity = product.get("quantity")

        if not product_id or not isinstance(product_id, str):
            raise ValueError(f"product_id must be a non-empty string (error at index {i})")

        if quantity is None or not isinstance(quantity, (int, float)) or quantity <= 0:
            raise ValueError(f"quantity must be a positive number (error at index {i})")

    if total_price is None or not isinstance(total_price, (int, float)) or total_price <= 0:
        raise ValueError("totalPrice must be a positive number")
