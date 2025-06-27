import json
import uuid

from db.purchases_queries import register_purchase
from utils.validate_register import validate_body

def lambda_handler(event, context):
    try:
        body = json.loads(event['body'])
        path_params = event.get('pathParameters')

        tenant_id = path_params.get('tenantId')
        products = body.get('products')
        total_price = body.get('totalPrice')

        validate_body(tenant_id, products, total_price)

        purchase_id = str(uuid.uuid4())
        
        register_purchase(tenant_id, purchase_id, products, total_price)

        return {
            "statusCode": 200,
            'body': json.dumps({'message': 'Purchases registered successfully', 'purchaseId': purchase_id}),
        }
    except Exception as e:
        return {
            'statusCode': 500,
            'body': json.dumps({'message': 'Failed to register purchase', 'error': str(e)}),
        }
