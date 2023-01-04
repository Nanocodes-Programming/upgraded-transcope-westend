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
    if request.method == 'POST':
        form = ApplicationForm(request.POST)

        if form.is_valid():

            first_name = form.cleaned_data['first_name']
            last_name = form.cleaned_data['last_name']
            email = form.cleaned_data['email']
            address = form.cleaned_data['address']
            phone_number = form.cleaned_data['phone_number']

            html = render_to_string('applicationform.html', {
            'first_name': first_name,
            'last_name': last_name,
            'email': email,
            'address': address,
            'phone_number': phone_number,

            })

            send_mail('The Application form subject',
                      'Successfully Applied',
                      'benjaminparish6@gmail.com',
                      ['benjaminparish6@gmail.com'],
                      html_message=html

                      )
            return redirect('home')
    else:
        form = ApplicationForm()
    return render(request, 'apply.html', {'form': form})



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