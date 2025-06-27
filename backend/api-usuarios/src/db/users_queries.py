import boto3
import datetime

dynamodb = boto3.resource('dynamodb')
table = dynamodb.Table('Users')

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
                'tenantId': tenant_id,
                'email': email,
                'password': hashed_password,
                'gender': gender,
                'address': address,
                'dni': dni,
                'createdAt': datetime.now(),
                'updatedAt': datetime.now()
            },
            ConditionExpression='attribute_not_exists(email)'
        )
    except Exception as e:
        print(f"Error occurred: {e}")
