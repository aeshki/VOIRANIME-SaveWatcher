/*************
 * CONSTANTS *
 *************/

const HREF_SPLITTED = window.location.pathname
    .slice(7)
    .split('/')
    .filter((f) => f);

const TITLE = HREF_SPLITTED[0];

/*************
 * FUNCTIONS *
 *************/

function _baseDropdown(callback) {
    const select = document.querySelector('.c-selectpicker.selectpicker_chapter.selectpicker.single-chapter-select');
    return select ? callback(select) : false;
}

function getAllEpisodeByDropdown() {
    return _baseDropdown((select) => [...select.options]);
}

function getNextIndexEpisode() {
    return _baseDropdown((select) => select.options[select.selectedIndex - 1].text);
}

function getPreviousIndexEpisode() {
    return _baseDropdown((select) => select.options[select.selectedIndex + 1].text);
}

function getListEpisodes() {
    return [...document.querySelectorAll('.wp-manga-chapter a')];
}

function getCurrentEpisode() {
    return localStorage.getItem(TITLE);
}

function setCurrentEpisode(episode) {
    localStorage.setItem(TITLE, episode);
}

function scrollToLastEpisode() {
    if (!getCurrentEpisode()) {
        return;
    }

    getListEpisodes()
        .find((ep) => ep.textContent.includes(getCurrentEpisode()))
        .scrollIntoView({
            behavior: 'smooth',
            block: 'center',
            inline: 'center'
        });
}

/**************
 * COMPONENTS *
 **************/

function BlackButton(text) {
    return Object.assign(document.createElement('a'), {
        className: 'c-btn c-btn_style-1',
        innerText: text
    });
}

/*********
 * LOGIC *
 *********/

if (HREF_SPLITTED.length > 1) {
    const buttonPrevious = document.querySelector('.nav-previous')

    if (buttonPrevious) {
        buttonPrevious.addEventListener('click', () => setCurrentEpisode(getPreviousIndexEpisode()));
    }

    const buttonNext = document.querySelector('.nav-next')
    
    if (buttonNext) {
        buttonNext.addEventListener('click', () => setCurrentEpisode(getNextIndexEpisode()));
    }

    const select = document.querySelector('.c-selectpicker.selectpicker_chapter.selectpicker.single-chapter-select');

    if (select) {
        select.addEventListener('change', function (e) {
            setCurrentEpisode(this.selectedOptions[0].text);
        });
    }
} else {
    getListEpisodes().forEach((ep) => {
        ep.addEventListener('click', (e) => setCurrentEpisode(e.target.innerText.split('-').reverse()[0]));
    });

    if (getCurrentEpisode() > 0) {
        const buttons = document.querySelector('#init-links');
        const button = BlackButton(`Aller à l'épisode ${+getCurrentEpisode()}`);

        button.addEventListener('click', () => scrollToLastEpisode());

        buttons.insertAdjacentElement('beforeend', button);
    }
}