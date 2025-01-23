class Router {
  constructor() {
    this.routes = {
      '/': () => this.renderPage('/'),
      '/work/': () => this.renderPage('/work/'),
      '/contact/': () => this.renderPage('/contact/'),
      '/work/:slug/': (slug) => this.renderPage(`/work/${slug}/`)
    };
    this.init();
  }

  init() {
    window.addEventListener('popstate', () => this.handleLocation());
    this.addLinkListeners();
    this.handleLocation();
  }

  async renderPage(pathname) {
    try {
      const response = await fetch(`${pathname}index.html`);
      if (!response.ok) throw new Error('Page not found');

      const html = await response.text();
      const parser = new DOMParser();
      const doc = parser.parseFromString(html, 'text/html');

      document.querySelector('#app').innerHTML =
        doc.querySelector('#app').innerHTML;
      document.title = doc.title;

      window.history.pushState({}, '', pathname);
    } catch (error) {
      console.error('Navigation failed:', error);
      window.location.href = '/404.html';
    }
  }

  handleLocation(path = window.location.pathname) {
    // Use provided path or current pathname
    for (const route in this.routes) {
      const regex = new RegExp(`^${route.replace(/:\w+/g, '([^/]+)')}$`);
      const matches = path.match(regex);

      if (matches) {
        const params = matches.slice(1);
        if (typeof this.routes[route] === 'function') {
          this.routes[route](...params);
          return;
        }
      }
    }
    // No route match - go to 404
    window.location.href = '/404.md';
  }

  addLinkListeners() {
    document.addEventListener('click', (e) => {
      const link = e.target.closest('[data-router-link]');
      if (link) {
        e.preventDefault();
        const path = link.getAttribute('href');
        this.handleLocation(path); // Pass the path to handleLocation
      }
    });
  }
}

export default Router;
