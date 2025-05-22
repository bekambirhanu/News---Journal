from django.urls import path
from .views import AuthorListView, ArticleListView, UserCreateView, ArticleCreateView


urlpatterns = [
    path('authors/', AuthorListView.as_view(), name='author-list'),
    path('articles/', ArticleListView.as_view(), name='articles'),
    path('register/', UserCreateView.as_view(), name='register'),
    path('author/create-articles/', ArticleCreateView.as_view(), name='create-articles'),
]