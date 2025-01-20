from rest_framework import serializers

from examapi.models import Question ,Users , Admin , Result

class QuestionSerilizer(serializers.ModelSerializer):

    class Meta:
            model=Question
            fields='__all__'

class UserSerilizer(serializers.ModelSerializer):
      
      class Meta:
            model = Users
            fields="__all__"

class AdminSerilizer(serializers.ModelSerializer):

      class Meta:
            model= Admin
            fields="__all__"

class ResultSerilizer(serializers.ModelSerializer):

      class Meta:
            model= Result
            fields="__all__"                        


