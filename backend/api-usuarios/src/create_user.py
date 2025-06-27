import json
import uuid

from utils.password_handler import hash_password
from utils.validate_register import validate_input
from db.users_queries import register_user

def lambda_handler(event, context):
    try:
        body = json.loads(event['body'])
        email = body.get('email')
        password = body.get('password')
        gender = body.get('gender')
        address = body.get('address')
        dni = body.get('dni')

        validate_input(email, password, gender, address, dni)

        hashed_password = hash_password(password)
        tenant_id = str(uuid.uuid4())

        register_user(tenant_id, email, hashed_password, gender, address, dni)

        return {
            "statusCode": 200,
            'body': json.dumps({'message': 'User created successfully', 'tenantId': tenant_id}),
        }
    
    except Exception as e:
        return {
            'statusCode': 500,
            'body': json.dumps({'message': 'Failed to create user', 'error': str(e)}),
        }
