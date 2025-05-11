/**
 * Import dependencies from node_modules
 * see commented examples below
 */

import * as bootstrap from 'bootstrap';

// import 'some-node-module';
// import SomeModule from 'some-node-module';

/**
 * Write any other JavaScript below
 */

+( function() {
  const university = "UOC";
  console.log(`Hello, ${university}!`);

  /**
   * Detectar la pàgina activa a la navegació
   */
  const currentPath = window.location.pathname.replace(/index\.html$/, "").replace(/\/$/, "");

  document.querySelectorAll('.nav-link').forEach(link => {
    const linkPath = new URL(link.href, window.location.origin).pathname.replace(/index\.html$/, "").replace(/\/$/, "");
    if (linkPath === currentPath) {
      link.classList.add('active');
    }
  });

} )();


