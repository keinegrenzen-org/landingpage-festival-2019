import GLightbox from 'glightbox'

export class App {

  constructor () {
    this.acceptedEmbeddings = window.CCM ? window.CCM.acceptedEmbeddings.map(item => item.name) : []

    this.initSmoothScroll()
    this.initSoundCloud()
    this.initYouTube()
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

  initYouTube () {
    if (!this.acceptedEmbeddings.includes('Google') || !this.acceptedEmbeddings.includes('YouTube')) {
      return
    }

    const videos = document.querySelectorAll('.youtube-embed')
    for (const video of videos) {
      const markup = `
        <iframe
          width="560"
          height="315"
          src="${video.dataset.source}"
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
        ></iframe>
     `

      video.parentElement.insertAdjacentHTML('beforeend', markup)
      video.remove()
    }
  }

  initSoundCloud () {
    const title = document.querySelector('.soundcloud .title')
    const frame = title.parentNode

    title.addEventListener('click', function () {
      frame.classList.toggle('active')
    })

    if (!this.acceptedEmbeddings.includes('SoundCloud')) {
      return
    }

    const links = document.querySelectorAll('.soundcloud-entry')
    for (const link of links) {
      const tag = document.createElement('script')
      tag.src = link.dataset.source
      tag.addEventListener('load', this.onSoundCloudLoaded)
      link.replaceWith(tag)
    }
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

      image.addEventListener('click', function (event) {
        lightBox.openAt(parseInt(event.target.dataset.index))
      })
    }

    const lightBox = new GLightbox({ elements: lightBoxElements })

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

  onSoundCloudLoaded () {
    const title = document.querySelector('.soundcloud .title')
    const frame = title.parentNode

    const embed = document.querySelector('.soundcloud-embed')
    const markup = `
      <iframe
        width="100%"
        height="450"
        title="SoundCloud Player"
        src="${embed.dataset.source}"
      ></iframe>
     `

    embed.parentElement.insertAdjacentHTML('beforeend', markup)
    embed.remove()

    const iframeElement = document.querySelector('.soundcloud iframe')
    const widget = window.SC.Widget(iframeElement)

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
}