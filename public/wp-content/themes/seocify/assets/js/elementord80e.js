(function ($, elementor) {
    "use strict";

    var Seocify = {

        init: function () {

            var widgets = {
                'xs-maps.default': Seocify.Map,
                'xs-testimonial.default': Seocify.Testimonial,
                'xs-pricing-table.default': Seocify.Pricing,
                'xs-case-studies.default': Seocify.Case_Studies,
                'xs-funfact.default': Seocify.Funfact,
                'xs-doodle-parallax.default': Seocify.DoodleParallax,
                'xs-work-process.default': Seocify.WorkProcess,
                'xs-piechart.default': Seocify.Piechart,
                'xs-price.default': Seocify.PricingTable,
            };
            $.each(widgets, function (widget, callback) {
                elementor.hooks.addAction('frontend/element_ready/' + widget, callback);
            });
            elementor.hooks.addAction('frontend/element_ready/global', Seocify.GlobalCallback);
        },
        GlobalCallback: function ($scope) {
            var wow = new WOW({
                boxClass: 'wow',
                animateClass: 'animated',
                offset: 0,
                mobile: false,
                live: true,
                scrollContainer: null,
            });
            wow.init();
        },
        Map: function ($scope) {

            var $container = $scope.find('.seocify-maps'),
                map,
                init,
                pins;
            if (!window.google) {
                return;
            }

            init = $container.data('init');
            pins = $container.data('pins');
            map = new google.maps.Map($container[0], init);

            if (pins) {
                $.each(pins, function (index, pin) {

                    var marker,
                        infowindow,
                        pinData = {
                            position: pin.position,
                            map: map
                        };

                    if ('' !== pin.image) {
                        pinData.icon = pin.image;
                    }

                    marker = new google.maps.Marker(pinData);

                    if ('' !== pin.desc) {
                        infowindow = new google.maps.InfoWindow({
                            content: pin.desc
                        });
                    }

                    marker.addListener('click', function () {
                        infowindow.open(map, marker);
                    });

                    if ('visible' === pin.state && '' !== pin.desc) {
                        infowindow.open(map, marker);
                    }

                });
            }
        },

        Funfact: function ($scope) {

            var $number_percentage = $scope.find('.number-percentage');
            $number_percentage.each(function () {
                $(this).animateNumbers($(this).attr("data-value"), true, parseInt($(this).attr("data-animation-duration"), 10));
            });
        },

        DoodleParallax: function ($scope) {
            var $doodle_parallax = $scope.find('.elementor-top-section');
            $doodle_parallax.each(function () {
                if ($(this).find('.doodle-parallax').hasClass('doodle-parallax')) {
                    $(this).attr('data-scrollax-parent', 'true');
                } else {
                    $(this).removeAttr('data-scrollax-parent');
                }
            });
            var a = {
                Android: function () {
                    return navigator.userAgent.match(/Android/i);
                },
                BlackBerry: function () {
                    return navigator.userAgent.match(/BlackBerry/i);
                },
                iOS: function () {
                    return navigator.userAgent.match(/iPhone|iPad|iPod/i);
                },
                Opera: function () {
                    return navigator.userAgent.match(/Opera Mini/i);
                },
                Windows: function () {
                    return navigator.userAgent.match(/IEMobile/i);
                },
                any: function () {
                    return a.Android() || a.BlackBerry() || a.iOS() || a.Opera() || a.Windows();
                }
            };
            var trueMobile = a.any();
            if (null == trueMobile) {
                var b = new Scrollax();
                b.reload();
                b.init();
            }
        },

        Case_Studies: function ($scope) {

            let case_study_slider = $scope.find('.case-study-slider');
            let col_count = case_study_slider.data('column');
            let sliderItem = 0;
            if (col_count == 6) {
                sliderItem = 2;
            } else {
                sliderItem = 3;
            }
            function sliderArrow() {
                $('.case-study-navigation').html('<div class="case-study-button-prev"><i class="xsicon xsicon-arrow-left"></i></div><div class="case-study-button-next"><i class="xsicon xsicon-arrow-right"></i></div>');
            }
            new Swiper(case_study_slider['0'], {
                direction: 'horizontal',
                loop: true,
                slidesPerView: sliderItem,
                slidesPerPage: sliderItem,
                spaceBetween: 33,
                effect: 'slide',
                navigation: {
                    nextEl: '.case-study-button-next',
                    prevEl: '.case-study-button-prev',
                },
                pagination: {
                    el: '.case-study-pagination',
                    clickable: true,
                },
                breakpoints: {
                    0: {
                        slidesPerView: 1,
                    },
                    768: {
                        slidesPerView: 2,
                        spaceBetween: 33,
                    },
                    1024: {
                        slidesPerView: sliderItem,
                        spaceBetween: 33,
                        slidesPerGroup: sliderItem,
                    }
                },
                on: {
                    init: function () {
                        sliderArrow();
                    }
                },
            });
        },


        Testimonial: function ($scope) {
            //style 1
            let testimonial_slider_style_1 = $scope.find(".testimonial-slider-style-1");
            let testimonial_slider_style_1_thumb = $scope.find(".testimonial-slider-style-1-thumb");

            if ((testimonial_slider_style_1 && testimonial_slider_style_1_thumb).length > 0) {
                new Swiper(testimonial_slider_style_1['0'], {
                    loop: true,
                    loopedSlides: 3, //looped slides should be the same
                    autoplay: {
                        delay: 2000,
                    },
                    thumbs: {
                        swiper: new Swiper(testimonial_slider_style_1_thumb['0'], {
                            spaceBetween: 60,
                            centeredSlides: true,
                            slidesPerView: 3,
                            loopedSlides: 3, //looped slides should be the same
                            slideToClickedSlide: true,
                            touchRatio: 1.3,
                            loop: true,
                            autoplay: {
                                delay: 2000,
                            },
                            breakpoints: {
                                0: {
                                    slidesPerView: 1,
                                },
                                768: {
                                    slidesPerView: 2,
                                    spaceBetween: 30,
                                },
                                1024: {
                                    slidesPerView: 3,
                                    spaceBetween: 30,
                                }
                            }
                        }),
                    },
                });
            }

            //     //style 2
            let testimonial_slider_2 = $scope.find(".testimonial-slider");

            if (testimonial_slider_2.length > 0) {
                new Swiper(testimonial_slider_2['0'], {
                    slidesPerView: 1,
                    pagination: {
                        el: '.testimonial-slider2-pagination',
                        clickable: true,
                    },
                    breakpoints: {
                        0: {
                            slidesPerView: 1,
                        },
                        768: {
                            slidesPerView: 1,
                        },
                        1024: {
                            slidesPerView: 1,
                            autoplay: {
                                delay: 500,
                            },
                        },
                    }
                });
            }
            // style 3

            let xs_seocify_testimonial_v2 = $scope.find(".xs-seocify-testimonial-v2");
            let xs_seocify_testimonial_preview = $scope.find(".xs-seocify-testimonial-preview");
            if ((xs_seocify_testimonial_v2 && xs_seocify_testimonial_preview).length > 0) {
                let thumb_style_3 = new Swiper(xs_seocify_testimonial_v2['0'], {
                    slidesPerView: 3,
                    direction: 'horizontal',
                    loop: false,
                    slidesPerView: 5,
                    on: {
                        click: function () {
                            getImage();
                        }
                    }
                });
                new Swiper(xs_seocify_testimonial_preview['0'], {
                    slidesPerView: 1,
                    effect: 'slide',
                    thumbs: {
                        swiper: thumb_style_3,
                    },
                    navigation: {
                        nextEl: '.xs-seocify-testimonial-style3-navigation .testimonial-style3-button-next',
                        prevEl: '.xs-seocify-testimonial-style3-navigation .testimonial-style3-button-prev',
                    }
                });
                function getImage() {
                    let clickedSlide = thumb_style_3.clickedSlide;
                    let item_image_src = $(clickedSlide).find('img').attr('src');
                    $scope.find('.xs-seocify-testimonial-big-thumb').find('img').attr('src', item_image_src);
                }
            }
            //style 4
            let xs_seocify_testimonial_10 = $scope.find(".xs-seocify-testimonial-10");
            if (xs_seocify_testimonial_10.length > 0) {
                new Swiper(xs_seocify_testimonial_10['0'], {
                    slidesPerView: 1,
                    navigation: {
                        nextEl: '.xs-seocify-testimonial-10-navigation .swiper-button-next',
                        prevEl: '.xs-seocify-testimonial-10-navigation .swiper-button-prev',
                    },
                    autoplay: {
                        delay: 2000,
                    },
                    spaceBetween: 60,
                    breakpoints: {
                        0: {
                            slidesPerView: 1,
                        },
                        768: {
                            slidesPerView: 1,
                        },
                        1024: {
                            slidesPerView: 1,
                            autoplay: {
                                delay: 2000,
                            },
                        },
                    }
                });
            }



        },

        Pricing: function (e) {
            var xs_pricing_table = e.find('.pricing-matrix-slider');

            if (!xs_pricing_table) {
                return;
            }

            // xs_pricing_table.on('initialized.owl.carousel translated.owl.carousel', function () {
            //     var $this = $(this);
            //     $this.find('.owl-item.last-child').each(function () {
            //         $(this).removeClass('last-child');
            //     });
            //     $(this).find('.owl-item.active').last().addClass('last-child');
            // });
            // xs_pricing_table.myOwl({
            //     items: 3,
            //     mouseDrag: false,
            //     autoplay: true,
            //     nav: true,
            //     navText: ['<i class="icon icon-arrow-left"></i>', '<i class="icon icon-arrow-right"></i>'],
            //     responsive: {
            //         0: {
            //             items: 1,
            //             mouseDrag: true,
            //             loop: true,
            //         },
            //         768: {
            //             items: 2,
            //             mouseDrag: true
            //         },
            //         1024: {
            //             items: 3,
            //             mouseDrag: false,
            //             loop: false
            //         }
            //     }
            // });
            equalHeight();
            function equalHeight() {

                let pricingImage = e.find('.pricing-image'),
                    pricingFeature = e.find('.pricing-feature-group');
                if ($(window).width() > 991) {
                    pricingImage.css('height', pricingFeature.outerHeight());
                } else {
                    pricingImage.css('height', 100 + '%');
                }
            }
        },
        WorkProcess: function ($scope) {
            let workprocessSlider = $scope.find(".workprocess-sync1");
            let workprocessPosts = $scope.find(".workprocess-sync2");
            if (workprocessPosts.length > 0 && workprocessSlider.length > 0) {
                let controls = workprocessPosts.data('controls');
                let widget_id = controls.widget_id;
                let workprocesspostSlider = new Swiper(workprocessPosts['0'], {
                    loop: true,
                    loopedSlides: 3,
                    slidesPerView: 3,
                    breakpoints: {
                        0: {
                            slidesPerView: 1,
                        },
                        768: {
                            slidesPerView: 2,
                        },
                        1024: {
                            slidesPerView: 3,
                        }
                    }
                });
                new Swiper(workprocessSlider['0'], {
                    loop: true,
                    loopedSlides: 3,
                    slidesPerView: 3,
                    slideToClickedSlide: true,
                    thumbs: {
                        swiper: workprocesspostSlider,
                    },
                    breakpoints: {
                        0: {
                            slidesPerView: 1,
                        },
                        768: {
                            slidesPerView: 2,
                        },
                        1024: {
                            slidesPerView: 3,
                        }
                    },
                    navigation: {
                        nextEl: `.work-process-button-next-${widget_id}`,
                        prevEl: `.work-process-button-prev-${widget_id}`,
                    }
                });
                //var activeLine = $('.workprocess-sync2 .item p');
                var activeLine = $(`.workprocess-sync2-${widget_id} .item p`);

                $(`.workprocess-sync2-${widget_id} .item p`).on('click', function () {

                    if ($(this).closest('.item').hasClass('xs-selected')) {
                        $(this).closest('.item').removeClass('xs-selected');
                    } else {
                        $(this).closest('.item').addClass('xs-selected');
                    }
                });
            }

        },
        Piechart: function ($scope) {

            let chart = $scope.find(".chart");
            $('[data-percent]').each(function () {
                var value = $(this).attr('data-percent');
                $(this).find('.chart-content').append('<span class="chart-value">' + value + '%</span>');
            })
            $(chart).each(function () {
                let color = $(this).data('color')
                let value = $(this).find('.chart-value')
                $(this).myChart({
                    barColor: color
                })
                $(value).css('color', color);
            })
        },

        PricingTable: function ($scope) {
            /*=============================================================
                    26. tab swipe indicator
            =========================================================================*/
            if ($scope.find('.tab-swipe').length > 0) {
                if ($scope.find('.indicator').length === 0) {
                    $scope.find('.tab-swipe').append('<li class="indicator"></li>');
                }


                let cLeft = $('.tab-swipe').find('.active').position().left + 'px',
                    cWidth = $('.tab-swipe').find('.active').css('width');
                $scope.find('.indicator').css({
                    left: cLeft,
                    width: cWidth
                })

                $scope.find('.tab-swipe li a').on('click', function () {
                    let cLeft = $(this).position().left + 'px',
                        cWidth = $(this).css('width');
                    $(this).parents('.tab-swipe').find('.indicator').css({
                        left: cLeft,
                        width: cWidth
                    })
                });
            }
        }
    };
    $(window).on('elementor/frontend/init', Seocify.init);
}(jQuery, window.elementorFrontend));