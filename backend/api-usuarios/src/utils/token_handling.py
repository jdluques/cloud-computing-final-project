import os
import datetime
import jwt

JWT_SECRET = os.getenv('JWT_SECRET')
TOKEN_EXPIRY = int(os.getenv('TOKEN_EXPIRY'))

def generate_token(tenant_id, email, user_id):
    return jwt.encode(
        {
            "tenantId": tenant_id,
            "email": email,
            "user_id": user_id,
            "exp": datetime.datetime.utcnow() + datetime.timedelta(seconds=TOKEN_EXPIRY)
        },
        JWT_SECRET,
        algorithm="HS256"
    )

def decode_token(token):
    return jwt.decode(token, JWT_SECRET, algorithms=["HS256"])
