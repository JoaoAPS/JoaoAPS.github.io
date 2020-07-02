$(document).ready(() => {
  let navVisible = false
  $(".nav").removeClass("nav_visible")

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
})
