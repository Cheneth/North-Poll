from django.shortcuts import render, get_object_or_404
from django.http import HttpResponse, JsonResponse
import string
import random

from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.renderers import JSONRenderer
from rest_framework.parsers import JSONParser
from polls.models import Question
from polls.serializers import QuestionSerializer, ChoiceSerializer
# Create your views here.

@api_view(['GET'])#polls/
def question_list(request): 
    if request.method == 'GET':
        questions = Question.objects.all()
        serializer = QuestionSerializer(questions, many=True)#serialize many questions into one json object
        return Response(serializer.data)

    else:
        return Response(status=status.HTTP_404_NOT_FOUND)

@api_view(['POST'])#create_question/
def create_question(request):
    if request.method == 'POST':
        data = JSONParser().parse(request) #take in json
        serializer = QuestionSerializer(data=data) #serialize the json into python object
        if serializer.is_valid(): #if the python object is valid
            new_question = Question.objects.create(question_text = serializer.data.get("question_text"), question_key = generate_key())
            serializer = QuestionSerializer(new_question) #create the new question to return
            return JsonResponse(serializer.data, status=status.HTTP_201_CREATED)
        return JsonResponse(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])#create_choice/
def create_choice(request):
    if request.method == 'POST':
        data = JSONParser().parse(request) #take in json choice
        serializer = ChoiceSerializer(data=data)

        if serializer.is_valid():
            #take question data and find question that matches its q_key

            question = Question.objects.get(question_key=serializer.data.get("q_key"))

            #add a new choice to the question with the choice text

            new_choice = question.choice_set.create(choice_text=serializer.data.get("choice_text"))
            new_choice.save()

            return JsonResponse(serializer.data, status=status.HTTP_201_CREATED)
        return JsonResponse(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])#get_choices/<key>
def get_choices(request, key):
    if request.method == 'GET':
        question = get_object_or_404(Question, question_key=key)
        choices = question.choice_set.all()
        serializer = ChoiceSerializer(choices, many=True) #convert the python choices into json
        return Response(serializer.data) #return choice options

    else:
        return Response(status=status.HTTP_404_NOT_FOUND)

@api_view(['GET'])#polls/<key>
def question_detail(request, key):
    if request.method == 'GET':
        question = get_object_or_404(Question, question_key=key)
        serializer = QuestionSerializer(question) #turn question into json 
        return Response(serializer.data)

    else:
        return Response(status=status.HTTP_404_NOT_FOUND)

@api_view(['GET'])#<key>/<c_id>/
def vote(request, key, c_id):
    question = get_object_or_404(Question, question_key=key)
    try: #try to find the choice associated with the c_id
        selected_choice = question.choice_set.get(pk=c_id)
    except (KeyError, Choice.DoesNotExist): #if c_id can't be found
        return Response(status=status.HTTP_404_NOT_FOUND)
    
    selected_choice.votes += 1 
    selected_choice.save()
    return Response(status=status.HTTP_202_ACCEPTED)

def generate_key():

    valid = False;  #flag  

    while valid == False: #while a valid key hasn't been generated
        key = ""
        chars = string.ascii_letters + string.digits #random key can be made of all letters and numbers
        for i in range(10): #create a 10 char long random string
            key=key+random.choice(chars)
        try:
            question = Question.objects.get(question_key=key)
        except Question.DoesNotExist: #if an existing question cannot be found, this key is available and will be returned
            return key


