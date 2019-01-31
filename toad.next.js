// This will not work in most browsers
// due to use of passive event listeners, arrow functions, and variable assignment with let
;((win, doc) => {

  'use strict';
  
  win.addEventListener('load', toad, { passive: true, capture: false, once: true });
  win.addEventListener('scroll', rebounce(toad), { passive: true, capture: false, once: false });
  win.addEventListener('resize', rebounce(toad), { passive: true, capture: false, once: false });

  function isInViewport (r) {
    return r.top >= 0 && r.left >= 0 && r.top <= win.innerHeight;
  }

  function rebounce (f) {
    let scheduled, context, args, i, j;

    return function () {
      context = this; 
      args = [];
      i = arguments.length;
      j = 0;
      
      for (;j < i; ++j) {
        args[j] = arguments[j];
      }
      
      if (!!scheduled) {
        win.cancelAnimationFrame(scheduled);
      }
      
      scheduled = win.requestAnimationFrame(() => {
        f.apply(context, args); 
        scheduled = null;
      });
    }
  }

  function toad () {
    let elements = doc.querySelectorAll('[data-src]') || [];
    let i = elements.length;
    let j = 0;
    
    for (;j < i; ++j) {
      let this_el = elements[j];

      if (!this_el.getAttribute('data-src') || this_el.getAttribute('data-src') === '' || !isInViewport(this_el.getBoundingClientRect())) {
        continue;
      }
      
      if (!!this_el.getAttribute('data-src') && isInViewport(this_el.getBoundingClientRect())) {
        
        if ('img' === this_el.tagName.toLowerCase()) {
          this_el.src = this_el.getAttribute('data-src');
          this_el.removeAttribute('data-src');
          
        } else {
          this_el.style.backgroundImage = 'url(' + this_el.getAttribute('data-src') + ')';
          this_el.removeAttribute('data-src');
        }
        
      }
      
    }
  }

})(window, window.document);
