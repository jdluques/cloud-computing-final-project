import boto3
import datetime
import os
from boto3.dynamodb.conditions import Key

dynamodb = boto3.resource('dynamodb')
table = dynamodb.Table(f"{os.getenv('STAGE', 'dev')}-t-users")

def get_user_by_email(tenant_id, email):
    """
    Busca un usuario en un tenant específico por email
    (ya no usada para login global, pero útil si quisieras filtrar por tenant).
    """
    try:
        response = table.query(
            KeyConditionExpression=Key('tenant_id').eq(tenant_id) & Key('email').eq(email)
        )
        items = response.get('Items')
        if items:
            return items[0]
        return None
    except Exception as e:
        print(f"An error occurred: {e}")

def get_user_by_email_global(email):
    """
    Busca un usuario globalmente por email usando el GSI EmailIndex
    (para login sin importar tenant).
    """
    try:
        response = table.query(
            IndexName='EmailIndex',
            KeyConditionExpression=Key('email').eq(email)
        )
        items = response.get('Items')
        if items:
            return items[0]
        return None
    except Exception as e:
        print(f"An error occurred: {e}")
        return None

def register_user(tenant_id, user_id, email, hashed_password, gender, address, document_type, document_number):
    try:
        table.put_item(
            Item={
                'tenant_id': tenant_id,
                'user_id': user_id,
                'email': email,
                'password': hashed_password,
                'gender': gender,
                'address': address,
                'document_type': document_type,
                'document_number': document_number,
                'createdAt': datetime.datetime.utcnow().isoformat(),
                'updatedAt': datetime.datetime.utcnow().isoformat()
            },
            ConditionExpression='attribute_not_exists(user_id)'
        )
    except Exception as e:
        print(f"Error occurred: {e}")

