import boto3
import datetime
import os

dynamodb = boto3.resource('dynamodb')
table = dynamodb.Table(f"{os.getenv('STAGE', 'dev')}-t-users")

def get_user_by_email(tenant_id, email):
    try:
        response = table.query(
            KeyConditionExpression = boto3.dynamodb.conditions.Key('tenant_id').eq(tenant_id) & 
                                     boto3.dynamodb.conditions.Key('email').eq(email)
        )

        return response.get('Item')
        
    except Exception as e:
        print(f"An error occurred: {e}")

def register_user(tenant_id, email, hashed_password, gender, address, dni):
    try:
        table.put_item(
            Item={
                'tenant_id': tenant_id,
                'email': email,
                'password': hashed_password,
                'gender': gender,
                'address': address,
                'dni': dni,
                'createdAt': datetime.datetime.now().isoformat(),
                'updatedAt': datetime.datetime.now().isoformat()
            },
            ConditionExpression='attribute_not_exists(email)'
        )
    except Exception as e:
        print(f"Error occurred: {e}")

def get_user_by_email_global(email):
    try:
        response = table.query(
            IndexName='EmailIndex',  # Nombre del GSI
            KeyConditionExpression=boto3.dynamodb.conditions.Key('email').eq(email)
        )
        items = response.get('Items')
        if items:
            return items[0]  # El email es único globalmente
        return None
    except Exception as e:
        print(f"An error occurred: {e}")
        return None