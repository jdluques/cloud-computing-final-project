import json
import uuid
from utils.password_handler import hash_password
from utils.validate_register import validate_input
from db.users_queries import register_user, get_user_by_email_global
from utils.iso_countries import VALID_COUNTRY_CODES 

# Encabezados CORS para permitir llamadas del frontend
cors_headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "*",
    "Access-Control-Allow-Methods": "*"
}

def lambda_handler(event, context):
    try:
        body = json.loads(event['body'])
        tenant_id = body.get('country')  
        email = body.get('email')
        password = body.get('password')
        gender = body.get('gender')
        address = body.get('address')
        document_type = body.get('document_type')
        document_number = body.get('document_number')

        # Validación completa de datos
        validate_input(
            tenant_id,
            email,
            password,
            gender,
            address,
            document_type,
            document_number
        )

        # Generar user_id único
        user_id = str(uuid.uuid4())

        if get_user_by_email_global(email):
            return {
                "statusCode": 400,
                "headers": cors_headers,
                'body': json.dumps({'message': 'Email already exists'}),
            }

        hashed_password = hash_password(password)

        # Registrar el nuevo usuario
        register_user(
            tenant_id=tenant_id,
            user_id=user_id,
            email=email,
            hashed_password=hashed_password,
            gender=gender,
            address=address,
            document_type=document_type,
            document_number=document_number
        )

        return {
            "statusCode": 200,
            "headers": cors_headers,
            'body': json.dumps({
                'message': 'User created successfully',
                'tenantId': tenant_id,
                'userId': user_id
            }),
        }

    except Exception as e:
        return {
            'statusCode': 500,
            "headers": cors_headers,
            'body': json.dumps({'message': 'Failed to create user', 'error': str(e)}),
        }
