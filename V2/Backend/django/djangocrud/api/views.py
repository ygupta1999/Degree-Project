from django.contrib.auth.models import User, Group
from rest_framework import viewsets
from djangocrud.api.serializers import MovieSerializer
from djangocrud.api.models import Movie


#Grouping multiple views into viewSet. Helps keep code concise
class MovieViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows users to be viewed or edited.
    """
    queryset = Movie.objects.all()
    serializer_class = MovieSerializer
