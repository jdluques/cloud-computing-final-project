import requests

def get_currency_by_tenant(tenant_id):
    try:
        country_name = tenant_id.capitalize()
        url = f"https://restcountries.com/v3.1/name/{country_name}"
        response = requests.get(url, timeout=5)
        response.raise_for_status()
        
        data = response.json()
        currencies = data[0].get("currencies", {})
        
        # Obtener el primer código de moneda encontrado
        currency_code = list(currencies.keys())[0] if currencies else "USD"
        return currency_code
    
    except Exception as e:
        print(f"[get_currency_by_tenant] Could not get currency for {tenant_id}: {e}")
        return "USD"
