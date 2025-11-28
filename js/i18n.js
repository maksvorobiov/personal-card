(function() {
    const translations = {
        en: {
            title: "Maksym Vorobiov",
            name: "Maksym Vorobiov",
            description: "UAV Engineer / Avionics / Programmer",
            about: "UAV R&D Systems Engineer"
        },
        ua: {
            title: "Максим Воробйов",
            name: "Максим Воробйов",
            description: "Інженер БПЛА / Авіонік / Програміст",
            about: "Інженер з досліджень та розробок БПЛА"
        }
    };

    const defaultLang = 'en';
    const saved = localStorage.getItem('lang');
    const initial = saved || (navigator.language && navigator.language.startsWith('uk') ? 'ua' : defaultLang);

    const toggleBtn = document.getElementById('langToggle');

    // initialize UI
    setLanguage(initial);

    // click to toggle language
    if (toggleBtn) {
        toggleBtn.addEventListener('click', () => {
            const current = localStorage.getItem('lang') || initial;
            const next = (current === 'en') ? 'ua' : 'en';
            setLanguage(next);
        });

        // keyboard: space / enter toggles
        toggleBtn.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                toggleBtn.click();
            }
        });
    }

    function setLanguage(lang) {
        if (!translations[lang]) lang = defaultLang;
        localStorage.setItem('lang', lang);
        document.documentElement.lang = (lang === 'ua' ? 'uk' : 'en');

        // update text
        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.getAttribute('data-i18n');
            const txt = translations[lang][key];
            if (txt !== undefined) {
                if (el.tagName.toLowerCase() === 'input' || el.tagName.toLowerCase() === 'textarea') {
                    el.placeholder = txt;
                } else {
                    el.textContent = txt;
                }
            }
        });

        const titleEl = document.querySelector('title[data-i18n]');
        if (titleEl) titleEl.textContent = translations[lang].title || translations[defaultLang].title;

        // update single toggle button flag (class, aria, emoji)
        if (toggleBtn) {
            toggleBtn.classList.toggle('flag-en', lang === 'ua');
            toggleBtn.classList.toggle('flag-ua', lang === 'en');
            toggleBtn.setAttribute('aria-pressed', 'true'); // still an indicator
            // keep aria-label for screen readers, but remove visible tooltip
            toggleBtn.setAttribute('aria-label', lang === 'en' ? 'English' : 'Українська');
            toggleBtn.removeAttribute('title'); // remove tooltip text
            // show emoji fallback representing current
            toggleBtn.setAttribute('data-emoji', lang === 'en' ? '🇬🇧' : '🇺🇦');
        }
    }
})();