#Serializer code to help with data repersentation

from django.contrib.auth.models import User, Group
from rest_framework import serializers
from djangocrud.api.models import Movie

class MovieSerializer(serializers.ModelSerializer):
    class Meta:
        model = Movie
        fields = ['id','title', 'desc', 'year']