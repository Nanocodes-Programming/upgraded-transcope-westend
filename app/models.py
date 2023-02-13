from django.db import models

# Create your models here.
class Email(models.Model):
    first_name = models.CharField(max_length=255)
    last_name = models.CharField(max_length=255)
    email = models.EmailField()

    def __str__(self):
        return self.email


class Application(models.Model):
    first_name = models.CharField(max_length=50)
    last_name = models.CharField(max_length=50)
    address = models.TextField()
    city = models.CharField(max_length=50)
    zip_code = models.CharField(max_length=50)
    state = models.CharField(max_length=50)
    email = models.CharField(max_length=50)
    phone_number = models.CharField(max_length=50)
    credit_score = models.CharField(max_length=50)
    bankruptcy = models.CharField(max_length=50)
    monthly_income = models.CharField(max_length=50)
    total_assets = models.CharField(max_length=50)
    marriage_status = models.CharField(max_length=50)
    child_support = models.CharField(max_length=50)
    email = models.CharField(max_length=50)
    phone_number = models.CharField(max_length=50)
    home_type = models.CharField(max_length=50)
    refinance_type = models.CharField(max_length=50)
    loan_type = models.CharField(max_length=50)
    refinance_goal =models.CharField(max_length=50)
    estimated_value = models.CharField(max_length=50)
    estimated_amount = models.CharField(max_length=50)
    date = models.DateTimeField(auto_now=False, auto_now_add=True)

    def __str__(self):
        return self.first_name 
    