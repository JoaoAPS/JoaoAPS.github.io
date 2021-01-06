$(document).ready(() => {
  // ----- Initial state -----
  let navVisible = false
  $(".nav").removeClass("nav_visible")

  let card_tag_title = $("<div></div>").addClass("card-tag-title").text("Used in project:")
  $(".card-tag-container").before(card_tag_title)

  let card_expand_icon = $("<i></i>").addClass("fas fa-angle-down card-title-expand")
  $(".card-title").append(card_expand_icon)

  $(".card-description").hide()
  $(".card-link").hide()
  $(".card-tag-title").hide()

  // Navbar toggling
  function toggleNav() {
    if (navVisible) {
      $(".nav").removeClass("nav_visible")
      $(".burger").removeClass("burger_close")
      navVisible = false
    } else {
      $(".nav").addClass("nav_visible")
      $(".burger").addClass("burger_close")
      navVisible = true
    }
  }

  $(".burger").click(toggleNav)
  $(".nav_item").find("a").click(toggleNav)

  // Window scroll events
  $(window).scroll(function () {
    var windscroll = $(window).scrollTop()

    // Navbar active section
    $(".content section").each(function (i) {
      if ($(this).position().top <= windscroll) {
        $(".nav .active").removeClass("active")
        $(".nav .nav_item").eq(i).addClass("active")
      }
    })

    // Change text color when sticky elements get pinned
    $(".sticky").each(function (i) {
      if (Math.abs($(this).position().top - windscroll) < 3) {
        $(this).addClass("is-pinned")
      }
    })

    $(".is-pinned").each(function (i) {
      if (Math.abs($(this).position().top - windscroll) > 3) {
        $(this).removeClass("is-pinned")
      }
    })
  })

  // Portifolio cards expanding
  function expandCard() {
    $(this).siblings(".card-description").slideToggle()
    $(this).siblings(".card-link").slideToggle()
    $(this).siblings(".card-tag-title").slideToggle()
  }

  $(".card-title").click(expandCard)
})
