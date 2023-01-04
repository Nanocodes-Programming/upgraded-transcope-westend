jQuery(window).on("elementor/frontend/init", function () {
  var $ = jQuery;

  var calYearFixed = " Year Fixed";

  function parseQuery(queryString) {
    var query = {};
    var pairs = (queryString.indexOf("?") >= 0 ? queryString.substr(queryString.indexOf("?") + 1) : queryString).split('&');
    for (var i = 0; i < pairs.length; i++) {
        var pair = pairs[i].split('=');
        query[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1] || '');
    }
    return query;
  }

  function getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for(let i = 0; i <ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  }

  $('.rg-calculator-back-button').on('click', function() {
    $('.rg-calculator.rg-calculator-row').removeClass('show-col-next');
    $('.rg-calculator.rg-calculator-row > .rg-calculator-col:first-of-type').removeClass('hide');
    $('.rg-calculator.rg-calculator-row > .rg-calculator-col:last-of-type').removeClass('show');
  })

  var dollarUSLocale = Intl.NumberFormat('en-US');
  var dollarUSLocaleWithCent = Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  });
  var parsePriceValue = function(value, options) {
    var pValue = value;
    if (options && options.round) {
      var pValue = Math.round(value);
    }
    if (options && options.type === "cent") {
      return dollarUSLocaleWithCent.format(pValue);
    }
    return `$${dollarUSLocale.format(pValue)}`;
  }

  function initCalculator(id) {

    var applyNowText = $(id).data("apply-now-text");
    var applyNowLink = $(id).data("apply-now-link");
    var openNewTab = $(id).data("open-new-tab");
    var showAplyNow = $(id).data("show-apply-now");

    var viewMoreText = $(id).data("view-more-text");
    var viewMoreLink = $(id).data("view-more-link");
    var showViewMore = $(id).data("show-view-more");

    var purchasePrice = $(id).data('purchase-price');
    var downPayment = $(id).data('down-payment');
    var mortgageBalance = $(id).data('mortgage-balance');
    var cashOut = $(id).data('cash-out');

    var term = $(id).data('term');
    var interate = $(id).data('interate');
    var pmms30 = $(id).data('pmms-30');
    var pmms15 = $(id).data('pmms-15');

    var showAmortizationSchedule = $(id).data("show-amortization-schedule");

    var tooltip = $(id).data("tooltip");
    var mortgageAmountTooltip = $(id).data("mortgage-amount-tooltip");

    var purposeLoanType = $(id).data('purpose-loan-type');

    var pricingBaseUrl = $(id).data('pricing-base-url');
    var pricingPathUrl = $(id).data('pricing-path-url');
    var openNewWindow = $(id).data('pricing-open-new-window');
    var homeUrl = $(id).data("home-url");
    var refUrl = $(id).data("ref-url");

    var quickApplyBaseUrl = $(id).data("quick-apply-base-url");
    var quickApplyPathUrl = $(id).data("quick-apply-path-url");
    
    var sIR_Payment = function(data) {
      let cookieLeadFunnel = getCookie('hasCompletedLeadFunnel') == "true" ? true : false;
      if (!cookieLeadFunnel) {
        var quickApplyUrl = quickApplyBaseUrl + quickApplyPathUrl;
        if (openNewWindow) {
          window.open(quickApplyUrl);
        } else {
          window.location.href = quickApplyUrl;
        }
        return;
      }
      var pricingUrl = pricingBaseUrl + "?" + pricingPathUrl;
      if (data.type == "refinance") {
        var remainingBal = data.inputField.remainingLoanBalance;
        var cashOut = data.inputField.cashOutAmount;
        var loanTerm = data.inputField.lengthOfLoan + calYearFixed;
        pricingUrl = pricingUrl.replace("{{loan_purpose}}", "Refinance");
        pricingUrl = pricingUrl.replace("{{remaining_balance}}", remainingBal);
        pricingUrl = pricingUrl.replace("{{cash_out}}", cashOut);
        pricingUrl = pricingUrl.replace("{{loan_term}}", loanTerm);
        pricingUrl = pricingUrl.replace("{{calculate_home_value_flag}}", true);
      } else {
        var purchasePirce = data.inputField.purchasePrice;
        var downPayment = data.inputField.downPayment;
        var loanTerm = data.inputField.lengthOfLoan + calYearFixed;
        pricingUrl = pricingUrl.replace("{{loan_purpose}}", "Purchase");
        pricingUrl = pricingUrl.replace("{{purchase_price}}", purchasePirce);
        pricingUrl = pricingUrl.replace("{{down_payment}}", downPayment);
        pricingUrl = pricingUrl.replace("{{loan_term}}", loanTerm);
      }

      pricingUrl = pricingUrl.replace("{{home_url}}", homeUrl);
      pricingUrl = pricingUrl.replace("{{ref_url}}", refUrl);

      var referenceId = getCookie("referenceId");
      if (referenceId) {
        referenceId = encodeURIComponent(referenceId);
        pricingUrl = pricingUrl.replace("{{reference_id}}", referenceId);
      }

      var pricingQuery = parseQuery(pricingUrl);
      var pricingStrQuery = "";
      for (var property in pricingQuery) {
        if (!(pricingQuery[property].indexOf("{{") >= 0 && pricingQuery[property].indexOf("}}") >= 0)) {
          pricingStrQuery += property + "=" + encodeURIComponent(pricingQuery[property]) + "&";
        }
      }
      pricingStrQuery = pricingStrQuery.slice(0, -1);
      pricingUrl = pricingBaseUrl + "?" + pricingStrQuery;

      if (window && window.location && window.location.search) {
        pricingUrl += window.location.search.replace("?", "&");
      }

      if (openNewWindow) {
        window.open(pricingUrl);
      } else {
        window.location.href = pricingUrl;
      }
    };

    var paymentFlag = 0;

    PaymentCalculator({
      selector: id,
      defaultProps: {
        loanType: purposeLoanType,
        purchasePrice: purchasePrice,
        downPayment: downPayment,
        remainingLoanBalance: mortgageBalance,
        cashOutAmount: cashOut,
        interestRate: 3.125,
        mortgageRates: [pmms30,pmms15],
        lengthOfLoan: term,
        interestRate: interate,
        viewMore: showViewMore ? {
          text: viewMoreText,
          link: viewMoreLink
        } : false,
				applyNow: showAplyNow ? {
          text: applyNowText,
          link: applyNowLink,
          openNewTab: openNewTab
        } : false,
        interestTooltip: tooltip,
        disclaimerTooltip: mortgageAmountTooltip,
        amortization: showAmortizationSchedule ? {} : false,
        onSeeInstantRates: (data) => {
          sIR_Payment(data);
        }
      }
    })
  }

  //#region Early Payoff
  function initEarlyPayoff(id) {
    var applyNowText = $(id).data("apply-now-text");
    var applyNowLink = $(id).data("apply-now-link");
    var openNewTab = $(id).data("open-new-tab");
    var showAplyNow = $(id).data("show-apply-now");
    
    var viewMoreText = $(id).data("view-more-text");
    var viewMoreLink = $(id).data("view-more-link");
    var showViewMore = $(id).data("show-view-more");
    
    var showAmortizationSchedule = $(id).data("show-amortization-schedule");
    
    var earlyPayoff = $(id).data('early-payoff');
    var originalMortgageAmount = $(id).data('original-mortgage-amount');
    var outstandingMortgageBalance = $(id).data('outstanding-mortgage-balance');
    var amountToAddToMonthlyPayment = $(id).data('amount-to-add-to-monthly-payment');

    var pricingBaseUrl = $(id).data('pricing-base-url');
    var pricingPathUrl = $(id).data('pricing-path-url');
    var openNewWindow = $(id).data('pricing-open-new-window');
    var homeUrl = $(id).data("home-url");
    var refUrl = $(id).data("ref-url");

    var quickApplyBaseUrl = $(id).data("quick-apply-base-url");
    var quickApplyPathUrl = $(id).data("quick-apply-path-url");
    
    var sIR_EarlyPayoff = function(data) {
      let cookieLeadFunnel = getCookie('hasCompletedLeadFunnel') == "true" ? true : false;
      if (!cookieLeadFunnel) {
        var quickApplyUrl = quickApplyBaseUrl + quickApplyPathUrl;
        if (openNewWindow) {
          window.open(quickApplyUrl);
        } else {
          window.location.href = quickApplyUrl;
        }
        return;
      }

      var pricingUrl = pricingBaseUrl + "?" + pricingPathUrl;
      pricingUrl = pricingUrl.replace("{{loan_purpose}}", "Purchase");
  
      if (data.type == "YEARS_TO_PAYOFF") {
        var purchasePrice = data.inputField.originalMortgageAmount;
        var loanTerm = data.inputField.originalTerm + calYearFixed;
        pricingUrl = pricingUrl.replace("{{purchase_price}}", purchasePrice);
        pricingUrl = pricingUrl.replace("{{loan_term}}", loanTerm);
      } else {
        var purchasePrice = data.inputField.originalMortgageAmount;
        var loanTerm = data.inputField.originalTerm + calYearFixed;
        pricingUrl = pricingUrl.replace("{{purchase_price}}", purchasePrice);
        pricingUrl = pricingUrl.replace("{{loan_term}}", loanTerm);
      }
  
      pricingUrl = pricingUrl.replace("{{home_url}}", homeUrl);
      pricingUrl = pricingUrl.replace("{{ref_url}}", refUrl);
  
      var referenceId = getCookie("referenceId");
      if (referenceId) {
        referenceId = encodeURIComponent(referenceId);
        pricingUrl = pricingUrl.replace("{{reference_id}}", referenceId);
      }
  
      var pricingQuery = parseQuery(pricingUrl);
      var pricingStrQuery = "";
      for (var property in pricingQuery) {
        if (!(pricingQuery[property].indexOf("{{") >= 0 && pricingQuery[property].indexOf("}}") >= 0)) {
          pricingStrQuery += property + "=" + encodeURIComponent(pricingQuery[property]) + "&";
        }
      }
      pricingStrQuery = pricingStrQuery.slice(0, -1);
      pricingUrl = pricingBaseUrl + "?" + pricingStrQuery;
  
      if (window && window.location && window.location.search) {
        pricingUrl += window.location.search.replace("?", "&");
      }
  
      if (openNewWindow) {
        window.open(pricingUrl);
      } else {
        window.location.href = pricingUrl;
      }
    };

    EarlyPayoffCalculator({
      selector: id,
      defaultProps: {
        earlyPayoff: earlyPayoff,
        additionToMonthlyPayment: amountToAddToMonthlyPayment,
        originalMortgageAmount: originalMortgageAmount,
        outstandingMortgageBalance: outstandingMortgageBalance,
        viewMore: showViewMore ? {
          text: viewMoreText,
          link: viewMoreLink
        } : false,
        applyNow: showAplyNow ? {
          text: applyNowText,
          link: applyNowLink,
          openNewTab: openNewTab
        } : false,
        amortization: showAmortizationSchedule ? {} : false,
        onSeeInstantRates: (data) => {
          sIR_EarlyPayoff(data);
        }
      }
    });
  }
  //#endregion Early Payoff

  function initAffordability(id) {
    var applyNowText = $(id).data("apply-now-text");
    var applyNowLink = $(id).data("apply-now-link");
    var openNewTab = $(id).data("open-new-tab");
    var showAplyNow = $(id).data("show-apply-now");

    var viewMoreText = $(id).data("view-more-text");
    var viewMoreLink = $(id).data("view-more-link");
    var showViewMore = $(id).data("show-view-more");

    var desiredMonthlyPayment = $(id).data('desired-monthly-payment');
    var downPayment = $(id).data('down-payment');
    var annualGrossIncome = $(id).data('annual-gross-income');
    var monthlyDebts = $(id).data('monthly-debts');
    // var yearlyPropertyTaxes = $(id).data('yearly-property-taxes');
    // var yearlyInsurance = $(id).data('yearly-insurance');

    var FT = $(id).data('ft');
    var FHOI = $(id).data('fhoi');
    var MDTI = $(id).data('mdti');
    var MHR = $(id).data('mhr');

    var interate = $(id).data('interate');
    var pmms30 = $(id).data('pmms-30');
    var pmms15 = $(id).data('pmms-15');

    var showAmortizationSchedule = $(id).data("show-amortization-schedule");

    var tooltip = $(id).data("tooltip");

    var pricingBaseUrl = $(id).data('pricing-base-url');
    var pricingPathUrl = $(id).data('pricing-path-url');
    var openNewWindow = $(id).data('pricing-open-new-window');
    var homeUrl = $(id).data("home-url");
    var refUrl = $(id).data("ref-url");

    var quickApplyBaseUrl = $(id).data("quick-apply-base-url");
    var quickApplyPathUrl = $(id).data("quick-apply-path-url");

    var sIR_Affordability = function(data) {
      let cookieLeadFunnel = getCookie('hasCompletedLeadFunnel') == "true" ? true : false;
      if (!cookieLeadFunnel) {
        var quickApplyUrl = quickApplyBaseUrl + quickApplyPathUrl;
        if (openNewWindow) {
          window.open(quickApplyUrl);
        } else {
          window.location.href = quickApplyUrl;
        }
        return;
      }

      var pricingUrl = pricingBaseUrl + "?" + pricingPathUrl;
      pricingUrl = pricingUrl.replace("{{loan_purpose}}", "Purchase");

      if (data.type == "income") {
        var purchasePrice = data.resultList.homeValue;
        var downPayment = data.inputField.downPaymentAmount;
        var loanTerm = data.inputField.term + calYearFixed;
        pricingUrl = pricingUrl.replace("{{purchase_price}}", purchasePrice);
        pricingUrl = pricingUrl.replace("{{down_payment}}", downPayment);
        pricingUrl = pricingUrl.replace("{{loan_term}}", loanTerm);
      } else {
        var purchasePrice = data.resultList.homeValue;
        var downPayment = data.inputField.downPaymentAmount;
        var loanTerm = data.inputField.term + calYearFixed;
        pricingUrl = pricingUrl.replace("{{purchase_price}}", purchasePrice);
        pricingUrl = pricingUrl.replace("{{down_payment}}", downPayment);
        pricingUrl = pricingUrl.replace("{{loan_term}}", loanTerm);
      }

      pricingUrl = pricingUrl.replace("{{home_url}}", homeUrl);
      pricingUrl = pricingUrl.replace("{{ref_url}}", refUrl);

      var referenceId = getCookie("referenceId");
      if (referenceId) {
        referenceId = encodeURIComponent(referenceId);
        pricingUrl = pricingUrl.replace("{{reference_id}}", referenceId);
      }

      var pricingQuery = parseQuery(pricingUrl);
      var pricingStrQuery = "";
      for (var property in pricingQuery) {
        if (!(pricingQuery[property].indexOf("{{") >= 0 && pricingQuery[property].indexOf("}}") >= 0)) {
          pricingStrQuery += property + "=" + encodeURIComponent(pricingQuery[property]) + "&";
        }
      }
      pricingStrQuery = pricingStrQuery.slice(0, -1);
      pricingUrl = pricingBaseUrl + "?" + pricingStrQuery;

      if (window && window.location && window.location.search) {
        pricingUrl += window.location.search.replace("?", "&");
      }

      if (openNewWindow) {
        window.open(pricingUrl);
      } else {
        window.location.href = pricingUrl;
      }
    };

    var affordabilityFlag = 0;

    AffordabilityCalculator({
      selector: id,
      defaultProps: {
        desiredMonthlyPayment: desiredMonthlyPayment,
        downPaymentAmount: downPayment,
        annualGrossIncome: annualGrossIncome,
        monthlyDebtPayments: monthlyDebts,
        // yearlyPropertyTaxes: yearlyPropertyTaxes,
        // yearlyInsurance: yearlyInsurance,
        taxesFactorOfMaxPayment: FT,
        HOIFactorOfMaxPayment: FHOI,
        maxDTI: MDTI,
        housingRatio: MHR,
        interestRate: interate,
        mortgageRates: [pmms30,pmms15],
        viewMore: showViewMore ? {
          text: viewMoreText,
          link: viewMoreLink
        } : false,
        applyNow: showAplyNow ? {
          text: applyNowText,
          link: applyNowLink,
          openNewTab: openNewTab
        } : false,
        interestTooltip: tooltip,
        amortization: showAmortizationSchedule ? {} : false,
        onSeeInstantRates: (data) => {
          sIR_Affordability(data);
        }
      }
    })
  }

  elementorFrontend.hooks.addAction('frontend/element_ready/fb-calculator.default', function ($scope) {
    if ($("#payment-calculator").length == 1) {
      initCalculator("#payment-calculator");
    }
    if ($("#early-payoff-calculator").length == 1) {
      initEarlyPayoff("#early-payoff-calculator");
    }
    if ($("#affordability-calculator").length == 1) {
      initAffordability("#affordability-calculator");
    }
  });
});