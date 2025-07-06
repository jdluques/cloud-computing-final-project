import json
import jwt
from datetime import datetime
from utils.token_handling import decode_token

def lambda_handler(event, context):
    body = json.loads(event['body'])
    token = body.get('token')

    if not token:
        return {"statusCode": 400, "body": json.dumps({"error": "Token is required"})}

    try:
        decoded_token = decode_token(token)
        exp_timestamp = decoded_token.get("exp")
        exp_datetime = datetime.utcfromtimestamp(exp_timestamp).isoformat() + "Z"

        return {
            "statusCode": 200,
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
        return {"statusCode": 401, "body": json.dumps({"error": "Token has expired"})}
    except jwt.InvalidTokenError:
        return {"statusCode": 401, "body": json.dumps({"error": "Invalid token"})}
