/* Shared navigation, accessible theme switch, and small UI enhancements. */
(function () {
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('navLinks');

    if (hamburger && navLinks) {
        hamburger.addEventListener('click', function () {
            const isOpen = navLinks.classList.toggle('open');
            hamburger.setAttribute('aria-expanded', String(isOpen));
        });
        navLinks.querySelectorAll('a').forEach(function (link) {
            link.addEventListener('click', function () {
                navLinks.classList.remove('open');
                hamburger.setAttribute('aria-expanded', 'false');
            });
        });
        document.addEventListener('click', function (event) {
            if (!hamburger.contains(event.target) && !navLinks.contains(event.target)) {
                navLinks.classList.remove('open');
                hamburger.setAttribute('aria-expanded', 'false');
            }
        });
    }

    // Dark mode switch: the site starts in its bright theme; visitors can switch the full interface to dark.
    const root = document.documentElement;
    let savedTheme = null;
    try { savedTheme = localStorage.getItem('oms-theme'); } catch (_) { /* storage may be disabled */ }
    const initialTheme = savedTheme === 'dark' ? 'dark' : 'light';
    root.setAttribute('data-theme', initialTheme);

    const nav = document.querySelector('header nav');
    if (nav && !document.getElementById('themeToggle')) {
        const button = document.createElement('button');
        button.type = 'button';
        button.id = 'themeToggle';
        button.className = 'theme-toggle';
        button.setAttribute('aria-label', initialTheme === 'dark' ? 'Turn dark mode off' : 'Turn dark mode on');
        button.setAttribute('aria-pressed', String(initialTheme === 'light'));
        button.innerHTML = initialTheme === 'dark' ? '<span aria-hidden="true">☀</span><span class="theme-toggle-label">Exit dark mode</span>' : '<span aria-hidden="true">☾</span><span class="theme-toggle-label">Dark mode</span>';
        // Insert beside the mobile menu button, without replacing existing navigation.
        if (hamburger && hamburger.parentNode === nav) nav.insertBefore(button, hamburger);
        else nav.appendChild(button);
        button.addEventListener('click', function () {
            const nextTheme = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
            root.setAttribute('data-theme', nextTheme);
            button.setAttribute('aria-label', nextTheme === 'dark' ? 'Turn dark mode off' : 'Turn dark mode on');
            button.setAttribute('aria-pressed', String(nextTheme === 'light'));
            button.innerHTML = nextTheme === 'dark' ? '<span aria-hidden="true">☀</span><span class="theme-toggle-label">Exit dark mode</span>' : '<span aria-hidden="true">☾</span><span class="theme-toggle-label">Dark mode</span>';
            try { localStorage.setItem('oms-theme', nextTheme); } catch (_) { /* theme still works for this page */ }
        });
    }

    // Update the year in the shared footer when that text is present.
    const copy = document.querySelector('.footer-copy');
    if (copy) copy.innerHTML = copy.innerHTML.replace(/2025|2026/, String(new Date().getFullYear()));
})();
