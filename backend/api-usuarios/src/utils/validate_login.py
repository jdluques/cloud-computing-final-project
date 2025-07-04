import re

from utils.password_handler import verify_password


def validate_input(email, password):
    if not email:
        raise ValueError("missing email")
    if not password:
        raise ValueError("missing password")
    
def validate_credentials(user, password):
    if not user or not verify_password(password, user['password']):
        raise PermissionError("Invalid username or password.")
