from typing import Any
from django.http import JsonResponse


ERRORS = {
    1002: 'WrongMethod',
}


def make_success(api_id, result: Any = 'Success'):
    response = {
        'jsonrpc': '2.0',
        'id': api_id,
        'result': result,
    }
    return JsonResponse(response)


def make_error(api_id, error_code):
    response = {
        'jsonrpc': '2.0',
        'id': api_id,
        'error': {'code': error_code, 'message': ERRORS[error_code]},
    }
    return JsonResponse(response)


def auth_check(request, request_data):
    return make_success(request_data['id'], request.user.is_authenticated)
