import boto3
from boto3.dynamodb.conditions import Key
import datetime

dynamodb = boto3.resource('dynamodb')
table = dynamodb.Table('Purchases')

def get_purchases(tenant_id, limit=None, last_evaluated_key=None):
    query_params = {
        'KeyConditionExpression': Key('tenantId').eq(tenant_id),
        'Limit': limit,
    }
    if last_evaluated_key:
        query_params['ExclusiveStartKey'] = last_evaluated_key

    response = table.query(**query_params)

    return {
        'Purchases': response.get('Items', []),
        'LastEvaluatedKey': response.get('LastEvaluatedKey')
    }

def register_purchase(tenant_id, purchase_id, products, total_price):
    try:
        table.put_item(
            Item={
                'tenantId': tenant_id,
                'purchaseId': purchase_id,
                'products': products,
                'totalPrice': total_price,
                "purchaseDate": datetime.now()
            }
        )
    except Exception as e:
        print(f"Error occurred: {e}")
