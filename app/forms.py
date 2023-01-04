from django import forms
from .models import Email

class ApplicationForm(forms.Form):
    first_name = forms.CharField(max_length=255)
    last_name = forms.CharField(max_length=255)
    email = forms.EmailField()
    address = forms.CharField(max_length=255)
    phone_number = forms.IntegerField()


class Subscription(forms.Form):
    class Meta:
        model = Email
        fields = ['first_name', 'last_name', 'email']