import fitti from 'fitty'
import FontFaceObserver from 'fontfaceobserver'
import smoothscroll from 'smoothscroll-polyfill'
import StickyState from 'sticky-state'

smoothscroll.polyfill()

const font = new FontFaceObserver('League Gothic')

font.load().then(function () {
  fitti.fitAll()
})

class App {

  constructor () {
    this.menuBar = document.querySelector('.fixed-nav')
    this.navHeight = document.querySelector('.fixed-nav').offsetHeight
    this.initSmoothScroll()
    this.initFlowType()
    this.initSticky()
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
        const distance = rect.top - this.navHeight + 2
        window.scrollBy({top: distance, behavior: 'smooth'})

        history.replaceState({}, '', scrollTarget)
      }, false)
    }
  }

  initFlowType () {
    const flowTypes = document.querySelectorAll('.fitti')
    for (let flowType of flowTypes) {
      fitti(flowType, {
        minSize: 20,
        maxSize: 200
      })
    }
  }

  initSticky () {
    new StickyState(this.menuBar)
  }
}

document.addEventListener('DOMContentLoaded', function () {
  new App()
}, false)