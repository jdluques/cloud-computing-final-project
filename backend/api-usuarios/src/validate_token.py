import json
import jwt

from utils.token_handling import decode_token

def lambda_handler(event, context):
    body = json.loads(event['body'])
    token = body.get('token')

    if not token:
        return {"statusCode": 400, "body": json.dumps({"error": "Token is required"})}

    try:
        decoded_token = decode_token(token)
        return {"statusCode": 200, "body": json.dumps({"message": "Token is valid", "data": decoded_token})}
    except jwt.ExpiredSignatureError:
        return {"statusCode": 401, "body": json.dumps({"error": "Token has expired"})}
    except jwt.InvalidTokenError:
        return {"statusCode": 401, "body": json.dumps({"error": "Invalid token"})}
    
