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

@api_view(['GET'])
def question_list(request):
    if request.method == 'GET':
        questions = Question.objects.all()
        serializer = QuestionSerializer(questions, many=True)
        return Response(serializer.data)

    else:
        return Response(status=status.HTTP_404_NOT_FOUND)

@api_view(['POST'])
def create_question(request):
    if request.method == 'POST':
        data = JSONParser().parse(request)
        serializer = QuestionSerializer(data=data)
        if serializer.is_valid():
            
            new_question = Question.objects.create(question_text = serializer.data.get("question_text"), question_key = generate_key())
            serializer = QuestionSerializer(new_question)
            return JsonResponse(serializer.data, status=status.HTTP_201_CREATED)
        return JsonResponse(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
def create_choice(request):
    if request.method == 'POST':
        data = JSONParser().parse(request)
        serializer = ChoiceSerializer(data=data)

        if serializer.is_valid():
            #take question data and find question that matches its q_key

            question = Question.objects.get(question_key=serializer.data.get("q_key"))

            #add a new choice to the question with the choice text

            new_choice = question.choice_set.create(choice_text=serializer.data.get("choice_text"))
            new_choice.save()

            return JsonResponse(serializer.data, status=status.HTTP_201_CREATED)
        return JsonResponse(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
def get_choices(request, key):
    if request.method == 'GET':
        question = get_object_or_404(Question, question_key=key)
        choices = question.choice_set.all()
        serializer = ChoiceSerializer(choices, many=True)
        return Response(serializer.data)

    else:
        return Response(status=status.HTTP_404_NOT_FOUND)

@api_view(['GET'])
def question_detail(request, key):
    if request.method == 'GET':
        question = get_object_or_404(Question, question_key=key)
        serializer = QuestionSerializer(question)
        return Response(serializer.data)

    else:
        return Response(status=status.HTTP_404_NOT_FOUND)

@api_view(['GET'])
def vote(request, key, c_id):
    question = get_object_or_404(Question, question_key=key)
    try:
        selected_choice = question.choice_set.get(pk=c_id)
    except (KeyError, Choice.DoesNotExist):
        return Response(status=status.HTTP_404_NOT_FOUND)
    
    selected_choice.votes += 1
    selected_choice.save()
    return Response(status=status.HTTP_202_ACCEPTED)

def generate_key():

    valid = False;    

    while valid == False:
        key = ""
        chars = string.ascii_letters + string.digits
        for i in range(10):
            key=key+random.choice(chars)
        try:
            question = Question.objects.get(question_key=key)
        except Question.DoesNotExist:
            return key


