from rest_framework import serializers
from rest_framework.validators import UniqueValidator
from .models import Author, Article
from django.contrib.auth.models import User


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        email = serializers.EmailField(validators=[UniqueValidator(queryset=User.objects.all())])
        model = User
        fields = ['id', 'first_name', 'last_name', 'password', 'username', 'email']
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        return user

class AuthorSerializers(serializers.ModelSerializer):
    class Meta:
        model = Author
        fields = '__all__'


class ArticleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Article
        fields = '__all__'
