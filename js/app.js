// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js

//var constants = angular.module('ipa.constants', []);
//var app = angular.module('ipa', ['ionic','ionic.service.core', 'ipa.controllers', 'ipa.services', 'ipa.constants', 'ipa.directives', 'ionic.contrib.ui.tinderCards2','ionic.contrib.ui.tinderCards']);

var app = angular.module('ipa', ['ionic', 'ionic.native', 'pascalprecht.translate', 'ipa.controllers', 'ipa.services', 'ipa.constants', 'ipa.directives', 'ionic.contrib.ui.tinderCards2', 
  'angular-storage',
  'angular-jwt']);


	app.config(function($ionicConfigProvider) {
		//$ionicConfigProvider.views.maxCache(5);
		$ionicConfigProvider.tabs.position('bottom');
		// note that you can also chain configs
		//$ionicConfigProvider.backButton.text('Go Back').icon('ion-chevron-left');
		
		//console.log('who run first? app.config');
	});


app.run(function($ionicPlatform, Language, InitFile, $timeout, $state, $translate, init, $cordovaDeeplinks) {
  

  
	$ionicPlatform.ready(function() {
		// Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
		// for form inputs)
		if (window.cordova && window.cordova.plugins.Keyboard) {
		  cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
		  cordova.plugins.Keyboard.disableScroll(true);
		}
		
		console.log('1');
		
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
		
		
	
		//deep links
		    // Note: route's first argument can take any kind of object as its data,
			// and will send along the matching object if the route matches the deeplink

		$cordovaDeeplinks.route({
			'/app/reports/import/:file': {
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
			console.log('deeplink: no match');
			
			//for test only 
			// if no match goes to about
			$state.go('app.about');
		});
	
		//another route
		
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
			console.log('deeplink: no match');
			
			//for test only 
			// if no match goes to about
			$state.go('app.about');
		});	
	
	
	});
 
   
});

app.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

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
	.state('app.reports.export', {
		url: '/export/:file/:report',
		views: {
			'menuContent': {
				templateUrl: 'templates/reports/export.html',
				controller: 'ExportCtrl'
			}
		}
	})

	.state('app.import', {
		url: '/reports/import/:file',
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
				console.log ('promise from Reports: ', Reports.getPromise($stateParams.file))
				return Reports.getPromise($stateParams.file).then(function(res){
					return res.data;
				}).catch(function(err) {
					return err;
				}); 
			}
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
				templateUrl: 'templates/account/index.html',
				controller: 'AccountsCtrl'
			}		
		},
		data: {
		  requiresLogin: true
		}	  
  })  

  .state('app.account.settings', {
		url: '/settings',
		templateUrl: 'templates/account/settings.html',
		controller: 'SettingsCtrl'
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
  
  
 /* tabs */

	/////////////////////
	//report per facet
	//incl 3 perspectives 
	
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
		}
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
  
  

  
  ;
  
  // if none of the above states are matched, use this as the fallback
  //$urlRouterProvider.otherwise('/app/playlists');
  //$urlRouterProvider.otherwise('/app/about');
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





