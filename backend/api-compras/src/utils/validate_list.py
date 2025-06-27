def validate_body(tenant_id, user_id, limit):
    if not tenant_id:
        raise ValueError("missing tenant_id")
    
    if limit <= 0:
        raise ValueError("limit must be greater than 0")