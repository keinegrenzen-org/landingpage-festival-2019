import smoothscroll from 'smoothscroll-polyfill'

smoothscroll.polyfill()

class App {

  constructor () {
    this.initSmoothScroll()
  }

  initSmoothScroll () {
    const triggers = document.querySelectorAll('.scroll-to')
    for (let trigger of triggers) {
      trigger.addEventListener('click', e => {
        e.preventDefault()

        const clickTarget = e.currentTarget
        const scrollTarget = clickTarget.getAttribute('href')

        const targetElement = document.getElementById(scrollTarget.replace('#', ''))
        const rect = targetElement.getBoundingClientRect()
        const distance = rect.top
        window.scrollBy({top: distance, behavior: 'smooth'})

        history.replaceState({}, '', scrollTarget)
      }, false)
    }
  }
}

document.addEventListener('DOMContentLoaded', function () {
  new App()
}, false)