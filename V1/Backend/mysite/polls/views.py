from django.shortcuts import render

#Got to part 3 of the tutorial avaliable at https://docs.djangoproject.com/en/3.1/intro/tutorial03/

from django.http import HttpResponse

def index(request):
    return HttpResponse("Hello Yash!")

def detail(request, question_id):
    return HttpResponse("Your looking at question %s." % question_id)

def results(request, question_id):
    response = "You're looking at the results of question %s."
    return HttpResponse(response % question_id)

def vote(request, question_id):
    return HttpResponse("You're voting on question %s." % question_id)