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
        document_type = body.get('document_type')
        document_number = body.get('document_number')

        # Validar entrada completa
        validate_input(tenant_id, email, password, gender, address, document_type, document_number)

        # Generar user_id como UUID
        user_id = str(uuid.uuid4())

        # Verificar unicidad global por email con GSI
        if get_user_by_email(tenant_id, email):
            return {
                "statusCode": 400,
                'body': json.dumps({'message': 'Email already exists'}),
            }

        hashed_password = hash_password(password)

        # Registrar nuevo usuario
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
            'body': json.dumps({
                'message': 'User created successfully',
                'tenantId': tenant_id,
                'userId': user_id
            }),
        }

    except Exception as e:
        return {
            'statusCode': 500,
            'body': json.dumps({'message': 'Failed to create user', 'error': str(e)}),
        }
