from django.core.mail import send_mail
from django.shortcuts import render, redirect
from django.template.loader import render_to_string
from .forms import *
from .models import *

# Create your views here.

def index(request):
    return render(request, 'index.html', {})

# Main.Html Views
def Apply(request):
    print("outside post method -1 \n")
    print("outside post method -2 \n")
    if request.method == "POST":
        print("inside post method \n")
        print("inside post method \n")
        first_name = request.POST.get("first_name")
        print(first_name)
        last_name = request.POST.get("last_name")
        print(last_name)
        address = request.POST.get("address")
        city = request.POST.get("city")
        zip_code = request.POST.get("zip_code")
        state = request.POST.get('state')
        email = request.POST.get("email")
        phone_number = request.POST.get("phone_number")
        print(first_name + '\n')
        credit_score = request.POST.get("credit_score")
        bankruptcy = request.POST.get("bankruptcy")
        monthly_income = request.POST.get("address")
        total_assets = request.POST.get("total_assets")
        marriage_status = request.POST.get("marriage_status")
        child_support = request.POST.get('child_support')
        email = request.POST.get("email")
        print(email)
        phone_number = request.POST.get("phone_number")
        home_type = request.POST.get("home_type")
        refinance_type = request.POST.get("refinance_type")
        loan_type = request.POST.get("loan_type")
        refinance_goal = request.POST.get("refinance_goal")
        estimated_value = request.POST.get("estimated_value")
        estimated_amount = request.POST.get('estimated_amount')
        # calling the database through django orm
        Application.objects.create(first_name=first_name, last_name=last_name,
                                           address = address, city=city, zip_code=zip_code, state=state,
                                           phone_number=phone_number, credit_score=credit_score, bankruptcy=bankruptcy,
                                           monthly_income = monthly_income, total_assets=total_assets, marriage_status=marriage_status,
                                           child_support=child_support, email=email, home_type=home_type, refinance_type=refinance_type,
                                           loan_type = loan_type, refinance_goal=refinance_goal,
                                           estimated_value=estimated_value, estimated_amount=estimated_amount
                                           )


    return render(request, 'apply.html', {})



def Apply2(request):
    return render(request, 'apply2.html', {})


def Apply3(request):
    return render(request, 'apply3.html', {})



def AdminAjax(request):
    return render(request, 'wp-admin/admin-ajax.html', {})

def WsJson(request):
    return render(request, '', {})

def Refinance(request):
    return render(request, 'refinance/index.html', {})

def Purchase(request):
    return render(request, 'purchase/index.html', {})

def Conventional(request):
    return render(request, 'options/conventional.html', {})

def UsaVA(request):
    return render(request, 'options/va.html', {})

def UsaFha(request):
    return render(request, 'options/fha.html', {})

def Jumbo(request):
    return render(request, 'options/jumbo.html', {})

def UsaUsda(request):
    return render(request, 'options/usda.html', {})

def CashOut(request):
    return render(request, 'options/cash.html', {})

def Personal(request):
    return render(request, 'options/personal.html', {})

def BusinessLoan(request):
    return render(request, 'options/business.html', {})

def Calc(request):
    return render(request, 'calculators-selection/index.html', {})

def RArticles(request):
    return render(request, 'articles/index.html', {})

def About(request):
    return render(request, 'about-us/index.html', {})

def LegalNotice(request):
    return render(request, 'legal-notice/index.html', {})

def PrivacyPolicy(request):
    return render(request, 'privacy-policy/index.html', {})

def CaPrivacyNotice(request):
    return render(request, 'ca-privacy-notice/index.html', {})

def UsaPatriotAct(request):
    return render(request, 'usa-patriot-act/index.html', {})

def Licensing(request):
    return render(request, 'licensing/index.html', {})

def PaymentCalc(request):
    return render(request, 'payment-calculator/index.html', {})

def AC(request):
    return render(request, 'affordability-calculator/index.html', {})

def EPC(request):
    return render(request, 'early-payoff-calculator/index.html', {})

# Index views

def ExtraMortgage(request):
    return render(request, 'why-should-you-make-an-extra-mortgage-payment/index.html', {})

def Author(request):
    return render(request, 'author/timcounterpointux-com/index.html', {})

def FirstTimeHome(request):
    return render(request, 'four-common-mistakes-first-time-homebuyers-make-and-how-to-avoid-them/index.html', {})


def Debt(request):
    if request.method == 'POST':
        form = Subscription(request.POST)
        if form.is_valid:
            first_name = form.cleaned_data['first_name']
            last_name = form.cleaned_data['last_name']
            email = form.cleaned_data['email']
            form.save()
            return redirect('#')

    else:
        form = Subscription()
    return render(request, 'how-debt-to-income-impacts-buying-a-house/index.html', {'form':form})


def PersonalData(request):
    return render(request, 'how-to-protect-your-personal-data-when-applying-for-a-mortgage-online/index.html', {})

def Increase(request):
    return render(request, 'increase-your-odds-of-getting-a-home-loan-as-a-first-time-homebuyer/index.html', {})

def InexpensiveWays(request):
    return render(request, 'inexpensive-ways-to-spruce-up-your-house/index.html', {})

def LowMortLoan(request):
    return render(request, 'low-mortgage-rates-can-make-your-dream-more-affordable/index.html', {})

def MortgageRates(request):
    return render(request, 'mortgage-rates-are-dropping-should-you-refinance-a-home/index.html', {})

def ProgramsAndLoans(request):
    return render(request, 'programs-and-loans-to-help-you-buy-a-house/index.html', {})

def MortgageScams(request):
    return render(request, 'how-to-protect-yourself-from-mortgage-scams/index.html', {})

def FAM(request):
    return render(request, 'find-a-mortgage-expert/index.html', {})
