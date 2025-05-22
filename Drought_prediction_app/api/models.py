from django.db import models

class Author(models.Model):
    f_name = models.CharField(max_length=200)
    l_name = models.CharField(max_length=200)
    email = models.EmailField(max_length=200, unique=True)
    


    def __str__(self):
        return f"{self.f_name} {self.l_name}"


class Article(models.Model):
    choice = (('research', 'research'), 
              ('news', 'news'),
              ('event', 'event'),
              ('thematics', 'thematics'),
              ('story', 'story'))
    title = models.CharField(max_length=200)
    category = models.CharField(max_length=200, choices=choice)
    content = models.TextField()
    author = models.CharField(max_length=200)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title

