let menuToggle = document.querySelector(".menu-toggle");

menuToggle.addEventListener("click", function() {
    if(document.body.classList.contains("menuOpen")){
        document.body.classList.remove("menuOpen")
    } else{
        document.body.classList.add("menuOpen")
    }
})

$('.slider__container').slick({
    arrows: true,
    infinite: true,
    speed: 600,
    slidesToShow: 3,
    slidesToScroll: 1,
    appendArrows: $(".slider__btns"),
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          infinite: true,
        }
      },
      {
        breakpoint: 767,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
});