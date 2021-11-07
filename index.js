var canPlaySample = false;

window.addEventListener('DOMContentLoaded', evt => {
    initPlayButton();
    initAnimationElements();
});

function initPlayButton() {
    const audioObj = new Audio('./assets/sample.mp3');
    audioObj.addEventListener('canplaythrough', _ => canPlaySample = true);

    const playButton = document.getElementById('play-button')
    if (playButton) {
        playButton.addEventListener('click', () => {
            if (canPlaySample) {
                audioObj.play();
            }
        });

        playButton.addEventListener('mouseenter', () => {
            if (playButton.classList.contains('scale-down-center')) {
                playButton.classList.remove('scale-down-center')
            }
            if (!playButton.classList.contains('scale-up-center')) {
                playButton.classList.add('scale-up-center')
            }
        })

        playButton.addEventListener('mouseleave', () => {
            if (playButton.classList.contains('scale-up-center')) {
                playButton.classList.remove('scale-up-center')
                playButton.classList.add('scale-down-center')
            }
        })
    }
}

function initAnimationElements() {
    const invisibleElements = document.getElementsByClassName("Animate-on-display")
    Array.from(invisibleElements).forEach(elem => {
        new IntersectionObserver((entries, observer) => {
            const entry = entries[0]
            if (entries[0].isIntersecting) {
                const animationName = entry.target.getAttribute("data-animation")
                elem.classList.add(animationName)
                elem.classList.remove("Invisible")
                observer.disconnect()
            }
        },
            { root: null, rootMargin: "0px", threshold: 0.5 }).observe(elem)
    })
}