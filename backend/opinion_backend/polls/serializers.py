from rest_framework import serializers
from .models import Question, Choice

class QuestionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Question
        fields = ('id','question_key', 'question_text')

class ChoiceSerializer(serializers.ModelSerializer):
    class Meta: 
        model = Choice
        fields = ('id', 'q_key', 'choice_text', 'votes')