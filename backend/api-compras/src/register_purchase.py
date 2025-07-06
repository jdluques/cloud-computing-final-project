import json
import uuid
from db.purchases_queries import register_purchase
from utils.validate_register import validate_body
from utils.token_handler import AuthMiddleware
from utils.currency_by_country import get_currency_by_country

def lambda_handler(event, context):
    try:
        # Validar y decodificar token JWT
        auth_header = event['headers'].get('Authorization')
        decoded = AuthMiddleware.validate_token(auth_header)

        tenant_id = decoded["tenantId"]
        user_id = decoded["user_id"]

        # Extraer body
        body = json.loads(event['body'])
        products = body.get('products')
        total_price = body.get('totalPrice')

        # Validar datos del body
        validate_body(products, total_price)

        # Generar purchase_id
        purchase_id = str(uuid.uuid4())

        # Obtener currency
        currency = get_currency_by_country(tenant_id)

        # Registrar compra en DynamoDB
        register_purchase(tenant_id, user_id, purchase_id, products, total_price, currency)

        return {
            "statusCode": 200,
            'body': json.dumps({
                'message': 'Purchase registered successfully',
                'purchaseId': purchase_id,
                'currency': currency
            }),
        }

    except Exception as e:
        return {
            'statusCode': 500,
            'body': json.dumps({'message': 'Failed to register purchase', 'error': str(e)}),
        }
