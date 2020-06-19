from django.db import models

# Create your models here.

class Log(models.Model):
    ist_status = models.BooleanField(null=True, default=True)
#     usr_insercao = models.ForeignKey(User, on_delete=DO_NOTHING, null=True, related_name='usr_insercao_erro')
#     usr_edicao = models.ForeignKey(User, on_delete=DO_NOTHING, null=True, related_name='usr_edicao_erro')
#     usr_delete = models.ForeignKey(User, on_delete=DO_NOTHING, null=True, related_name='usr_delete_erro')
    dat_insercao = models.DateTimeField(auto_now_add=True, null=True)
    dat_edicao = models.DateTimeField(null=True)
    dat_delete = models.DateTimeField(null=True)

    class Meta:
        abstract = True


class Category(Log):
    name = models.CharField(max_length=255)
    description = models.TextField()
    parent = models.ForeignKey('self', blank=True, null=True, related_name='subs', on_delete=models.CASCADE)


class Product(Log):
    name = models.CharField(max_length=255)
    description = models.TextField()
    category = models.ForeignKey(Category, blank=True, null=True, on_delete=models.DO_NOTHING)