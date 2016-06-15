'use strict';

ionic.Platform.isIE = function() {
  return ionic.Platform.ua.toLowerCase().indexOf('trident') > -1;
};

if (ionic.Platform.isIE()) {
  angular.module('ionic')
    .factory('$ionicNgClick', ['$parse', '$timeout', function($parse, $timeout) {
      return function(scope, element, clickExpr) {
        var clickHandler = angular.isFunction(clickExpr) ? clickExpr : $parse(clickExpr);

        element.on('click', function(event) {
          scope.$apply(function() {
            if (scope.clicktimer) {
                return; // Second call
            }
            clickHandler(scope, {$event: (event) });
            scope.clicktimer = $timeout(function() { delete scope.clicktimer; }, 1, false);
          });
        });

        // Hack for iOS Safari's benefit. It goes searching for onclick handlers and is liable to click
        // something else nearby.
        element.onclick = function(event) { };
      };
    }]);
}

angular.module('mushin', ['ionic', 'ionic.contrib.ui.tinderCards2'])

    .directive('noScroll', function($document) {

        return {
            restrict: 'A',
            link: function($scope, $element, $attr) {

                $document.on('touchmove', function(e) {
                    e.preventDefault();
                });
            }
        };
    })

    .factory('SearchService', [function () {
        var items = [
            {
                id: 1,
                album: 'The Very Best of Jazz',
                artist: 'John Coltrane',
                song: 'Time After Time',
                image: 'https://i.scdn.co/image/c8a141a3ee1be890b8dceb2329e2ff27887ca033'
            },
            {
                id: 2,
                album: 'Plays Ballads',
                artist: 'Ben Webster',
                song: 'Stardust',
                image: 'https://i.scdn.co/image/6f19e383a2ec009bc81ff92d10198345d1ba2a6d'
            },
            {
                id: 3,
                album: 'Julie is Her Name',
                artist: 'Julie London Ray',
                song: 'I\'m in the Mood for Love',
                image: 'https://d3rt1990lpmkn.cloudfront.net/unbranded/6d028ce936fd640bc20d298a1f19fbe15c3e93b4'
            },
            {
                id: 4,
                album: 'Time Out',
                artist: 'The Dave Brubeck Quartet',
                song: 'Take Five',
                image: 'https://d3rt1990lpmkn.cloudfront.net/unbranded/09c618cf3172728ca47205e2289c7179bba697d2'
            },
            {
                id: 5,
                album: 'Gershwin for Lovers',
                artist: 'Marcus Roberts',
                song: 'Love is Here to Stay',
                image: 'https://d3rt1990lpmkn.cloudfront.net/unbranded/4cab3a57e53715c80d76463566a708f41e3a28f3'
            },
            {
                id: 6,
                album: 'Sony Jazz Collection',
                artist: 'Stan Getz',
                song: 'Misty',
                image: 'https://d3rt1990lpmkn.cloudfront.net/unbranded/97d32c490357e2cfeed4edda45ccc4502224f35e'
            },
            {
                id: 7,
                album: 'Everybody Digs Bill Evans',
                artist: 'Bill Evans Trio',
                song: 'Young and Foolish',
                image: 'https://d3rt1990lpmkn.cloudfront.net/unbranded/7949f980a674b3fad51cd5474097e821c7893034'
            },
            {
                id: 8,
                album: 'Jazz Legends: Saxophone',
                artist: 'Miles Davis',
                song: 'Blue in Green',
                image: 'https://d3rt1990lpmkn.cloudfront.net/unbranded/6ac05410631fa4cdb6452dc6f7ad875ee55c5f20'
            },
            {
                id: 9,
                album: 'The Best of Art Blakey',
                artist: 'Art Blackey & The Jazz Messengers',
                song: 'Moanin\'',
                image: 'https://d3rt1990lpmkn.cloudfront.net/unbranded/10b58dc4bc687ec3d9fa06d72bd791549fedff59'
            },
            {
                id: 10,
                album: 'Giant Steps',
                artist: 'John Coltrane',
                song: 'Naima',
                image: 'https://d3rt1990lpmkn.cloudfront.net/unbranded/ce7cdb07d53fbe011c693bd5ee09c87e90d1d0dc'
            },
        ];
        return {
            GetResults: function () {
                return items;
            },
            GetDetails: function (id) {
                id = parseInt(id);
                for (var i=0; i<items.length; i++) {
                    if (items[i].id === id) {
                        return items[i];
                    }
                }
                return false;
            }
        };
    }])

    .factory('PlaylistService', [function () {
        var items = [
            {
                id: 1,
                album: 'The Very Best of Jazz',
                artist: 'John Coltrane',
                song: 'Time After Time',
                image: 'https://i.scdn.co/image/c8a141a3ee1be890b8dceb2329e2ff27887ca033'
            },
            {
                id: 2,
                album: 'Plays Ballads',
                artist: 'Ben Webster',
                song: 'Stardust',
                image: 'https://i.scdn.co/image/6f19e383a2ec009bc81ff92d10198345d1ba2a6d'
            },
            {
                id: 3,
                album: 'Julie is Her Name',
                artist: 'Julie London Ray',
                song: 'I\'m in the Mood for Love',
                image: 'https://d3rt1990lpmkn.cloudfront.net/unbranded/6d028ce936fd640bc20d298a1f19fbe15c3e93b4'
            },
            {
                id: 4,
                album: 'Time Out',
                artist: 'The Dave Brubeck Quartet',
                song: 'Take Five',
                image: 'https://d3rt1990lpmkn.cloudfront.net/unbranded/09c618cf3172728ca47205e2289c7179bba697d2'
            },
            {
                id: 5,
                album: 'Gershwin for Lovers',
                artist: 'Marcus Roberts',
                song: 'Love is Here to Stay',
                image: 'https://d3rt1990lpmkn.cloudfront.net/unbranded/4cab3a57e53715c80d76463566a708f41e3a28f3'
            },
            {
                id: 6,
                album: 'Sony Jazz Collection',
                artist: 'Stan Getz',
                song: 'Misty',
                image: 'https://d3rt1990lpmkn.cloudfront.net/unbranded/97d32c490357e2cfeed4edda45ccc4502224f35e'
            },
            {
                id: 7,
                album: 'Everybody Digs Bill Evans',
                artist: 'Bill Evans Trio',
                song: 'Young and Foolish',
                image: 'https://d3rt1990lpmkn.cloudfront.net/unbranded/7949f980a674b3fad51cd5474097e821c7893034'
            },
            {
                id: 8,
                album: 'Jazz Legends: Saxophone',
                artist: 'Miles Davis',
                song: 'Blue in Green',
                image: 'https://d3rt1990lpmkn.cloudfront.net/unbranded/6ac05410631fa4cdb6452dc6f7ad875ee55c5f20'
            },
            {
                id: 9,
                album: 'The Best of Art Blakey',
                artist: 'Art Blackey & The Jazz Messengers',
                song: 'Moanin\'',
                image: 'https://d3rt1990lpmkn.cloudfront.net/unbranded/10b58dc4bc687ec3d9fa06d72bd791549fedff59'
            },
            {
                id: 10,
                album: 'Giant Steps',
                artist: 'John Coltrane',
                song: 'Naima',
                image: 'https://d3rt1990lpmkn.cloudfront.net/unbranded/ce7cdb07d53fbe011c693bd5ee09c87e90d1d0dc'
            },
        ];
        return {
            GetItems: function () {
                return items;
            }
        };
    }])

    .config(function($stateProvider, $urlRouterProvider) {

        $stateProvider
        .state('intro', {
            url: '/',
            templateUrl: 'templates/intro.html',
            controller: 'IntroCtrl'
        })
        .state('tabs', {
            url: '/tab',
            abstract: true,
            templateUrl: 'templates/tabs.html'
        })
        .state('tabs.menu', {
            url: '/menu',
            views: {
                'menu-tab': {
                    templateUrl: 'templates/menu.html',
                    controller: 'MenuCtrl'
                }
            }
        })
        .state('tabs.play', {
            url: '/play',
            views: {
                'play-tab': {
                    templateUrl: 'templates/play.html',
                    controller: 'PlayCtrl'
                }
            }
        })
        .state('tabs.nowPlaying', {
            url: '/nowPlaying',
            views: {
                'nowPlaying-tab': {
                    templateUrl: 'templates/nowPlaying.html',
                    controller: 'NowPlayingCtrl'
                }
            }
        })
        .state('tabs.playlist', {
            url: '/playlist',
            views: {
                'playlist-tab': {
                    templateUrl: 'templates/playlist.html',
                    controller: 'PlaylistCtrl'
                }
            }
        })
        .state('tabs.search', {
            url: '/search',
            views: {
                'search-tab': {
                    templateUrl: 'templates/search.html',
                    controller: 'SearchCtrl'
                }
            }
        })
        .state('search-details', {
            url: '/search/details/:id',
            templateUrl: 'templates/search.details.html',
            controller: 'SearchDetailsCtrl'
        });

        $urlRouterProvider.otherwise('/');

    })

    .controller('IntroCtrl', function($scope, $state, $ionicSlideBoxDelegate) {

        // Called to navigate to the main app
        $scope.startApp = function() {
            $state.go('tabs.play');
        };
        $scope.next = function() {
            $ionicSlideBoxDelegate.next();
        };
        $scope.previous = function() {
            $ionicSlideBoxDelegate.previous();
        };

        // Called each time the slide changes
        $scope.slideChanged = function(index) {
            $scope.slideIndex = index;    
            alert();  
        };
    })

    .controller('MainCtrl', function($scope, $state) {
        console.log('MainCtrl');

        $scope.toIntro = function(){
            $state.go('intro');
        };
    })

    .controller('MenuCtrl', function($scope, $state) {
        console.log('MenuCtrl');

        $scope.toIntro = function(){
            $state.go('intro');
        };
    })

    .controller('PlayCtrl', function($scope, $state, TDCardDelegate, $timeout) {
        console.log('PlayCtrl');

        $scope.reset = function(){
            //$scope.cards = Array.prototype.slice.call(cardTypes2, 0);
            //$scope.cards.push({ image: 'http://assets3.sharedplaylists.com/playlists/7a/03/74/sz300x300_irish-indie-folk-4dda8d9e7e.png' });
        };

        var cardTypes = [
            {
                image: 'http://assets1.sharedplaylists.com/playlists/43/11/74/sz300x300_rock-pra-correr-5395d042a7.png',
                user: {
                    image: 'https://randomuser.me/api/portraits/women/32.jpg',
                    name: 'Norma Hunt'
                },
                song: {
                    album: 'Jazz Legends: Saxophone',
                    artist: 'Miles Davis',
                    name: 'Blue in Green'
                },
                likes: 10
            },
            {
                image: 'http://assets2.sharedplaylists.com/playlists/6c/81/74/sz300x300_bukta-2015-cfb9646b26.png',
                user: {
                    image: 'https://randomuser.me/api/portraits/women/54.jpg',
                    name: 'Colleen Chambers'
                },
                song: {
                    album: 'The Best of Art Blakey',
                    artist: 'Art Blackey & The Jazz Messengers',
                    name: 'Moanin\''
                },
                likes: 3
            },
            {
                image: 'http://assets3.sharedplaylists.com/playlists/ab/cb/74/sz300x300_mtv-days-92f6d828bd.png',
                user: {
                    image: 'https://randomuser.me/api/portraits/men/15.jpg',
                    name: 'Cameron Cole'
                },
                song: {
                    album: 'Jazz Legends: Saxophone',
                    artist: 'Miles Davis',
                    name: 'Blue in Green'
                },
                likes: 14
            },
            {
                image: 'http://assets3.sharedplaylists.com/playlists/a1/7c/bc/sz300x300_discover-weekly-365-e635c45d55.png',
                user: {
                    image: 'https://randomuser.me/api/portraits/women/14.jpg',
                    name: 'Avery Vasquez'
                },
                song: {
                    album: 'Gershwin for Lovers',
                    artist: 'Marcus Roberts',
                    name: 'Love is Here to Stay'
                },
                likes: 23
            },
            {
                image: 'http://assets1.sharedplaylists.com/playlists/c6/be/bc/sz300x300_rainy-day-classical-afc98b3531.png',
                user: {
                    image: 'https://randomuser.me/api/portraits/women/37.jpg',
                    name: 'Alicia Crawford'
                },
                song: {
                    album: 'Jazz Legends: Saxophone',
                    artist: 'Miles Davis',
                    name: 'Blue in Green'
                },
                likes: 21
            },
            {
                image: 'http://assets0.sharedplaylists.com/playlists/d1/f3/bc/sz300x300_lessentiel-du-jazz-6b069594cf.png',
                user: {
                    image: 'https://randomuser.me/api/portraits/men/42.jpg',
                    name: 'Javier Green'
                },
                song: {
                    album: 'Gershwin for Lovers',
                    artist: 'Marcus Roberts',
                    name: 'Love is Here to Stay'
                },
                likes: 19
            },
            {
                image: 'http://assets1.sharedplaylists.com/playlists/9c/92/74/sz300x300_womad-uk-2015-official-78e3244e14.jpg',
                user: {
                    image: 'https://randomuser.me/api/portraits/men/33.jpg',
                    name: 'Jack Mills'
                },
                song: {
                    album: 'Jazz Legends: Saxophone',
                    artist: 'Miles Davis',
                    name: 'Blue in Green'
                },
                likes: 7
            },
            {
                image: 'http://assets2.sharedplaylists.com/playlists/06/63/74/sz300x300_david-mix-d-and-a-4508205ba2.png',
                user: {
                    image: 'https://randomuser.me/api/portraits/women/66.jpg',
                    name: 'Julie Carlson'
                },
                song: {
                    album: 'Gershwin for Lovers',
                    artist: 'Marcus Roberts',
                    name: 'Love is Here to Stay'
                },
                likes: 2
            },
            {
                image: 'http://assets1.sharedplaylists.com/playlists/42/28/74/sz300x300_high-fidelity-the-playlist-ec5ad8aac2.png',
                user: {
                    image: 'https://randomuser.me/api/portraits/women/88.jpg',
                    name: 'Joann Kelley'
                },
                song: {
                    album: 'Jazz Legends: Saxophone',
                    artist: 'Miles Davis',
                    name: 'Blue in Green'
                },
                likes: 22
            },
            {
                image: 'http://assets2.sharedplaylists.com/playlists/a1/da/74/sz300x300_1073-505df260df.png',
                user: {
                    image: 'https://randomuser.me/api/portraits/men/51.jpg',
                    name: 'Neil Murray'
                },
                song: {
                    album: 'Gershwin for Lovers',
                    artist: 'Marcus Roberts',
                    name: 'Love is Here to Stay'
                },
                likes: 31
            },
            {
                image: 'http://assets3.sharedplaylists.com/playlists/f0/ee/74/sz300x300_scouse-house-club-051-buzz-5bd09cbad6.png',
                user: {
                    image: 'https://randomuser.me/api/portraits/men/12.jpg',
                    name: 'Joel Coleman'
                },
                song: {
                    album: 'Gershwin for Lovers',
                    artist: 'Marcus Roberts',
                    name: 'Love is Here to Stay'
                },
                likes: 21
            },
            {
                image: 'http://assets3.sharedplaylists.com/playlists/7a/03/74/sz300x300_irish-indie-folk-4dda8d9e7e.png',
                user: {
                    image: 'https://randomuser.me/api/portraits/men/8.jpg',
                    name: 'Benjamin Allen'
                },
                song: {
                    album: 'Jazz Legends: Saxophone',
                    artist: 'Miles Davis',
                    name: 'Blue in Green'
                },
                likes: 24
            },
            {
                image: 'http://assets3.sharedplaylists.com/playlists/3d/fa/74/sz300x300_roadtrips-with-z-a1c6f62dfc.png',
                user: {
                    image: 'https://randomuser.me/api/portraits/women/87.jpg',
                    name: 'Christy Jacobs'
                },
                song: {
                    album: 'Gershwin for Lovers',
                    artist: 'Marcus Roberts',
                    name: 'Love is Here to Stay'
                },
                likes: 19
            }
        ];

        $scope.cards = {
            master: Array.prototype.slice.call(cardTypes, 0),
            active: Array.prototype.slice.call(cardTypes, 0),
            discards: [],
            liked: [],
            disliked: []
        };

        $scope.cardDestroyed = function(index) {
            $scope.cards.active.splice(index, 1);
        };

        $scope.addCard = function() {
            var newCard = cardTypes[0];
            $scope.cards.active.push(angular.extend({}, newCard));
        };

        $scope.refreshCards = function() {
            // Set $scope.cards to null so that directive reloads
            $scope.cards.active = null;
            $timeout(function() {
                $scope.cards.active = Array.prototype.slice.call($scope.cards.master, 0);
            });
        };

        $scope.$on('removeCard', function(event, element, card) {
            var discarded = $scope.cards.master.splice($scope.cards.master.indexOf(card), 1);
            $scope.cards.discards.push(discarded);
        });

        $scope.cardSwipedLeft = function(index) {
            console.log('LEFT SWIPE');
            var card = $scope.cards.active[index];
            $scope.cards.disliked.push(card);
        };
        $scope.cardSwipedRight = function(index) {
            console.log('RIGHT SWIPE');
            var card = $scope.cards.active[index];
            $scope.cards.liked.push(card);
        };
    })

    .controller('CardCtrl', function($scope, TDCardDelegate) {
        console.log('CardCtrl');
    })

    .controller('NowPlayingCtrl', function($scope, $state) {
        console.log('NowPlayingCtrl');

        $scope.toIntro = function(){
            $state.go('intro');
        };
    })

    .controller('PlaylistCtrl', ['$scope', '$state', 'PlaylistService', function($scope, $state, PlaylistService) {
        console.log('PlaylistCtrl');

        $scope.toIntro = function(){
            $state.go('intro');
        };

        $scope.items = PlaylistService.GetItems();
    }])

    .controller('SearchCtrl', ['$scope', '$state', 'SearchService', function($scope, $state, SearchService) {
        console.log('SearchCtrl');

        $scope.toIntro = function(){
            $state.go('main.search.details');
        };

        $scope.items = SearchService.GetResults();
    }])

    .controller('SearchDetailsCtrl', ['$scope', '$state', '$stateParams', '$ionicHistory', 'SearchService', function ($scope, $state, $stateParams, $ionicHistory, SearchService) {
        $scope.item = SearchService.GetDetails($stateParams.id);

        console.log('item is', $scope.item);

        $scope.goBack = function(){
            $ionicHistory.goBack();
        };
        $scope.submitSong = function () {
            $state.go('tabs.play');
        };
        $scope.$on('$ionicView.beforeEnter', function (event, viewData) {
        });
    }]);
