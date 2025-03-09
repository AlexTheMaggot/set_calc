from typing import Any
from django.http import JsonResponse
from django.contrib.auth import authenticate, login
from django.contrib.auth import logout as logout_view
from django.contrib.auth.models import User
from .models import *


ERRORS = {
    1001: 'AuthFail',
    1002: 'WrongMethod',
}


def auth_required(func):
    def wrapper(request, request_data):
        if request.user.is_authenticated:
            return func(request, request_data)
        else:
            return make_error(request_data['id'], 1001)
    return wrapper


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


@auth_required
def lang_check(request, request_data):
    return make_success(request_data['id'], request.user.userprofile.lang)


@auth_required
def logout(request, request_data):
    logout_view(request)
    return make_success(request_data['id'])


@auth_required
def lang_change(request, request_data):
    user = request.user
    user.userprofile.lang = request_data['params']['lang']
    user.userprofile.save()
    return make_success(request_data['id'])


@auth_required
def profile_get(request, request_data):
    user = request.user
    data = {
        'username': user.username
    }
    return make_success(request_data['id'], data)


@auth_required
def calculation_add(request, request_data):
    user = request.user
    calculation = Calculation.objects.create(user=user)
    calculation.save()
    return make_success(request_data['id'])


@auth_required
def calculation_get_list(request, request_data):
    calculations = Calculation.objects.all()
    result = []
    for calculation in calculations:
        item = {
            'id': calculation.id,
            'user': {
                'id': calculation.user.id,
                'username': calculation.user.username,
            }
        }
        result.append(item)
    return make_success(request_data['id'], result)


@auth_required
def calculation_delete(request, request_data):
    calculation = Calculation.objects.get(id=request_data['params']['id'])
    calculation.delete()
    return make_success(request_data['id'])


@auth_required
def user_get(request, request_data):
    users = User.objects.all()
    result = []
    for user in users:
        result.append({
            'id': user.id,
            'username': user.username,
        })
    return make_success(request_data['id'], result)
