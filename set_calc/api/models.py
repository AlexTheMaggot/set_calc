from django.db import models
from django.contrib.auth.models import User
from django.db.models.signals import post_save
from django.dispatch import receiver


class UserProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='userprofile')
    lang = models.CharField(max_length=2, null=True, blank=True)


@receiver(post_save, sender=User)
def create_user_profile(sender, instance, created, **kwargs):
    if created:
        UserProfile.objects.create(user=instance)


@receiver(post_save, sender=User)
def save_user_profile(sender, instance, **kwargs):
    instance.userprofile.save()


class Customer(models.Model):
    name = models.CharField(max_length=200)


class Calculation(models.Model):
    user = models.ForeignKey(User, on_delete=models.PROTECT, related_name='calculations')
    customer = models.ForeignKey(Customer, on_delete=models.PROTECT, related_name='calculations')
