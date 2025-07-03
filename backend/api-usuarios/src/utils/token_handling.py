import os
import datetime
from datetime import timedelta
import jwt  # PyJWT se importa como jwt

JWT_SECRET = os.getenv('JWT_SECRET')
TOKEN_EXPIRY = int(os.getenv('TOKEN_EXPIRY'))

def generate_token(tenant_id, email):
    return jwt.encode(
            {
                "tenantId": tenant_id,
                "email": email,
                "exp": datetime.utcnow() + timedelta(seconds=TOKEN_EXPIRY)
            },
            JWT_SECRET,
            algorithm="HS256"
        )

def decode_token(token):
    return jwt.decode(token, JWT_SECRET, algorithms=["HS256"])
