// ================================
// Killpips Mind & Markets - Main JavaScript
// ================================

$(document).ready(function () {
    // ================================
    // MOBILE NAVIGATION TOGGLE
    // ================================
    $('#navToggle').on('click', function () {
        $(this).toggleClass('active');
        $('#navMenu').toggleClass('active');
    });

    // Close mobile menu when clicking a link
    $('.nav-link').on('click', function () {
        $('#navToggle').removeClass('active');
        $('#navMenu').removeClass('active');
    });

    // ================================
    // SMOOTH SCROLL FOR ANCHOR LINKS
    // ================================
    $('a[href^="#"]').on('click', function (e) {
        e.preventDefault();
        const target = $(this.getAttribute('href'));
        if (target.length) {
            $('html, body').animate({
                scrollTop: target.offset().top - 80
            }, 800, 'swing');
        }
    });

    // ================================
    // NAVBAR SCROLL EFFECT
    // ================================
    $(window).on('scroll', function () {
        const navbar = $('.navbar');
        if ($(window).scrollTop() > 50) {
            navbar.addClass('scrolled');
        } else {
            navbar.removeClass('scrolled');
        }
    });

    // ================================
    // SCROLL REVEAL ANIMATION
    // ================================
    function revealOnScroll() {
        const reveals = document.querySelectorAll('.reveal');
        const windowHeight = window.innerHeight;
        const revealPoint = 150;

        reveals.forEach(function (reveal) {
            const revealTop = reveal.getBoundingClientRect().top;
            if (revealTop < windowHeight - revealPoint) {
                reveal.classList.add('active');
            }
        });
    }

    // Initial check
    revealOnScroll();

    // On scroll
    $(window).on('scroll', revealOnScroll);

    // ================================
    // STAGGERED CARD ANIMATIONS
    // ================================
    function animateCards() {
        $('.card, .scheme-card').each(function (index) {
            const card = $(this);
            const cardTop = card.offset().top;
            const windowBottom = $(window).scrollTop() + $(window).height();

            if (cardTop < windowBottom - 100) {
                setTimeout(function () {
                    card.addClass('animate-in');
                }, index * 100);
            }
        });
    }

    animateCards();
    $(window).on('scroll', animateCards);

    // ================================
    // ACTIVE NAV LINK HIGHLIGHTING
    // ================================
    function updateActiveNav() {
        const scrollPos = $(window).scrollTop() + 100;

        $('section[id]').each(function () {
            const section = $(this);
            const sectionTop = section.offset().top;
            const sectionHeight = section.outerHeight();
            const sectionId = section.attr('id');

            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                $('.nav-link').removeClass('active');
                $(`.nav-link[href="#${sectionId}"]`).addClass('active');
            }
        });
    }

    $(window).on('scroll', updateActiveNav);

    // ================================
    // COUNTER ANIMATION FOR STATS
    // ================================
    function animateCounters() {
        $('.stat-number').each(function () {
            const $this = $(this);
            if ($this.hasClass('counted')) return;

            const offset = $this.offset().top;
            const windowBottom = $(window).scrollTop() + $(window).height();

            if (offset < windowBottom) {
                $this.addClass('counted');
                const countTo = $this.text().replace('+', '');
                const hasPlus = $this.text().includes('+');

                if (!isNaN(countTo)) {
                    $({ countNum: 0 }).animate({
                        countNum: parseInt(countTo)
                    }, {
                        duration: 1500,
                        easing: 'swing',
                        step: function () {
                            $this.text(Math.floor(this.countNum) + (hasPlus ? '+' : ''));
                        },
                        complete: function () {
                            $this.text(countTo + (hasPlus ? '+' : ''));
                        }
                    });
                }
            }
        });
    }

    animateCounters();
    $(window).on('scroll', animateCounters);

    // ================================
    // PARALLAX EFFECT FOR HERO
    // ================================
    $(window).on('scroll', function () {
        const scrolled = $(window).scrollTop();
        $('.hero-gradient').css('transform', `translateY(${scrolled * 0.3}px)`);
        $('.hero-grid').css('transform', `translateY(${scrolled * 0.1}px)`);
    });

    // ================================
    // CARD HOVER GLOW EFFECT
    // ================================
    $('.card, .scheme-card').on('mousemove', function (e) {
        const rect = this.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        $(this).css('--mouse-x', `${x}px`);
        $(this).css('--mouse-y', `${y}px`);
    });

    // ================================
    // LIGHTBOX FUNCTIONALITY
    // ================================
    // Open Lightbox
    $(document).on('click', '.lightbox-trigger', function () {
        const imgSrc = $(this).attr('src');
        const imgAlt = $(this).attr('alt');

        $('#lightbox-img').attr('src', imgSrc);
        $('#lightbox-caption').text(imgAlt);
        $('#lightbox-modal').addClass('show').css('display', 'block');
        $('body').css('overflow', 'hidden'); // Prevent background scrolling
    });

    // Close Lightbox (Click X or Outside)
    function closeLightbox() {
        $('#lightbox-modal').removeClass('show');
        setTimeout(() => {
            $('#lightbox-modal').css('display', 'none');
            $('body').css('overflow', 'auto');
        }, 300);
    }

    $(document).on('click', '.lightbox-close', closeLightbox);

    $(document).on('click', '#lightbox-modal', function (e) {
        if ($(e.target).is('#lightbox-modal')) {
            closeLightbox();
        }
    });

    // Close on Escape Key
    $(document).keydown(function (e) {
        if (e.key === "Escape") {
            closeLightbox();
        }
    });

    console.log('✨ Killpips Mind & Markets loaded successfully!');
});
