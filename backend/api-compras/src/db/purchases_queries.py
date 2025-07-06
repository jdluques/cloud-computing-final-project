import boto3
from boto3.dynamodb.conditions import Key, Attr
from datetime import datetime
from decimal import Decimal
import os

dynamodb = boto3.resource('dynamodb')
table_name = f"{os.getenv('STAGE', 'dev')}-t-purchases"
table = dynamodb.Table(table_name)

def get_purchases(tenant_id, user_id, limit=None, last_evaluated_key=None):
    query_params = {
        'KeyConditionExpression': Key('tenant_id').eq(tenant_id),
        'FilterExpression': Attr('user_id').eq(user_id),
        'Limit': limit
    }

    if last_evaluated_key:
        query_params['ExclusiveStartKey'] = last_evaluated_key

    response = table.query(**query_params)
    return response.get('Items', []), response.get('LastEvaluatedKey')

def register_purchase(tenant_id, user_id, purchase_id, products, total_price):
    try:
        # Convertir total_price a Decimal
        total_price = Decimal(str(total_price))

        # Convertir quantities a Decimal
        for p in products:
            if isinstance(p.get('quantity'), float) or isinstance(p.get('quantity'), int):
                p['quantity'] = Decimal(str(p['quantity']))

        table.put_item(
            Item={
                'tenant_id': tenant_id,    # Partition Key
                'purchase_id': purchase_id,# Sort Key
                'user_id': user_id,
                'products': products,
                'total_price': total_price,
                'purchase_date': datetime.utcnow().isoformat()
            },
            ConditionExpression='attribute_not_exists(purchase_id)'
        )
    except Exception as e:
        print(f"Error occurred while saving purchase: {e}")
        raise
