jQuery(document).ready(function ($) {
  function getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(";");
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == " ") {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  }

  function getQueryParams() {
    var search = window.location.search.substring(1);
    var result = {};
    if (!search) return result;
    try {
      result = JSON.parse('{"' + search.replace(/&/g, '","').replace(/=/g,'":"') + '"}', function(key, value) { return key===""?value:decodeURIComponent(value) });
    } catch (error) {}
    return result;
  }

  window.pushGTMEvent = function (eventName) {
    return function (e) {
      var pushData = {
        event: eventName,
        funnel: "real-genius",
        queryParams: getQueryParams()
      };

      var referenceId = getCookie("referenceId");
      if (referenceId) {
        pushData.refId = referenceId;
      }

      dataLayer.push(pushData);
    };
  }

  // Download Guide
  $("#gform_submit_button_2").click(pushGTMEvent("download-costs-guide"));
  // Download Guide
  $("#gform_submit_button_1401").click(pushGTMEvent("download-homebuyer-guide"));
  // Subscribe
  $("#gform_submit_button_1403").click(pushGTMEvent("subscribe-newsletter"));
  // Sign Up
  $("#gform_submit_button_3").click(pushGTMEvent("subscribe-newsletter"));
  // #Home Page
  $("#btn-apply-now").click(pushGTMEvent("apply-now"));
  $("#btn-get-cash").click(pushGTMEvent("apply-now"));
  $("#btn-lower-my-rate").click(pushGTMEvent("apply-now"));
  $("#btn-get-pre-approved").click(pushGTMEvent("apply-now"));
  // #Refinance
  $("#btn-consolidate-my-debt").click(pushGTMEvent("apply-now"));
  $("#btn-improve-my-home").click(pushGTMEvent("apply-now"));
  // - Lower My Rate button
  $("#btn-payoff-my-loan-faster").click(pushGTMEvent("apply-now"));
  $("#btn-lower-my-payment").click(pushGTMEvent("apply-now"));
  // #Buy A Home
  // - Apply Now button
  // - Get Pre-Approved
  $("#link-get-my-pre-approval").click(pushGTMEvent("apply-now"));
  // #Find a Mortgage Expert
  $(".los-apply-now").click(pushGTMEvent("apply-now"));
  // #Mortgage Expert Page
  // - Apply Now button
  // #About
  // - Apply Now button
});
