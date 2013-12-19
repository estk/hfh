Router.map(function() { 
  this.route('home', {path: '/'});
  this.route('projects');
  this.route('contact');
  this.route('history');
  this.route('testimonials');
});

Router.configure({
  layoutTemplate: 'layout',

  yieldTemplates: { 
  /* render the templated named footer to the 'header' yield */
  'header': { to: 'header' },
  }
});
