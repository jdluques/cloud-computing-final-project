import re

def validate_input(tenant_id, email, password, gender, address, dni):
    if not tenant_id:
        raise ValueError("missing country (tenantId)")
    if not email:
        raise ValueError("missing email")
    
    email_regex = r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'
    if not re.match(email_regex, email):
        raise ValueError("invalid email format")
    
    if not password:
        raise ValueError("missing password")
    
    if not gender:
        raise ValueError("missing gender")
    
    if not address:
        raise ValueError("missing address")
    
    if not dni:
        raise ValueError("missing dni")