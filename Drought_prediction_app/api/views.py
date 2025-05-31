from rest_framework import generics
from .serializers import AuthorSerializers, ArticleSerializer, UserSerializer
from rest_framework.permissions import IsAuthenticated, IsAdminUser, BasePermission, AllowAny
from .models import Author, Article
from rest_framework.views import APIView
from rest_framework.authentication import SessionAuthentication
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth import authenticate, login
from django.http import JsonResponse
from django.middleware.csrf import get_token
from django.views.decorators.csrf import ensure_csrf_cookie

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
    permission_classes = [IsAuthenticated]


class ArticleListCreateView(generics.ListCreateAPIView):
    queryset=Article.objects.all()
    serializer_class = ArticleSerializer
    permission_classes = [IsAuthor]
    

    def get_queryset(self):
         email = self.request.user.email
         author = Author.objects.get(email=email)
         return Article.objects.filter(author=author)
    

    def perform_create(self, serializer):
        # Get the author instance based on the user's email
        author = Author.objects.get(email=self.request.user.email)
        serializer.save(author=author)

class ArticleDeleteView(generics.RetrieveDestroyAPIView):
    queryset = Article.objects.all()
    serializer_class = ArticleSerializer
    permission_classes = [IsAuthor]
    lookup_field = 'id'

    def get_queryset(self):
         email = self.request.user.email
         author = Author.objects.get(email=email)
         return Article.objects.filter(author=author)

class ArticleListView(generics.ListAPIView):
    queryset = Article.objects.all()
    serializer_class = ArticleSerializer
    permission_classes = [IsAuthenticated]


class LoginView(APIView):
    def post(self, request):
        username = request.data.get('username')
        password = request.data.get('password')
        
        user = authenticate(request, username=username, password=password)
        
        if user is not None:
            login(request, user)  # This creates the session
            return Response({'status': 'success'})
        else:
            return Response(
                {'error': 'Invalid credentials'}, 
                status=status.HTTP_400_BAD_REQUEST
            )

class CheckAuthor(APIView):
    def get(self, request):
        try:
            email = request.user.email
            queryset = Author.objects.get(email=email)
            if queryset.email == email:
                return JsonResponse({'status': 'true'})
            return JsonResponse({'status': 'false'})
        except: 
            return JsonResponse({'status': 'false'})
            


@ensure_csrf_cookie
def get_csrf(request):
    csrf_token = get_token(request)
    return JsonResponse({'CSRF_cookie': csrf_token})