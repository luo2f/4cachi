; (function (b, a) {
	if (typeof define === "function" && define.amd) {
		define(["buoy"], a(b))
	} else {
		if (typeof exports === "object") {
			module.exports = a(require("buoy"))
		} else {
			b.hullabaloo = a(b, b.buoy)
		}
	}
}
)(typeof global !== "undefined" ? global : this.window || this.global, function (b) {
	var a = function (d) {
		var c = function () {
			this.hullabaloo = {};
			this.hullabaloos = [];
			this.success = false;
			this.options = {
				ele: "body",
				offset: {
					from: "top",
					amount: 20
				},
				align: "right",
				width: 250,
				delay: 5000,
				allow_dismiss: true,
				stackup_spacing: 10,
				text: "Произошла неизвестная ошибка.",
				icon: {
					success: "fa fa-check-circle",
					info: "fa fa-info-circle",
					warning: "fa fa-life-ring",
					danger: "fa fa-exclamation-circle",
					light: "fa fa-sun",
					dark: "fa fa-moon"
				},
				status: "danger",
				alertClass: "",
				fnStart: false,
				fnEnd: false,
				fnEndHide: false,
			}
		};
		c.prototype.send = function (l, k) {
			if (typeof this.options.fnStart == "function") {
				this.options.fnStart()
			}
			var j = this;
			var e = 1;
			var g = +this.hullabaloos.length - 1;
			var h;
			var f = this.generate(l, k);
			if (this.hullabaloos.length) {
				while (g >= 0 && e) {
					if (this.hullabaloos[g].text == f.text && this.hullabaloos[g].status == f.status) {
						h = this.hullabaloos[g];
						e = 0;
						f.elem.css(this.options.offset.from, parseInt(h.elem.css(this.options.offset.from)) + 4);
						f.elem.css(this.options.align, parseInt(h.elem.css(this.options.align)) + 4)
					}
					g--
				}
			}
			if (typeof h == "object") {
				clearTimeout(h.timer);
				h.timer = setTimeout(function () {
					j.closed(h)
				}, this.options.delay);
				f.parent = h;
				h.hullabalooGroup.push(f)
			} else {
				f.position = parseInt(f.elem.css(this.options.offset.from));
				f.timer = setTimeout(function () {
					j.closed(f)
				}, this.options.delay);
				this.hullabaloos.push(f)
			}
			f.elem.fadeIn();
			if (typeof this.options.fnEnd == "function") {
				this.options.fnEnd()
			}
		}
			;
		c.prototype.closed = function (e) {
			var k = this;
			var g, f, h, j;
			if ("parent" in e) {
				e = e.parent
			}
			if (this.hullabaloos !== null) {
				g = $.inArray(e, this.hullabaloos);
				if (g == -1) {
					return
				}
				if (!!e.hullabalooGroup && e.hullabalooGroup.length) {
					for (f = 0; f < e.hullabalooGroup.length; f++) {
						$(e.hullabalooGroup[f].elem).remove()
					}
				}
				$(this.hullabaloos[g].elem).fadeOut("slow", function () {
					this.remove()
				});
				if (g !== -1) {
					j = g + 1;
					if (this.hullabaloos.length > 1 && j < this.hullabaloos.length) {
						h = this.hullabaloos[j].position - this.hullabaloos[g].position;
						for (f = g; f < this.hullabaloos.length; f++) {
							this.animate(k.hullabaloos[f], parseInt(k.hullabaloos[f].position) - h);
							k.hullabaloos[f].position = parseInt(k.hullabaloos[f].position) - h
						}
					}
					this.hullabaloos.splice(g, 1);
					if (typeof this.options.fnEndHide == "function") {
						this.options.fnEndHide()
					}
				}
			}
		}
			;
		c.prototype.animate = function (g, j) {
			var l = this;
			var m, k, h, f = 0;
			k = parseInt(g.elem.css(l.options.offset.from));
			f = g.hullabalooGroup.length;
			m = setInterval(e, 2);
			function e() {
				if (k == j) {
					clearInterval(m)
				} else {
					k--;
					g.elem.css(l.options.offset.from, k);
					if (f) {
						for (h = 0; h < f; h++) {
							g.hullabalooGroup[h].elem.css(l.options.offset.from, k + 5)
						}
					}
				}
			}
		}
			;
		c.prototype.generate = function (j, i) {
			var e = {
				icon: "",
				status: i || this.options.status,
				text: j || this.options.text,
				elem: $("<div>"),
				hullabalooGroup: []
			};
			var h, g, f;
			self = this;
			h = this.options;
			e.elem.attr("class", "hullabaloo alert " + h.alertClass);
			e.elem.addClass("alert-" + e.status);
			if (h.allow_dismiss) {
				e.elem.addClass("alert-dismissible");
				e.elem.append('<button class="close" type="button" id="hullabalooClose" aria-label="Close"><span aria-hidden="true">&times;</span></button>');
				$("#hullabalooClose", $(e.elem)).bind("click", function () {
					self.closed(e)
				})
			}
			switch (e.status) {
				case "success":
					e.icon = h.icon.success;
					break;
				case "info":
					e.icon = h.icon.info;
					break;
				case "danger":
					e.icon = h.icon.danger;
					break;
				case "light":
					e.icon = h.icon.light;
					break;
				case "dark":
					e.icon = h.icon.dark;
					break;
				default:
					e.icon = h.icon.warning
			}
			e.elem.append('<i class="' + e.icon + '"></i> ' + e.text);
			g = h.offset.amount;
			$(".hullabaloo").each(function () {
				return g = Math.max(g, parseInt($(this).css(h.offset.from)) + $(this).outerHeight() + h.stackup_spacing)
			});
			f = {
				position: (h.ele === "body" ? "fixed" : "absolute"),
				margin: 0,
				"z-index": "9999",
				display: "none"
			};
			f[h.offset.from] = g + "px";
			e.elem.css(f);
			if (h.width !== "auto") {
				e.elem.css("width", h.width + "px")
			}
			$(h.ele).append(e.elem);
			switch (h.align) {
				case "center":
					e.elem.css({
						left: "50%",
						"margin-left": "-" + (e.elem.outerWidth() / 2) + "px"
					});
					break;
				case "left":
					e.elem.css("left", "20px");
					break;
				default:
					e.elem.css("right", "20px")
			}
			return e
		}
			;
		return c
	};
	return a(b)
});
