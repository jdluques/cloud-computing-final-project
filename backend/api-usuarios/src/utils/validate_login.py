import re

from password_handler import verify_password

def validate_input(tenant_id, email, password):
    if not tenant_id:
        raise ValueError("missing tenant_id")
    
    if not email:
        raise ValueError("missing email")
    
    if not password:
        raise ValueError("missing password")
    
def validate_credentials(user, password):
    if not user or not verify_password(password, user['password']):
        raise PermissionError("Invalid username or password.")