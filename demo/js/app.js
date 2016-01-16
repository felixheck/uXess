;(function() {

	'use strict';

	angular.module('PortalApp', ['ngMaterial']);

  angular.module('PortalApp').controller('PortalCtrl', function() {
    this.tags = [
      {
        title: 'Photography',
        roles: ['Photographer', 'Admin']
      },
      {
        title: 'Convention',
        roles: ['Photographer', 'Admin', 'Painter']
      },
      {
        title: 'Exhibit',
        roles: ['Photographer', 'Admin', 'Painter']
      },
      {
        title: 'Modernity',
        roles: ['Photographer', 'Admin', 'Painter']
      },
      {
        title: 'Painting',
        roles: ['Admin', 'Painter']
      },
      {
        title: 'Surrealism',
        roles: ['Admin', 'Painter', 'Photographer']
      },
      {
        title: 'Documentation',
        roles: ['Admin', 'Painter', 'Photographer']
      },
      {
        title: 'Management',
        roles: ['Admin']
      }
    ];

    this.videos = [
      {
        title: 'Convention Highlights',
        subtitle: 'The best speeches of the convention 2015',
        tags: ['Photography', 'Convention'],
        roles: ['']
      },
      {
        title: 'Exhibit: The Modern Society',
        subtitle: 'Modern aspects in the streets',
        tags: ['Photography', 'Exhibit', 'Modernity']
      },
      {
        title: 'Series: Surrealism Part 1',
        subtitle: 'The series starts with the basics of the cultural movement',
        tags: ['Painting', 'Surrealism', 'Documentation']
      },
      {
        title: 'Series: Surrealism Part 2',
        subtitle: 'The surrealism in combination with politics',
        tags: ['Painting', 'Surrealism', 'Documentation']
      },
      {
        title: 'How To: Create and manage users',
        subtitle: 'The significant basics of user management',
        tags: ['Management']
      },
      {
        title: 'Series: Surrealism Part 3',
        subtitle: 'The impact and criticism of surrealism',
        tags: ['Painting', 'Surrealism', 'Documentation']
      }
    ]
  });

})();