import jwt
import os

def validate_token(auth_header):
    if not auth_header:
        raise Exception("Authorization token is required.")
    token = auth_header.replace("Bearer ", "")
    secret = os.environ.get("JWT_SECRET")
    if not secret:
        raise Exception("JWT_SECRET environment variable not set.")
    return jwt.decode(token, secret, algorithms=["HS256"]) 