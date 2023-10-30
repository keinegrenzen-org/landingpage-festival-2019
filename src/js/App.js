import GLightbox from 'glightbox'

export function initSmoothScroll() {
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

export function initSoundCloudFrame() {
    const title = document.querySelector('.soundcloud .title')
    const frame = title.parentNode

    title.addEventListener('click', function () {
        frame.classList.toggle('active')
    })
}

export function initLazyLoad() {
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
