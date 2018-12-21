import smoothscroll from 'smoothscroll-polyfill'

smoothscroll.polyfill()

class App {

  constructor () {
    this.initSmoothScroll()
    this.initIframe()
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

  initIframe () {
    const iframeElement = document.querySelector('.soundcloud iframe')
    const widget = window.SC.Widget(iframeElement)

    const title = document.querySelector('.soundcloud .title')
    const frame = title.parentNode

    title.addEventListener('click', function () {
      frame.classList.toggle('active')
    })

    widget.bind(window.SC.Widget.Events.READY, function () {
      const triggers = document.querySelectorAll('.sc-trigger')

      for (let trigger of triggers) {
        trigger.addEventListener('click', function () {
          const ids = JSON.parse(trigger.dataset.track)
          if (ids.length > 1) {
            const id = new Date().getSeconds() % 2
            widget.skip(id)
            console.info(id)
          } else {
            widget.skip(ids[0])
            console.info(ids[0])
          }

          frame.classList.add('active')
        })
      }
    })
  }
}

document.addEventListener('DOMContentLoaded', function () {
  new App()
}, false)