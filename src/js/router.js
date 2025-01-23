class Router {
  constructor() {
    this.routes = {
      '/': '/',
      '/blog/:id': '/blog/:id',
      '/contact': '/contact'
    };

    // Bind events
    window.addEventListener('popstate', () => this.handleLocation());
    this.addLinkListeners();
  }

  matchRoute(path) {
    for (const route in this.routes) {
      // Replace `:id` with a regex pattern to match dynamic segments
      const regex = new RegExp(`^${route.replace(/:\w+/g, '(\\w+)')}$`);
      const match = path.match(regex);

      if (match) {
        const params = {};
        const keys = route.match(/:\w+/g); // Extract parameter names (e.g., ':id')

        if (keys) {
          keys.forEach((key, index) => {
            params[key.substring(1)] = match[index + 1]; // Map values to keys
          });
        }

        return { route, params };
      }
    }

    return null; // No match found
  }


  addLinkListeners() {
    document.addEventListener('click', (e) => {
      const link = e.target.closest('a');
      if (link && link.href.includes(window.location.origin)) {
        e.preventDefault();
        this.navigateTo(link.href);
      }
    });
  }

  navigateTo(url) {
    const path = new URL(url, window.location.origin).pathname;
    const match = this.matchRoute(path);

    if (!match) {
      console.error('Route not found:', path);
      return;
    }

    const { route, params } = match;
    const handler = this.routes[route];

    if (typeof handler === 'function') {
      handler(params); // Call the route handler with parameters
    } else {
      console.error('Handler not defined for route:', route);
    }

    // Update URL
    window.history.pushState({}, '', url);
  }



  handleLocation() {
    const path = window.location.pathname;
    this.navigateTo(path);
  }
}
