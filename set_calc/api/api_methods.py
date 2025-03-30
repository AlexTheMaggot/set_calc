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
    customer = Customer.objects.get(name=request_data['params']['customer'])
    calculation = Calculation.objects.create(user=user, customer=customer)
    calculation.save()
    return make_success(request_data['id'])


@auth_required
def calculation_get(request, request_data):
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


def calculation_update(request, request_data):
    calculation = Calculation.objects.get(id=request_data['params']['id'])
    if 'manager' in request_data['params'].keys():
        manager = User.objects.get(username=request_data['params']['manager'])
        calculation.user = manager
    calculation.save()
    return make_success(request_data['id'])


@auth_required
def user_get(request, request_data):
    if 'params' in request_data and 'username' in request_data['params']:
        users = User.objects.filter(username__icontains=request_data['params']['username'])
    else:
        users = User.objects.all()
    result = []
    for user in users:
        result.append({
            'id': user.id,
            'username': user.username,
        })
    return make_success(request_data['id'], result)


@auth_required
def customer_get(request, request_data):
    customers = Customer.objects.all()
    result = []
    for customer in customers:
        item = {
            'id': customer.id,
            'name': customer.name,
        }
        result.append(item)
    return make_success(request_data['id'], result)


@auth_required
def customer_add(request, request_data):
    customer = Customer.objects.create(name=request_data['params']['name'])
    customer.save()
    return make_success(request_data['id'])


def customer_update(request, request_data):
    customer = Customer.objects.get(id=request_data['params']['id'])
    if 'name' in request_data['params'].keys():
        customer.name = request_data['params']['name']
    customer.save()
    return make_success(request_data['id'])


@auth_required
def customer_delete(request, request_data):
    customer = Customer.objects.get(id=request_data['params']['id'])
    customer.delete()
    return make_success(request_data['id'])
