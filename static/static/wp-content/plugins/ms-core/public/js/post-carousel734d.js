! function (e) {
  var t = {};

  function a(n) {
    if (t[n]) return t[n].exports;
    var o = t[n] = {
      i: n,
      l: !1,
      exports: {}
    };
    return e[n].call(o.exports, o, o.exports, a), o.l = !0, o.exports
  }
  a.m = e, a.c = t, a.d = function (e, t, n) {
    a.o(e, t) || Object.defineProperty(e, t, {
      enumerable: !0,
      get: n
    })
  }, a.r = function (e) {
    "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(e, Symbol.toStringTag, {
      value: "Module"
    }), Object.defineProperty(e, "__esModule", {
      value: !0
    })
  }, a.t = function (e, t) {
    if (1 & t && (e = a(e)), 8 & t) return e;
    if (4 & t && "object" == typeof e && e && e.__esModule) return e;
    var n = Object.create(null);
    if (a.r(n), Object.defineProperty(n, "default", {
        enumerable: !0,
        value: e
      }), 2 & t && "string" != typeof e)
      for (var o in e) a.d(n, o, function (t) {
        return e[t]
      }.bind(null, o));
    return n
  }, a.n = function (e) {
    var t = e && e.__esModule ? function () {
      return e.default
    } : function () {
      return e
    };
    return a.d(t, "a", t), t
  }, a.o = function (e, t) {
    return Object.prototype.hasOwnProperty.call(e, t)
  }, a.p = "", a(a.s = 21)
}({
  21: function (e, t) {
    var a = function (e, t) {
        var a = e.find(".eael-post-carousel").eq(0),
          o = void 0 !== a.data("autoplay") ? a.data("autoplay") : 999999,
          r = void 0 !== a.data("pagination") ? a.data("pagination") : ".swiper-pagination",
          i = void 0 !== a.data("arrow-next") ? a.data("arrow-next") : ".fb-swiper-button-next",
          d = void 0 !== a.data("arrow-prev") ? a.data("arrow-prev") : ".fb-swiper-button-prev",
          l = void 0 !== a.data("items") ? a.data("items") : 3,
          u = void 0 !== a.data("items-tablet") ? a.data("items-tablet") : 2.38,
          s = void 0 !== a.data("items-mobile") ? a.data("items-mobile") : 1.22,
          p = void 0 !== a.data("margin") ? a.data("margin") : 0,
          c = void 0 !== a.data("margin-tablet") ? a.data("margin-tablet") : 0,
          f = void 0 !== a.data("margin-mobile") ? a.data("margin-mobile") : 0,
          v = void 0 !== a.data("effect") ? a.data("effect") : "slide",
          b = void 0 !== a.data("speed") ? a.data("speed") : 400,
          m = void 0 !== a.data("loop") ? a.data("loop") : 0,
          w = void 0 !== a.data("grab-cursor") ? a.data("grab-cursor") : 0,
          g = void 0 !== a.data("pause-on-hover") ? a.data("pause-on-hover") : "",
          y = {
            direction: "horizontal",
            speed: b,
            effect: v,
            centeredSlides: "coverflow" == v,
            grabCursor: w,
            autoHeight: !0,
            loop: m,
            autoplay: {
              delay: o
            },
            pagination: {
              el: r,
              clickable: !0
            },
            navigation: {
              nextEl: i,
              prevEl: d
            }
          };
        "slide" === v || "coverflow" === v ? y.breakpoints = {
          1024: {
            slidesPerView: l,
            spaceBetween: p
          },
          768: {
            slidesPerView: u,
            spaceBetween: c,
            centeredSlides: true
          },
          600: {
            slidesPerView: 1.6,
            spaceBetween: f,
            centeredSlides: true
          },
          470: {
            slidesPerView: 1.4,
            spaceBetween: f,
            centeredSlides: true
          },
          320: {
            slidesPerView: s,
            spaceBetween: f,
            centeredSlides: true,
          }
        } : y.items = 1, n(a, y).then((function (e) {
          0 === o && e.autoplay.stop(), g && 0 !== o && (a.on("mouseenter", (function () {
            e.autoplay.stop()
          })), a.on("mouseleave", (function () {
            e.autoplay.start()
          })))
        }));
        var h = t(".eael-advance-tabs"),
          x = h.find(".eael-tabs-nav li"),
          P = h.find(".eael-tabs-content > div");
        x.on("click", (function () {
          var e = P.eq(t(this).index());
          t(e).find(".swiper-container-wrap.eael-post-carousel-wrap").length && n(a, y)
        }))
      },
      n = function (e, t) {
        return "undefined" == typeof Swiper ? new(0, elementorFrontend.utils.swiper)(e, t).then((function (e) {
          return e
        })) : o(e, t)
      },
      o = function (e, t) {
        return new Promise((function (a, n) {
          a(new Swiper(e, t))
        }))
      };
    jQuery(window).on("elementor/frontend/init", (function () {
      elementorFrontend.hooks.addAction("frontend/element_ready/eael-post-carousel.carousel-article", a);
    }))
  }
});
