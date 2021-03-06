// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js

//var constants = angular.module('ipa.constants', []);
//var app = angular.module('ipa', ['ionic','ionic.service.core', 'ipa.controllers', 'ipa.services', 'ipa.constants', 'ipa.directives', 'ionic.contrib.ui.tinderCards2','ionic.contrib.ui.tinderCards']);

var app = angular.module('ipa', ['ionic', 'ionic.cloud', 'ionic.native', 'pascalprecht.translate', 'ipa.controllers', 'ipa.services', 'ipa.constants', 'ipa.directives', 'ionic.contrib.ui.tinderCards2', 
  'angular-storage',
  'angular-jwt']);

var appVersion = "0.0.0";
var lang = navigator.language; //test only, should have no initial value? or does not matter 
var isLangSupported = {
	'en': true
}

	//setup lang (must do this before config...)
	lang = 	lang.split("-")[0];			
	console.log('lang : ', lang);
	lang = isLangSupported[lang] ? lang: 'en';
	console.log('lang : ', lang);


app.config(function($ionicConfigProvider, $ionicCloudProvider) {
		//$ionicConfigProvider.views.maxCache(5);
		$ionicConfigProvider.tabs.position('bottom');
		// note that you can also chain configs
		//$ionicConfigProvider.backButton.text('Go Back').icon('ion-chevron-left');
		
		//console.log('who run first? app.config');
		
		//ionic cloud setup 
		$ionicCloudProvider.init({
			"core": {
				"app_id": "3bee48c3"
			}
		});		
});


app.run(function($ionicPlatform, Language, InitFile, $timeout, $state, $translate, init, $cordovaDeeplinks, Utils, $ionicPopup, $ionicLoading, $location, $ionicDeploy, AdmobSvc) {
  

  
	$ionicPlatform.ready(function() {
		// Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
		// for form inputs)
		if (window.cordova && window.cordova.plugins.Keyboard) {
		  cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
		  cordova.plugins.Keyboard.disableScroll(true);
		}
		
		
		//testing popup
		/*
		$ionicPopup.confirm({
			title: 'test',
			content: 'testing popup in app.run'
		}).then(function(res) {
			if (res) {
				console.log('ok is pressed.');
			} else {
				console.log('cancel is pressed');
			}
		})
		*/
		
		
		
		//check network status 
		function checkNetwork() {
			if (navigator && navigator.connection)
				console.log('navigator.connection.type: ', navigator.connection.type);
			//if(navigator.connection.type == Connection.NONE) {
			if(navigator.connection && navigator.connection.type == 'none') {	
				
				console.log('no internet!');
				
				$ionicPopup.confirm({
					title: "Internet Disconnected",
					template: "The internet is disconnected on your device. Without network functionality is only limited to open existing personality reports."
				})
				.then(function(result) {
					if(!result) {
						ionic.Platform.exitApp();
					}
				});
			}
		}
		
		checkNetwork();

		//check version 
		if (window.cordova && window.cordova.getAppVersion) {
			cordova.getAppVersion(function(version) {
				appVersion = version;
				console.log('appVersion is : ', appVersion);
			});
		}
			
		console.log('1');
		
		//check for newer snapshot 
		if (window.cordova)
		$ionicDeploy.check().then(function(snapshotAvailable) {
			if (snapshotAvailable) {
				$ionicDeploy.download()
				.then($ionicDeploy.extract())
				.then(function() {
					$ionicLoading.hide();
					$ionicDeploy.load();
				})
				.catch(function(err) {
					console.log('err in ionic deploy download/extract: ', err);
					$ionicLoading.hide();
					$ionicPopup.alert({
						title: 'Error',
						template: err
					})					
				})
				$ionicLoading.show({
					template: 'New inapp update found, downloading... this should only take a very shot time, please wait...'
				})
			}
		}).catch(function(err) {
			console.log('err in ionic deploy check: ', err);
			$ionicLoading.hide();
			//prompt to user? 
			
			if (!window.jasmine) 
			$ionicPopup.alert({
				title: 'Update Check Error',
				template: err
			})
		})
		
		if (window.cordova && window.cordova.InAppBrowser) {
			console.log('impossible');
			 //window.open = cordova.InAppBrowser.open;
		}
		console.log('2');
		
		if (window.StatusBar) {
		  // org.apache.cordova.statusbar required
		  StatusBar.styleDefault();
		}
		
		if(typeof navigator.globalization !== "undefined") {
					navigator.globalization.getPreferredLanguage(function(language) {							
						$translate.use((language.value).split("-")[0]).then(function(data) {
							console.log("SUCCESS -> " + data);
						}, function(error) {
							console.log("ERROR -> " + error);
						});
					}, null);
		}
		
		//test only:
		Language.setLanguage('en');
		console.log('who run first? app.run');
		
		//added to relationship in already... need to add ONLY to other 2 perspectives.
		//InitFile.addView();
		
		
		//below moved to config 
		//InitFile.populateMedium();
		//InitFile.formatData();
		
		
		//push
		var push = new Ionic.Push({
		  "debug": true
		});

		push.register(function(token) {
			console.log("Device token:",token.token);
		});	
		
		/*
			var dev = {};
			ionic.Platform.ready(function() {
				if (ionic.Platform.isIpad() || ionic.Platform.isIOS()) {
					dev.platform = 'ios';
				} else if (ionic.Platform.isAndroid()) {
					dev.platform = 'andriod';
				} else {
					var error = new Error();
					error.name = 'UnSupported';
					error.message = 'Your phone is not supported'
					throw error;
				}
			})	
		*/
		
		//initializing services 
		//init.setTest('plugin available!');
		console.log('setting facebook clients!')
		init.setClient();
		init.checkPlugins();
		console.log(ionic.Platform.platform())
		init.setDeviceInfo(ionic.Platform);
		init.initFileReports();
		init.loadPublicReports(function(err){
			console.log('did i get called? - loading public reports, from app.run');
			if (err) {
				console.warn('error loading public reports: ', err);
				Utils.error($ionicPopup, err);
			}
		})
		
		function deeplink() {
			//deep links
				// Note: route's first argument can take any kind of object as its data,
				// and will send along the matching object if the route matches the deeplink

			//var importUrl = '/app/reports/import/:file'; //original / targetted 
			
			$cordovaDeeplinks.route({
				//'/app/reports/import/:userId/:src/:file': {
				'/app/reports/import/:userId/:src/:file/:version': {				
					target: 'app.import',
					parent: 'app.reports'
				}
			}).subscribe(function(match) {
				
				console.log('what the ..');
				console.log('');
				console.log('deeplink: match........');
				console.log('match: ', match);
						console.log('');
						console.log('what the hell...');
						console.log('match.$route.target & match.$args: ', match.$route.target, match.$args);			
				
				//for this initial version, the version parameter will simply be ignored 
				var args = removeExtraParams(match.$args);
				
				//function to remove extra params: (version & img) from args;
				function removeExtraParams(args) {
					var newArgs;
					newArgs = {
						userId: match.$args.userId,
						src: match.$args.src,
						file: match.$args.file
					}
					
					//alternatively: 
					//newArgs = JSON.parse(JSON.stringify(match.$args));
					//newArgs.version = null;
					return newArgs;
				}
				
				
				// One of our routes matched, we will quickly navigate to our parent
				// view to give the user a natural back button flow	
				$timeout(function() {
					
					//$state.go(match.$route.parent, match.$args);
					$state.go(match.$route.parent, args);
					// Finally, we will navigate to the deeplink page. Now the user has
					// the 'product' view visible, and the back button goes back to the
					// 'products' view.				
					$timeout(function() {
						
						console.log('');
						console.log('match.$route.target & match.$args: ', match.$route.target, match.$args);
						//$state.go(match.$route.target, match.$args);
						$state.go(match.$route.target, args);
					}, 800);
				}, 100);
				
			}, function(nomatch) {
				
				console.log('');
				console.log('deeplink, import route, no match: ', nomatch);
				
				//for test only 
				// if no match goes to about
				//$state.go('app.about');
			});
		
			/*** routes for search result (web scheme)*/
				//shouldn't need (?)
				//summary only!! 
				
			//only one version - the latest; if there's backward compatibility problem,
				//can only hope user upgrade!

				//function to prepare args (for search result url)
					//assuming using current iframe approach (without server side processing)
					//which one should be used??? should try server side? (first? too? or use existing one first)
				function processArgs(args) {
					var newArgs;
					newArgs = {
						file: decodeURI(args.file)
					}
					
					//alternatively: 
					//newArgs = JSON.parse(JSON.stringify(match.$args));
					//newArgs.version = null;
					return newArgs;
				}
				
			$cordovaDeeplinks.route({
				//'/app/reports/import/:userId/:src/:file': {
				//'/app/reports.html?/app/summary/:file': {
				
				//'/app/reports.html': { // if on same server; (currently on app sub domain instead of /app)
				'/reports.html': {
					target: 'app.summary',
					parent: 'app.reports'
				}
			}).subscribe(function(match) {
				
				console.log('what the ..');
				console.log('');
				console.log('deeplink: match........');
				console.log('match: ', match);
						console.log('');
						console.log('what the hell...');
						console.log('match.$route.target & match.$args: ', match.$route.target, match.$args);			
				//match: $args, $link (path, queryString), $route;		
				
				//wont use?
				//var args = processArgs(match.$args);
				

				
				
				// One of our routes matched, we will quickly navigate to our parent
				// view to give the user a natural back button flow	
				$timeout(function() {
					
					//$state.go(match.$route.parent, match.$args);
					$state.go(match.$route.parent, null);
					// Finally, we will navigate to the deeplink page. Now the user has
					// the 'product' view visible, and the back button goes back to the
					// 'products' view.				
					$timeout(function() {
						
						console.log('');
						console.log('match.$link.queryString: ', match.$link.queryString);
						//console.log('match.$route.target & match.$args: ', match.$route.target, match.$args);
						//$state.go(match.$route.target, match.$args);
						//$state.go(match.$route.target, args);
						$location.path(match.$link.queryString);
						
					}, 800);
				}, 100);
				
			}, function(nomatch) {
				
				console.log('');
				console.log('deeplink, search result route, no match: ', nomatch);
				
				//for test only 
				// if no match goes to about
				//$state.go('app.about');
			});
			
			
			/*** route for search (custom scheme) ***/
				//summary only!
			$cordovaDeeplinks.route({
				'/app/summary/:file': {				
					target: 'app.summary',
					parent: 'app.reports'
				}
			}).subscribe(function(match) {
				
				console.log('');
				console.log('deeplink: match, search route (customer scheme, summary).......');
				console.log('match: ', match);
				console.log('match.$route.target & match.$args: ', match.$route.target, match.$args);			
				
				//for this initial version, the version parameter will simply be ignored 
				//var args = removeExtraParams(match.$args);
				
				// One of our routes matched, we will quickly navigate to our parent
				// view to give the user a natural back button flow	
				$timeout(function() {
					
					//$state.go(match.$route.parent, match.$args);
					$state.go(match.$route.parent, match.$args);
					// Finally, we will navigate to the deeplink page. Now the user has
					// the 'product' view visible, and the back button goes back to the
					// 'products' view.				
					$timeout(function() {
						
						console.log('');
						console.log('match.$route.target & match.$args: ', match.$route.target, match.$args);
						//$state.go(match.$route.target, match.$args);
						$state.go(match.$route.target, match.$args);
					}, 800);
				}, 100);
				
			}, function(nomatch) {
				
				console.log('');
				console.log('deeplink, search route (customer scheme/summary), no match: ', nomatch);
				
				//for test only 
				// if no match goes to about
				//$state.go('app.about');
			});			
			
			
			
			$cordovaDeeplinks.route({
				'/app/test': {
					target: 'app.test',
					parent: 'app.about'
				}
			}).subscribe(function(match) {
				
				console.log('what the ..');
				console.log('');
				console.log('deeplink: match........');
				console.log('match: ', match);
						console.log('');
						console.log('what the hell...');
						console.log('match.$route.target & match.$args: ', match.$route.target, match.$args);			
				
				// One of our routes matched, we will quickly navigate to our parent
				// view to give the user a natural back button flow	
				$timeout(function() {
					$state.go(match.$route.parent, match.$args);
					// Finally, we will navigate to the deeplink page. Now the user has
					// the 'product' view visible, and the back button goes back to the
					// 'products' view.				
					$timeout(function() {
						
						console.log('');
						console.log('match.$route.target & match.$args: ', match.$route.target, match.$args);
						$state.go(match.$route.target, match.$args);
					}, 800);
				}, 100);
				
			}, function(nomatch) {
				
				console.log('');
				console.log('deeplink route2 (test) no match: ', nomatch);
				
				//for test only 
				// if no match goes to about
				//$state.go('app.about');
			});	
	
		}
		
		deeplink();
		//testing... on resume 
		document.addEventListener("resume", function() {
			console.log('the app is resuming...');
			deeplink();
			//check network status 
			checkNetwork();
		
		}, false);
		
		
		//(todo): route for search / (public) reports 
		
		//inappbilling for android
		
		console.log('device: ', window.device);
		
		if((window.device && window.device.platform == "Android") && typeof inappbilling !== "undefined") {
			inappbilling.init(function(resultInit) {
				console.log("IAB Initialized");
				//further initialize IAB services ... 
				
			},
			function(errorInit) {
				console.log("IAB Initialized ERROR -> " + errorInit);
			}, 
			{showLog: true},
			['testcredits01_bundle_3']); // for now only testing static response 
		}
		
		
		//admob
		/*
		var pubIdAndroid = 'pub-1483757918215780';
		var adBannerIdAndroid = 'ca-app-pub-1483757918215780/2193572553';
		var interstitialIdAndroid = 'ca-app-pub-1483757918215780/7493875359';
		
            if(window.plugins && window.plugins.AdMob) {
                var admob_key = device.platform == "Android" ? adBannerIdAndroid : "IOS_PUBLISHER_KEY";
				var admob_interstitialkey = device.platform == "Android" ? interstitialIdAndroid : "IOS_interstitial_KEY"
                var admob = window.plugins.AdMob;
				
				var bannerAdOpts = {
                    'publisherId': admob_key,
                    'adSize': admob.AD_SIZE.BANNER,
                    'bannerAtTop': false					
				}
				
				var interstitialAdOpts = {
                    'interstitialAdId': admob_interstitialkey,
                    'autoShow': true,					
				}
				
				AdmobSvc.init(admob, bannerAdOpts, interstitialAdOpts);
				
				AdmobSvc.createBannerView();
				
			
				
            }
		*/
		
		$timeout(function() {
			console.log('');
			console.log('app.run, calling AdmobSvc.createBannerView after waiting for 3s');
			AdmobSvc.createBannerView();
		}, 3000);
	
	});
 
   
});

app.config(function($stateProvider, $urlRouterProvider) {
	
	console.log('who runs first? - app.config');
	
  $stateProvider

  //root (really just for protractor tests)
  .state('root', {
	  url: '/',
	  template: '<h3>Hello!</h3>'
  })
  
  .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/menu.html',
    controller: 'AppCtrl'
  })
  
    .state('app.playlists', {
      url: '/playlists',
      views: {
        'menuContent': {
          templateUrl: 'templates/playlists.html',
          controller: 'PlaylistsCtrl'
        }
      }
    })

  .state('app.single', {
    url: '/playlists/:playlistId',
    views: {
      'menuContent': {
        templateUrl: 'templates/playlist.html',
        controller: 'PlaylistCtrl'
      }
    }	
  })  

  .state('app.format2', {
    url: '/format2',
    views: {
      'menuContent': {
       // templateUrl: 'templates/format2.html',
		controller: 'Format2Ctrl'
      }
    }
  })
  
  .state('app.format', {
    url: '/format',
    views: {
      'menuContent': {
        //templateUrl: 'templates/search.html',
		controller: 'FormatCtrl'
      }
    }
  })
  
  
   .state('app.analyze', {
    url: '/analyze',
    views: {
		'menuContent': {
			templateUrl: 'templates/analyze.html',
			controller: 'AnalyzeCtrl'
		}		
    },
	data: {
		requiresLogin: true
	}	
  }) 

   .state('app.reports', {
		url: '/reports',
		views: {
		  'menuContent': {
			templateUrl: 'templates/reports.html',
			controller: 'ReportsCtrl'
		  }
		}	
	})   
  
	//report export / import 
	//not used(?)
	.state('app.export', {
		url: '/reports/export/:file/:report',
		views: {
			'menuContent': {
				templateUrl: 'templates/reports/export.html',
				controller: 'ExportCtrl'
			}
		}
	})

	.state('app.import', {
		url: '/reports/import/:userId/:src/:file/:version',
		views: {
			'menuContent': {
				templateUrl: 'templates/reports/import.html',
				controller: 'ImportCtrl'
			}			
		}
	})
	
	//instead of importing the report, only display it (open from db)
	//mainly for use on web site (for sharing report)
		//privacy and permission control??? come next or never... 
	//.state('app.display', //...
  
   .state('app.summary', {
		url: '/summary/:file',
		views: {
			'menuContent': {
				templateUrl: 'templates/summary.html',
				controller: 'SummaryCtrl'
			}
		},
		resolve: {
			report: function(Reports, $stateParams) {
				//decoding it first 
				var file = decodeURI($stateParams.file);
				console.log ('promise from Reports: ', Reports.getPromise(file))
				return Reports.getPromise(file).then(function(res){
					return res.data;
				}).catch(function(err) {
					return err;
				}); 
			}
		}	
	})     
  
  
    .state('app.preferences', {
		url: '/preferences/:file',
		views: {
			'menuContent': {
				templateUrl: 'templates/report/preferences.html',
				controller: 'PreferencesCtrl'
			}
		},
		resolve: {
			report: function(Reports, $stateParams) {
				//decoding it first 
				var file = decodeURI($stateParams.file);
				console.log ('promise from Reports: ', Reports.getPromise(file))
				return Reports.getPromise(file).then(function(res){
					return res.data;
				}).catch(function(err) {
					return err;
				}); 
			}
		}		
    })

  .state('app.preference', {
    //url: '/preference/:category',
	url: '/preference',
    views: {
      'menuContent': {
        templateUrl: 'templates/report/preference.html',
        controller: 'PreferenceCtrl'
      }
    },
	params: {
		category: null
	}
  })    
  
   .state('app.people', {
    url: '/people',
    views: {
      'menuContent': {
        templateUrl: 'templates/people.html',
		controller: 'PeopleCtrl'
      }
    }
  })   
  
   .state('app.test', {
    url: '/test',
    views: {
      'menuContent': {
        templateUrl: 'templates/test.html',
		controller: 'TestCtrl'
      }
    }
  })    
  

  
    .state('app.about', {
    url: '/about',
    views: {
      'menuContent': {
        templateUrl: 'templates/about.html' //,
        //controller: 'AboutCtrl'
      }
    }	
  })  
  
    .state('app.traits', {
		url: '/traits/:file/:opts', //if unique...??
		views: {
		  'menuContent': {
			templateUrl: 'templates/report/traits.html',
			controller: 'TraitsCtrl'
		  }
		}	
  })
  
  ////////////////
  // states for credits
  //
  
  .state('app.credits', {
		url: '/credits',
		abstract: true,
		views: {
			'menuContent': {
				templateUrl: 'templates/credits/index.html',
				controller: 'CreditsCtrl'
			}
		},
		data: {
		  requiresLogin: true
		}	  
  })
  
  .state('app.credits.records', {
		url: '/records',
		templateUrl: 'templates/credits/records.html',
		controller: 'RecordsCtrl',
		data: {
		  requiresLogin: true
		}			
  })  
  
  .state('app.credits.free', {
		url: '/free',
		templateUrl: 'templates/credits/free.html',
		controller: 'FreeCtrl',
		data: {
		  requiresLogin: true
		}			
  })

 .state('app.credits.paid', {
		url: '/paid',
		templateUrl: 'templates/credits/paid.html',
		controller: 'PaidCtrl',
		data: {
		  requiresLogin: true
		}			
  })  
  
 .state('app.credits.prom', {
		url: '/prom',
		templateUrl: 'templates/credits/prom.html',
		controller: 'PromCtrl',
		data: {
		  requiresLogin: true
		}			
  })    
  
  ////////////////
  // states for accounts
  //  
  .state('app.account', {
	  url: '/account',
	  abstract: true,
		views: {
			'menuContent': {
				templateUrl: 'templates/account/index.html'//,
				//controller: 'AccountCtrl'
			}		
		},
		data: {
		  requiresLogin: true
		}	  
  })  

  .state('app.account.settings', {
		url: '/settings',
		templateUrl: 'templates/account/settings.html'//,
		//controller: 'SettingsCtrl'
  })  

//////////
// login (auth0 only???)
  .state('app.login', {
		url: '/account/login/:nextState/:nextParams', // /:source,
		//cache: false,
		//abstract: true,
		//templateUrl: "templates/account/login.html",
		//controller: 'LoginCtrl'
		views: {
			'menuContent': {
				templateUrl: 'templates/account/login.html',
				controller: 'LoginCtrl'
			}		
		},		
  })
  
  .state('app.login.native', {
		url: '/native',
		templateUrl: 'templates/account/login.native.html'
  })
  
  .state('app.loginsrv', {
		url: '/loginsvr/:nextState/:nextParams',
		views: {
			'loginsvr@app.login': {
				templateUrl: 'templates/account/login.server.html',
				controller: 'LoginSvrCtrl'
			}
		}
  })
  
   .state('app.logout', {
		url: '/account/logout', // /:source,
		//cache: false,
		//abstract: true,
		//templateUrl: "templates/account/login.html",
		//controller: 'LoginCtrl'
		views: {
			'menuContent': {
				templateUrl: 'templates/account/logout.html',
				controller: 'LogoutCtrl'
			}		
		},		
  }) 
  
  
	.state('app.account.feedbacks', {
		url: '/feedbacks',
		templateUrl: 'templates/account/feedbacks.html',
		controller: 'FeedbacksCtrl'
	})  
  
	/////////////////////
	//report per facet
	//incl 3 perspectives & 4 views (tabs)
	
	//not only holds layout for tabs but also deal with perspective and prepare data 
 
	.state('app.report', {
		url: "/report/:file/:facet/:score",
		abstract: true,
		cache: false,
		views: {
			'menuContent': {
				templateUrl: "templates/report/report.html",
				controller: 'ReportCtrl'
			}			
		},
		resolve: {

			traitsSummary: function(InitFile, $stateParams) {
				console.log('app report state: promise from InitFile: ', InitFile.getDataPromise('Traits-Summary', $stateParams.facet) );
				return InitFile.getDataPromise('Traits-Summary', $stateParams.facet).then(function(res) {
					console.log('app report state, res: ', res);
					return res.data;
				}).catch(function(err){
					console.log('app report state, err: ', err);
					return err;
				})
			},
			report: function(Reports, $stateParams) {
				console.log ('app report state: promise from Reports: ', Reports.getPromise($stateParams.file))
				return Reports.getPromise($stateParams.file).then(function(res){
					return res.data;
				}).catch(function(err) {
					return err;
				}); 
			}			
			
		}		
    })	
	
	
	/////////////////////////
	//report contents - perspective & view

	
	//(latest design) deals with perspective  
	.state('app.report.perspectives', {
		url: '/perspectives/:perspective',
		abstract: true,
		//cache: false,
		views: {
			'report': {
				templateUrl: 'templates/report/perspectives.html',
				controller: 'PerspectivesCtrl'	
			}			
		}/*,
		resolve: {

			traits: function(InitFile, $stateParams, $scope) {
				console.log('app perspective state: promise from InitFile: ', InitFile.getDataPromise($stateParams.perspective, $scope.facet) );
				return InitFile.getDataPromise($stateParams.perspective, $stateParams.facet).then(function(res) {
					console.log('app perspective state, res: ', res);
					return res.data;
				}).catch(function(err){
					console.log('app perspective state, err: ', err);
					return err;
				})
			}
		}*/
    })		

	//just a template holding both perspective info & facet lists
	/*
	.state('app.report.perspectives.facet', {		
		url: '/facet',
		abstract: true,
		//cache: false,
		//url: "/facet/:file/:facet/:perspective/:viewName/:score",
		
		
		views: {	
			'perspectives': {
				templateUrl: 'templates/report/facet.html',
				controller: 'FacetCtrl'
			}
		}		
		
	})	
	
	.state('app.report.perspectives.facet.list', {		
		url: '/list',
		//url: "/facet/:file/:facet/:perspective/:viewName/:score",
		
		
		views: {	
			'facetlist': {
				templateUrl: 'templates/report/facetlist.html',
				controller: 'FacetCtrl'
			}
		}		
		
	})	
	*/
	.state('app.report.perspectives.facet', {		
		url: '/facet',
		//url: "/facet/:file/:facet/:perspective/:viewName/:score",
		
		
		views: {	
			'perspectives': {
				templateUrl: 'templates/report/facet.html',
				controller: 'FacetCtrl'
			}
		}		
		
	})		
	
	.state('app.report.perspectives.trait', {
		url: '/trait/:traitIdx',
		abstract: true,
		//cache: false,
		views: {
			'perspectives': {
				templateUrl: 'templates/report/trait.html',
				controller: 'TraitCtrl'	
			}			
		}		
	})
	
	//parallel views! only to hold the tabs/views template
	.state('app.report.perspectives.trait.views', {
		//url: '/views/:option',
		url: '/views',
		abstract: true,	
		cache: false,
		views: {			
			'trait': {
				templateUrl: 'templates/report/views-tabs.html',
				controller: 'ViewsCtrl' 				
			}				
			
		}
		/*
		onEnter: function($view, $stateParams) {
			console.log('==========---------OnEtner, params: ',  $stateParams);
			console.log('option: ', $stateParams.option);
			if ($stateParams.option == 'tabs') {
				console.log('usingtabs!');
				$view.load("perspectives@app.report.perspectives.views", {
					templateUrl: 'templates/report/views-tabs.html',
					controller: 'ViewsCtrl'
				});				

			} else {
				console.log('not usingtabs!');
				$view.load("perspectives-notabs@app.report.perspectives.views", {
					templateUrl: 'templates/report/views.html',
					controller: 'ViewsCtrl'
				});	
			}
		}
		*/

	})


	
	//choose one view to populate
	.state('app.report.perspectives.trait.views.view', {
		url: '/view',
		abstract: true,
		views: {
			'Love': {
				templateUrl: 'templates/report/view.love.html',
				controller: 'ViewCtrl' 				
			},
			'Work': {
				templateUrl: 'templates/report/view.work.html',
				controller: 'ViewCtrl' 				
			},
			'Social': {
				templateUrl: 'templates/report/view.social.html',
				controller: 'ViewCtrl' 				
			},
			'Business': {
				templateUrl: 'templates/report/view.business.html',
				controller: 'ViewCtrl' 				
			}
			/*,
			'trait@app.report.perspectives.trait': {
				templateUrl: 'templates/report/view.allviews.html',
				controller: 'ViewCtrl' 	
			}*/
		}
/*
		views: {			
			'Love': {
				templateUrl: 'templates/report/view.html',
				controller: 'ViewCtrl' 				
			},
			'Work': {
				templateUrl: 'templates/report/view.html',
				controller: 'ViewCtrl' 				
			},
			'Social': {
				templateUrl: 'templates/report/view.html',
				controller: 'ViewCtrl' 				
			},
			'Business': {
				templateUrl: 'templates/report/view.html',
				controller: 'ViewCtrl' 				
			}			
			
		},
*/
		

	})	
	
	.state('app.report.perspectives.trait.views.view.Love', {
		url: '/Love',
		views: {
			'Love': {
				templateUrl: 'templates/report/traitview.html',
				controller: 'LoveCtrl' 				
			}
		}
	})		
	.state('app.report.perspectives.trait.views.view.Work', {
		url: '/Work',
		views: {
			'Work': {
				templateUrl: 'templates/report/traitview.html',
				controller: 'WorkCtrl' 				
			}
		}
	})	
	.state('app.report.perspectives.trait.views.view.Social', {
		url: '/Social',
		views: {
			'Social': {
				templateUrl: 'templates/report/traitview.html',
				controller: 'SocialCtrl' 				
			}
		}
	})	
	.state('app.report.perspectives.trait.views.view.Business', {
		url: '/Business',
		views: {
			'Business': {
				templateUrl: 'templates/report/traitview.html',
				controller: 'BusinessCtrl' 				
			}
		}
	})	
	
/*
	.state('app.report.perspectives.views.view.facet', {		
		url: '/facet',
		//url: "/facet/:file/:facet/:perspective/:viewName/:score",
		
		
		views: {
			
			'content': {
				templateUrl: 'templates/report/facet.html',
				controller: 'FacetCtrl'
			}
		}		
		
	})
*/	
	/////////////////
	// details of each trait 
	//independent of the 4 views above 
	/*
	.state('app.report.perspectives.views.view.trait', {		
		url: '/trait/:traitIdx',
		
		
		views: {
			'Content': {
			//'perspectives@app.report.perspectives': {
			//'content@app.report.perspectives.views.view': {	
			//'Love@app.report.perspectives.views': {	
				templateUrl: 'templates/report/trait.html',
				controller: 'TraitCtrl'
			}
		}
		
	})
	*/
  

  
	////////////////
	// states for infos
	//  
	.state('app.info', {
		url: '/info',
		abstract: true,
		views: {
			'menuContent': {
				templateUrl: 'templates/info/' + lang + '/index.html' //,
				//controller: 'AccountsCtrl'
			}		
		} 
	})  

	.state('app.info.intro', {
		url: '/intro',
		templateUrl: 'templates/info/' + lang + '/intro.html' //,
		//controller: 'SettingsCtrl'
	})  


	.state('app.info.analyze', {
		url: '/analyze',
		templateUrl: 'templates/info/' + lang + '/analyze.html' //,
		//controller: 'SettingsCtrl'
	})
  
	.state('app.info.auth', {
		url: '/auth',
		templateUrl: 'templates/info/' + lang + '/auth.html' //,
		//controller: 'SettingsCtrl'
	})

	.state('app.info.reports', {
		url: '/reports',
		templateUrl: 'templates/info/' + lang + '/reports.html' //,
		//controller: 'SettingsCtrl'
	})	
	
	.state('app.info.account', {
		url: '/account',
		templateUrl: 'templates/info/' + lang + '/account.html' //,
		//controller: 'SettingsCtrl'
	})	
	
	.state('app.info.credits', {
		url: '/credits',
		templateUrl: 'templates/info/' + lang + '/credits.html' //,
		//controller: 'SettingsCtrl'
	})	
  
  ;
  
	// if none of the above states are matched, use this as the fallback
	$urlRouterProvider.otherwise('/app/about');
});

app.config(function($ionicConfigProvider, $stateProvider, $urlRouterProvider, $translateProvider) {
	
	$translateProvider.useStaticFilesLoader({
		prefix: 'languages/',
		suffix: '.json'
	});

	$translateProvider.use('en');
	//$translateProvider.preferredLanguage("en");
	$translateProvider.fallbackLanguage("en");
	//$translateProvider.determineLanguage();
	
	$translateProvider.useSanitizeValueStrategy('escape');
	
});
//	var suggestions = angular.module('ipa.suggestions',[ionic]);  


//app.config(function(authProvider, jwtInterceptorProvider, $httpProvider) {
app.config(function(jwtInterceptorProvider, $httpProvider) {	
	/*
  authProvider.init({
    domain: AUTH0_DOMAIN,
    clientID: AUTH0_CLIENT_ID,
    loginState: 'app.login'
  });
  */

  jwtInterceptorProvider.tokenGetter = function(store, jwtHelper) {
    var piToken = store.get('piToken');
    //var refreshToken = store.get('refreshToken');
    if (!piToken) { // || !refreshToken) {
      return null;
    }
    if (jwtHelper.isTokenExpired(piToken)) {
		/*
      return auth.refreshIdToken(refreshToken).then(function(idToken) {
        store.set('token', idToken);
        return idToken;
		
      });
	  */
	  //try to auth the user again... or throw an error ??? 
	  //alternatively, deal with in $resource header... (instead of using interceptor)
	  //either way need a way to continue? then maybe a better approach is check before calling the resource... 
		//or before executing the command in gui... 
	  
	  //if handle here it should return a promise: 
	  //and should handle whenever is to return null (-- too aggressive perhaps better let caller to handle )
	  /*
		  return $http({
			url: '/delegation',
			// This makes it so that this request doesn't send the JWT
			skipAuthorization: true,
			method: 'POST',
			data: { 
				grant_type: 'refresh_token',
				refresh_token: refreshToken 
			}
		  }).then(function(response) {
			var id_token = response.data.id_token;
			localStorage.setItem('id_token', id_token);
			return id_token;
		  });	  
	  
	  */
		
		return null;
    } else {
      return piToken;
    }
  }

  $httpProvider.interceptors.push('jwtInterceptor');	

});



app.run(function($rootScope, $state, Auths, store) {
	$rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams) {
	//$rootScope.$on('$locationChangeStart', function(event, toState, toParams, fromState, fromParams) {		
	  /*
		if (!auth.isAuthenticated) {
		  var token = store.get('token');
		  if (token) {
			auth.authenticate(store.get('profile'), token);
		  }
		}
		*/
		console.log('');
		console.log('======$stateChange======');
		console.log('toState', toState);
		console.log('toParams', JSON.stringify(toParams));
		
		if (toState.data && toState.data.requiresLogin && !Auths.isAuthenticated()) {
			//try use currentState.url so user can proceed after login ... 
			//$state.transitionTo('app.login')
			
			console.log('');
			console.log('===need login? ======');
			console.log('');
			//$state.go('app.login' );
			event.preventDefault();
			$state.go('app.login', {nextState: toState.name, nextParams: toParams} );
		}	
		

		//else do nothing?
	

	});	
})





