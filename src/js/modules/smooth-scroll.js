const smoothScrool = () => {
  var goTopBtn = document.getElementById("site-to-top")

  const trackScroll = () => {
    var scrolled = window.pageYOffset
    var coords = document.documentElement.clientHeight
    if (scrolled > coords) {
      goTopBtn.classList.add("site-to-top-show")
    }
    if (scrolled < coords) {
      goTopBtn.classList.remove("site-to-top-show")
    }
  }
  const backToTop = () => {
    document
      .getElementById("header")
      .scrollIntoView({ block: "center", behavior: "smooth" })
  }
  window.addEventListener("scroll", trackScroll)
  goTopBtn.addEventListener("click", backToTop)
}

export default smoothScrool
