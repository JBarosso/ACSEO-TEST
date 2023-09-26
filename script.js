let menuToggle = document.querySelector(".menu-toggle");

menuToggle.addEventListener("click", function () {
    if (document.body.classList.contains("menuOpen")) {
        document.body.classList.remove("menuOpen");
    } else {
        document.body.classList.add("menuOpen");
    }
});

$(".slider__container").slick({
    arrows: true,
    infinite: true,
    speed: 600,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    appendArrows: $(".slider__btns"),
    responsive: [
        {
            breakpoint: 1024,
            settings: {
                slidesToShow: 2,
                slidesToScroll: 2,
                infinite: true,
            },
        },
        {
            breakpoint: 767,
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
            },
        },
    ],
});

// ANIMATION SCROLL
let gsapBreakpoints = gsap.matchMedia();

//! SETUP ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

//* PARALLAX
let parallax_Transform = [
    ["xs", "0.04"],
    ["sm", "0.08"],
    ["md", "0.15"],
    ["lg", "0.25"],
    ["xl", "0.35"],
    ["2xl", "0.5"],
    ["3xl", "0.6"],
    ["4xl", "0.75"],
];
let parallax_Names = ["parallaxUp", "parallaxDown"];
let parallax_Classes = classConcat(parallax_Names, parallax_Transform);

//* FADE
let fade_Transform = [
    ["xs", ".1"],
    ["sm", ".2"],
    ["md", ".5"],
    ["lg", "1"],
    ["xl", "2"],
    ["2xl", "3"],
    ["3xl", "5"],
    ["4xl", "10"],
];
//* FADEIN
let fadeIn_Transform = [
    ["xs", "10px"],
    ["sm", "20px"],
    ["md", "30px"],
    ["lg", "50px"],
    ["xl", "100px"],
    ["2xl", "25%"],
    ["3xl", "50%"],
    ["4xl", "100%"],
];

let fadeIn_Names = [
    "gsap-fadeInUp",
    "gsap-fadeInRight",
    "gsap-fadeInDown",
    "gsap-fadeInLeft",
];
let fadeInShow_Names = [
    "gsap-fadeInUpShow",
    "gsap-fadeInRightShow",
    "gsap-fadeInDownShow",
    "gsap-fadeInLeftShow",
];

let fade_Names = ["gsap-fadeInShow"];
let fade_Classes = classConcat(fade_Names, fade_Transform);
let fadeIn_Classes = classConcat(fadeIn_Names, fadeIn_Transform);
let fadeInShow_Classes = classConcat(fadeInShow_Names, fadeIn_Transform);

//* Function pour concaténer des tableaux en class
function classConcat(array1, array2) {
    arraySave = [];
    arrayReturn = [];

    array1.forEach(function (name) {
        array2.forEach(function (modifier) {
            arraySave[0] = name.split(" ")[0] + "--" + modifier[0];
            arraySave[1] = modifier[1];

            arrayReturn.push([arraySave[0], arraySave[1]]);
        });
    });

    return arrayReturn;
}

gsapBreakpoints.add("(min-width: 768px)", () => {
    //* PARALLAX ANIMATION
    parallax_Classes.forEach(function (anim) {
        className = anim[0];
        classModifier = anim[1];
        direction = className.includes("parallaxUp");
        divTarget = document.getElementsByClassName(className);

        if (divTarget.length > 0) {
            allElement = gsap.utils.toArray(`.${className}`);

            allElement.forEach(function (element) {
                gsap.to(element, {
                    scrollTrigger: {
                        trigger: element,
                        scrub: 1.1,
                        start: "top 50%",
                    },
                    y:
                        (direction ? "-" : "") +
                        ScrollTrigger.maxScroll(window) * classModifier,
                    ease: "none",
                });
            });
        }
    });

    //* FADEIN ANIMATION
    fadeIn_Classes.forEach(function (anim) {
        className = anim[0];
        classModifier = anim[1];
        negatif =
            className.includes("fadeInDown") ||
            className.includes("fadeInLeft");
        directionY =
            className.includes("fadeInDown") || className.includes("fadeInUp");
        divTarget = document.getElementsByClassName(className);

        if (divTarget.length > 0) {
            allElement = gsap.utils.toArray(`.${className}`);

            allElement.forEach(function (element) {
                gsap.from(element, {
                    scrollTrigger: {
                        trigger: element,
                        start: "top-=200 80%",
                        end: "center center",
                        scrub: true,
                    },
                    duration: 1,
                    opacity: 0,
                    y: () =>
                        directionY ? (negatif ? "-" : "") + classModifier : "",
                    x: () =>
                        directionY ? "" : (negatif ? "-" : "") + classModifier,
                });
            });
        }
    });
    fadeInShow_Classes.forEach(function (anim) {
        className = anim[0];
        classModifier = anim[1];
        negatif =
            className.includes("fadeInDownShow") ||
            className.includes("fadeInLeftShow");
        directionY =
            className.includes("fadeInDownShow") ||
            className.includes("fadeInUpShow");
        divTarget = document.getElementsByClassName(className);

        if (divTarget.length > 0) {
            allElement = gsap.utils.toArray(`.${className}`);

            allElement.forEach(function (element) {
                gsap.from(element, {
                    scrollTrigger: {
                        trigger: element,
                        start: "top 95%",
                    },
                    duration: 0.5,
                    opacity: 0,
                    ease: "none",
                    y: () =>
                        directionY ? (negatif ? "-" : "") + classModifier : "",
                    x: () =>
                        directionY ? "" : (negatif ? "-" : "") + classModifier,
                });
            });
        }
    });
    fade_Classes.forEach(function (anim) {
        className = anim[0];
        classModifier = anim[1];
        divTarget = document.getElementsByClassName(className);

        if (divTarget.length > 0) {
            allElement = gsap.utils.toArray(`.${className}`);

            allElement.forEach(function (element) {
                gsap.from(element, {
                    scrollTrigger: {
                        trigger: element,
                        start: "top 95%",
                    },
                    duration: classModifier,
                    opacity: 0,
                    ease: "none",
                });
            });
        }
    });

    // FUNCTION POUR FAIRE APPARAITRE 1 PAR 1 UNE LISTE D'ITEMS
    function showItems(items, rows, cols) {
        gsap.set(items, { opacity: 0 });
        ScrollTrigger.refresh();

        ScrollTrigger.batch(items, {
            start: "top 90%",
            onEnter: (batch) =>
                gsap.to(batch, {
                    opacity: 1,
                    stagger: {
                        each: 0.15,
                        from: "1 (index)",
                        grid: [rows, cols],
                    },
                    duration: 0.3,
                    ease: "none",
                }),
        });
    }

    let h1 = document.querySelector("h1");
    let shape1 = document.querySelector(".shape1");
    let shape2 = document.querySelector(".shape2");
    let shape3 = document.querySelector(".shape3");
    let headerContent__illu = document.querySelector(".headerContent__illu");

    let tl_entete = gsap.timeline({
        scrollTrigger: {
            trigger: "body",
        },
    });

    tl_entete
      .to(h1, {
          "clip-path": "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
      })
      .to(headerContent__illu, {
        opacity: 1,
        x: 0,
      }, "<")
      .to(shape1, {
        scaleX: 1,
        scaleY: 1,
      }, "<25%")
      .to(shape2, {
        scaleX: 1,
        scaleY: 1,
      }, "<30%")
      .to(shape3, {
        scaleX: 1,
        scaleY: 1,
      }, "<30%")

    let cards = document.querySelectorAll(".card");
    let logiciels = document.querySelectorAll(".logiciel img");
    showItems(cards, 2, 3);
    showItems(logiciels, 3, 5);
});
