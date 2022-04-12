(function ($) {

	"use strict";

	$(".sortable").sortable();

	$(".btnStart").click(function () {
		if ($("#terms").is(":checked")) {
			$(".content-left").animate({ height: 0, opacity: 0 }, 'slow', function () {
				$(".content-right").fadeIn(400);
			});
		} else {
			$("#checkTermsMessage").fadeIn(200);
		}
	});

	$('#terms').change(function () {
		if (this.checked) {
			$("#checkTermsMessage").fadeOut(200);
		}
	});

	var x = true, y = true;

	$('input[type=radio][name=question_17]').change(function () {

		if (this.value == 'Evet') {
			$("#subQuestion_18").fadeIn(300);
			$("#subQuestion_19").fadeOut();
			$('input[type=radio][name=question_18]').addClass("required");
			$('input[type=radio][name=question_19]').removeClass("required");
			$('input:radio[name=question_19]').each(function () { $(this).prop('checked', false); });
			x = true;
		} else {
			$("#subQuestion_19").fadeIn(300);
			$("#subQuestion_18").fadeOut();
			$('input[type=radio][name=question_19]').addClass("required");
			$('input[type=radio][name=question_18]').removeClass("required");
			$('input:radio[name=question_18]').each(function () { $(this).prop('checked', false); });
			x = false;
		}
	});

	$('input[type=radio][name=question_22]').change(function () {

		if (this.value == 'Evet') {
			$("#subQuestion_24").fadeIn(300);
			$("#subQuestion_25").fadeOut();
			$('input[name^="question_24"]').addClass("required");
			$('input[name^="question_25"]').removeClass("required");
			$('input[name^="question_25"]').each(function () { $(this).prop('checked', false); });
			y = true;
		} else {
			$("#subQuestion_25").fadeIn(300);
			$("#subQuestion_24").fadeOut();
			$('input[name^="question_25"]').addClass("required");
			$('input[name^="question_24"]').removeClass("required");
			$('input[name^="question_24"]').each(function () { $(this).prop('checked', false); });
			y = false;
		}
	});

	$('#question_other_22').change(function () {

		if (this.checked) {
			$("#step46inputArea").fadeIn(300);
			$("#step46input").addClass("required");
		} else {
			$("#step46inputArea").fadeOut(300);
			$("#step46input").removeClass("required");
			$("#step46input").val("");
		}

	});

	$('input[type=radio][name=question_14]').change(function () {

		if (this.value == 'İlaç sektörü kesinlikle kariyer yapmak isteyeceğim bir alan değil') {
			$("#step213inputArea").fadeIn(300);
		} else {
			$("#step213inputArea").fadeOut(300);
			$("#step213input").val("");
		}

	});

	$('input[type=radio][name=question_20]').change(function () {

		if (this.value == 'Diğer') {
			$("#step613inputArea").fadeIn(300);
			$("#step613input").addClass("required");
		} else {
			$("#step613inputArea").fadeOut(300);
			$("#step613input").removeClass("required");
			$("#step613input").val("");
		}

	});

	$('#question_other_915').change(function () {

		if (this.checked) {
			$("#step915inputArea").fadeIn(300);
			$("#step915input").addClass("required");
		} else {
			$("#step915inputArea").fadeOut(300);
			$("#step915input").removeClass("required");
			$("#step915input").val("");
		}

	});

	$('#question_other_113').change(function () {

		if (this.checked) {
			$("#step113inputArea").fadeIn(300);
			$("#step113input").addClass("required");
		} else {
			$("#step113inputArea").fadeOut(300);
			$("#step113input").removeClass("required");
			$("#step113input").val("");
		}

	});

	// Preload
	$(window).on('load', function () { // makes sure the whole site is loaded
		$('[data-loader="circle-side"]').fadeOut(); // will first fade out the loading animation
		// $('#preloader').delay(350).fadeOut('slow'); // will fade out the white DIV that covers the website.
		$('.pfizer-loader').delay(800).fadeOut('slow');
		$('body').delay(350).css({
			'overflow': 'visible'
		});
	})

	// Submit loader mask 
	$('form#wrapped').on('submit', function () {

		var unindexed_array = $(this).serializeArray();
		var _values = [];
		var indexed_array = {};
		var sortable_question = "";

		unindexed_array.forEach(function (item) {
			var existing = _values.filter(function (v, i) {
				return v.name == item.name;
			});
			if (existing.length) {
				var existingIndex = _values.indexOf(existing[0]);
				_values[existingIndex].value = _values[existingIndex].value.concat(item.value);
			} else {
				if (typeof item.value == 'string')
					item.value = [item.value];
				_values.push(item);
			}
		});

		$.map(_values, function (n, i) {
			indexed_array[n['name']] = n['value'];
		});

		x == true ? indexed_array.question_19 = [""] : indexed_array.question_18 = [""];
		y == true ? indexed_array.question_25 = [""] : indexed_array.question_24 = [""];

		$(".sortable label").each(function (index) {
			sortable_question += (index + 1) + "-" + $(this).text() + ",";
		});

		sortable_question = sortable_question.substring(0, sortable_question.length - 1);
		indexed_array.sortableQuestion = [sortable_question];

		var form = $("form#wrapped");
		form.validate();
		if (form.valid()) {
			$(".pfizer-loader").fadeIn();

			$.ajax({
				type: 'POST',
				url: 'insert.php',
				dataType: "json",
				data: indexed_array // getting filed value in serialize form
			})
				.done(function (data) { // if getting done then call.

					if (data.status === "ok") {
						$('.pfizer-loader').fadeOut(1000);
						swal({
							title: 'Anket sonucunuz kaydedildi!',
							icon: 'success'
						}).then(function () {
							location.reload();
						});
					} else {
						$('.pfizer-loader').fadeOut(1000);
						swal({
							title: data,
							icon: 'warning'
						});
						console.log(data);
					}
				})
				.fail(function (e) { // if fail then getting message
					console.log(e);
					$('.pfizer-loader').fadeOut(200);
					swal("Hata", "Bağlantı hatası! Lütfen tekrar deneyin.", "error");
				});
			return false;

		}
	});

	// Jquery select
	$('.styled-select select').niceSelect();

	// Show Password
	$('#password1, #password2').hidePassword('focus', {
		toggle: {
			className: 'my-toggle'
		}
	});

	// Range slider
	$('input[type="range"]').rangeslider({
		polyfill: false,
		onInit: function () {
			this.output = $(".budget_slider span").html(this.$element.val());
		},
		onSlide: function (
			position, value) {
			this.output.html(value);
		}
	});

	// Button start scroll to section
	$('a[href^="#"].mobile_btn').on('click', function (e) {
		e.preventDefault();
		var target = this.hash;
		var $target = $(target);
		$('html, body').stop().animate({
			'scrollTop': $target.offset().top
		}, 400, 'swing', function () {
			window.location.hash = target;
		});
	});

	// Menu
	var overlayNav = $('.cd-overlay-nav'),
		overlayContent = $('.cd-overlay-content'),
		navigation = $('.cd-primary-nav'),
		toggleNav = $('.cd-nav-trigger');

	//inizialize navigation and content layers
	layerInit();
	$(window).on('resize', function () {
		window.requestAnimationFrame(layerInit);
	});

	//open/close the menu and cover layers
	toggleNav.on('click', function () {
		if (!toggleNav.hasClass('close-nav')) {
			//it means navigation is not visible yet - open it and animate navigation layer
			toggleNav.addClass('close-nav');

			overlayNav.children('span').velocity({
				translateZ: 0,
				scaleX: 1,
				scaleY: 1,
			}, 500, 'easeInCubic', function () {
				navigation.addClass('fade-in');
			});
		} else {
			//navigation is open - close it and remove navigation layer
			toggleNav.removeClass('close-nav');

			overlayContent.children('span').velocity({
				translateZ: 0,
				scaleX: 1,
				scaleY: 1,
			}, 500, 'easeInCubic', function () {
				navigation.removeClass('fade-in');

				overlayNav.children('span').velocity({
					translateZ: 0,
					scaleX: 0,
					scaleY: 0,
				}, 0);

				overlayContent.addClass('is-hidden').one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function () {
					overlayContent.children('span').velocity({
						translateZ: 0,
						scaleX: 0,
						scaleY: 0,
					}, 0, function () { overlayContent.removeClass('is-hidden') });
				});
				if ($('html').hasClass('no-csstransitions')) {
					overlayContent.children('span').velocity({
						translateZ: 0,
						scaleX: 0,
						scaleY: 0,
					}, 0, function () { overlayContent.removeClass('is-hidden') });
				}
			});
		}
	});

	function layerInit() {
		var diameterValue = (Math.sqrt(Math.pow($(window).height(), 2) + Math.pow($(window).width(), 2)) * 2);
		overlayNav.children('span').velocity({
			scaleX: 0,
			scaleY: 0,
			translateZ: 0,
		}, 50).velocity({
			height: diameterValue + 'px',
			width: diameterValue + 'px',
			top: -(diameterValue / 2) + 'px',
			left: -(diameterValue / 2) + 'px',
		}, 0);

		overlayContent.children('span').velocity({
			scaleX: 0,
			scaleY: 0,
			translateZ: 0,
		}, 50).velocity({
			height: diameterValue + 'px',
			width: diameterValue + 'px',
			top: -(diameterValue / 2) + 'px',
			left: -(diameterValue / 2) + 'px',
		}, 0);
	}

})(window.jQuery);