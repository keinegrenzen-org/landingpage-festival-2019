import smoothscroll from 'smoothscroll-polyfill'
import CookieConsent from 'cookieconsent/src/cookieconsent';

smoothscroll.polyfill()

class App {

  constructor () {
    this.initSmoothScroll()
    this.initIframe()
    this.initCookieConsent()
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
            widget.skip(ids[id])
          } else {
            widget.skip(ids[0])
          }

          frame.classList.add('active')
        })
      }
    })
  }

  initCookieConsent () {
    window.cookieconsent.initialise({
      'palette': {
        'popup': {
          'background': '#1d1d1b',
          'text': '#ffffff'
        },
        'button': {
          'background': '#fc2d2d',
          'text': '#ffffff'
        }
      },
      'theme': 'edgeless',
      'position': 'bottom-right',
      'content': {
        'message': 'Diese Seite benutzt Cookies um Euch den bestmöglichen Service anbieten zu können. Durch die weitere Nutzung der Webseite stimmt Ihr der Verwendung von Cookies zu.',
        'dismiss': 'Ok!',
        'link': 'Mehr erfahren'
      }
    })
  }
}

document.addEventListener('DOMContentLoaded', function () {
  new App()
}, false)