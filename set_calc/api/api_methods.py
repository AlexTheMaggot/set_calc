from typing import Any
from django.http import JsonResponse
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.models import User


ERRORS = {
    1001: 'AuthFail',
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


def auth(request, request_data):
    user = authenticate(username=request_data['params']['login'], password=request_data['params']['password'])
    if user:
        login(request, user)
        user.userprofile.lang = request_data['params']['lang']
        user.save()
        print(user.userprofile.lang)
        return make_success(request_data['id'], True)
    else:
        return make_error(request_data['id'], 1001)


def lang_check(request, request_data):
    return make_success(request_data['id'], request.user.userprofile.lang)