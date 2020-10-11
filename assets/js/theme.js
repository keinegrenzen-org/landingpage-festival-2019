import 'cookieconsent/src/cookieconsent.js'
import GLightbox from 'glightbox'

class App {

  constructor () {
    this.initSmoothScroll()
    this.initIframe()
    this.initCookieConsent()
    this.initLazyLoad()
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
        window.scrollBy({ top: distance, behavior: 'smooth' })

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

  initLazyLoad () {
    const masonry = document.querySelector('.masonry')
    const images = masonry.querySelectorAll('.masonry-image')
    const lightBoxElements = []

    for (const image of images) {
      lightBoxElements.push({
        'type': 'image',
        'href': image.dataset.fullSrc
      })

      image.addEventListener('click', function(event){
        lightBox.openAt(parseInt(event.target.dataset.index))
      })
    }

    const lightBox = new GLightbox({elements: lightBoxElements})

    const observer = new IntersectionObserver(function (entries, observer) {
      for (const entry of entries) {
        if (entry.intersectionRatio > 0) {
          observer.unobserve(entry.target)

          const image = entry.target
          image.src = image.dataset.src
        }
      }
    })

    for (const image of images) {
      observer.observe(image)
    }
  }
}

document.addEventListener('DOMContentLoaded', function () {
  new App()
}, false)
