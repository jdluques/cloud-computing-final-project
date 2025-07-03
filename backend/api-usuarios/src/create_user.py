import json
import uuid


from utils.password_handler import hash_password
from utils.validate_register import validate_input
from db.users_queries import register_user, get_user_by_email

def lambda_handler(event, context):
    try:
        body = json.loads(event['body'])
        tenant_id = body.get('country')
        email = body.get('email')
        password = body.get('password')
        gender = body.get('gender')
        address = body.get('address')
        dni = body.get('dni')

        validate_input(tenant_id, email, password, gender, address, dni)

        # Verificar unicidad global del email usando el GSI
        if get_user_by_email(tenant_id, email):
            return {
                "statusCode": 400,
                'body': json.dumps({'message': 'Email already exists'}),
            }

        hashed_password = hash_password(password)

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
