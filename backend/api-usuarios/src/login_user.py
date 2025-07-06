import json

from utils.token_handling import generate_token
from utils.validate_login import validate_input, validate_credentials
from db.users_queries import get_user_by_email_global

def lambda_handler(event, context):
    try:
        body = json.loads(event['body'])
        email = body.get('email')
        password = body.get('password')

        validate_input(email, password)

        user = get_user_by_email_global(email)

        validate_credentials(user, password)

        # ➜ AHORA incluye user['user_id']
        token = generate_token(user['tenant_id'], email, user['user_id'])

        return {
            "statusCode": 200,
            "body": json.dumps({
                "token": token,
                "tenantId": user['tenant_id'],
                "userId": user['user_id'],
                "email": email
            })
        }

    except PermissionError as e:
        return {
            'statusCode': 401,
            'body': json.dumps({'error': str(e)}),
        }
    except Exception as e:
        return {
            'statusCode': 500,
            'body': json.dumps({'error': str(e)}),
        }
