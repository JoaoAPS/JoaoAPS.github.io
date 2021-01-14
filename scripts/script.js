$(document).ready(() => {
  // ----- Initial state -----
  // Navbar
  let navVisible = false
  $(".nav").removeClass("nav_visible")

  // Portifolio Filter
  let filterVisible = false
  let activeFilters = []
  $(".filter-options").hide()
  $(".filter-option").removeClass("filter-option-active")

  // Portifolio Cards
  let card_tag_title = $("<div></div>").addClass("card-tag-title").text("Usado no projeto:")
  $(".card-tag-container").before(card_tag_title)

  let card_expand_icon = $("<i></i>").addClass("fas fa-angle-down card-title-expand")
  $(".card-title").append(card_expand_icon)

  // --- Desktop responsive ---
  // Portifolio links
  if ($(window).width() >= 750) {
    $(".card").each(function () {
      let url = $(this).children(".card-link")[0].href

      console.log(url)

      $(this).click(() => {
        window.open(url)
      })
    })
  }
  // -------------------------

  //--- Navbar toggling ---
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

  //--- Window scroll events ---
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

  //--- Portifolio cards expanding ---
  function expandCard() {
    if ($(window).width() >= 750) return

    $(this).siblings(".card-description").slideToggle()
    $(this).siblings(".card-link").slideToggle()
    $(this).siblings(".card-tag-title").slideToggle()
  }

  $(".card-title").click(expandCard)

  //--- Portifolio filter ---
  // Open/close filter panel
  $(".filter-heading").click(function () {
    filterVisible = !filterVisible

    if (filterVisible) {
      $(this).text("Close filters ")
      $(this).append($("<i></i>").addClass("fas fa-times"))

      $(".filter-options").slideDown()
    } else {
      $(this).text("Open filters ")
      $(this).append($("<i></i>").addClass("fas fa-bars"))

      $(".filter-options").slideUp()
    }
  })

  // Hides all projects that are filtered out
  function updateFilters() {
    if (activeFilters.length == 0) {
      $(".card").show()
      return
    }

    $(".card").hide()

    for (const idx in activeFilters) {
      $(".card").each(function () {
        tags = $(this).find(".card-tag")
        tags = $.map(tags, x => x.textContent)

        if (tags.includes(activeFilters[idx])) $(this).show()
      })
    }
  }

  // Refilters when a filter option is clicked
  $(".filter-option").click(function () {
    $(this).toggleClass("filter-option-active")

    let option = $(this).text()

    if (activeFilters.includes(option)) {
      activeFilters = activeFilters.filter(x => x != option)
      updateFilters()
    } else {
      // If this is the first active filter, hide all other projects
      if (activeFilters.length == 0) $(".card").hide()

      activeFilters.push(option)

      // Shows projects that have this tag
      $(".card").each(function () {
        tags = $(this).find(".card-tag")
        tags = $.map(tags, x => x.textContent)

        if (tags.includes(option)) $(this).show()
      })
    }
  })

  // Clear filters button
  $(".filter-clear").click(function () {
    activeFilters = []
    $(".filter-option").removeClass("filter-option-active")
    updateFilters()
  })
})
