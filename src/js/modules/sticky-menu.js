const stickyMenuModule = () => {
  const navMenu = document.getElementById("site-navbar-wrapper")
  const navbar = document.getElementById("navbar-nav")
  const topMenu = navMenu.offsetTop
  const heightMenu = navMenu.clientHeight

  document.addEventListener("scroll", () => {
    if (window.scrollY >= topMenu) {
      navMenu.classList.add("fixed")
      navbar.classList.add("noborder")
    } else {
      navMenu.classList.remove("fixed")
      navbar.classList.remove("noborder")
    }
  })
}

export default stickyMenuModule
