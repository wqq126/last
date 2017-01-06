// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'starter.services'])

.run(function($ionicPlatform) {
	$ionicPlatform.ready(function() {
		// Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
		// for form inputs)
		if(window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
			cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
			cordova.plugins.Keyboard.disableScroll(true);

		}
		if(window.StatusBar) {
			// org.apache.cordova.statusbar required
			StatusBar.styleDefault();
		}
	});
})

.config(function($stateProvider, $urlRouterProvider, $ionicConfigProvider) {

	// Ionic uses AngularUI Router which uses the concept of states
	// Learn more here: https://github.com/angular-ui/ui-router
	// Set up the various states which the app can be in.
	// Each state's controller can be found in controllers.js
	$stateProvider

	// setup an abstract state for the tabs directive
		.state('tab', {
		url: '/tab',
		abstract: true,
		templateUrl: 'templates/tabs.html'
	})

	// Each tab has its own nav history stack:

	.state('tab.news', {
			url: '/news',
			views: {
				'tab-news': {
					templateUrl: 'templates/tab-news.html',
					controller: 'NewListCtrl'
				}
			}
		})
		.state('tab.news-detail', {
			url: '/news/:id',
			views: {
				'tab-news': {
					templateUrl: 'templates/details/news-detail.html',
					controller: 'newsDetail'
				}
			}
		})
		.state('tab.news-head', {
			url: '/head/:id',
			views: {
				'tab-news': {
					templateUrl: 'templates/tab-news.html',
					controller: 'NewListCtrl'
				}
			}

		})
		.state('tab.news-comment', {
			url: '/comment/:id',
			views: {
				'tab-news': {
					templateUrl: 'templates/tab-comment.html'
				}
			}
		})
		.state('tab.lives', {
			url: '/lives',
			views: {
				'tab-lives': {
					templateUrl: 'templates/tab-lives.html',
					controller: 'liveCtrl'
				}
			}
		})
		.state('tab.lives-detail', {
			url: '/lives/:id',
			views: {
				'tab-lives': {
					templateUrl: 'templates/lives-detail.html',
					controller: 'liveDetail'
				}
			}
		})

	.state('tab.topic', {
			url: '/topic',
			views: {
				'tab-topic': {
					templateUrl: 'templates/tab-topic.html',
					controller: 'topicCtrl'
				}
			}
		})
		.state('tab.topic-detail', {
			url: '/topic/:id',
			views: {
				'tab-topic': {
					//				templaeUrl:'templates/details/topic-detail.html',
					templateUrl: 'templates/details/topic-detail.html',
					controller: 'topicDetailCtrl'
				}
			}
		})
		// if none of the above states are matched, use this as the fallback
	$urlRouterProvider.otherwise('/tab/news');
	$ionicConfigProvider.tabs.position('bottom');
	$ionicConfigProvider.platform.android.navBar.alignTitle('center');

});