import boto3
from boto3.dynamodb.conditions import Key, Attr
from datetime import datetime
from decimal import Decimal
import os

# DynamoDB setup
dynamodb = boto3.resource('dynamodb')
purchase_table_name = f"{os.getenv('STAGE', 'dev')}-t-purchases"
product_table_name = f"{os.getenv('STAGE', 'dev')}-t-products"

purchase_table = dynamodb.Table(purchase_table_name)
product_table = dynamodb.Table(product_table_name)

def get_purchases(tenant_id, user_id, limit=None, last_evaluated_key=None):
    query_params = {
        'KeyConditionExpression': Key('tenant_id').eq(tenant_id),
        'FilterExpression': Attr('user_id').eq(user_id),
        'Limit': limit
    }

    if last_evaluated_key:
        query_params['ExclusiveStartKey'] = last_evaluated_key

    response = purchase_table.query(**query_params)
    return response.get('Items', []), response.get('LastEvaluatedKey')

def validate_product_ids(tenant_id, products, user_id):
    for p in products:
        product_id = p.get('product_id')
        if not product_id:
            raise ValueError("Each product must include a product_id")
        
        response = product_table.get_item(
            Key={
                'tenant_id': tenant_id,
                'productId': product_id
            }
        )

        item = response.get('Item')
        if not item:
            raise ValueError(f"Product with ID {product_id} not found for tenant {tenant_id}")

        created_by = item.get("createdBy")
        if created_by is None:
            raise ValueError(f"Product {product_id} is missing 'createdBy' field")

        if str(created_by).strip() == str(user_id).strip():
            raise ValueError(f"User cannot purchase their own product (product_id: {product_id})")


def register_purchase(tenant_id, user_id, purchase_id, products, total_price):
    try:
        # Validar que los productos existen y no fueron creados por el mismo usuario
        validate_product_ids(tenant_id, products, user_id)

        # Convertir total_price a Decimal
        total_price = Decimal(str(total_price))

        # Convertir cantidades a Decimal
        for p in products:
            if isinstance(p.get('quantity'), float) or isinstance(p.get('quantity'), int):
                p['quantity'] = Decimal(str(p['quantity']))

        now = datetime.utcnow().isoformat()

        purchase_table.put_item(
            Item={
                'tenant_id': tenant_id,
                'purchase_id': purchase_id,
                'user_id': user_id,
                'products': products,
                'total_price': total_price,
                'purchase_date': now,
                'purchaseDate': now
            },
            ConditionExpression='attribute_not_exists(purchase_id)'
        )

    except Exception as e:
        print(f"Error occurred while saving purchase: {e}")
        raise


