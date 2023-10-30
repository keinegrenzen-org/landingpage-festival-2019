function  onSoundCloudLoaded () {
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

const script = document.createElement('script')
script.onload = onSoundCloudLoaded
script.src = '/js/SoundCloud.js'

document.body.append(script)
