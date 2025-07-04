import os
import datetime
import jwt  # Asegúrate de tener instalado PyJWT (NO usar `jwt` 1.4.0)

JWT_SECRET = os.getenv('JWT_SECRET')
TOKEN_EXPIRY = int(os.getenv('TOKEN_EXPIRY'))  # en segundos

def generate_token(tenant_id, email):
    return jwt.encode(
        {
            "tenantId": tenant_id,
            "email": email,
            "exp": datetime.datetime.utcnow() + datetime.timedelta(seconds=TOKEN_EXPIRY)
        },
        JWT_SECRET,
        algorithm="HS256"
    )

def decode_token(token):
    return jwt.decode(token, JWT_SECRET, algorithms=["HS256"])