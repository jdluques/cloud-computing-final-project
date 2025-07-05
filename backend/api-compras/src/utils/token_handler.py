import os
import jwt

JWT_SECRET = os.getenv('JWT_SECRET')

class AuthMiddleware:
    @staticmethod
    def validate_token(auth_header):
        if not auth_header:
            raise Exception("Authorization token is required.")

        if auth_header.startswith("Bearer "):
            token = auth_header.replace("Bearer ", "")
        else:
            token = auth_header

        decoded = jwt.decode(token, JWT_SECRET, algorithms=["HS256"])

        if "tenantId" not in decoded or "user_id" not in decoded:
            raise Exception("Invalid token payload: missing tenantId or user_id")

        return {
            "tenantId": decoded["tenantId"],
            "email": decoded["email"],
            "user_id": decoded["user_id"]
        }
