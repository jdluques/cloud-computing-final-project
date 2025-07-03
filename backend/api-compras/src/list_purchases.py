import json

from db.purchases_queries import get_purchases
from utils.validate_list import validate_body
from utils.authMiddleware import validate_token

def lambda_handler(event, context):
    try:
        body = json.loads(event['body'])
        token = validate_token(event['headers'].get('Authorization'))
        tenant_id = token['tenantId']
        limit = body.get('limit', 10)
        last_evaluated_key = body.get('lastEvaluatedKey')

        validate_body(tenant_id, limit, last_evaluated_key)
        
        purchases, new_last_evaluated_key = get_purchases(tenant_id, limit)

        return {
            "statusCode": 200,
            "body": json.dumps({
                "purchases": purchases,
                "lastEvaluatedKey": new_last_evaluated_key,
                'message': 'Purchases listed successfully',
            })
        }
    
    except Exception as e:
        return {
            'statusCode': 500,
            'body': json.dumps({'message': 'Failed to list purchase', 'error': str(e)}),
        }
