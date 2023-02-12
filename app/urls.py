from django.urls import path
from . import views
from django.conf import settings
from django.conf.urls.static import static



# url routing
urlpatterns = [
    path("", views.index, name="home"),

    #URLS in HomePage
    path("why-should-you-make-an-extra-mortgage-payment/", views.ExtraMortgage, name='extra-mortgage'),
    path("author/timcounterpointux-com", views.Author, name='author'),
    path("why-should-you-make-an-extra-mortgage-payment/", views.ExtraMortgage, name='extra-mortgage-payment'),
    path("four-common-mistakes-first-time-homebuyers-make-and-how-to-avoid-them/", views.FirstTimeHome, name='first-time-home'),
    path("how-debt-to-income-impacts-buying-a-house/", views.Debt, name='debt-to-income'),
    path("how-to-protect-your-personal-data-when-applying-for-a-mortgage-online/", views.PersonalData, name='personal-data'),
    path("increase-your-odds-of-getting-a-home-loan-as-a-first-time-homebuyer/", views.Increase, name='increase-your-odds'),
    path("inexpensive-ways-to-spruce-up-your-house/", views.InexpensiveWays, name='inexpensive-ways'),
    path("low-mortgage-rates-can-make-your-dream-more-affordable/", views.LowMortLoan, name='low-mortgage-loans'),
    path("mortgage-rates-are-dropping-should-you-refinance-a-home/", views.MortgageRates, name='mortgage-rates'),
    path("programs-and-loans-to-help-you-buy-a-house/", views.ProgramsAndLoans, name='programs-and-loans'),
    path("how-to-protect-yourself-from-mortgage-scams/", views.MortgageScams, name='mortgage-scams'),
    path('payment-calculator/', views.PaymentCalc, name="payment-calculator"),
    path('affordability-calculator/', views.AC, name='affordability-calculator'),
    path('early-payoff-calculator/', views.EPC, name="early-payoff-calculator"),

    # URLS in MAIN.HTML  TEMPLATE
    path("apply/", views.Apply, name='apply'),
    path("property-details/", views.Apply2, name='apply2'),
    path("final-step/", views.Apply3, name='apply3'),
    path("admin-ajax/", views.AdminAjax, name='admin-ajax'),
    path("ws-json/", views.WsJson, name='ws-json'),
    path("refinance/", views.Refinance, name='refinance'),
    path("buy-a-home/", views.Purchase, name='purchase'),
    path("conventional/", views.Conventional, name='conventional'),
    path("usa-va/", views.UsaVA, name='usa_va'),
    path("usa-fha/", views.UsaFha, name='usa_fha'),
    path("jumbo/", views.Jumbo, name='jumbo'),
    path("usa-usda/", views.UsaUsda, name='usa_usda'),
    path("cashout/", views.CashOut, name='cashout'),
    path("Personal-Loan/", views.Personal, name='personal'),
    path("Business-Loan/", views.BusinessLoan, name='business'),
    path("Calculator/", views.Calc, name='calculator'),
    path("Research-Article/", views.RArticles, name='articles'),
    path("About/", views.About, name='about'),
    path("Legal-Notice/", views.LegalNotice, name='legal-notice'),
    path("Privacy-Policy/", views.PrivacyPolicy, name='privacy-policy'),
    path("Ca-Privacy-Notice/", views.CaPrivacyNotice, name='ca-privacy-notice'),
    path("Usa-Patriot-Act/", views.UsaPatriotAct, name='usa-patriot-act'),
    path("Licensing", views.Licensing, name='licensing'),
    path("Find-a-Mortgage", views.FAM, name='find-a-mortgage')


] + static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)