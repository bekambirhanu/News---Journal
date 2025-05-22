from django.shortcuts import render
from rest_framework import generics
from .serializers import AuthorSerializers, ArticleSerializer, UserSerializer
from rest_framework.permissions import IsAuthenticated, AllowAny, IsAdminUser, BasePermission
from .models import Author, Article

class IsAuthor(BasePermission):
    def has_permission(self, request, view):
        # Check if the user is authenticated and has an associated Author record
        return request.user.is_authenticated and Author.objects.filter(email=request.user.email).exists()

# Create your views here.

class UserCreateView(generics.CreateAPIView):
    serializer_class = UserSerializer
    permission_classes = [AllowAny]


class AuthorListView(generics.ListAPIView):
    queryset = Author.objects.all()
    serializer_class = AuthorSerializers
    permission_classes = [AllowAny]


class ArticleCreateView(generics.CreateAPIView):
    serializer_class = ArticleSerializer
    permission_classes = [IsAuthor]

    def perform_create(self, serializer):
        # Get the author instance based on the user's email
        author = Author.objects.get(email=self.request.user.email)
        serializer.save(author=author)


class ArticleListView(generics.ListAPIView):
    queryset = Article.objects.all()
    serializer_class = ArticleSerializer
    permission_classes = [AllowAny]
