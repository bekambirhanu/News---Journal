from django.urls import path
from .views import AuthorListView, ArticleListView, UserCreateView, ArticleListCreateView, ArticleDeleteView, LoginView, CheckAuthor, get_csrf


urlpatterns = [
    path('authors/', AuthorListView.as_view(), name='author-list'),
    path('articles/', ArticleListView.as_view(), name='articles'),
    path('register/', UserCreateView.as_view(), name='register'),
    path('author/create-articles/', ArticleListCreateView.as_view(), name='list|create-articles'),
    path('author/delete-article/<int:id>', ArticleDeleteView.as_view(), name='delete-article'),
    path('csrf/', get_csrf, name='csrf'),
    path('login/', LoginView.as_view(), name='login'),
    path('check-author/', CheckAuthor.as_view(), name='check-if-author'),
]