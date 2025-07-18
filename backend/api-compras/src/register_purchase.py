import json
import uuid
from db.purchases_queries import register_purchase
from utils.validate_register import validate_body
from utils.token_handler import AuthMiddleware

# CORS headers globales
cors_headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "*",
    "Access-Control-Allow-Methods": "*"
}

def lambda_handler(event, context):
    try:
        # Extraer y validar token JWT
        auth_header = event['headers'].get('Authorization')
        decoded = AuthMiddleware.validate_token(auth_header)

        tenant_id = decoded["tenantId"]
        user_id = decoded["user_id"]

        # Parsear y validar el body
        body = json.loads(event['body'])
        products = body.get('products')
        total_price = body.get('totalPrice')

        validate_body(products, total_price)

        # Generar ID de compra
        purchase_id = str(uuid.uuid4())

        # Registrar la compra en DynamoDB
        register_purchase(
            tenant_id=tenant_id,
            user_id=user_id,
            purchase_id=purchase_id,
            products=products,
            total_price=total_price
        )

        # Éxito
        return {
            "statusCode": 200,
            "headers": cors_headers,
            "body": json.dumps({
                "message": "Purchase registered successfully",
                "purchaseId": purchase_id
            }),
        }

    except Exception as e:
        return {
            "statusCode": 500,
            "headers": cors_headers,
            "body": json.dumps({
                "message": "Failed to register purchase",
                "error": str(e)
            }),
        }
