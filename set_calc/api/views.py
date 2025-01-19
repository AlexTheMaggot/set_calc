import json
from django.shortcuts import render
from django.http import HttpResponseForbidden, JsonResponse
from django.views.decorators.csrf import csrf_exempt
from .api_methods import *

methods = {
    'AuthCheck': auth_check,
    'Auth': auth,
    'LangCheck': lang_check,
    'Logout': logout,
}


@csrf_exempt
def index(request):
    if request.method == 'POST':
        request_data = json.loads(request.body)
        method = request_data['method']
        if method in methods.keys():
            run = methods[request_data['method']]
            return run(request, request_data)
        else:
            return make_error(request_data['id'], 1002)
    else:
        return HttpResponseForbidden()
