import re
from utils.iso_departaments import VALID_DEPARTAMENTS

def validate_input(tenant_id, email, password, gender, address, document_type, document_number):
    if not tenant_id:
        raise ValueError("missing department (tenantId)")
    if tenant_id not in VALID_DEPARTAMENTS:
        raise ValueError(f"Invalid department. Department not found")

    if not email:
        raise ValueError("missing email")
    if len(email) > 254:
        raise ValueError("email too long (max 254 characters)")
    email_regex = r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'
    if not re.match(email_regex, email):
        raise ValueError("invalid email format")

    if not password:
        raise ValueError("missing password")
    if len(password) < 8:
        raise ValueError("password must be at least 8 characters long")

    if not gender:
        raise ValueError("missing gender")
    if gender not in ['Masculino', 'Femenino']:
        raise ValueError("gender must be 'Masculino' or 'Femenino'")

    if not address:
        raise ValueError("missing address")
    if len(address) > 100:
        raise ValueError("address too long (max 100 characters)")

    valid_doc_types = [
        "DNI", "Cédula", "INE", "RG", "CPF", "Personalausweis",
        "Aadhaar", "NIN", "My Number", "Resident Card", "Otro"
    ]
    if not document_type:
        raise ValueError("missing document_type")
    if document_type not in valid_doc_types:
        raise ValueError(f"document_type must be one of: {', '.join(valid_doc_types)}")

    if not document_number:
        raise ValueError("missing document_number")
    if not re.fullmatch(r'\d{8,12}', document_number):
        raise ValueError("document_number must be 8 to 12 digits long and only digits")
