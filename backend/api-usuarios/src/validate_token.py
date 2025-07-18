import json
import jwt
from datetime import datetime
from utils.token_handling import decode_token

# Encabezados CORS para permitir acceso desde el frontend
cors_headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "*",
    "Access-Control-Allow-Methods": "*"
}

def lambda_handler(event, context):
    body = json.loads(event['body'])
    token = body.get('token')

    if not token:
        return {
            "statusCode": 400,
            "headers": cors_headers,
            "body": json.dumps({"error": "Token is required"})
        }

    try:
        decoded_token = decode_token(token)
        exp_timestamp = decoded_token.get("exp")
        exp_datetime = datetime.utcfromtimestamp(exp_timestamp).isoformat() + "Z"

        return {
            "statusCode": 200,
            "headers": cors_headers,
            "body": json.dumps({
                "message": "Token is valid",
                "data": {
                    "tenantId": decoded_token.get("tenantId"),
                    "email": decoded_token.get("email"),
                    "userId": decoded_token.get("user_id"),
                    "exp": exp_datetime
                }
            })
        }

    except jwt.ExpiredSignatureError:
        return {
            "statusCode": 401,
            "headers": cors_headers,
            "body": json.dumps({"error": "Token has expired"})
        }
    except jwt.InvalidTokenError:
        return {
            "statusCode": 401,
            "headers": cors_headers,
            "body": json.dumps({"error": "Invalid token"})
        }
