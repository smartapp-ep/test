angular.module('ipa.controllers', ['ipa.services', 'ipa.constants', 'ionic', 'ionic.contrib.ui.tinderCards2', 'pascalprecht.translate', 'ngCordova'])

.controller('AppCtrl', function($scope, $ionicModal, $timeout, $ionicNavBarDelegate, $ionicSideMenuDelegate) {
	
	console.log('');
	console.log('---');
	console.log('main ctrl')
	
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) ^[
  //^]);


  // Form data for the login modal
  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };
  
  //accordion list
    $scope.groups = [];
  
  $scope.groups = [
    { name: 'Account', id: 1, href: 'account', 
		items: [
		{ subName: 'Login', subId: '1-1', href: 'login//'}, 
		{ subName: 'Settings', subId: '1-1', href: 'settings'}, 
		{ subName: 'Notification', subId: '1-1', href: 'notification'}, 
		{ subName: 'Link Social Accounts', subId: '1-2', href: 'linkaccounts' }, 
		{ subName: 'Logout', subId: '1-1', href: 'logout'}
		]
	},
    { name: 'Credits', id: 1, href: 'credits', 
		items: [
		{ subName: 'My Credits', subId: '1-1', href: 'records' }, 
		{ subName: 'Free', subId: '1-2', href:'free' }, 
		{ subName: 'Promotion', subId: '1-3', href: 'prom' }, 
		{ subName: 'Purchase', subId: '1-3', href: 'paid' }
		]
	} 
  ];
  
  
  /*
   * if given group is the selected group, deselect it
   * else, select the given group
   */
  $scope.toggleGroup = function(group) {
    if ($scope.isGroupShown(group)) {
      $scope.shownGroup = null;
    } else {
      $scope.shownGroup = group;
    }
  };
  $scope.isGroupShown = function(group) {
    return $scope.shownGroup === group;
  };
})

.controller('PlaylistsCtrl', function($scope, $state, $ionicNavBarDelegate, $ionicSideMenuDelegate) {
	/*
	$scope.$on('$ionicView.enter', function(e) {
		$ionicNavBarDelegate.showBar(true);
	});
	*/
	
	$scope.$on('$ionicView.enter', function() {
		$ionicSideMenuDelegate.canDragContent(true);
	});
	
  $scope.playlists = [
    { title: 'Reggae', id: 1 },
    { title: 'Chill', id: 2 },
    { title: 'Dubstep', id: 3 },
    { title: 'Indie', id: 4 },
    { title: 'Rap', id: 5 },
    { title: 'Cowbell', id: 6 }
  ];
  
  //test state vs href
  $scope.open = function(id) {
	  $state.go('app.single', {playlistId: id})
  }
  
  
  
})


.controller('PlaylistCtrl', function($scope, $stateParams) {
})


.controller('FormatCtrl', function($scope, InitFile, $cordovaFile) {
	//InitFile.testFormat();
	//InitFile.addView();
	InitFile.populateMedium();	
	InitFile.formatData();
	//console.log('after formatting: ');
	//console.log(InitFile.getData());
	  
	  //$scope.approaching = JSON.stringify(InitFile.getData().en['Self-Improvement']);
	  //console.log($scope.approaching);
})

.controller('Format2Ctrl', function($scope, InitFile) {
	//InitFile.copyFormat();
})


.controller('TestCtrl', function($scope, $rootScope, $window, $http, $ionicPopup, Reports, $state, $resource, ApiSvc, Auths, store, External, facebook, init, Utils) {
	
	//testing og meta tags 
	$rootScope.ogtitle='testing og title';
	
	$scope.content='type something to store';
	
	$scope.store = function(content) {
		//$window.localStorage.piTestStore = $scope.content;
		$window.localStorage.piTestStore = content;
	}
	
	$scope.retrieve = function() {
		$scope.retrievedContent = $window.localStorage.piTestStore;
	}
	
	
	//var server = 'https://pitest-3.au-syd.mybluemix.net';
	//var server = 'https://server.local:3000';
	var server = 'https://192.168.0.4:3000';
	
	$scope.newWindow = function() {

		
		//var url = 'https://pitest-3.au-syd.mybluemix.net/test'
		//var url = 'https://server.local:3000/test';
		//var url = 'https://pitest.au-syd.mybluemix.net/analyze';
		//var url = 'https://pitest-3.au-syd.mybluemix.net/test';
		
		
		//var path ='/test';
		var path = '/pi/merge'
				
		var url = server + path;
		const key = 'pitest';
		
		//delete window.open;
		
		//var login = $window.open(url, '_blank', 'location=no, menubar=yes,toolbar=yes, width=600, height=400');
		var login = $window.open(url, '_system', 'location=no,menubar=yes,toolbar=yes');
		//.log(login.location);
		
		login.addEventListener('unload', function(e) {
			//console.log('did i get this event?');
			//users = $windows.localStorage[key];
			//console.log(this.location);
			//users = this.localStorage[key];
			//console.log('users' + users);
		});
		
		//login.postMessage('testMsg', 'http://localhost:8100/ionic-lab');
		
		$window.addEventListener("message", receiveMessage, false);
		
	}	
		
		
	function receiveMessage(event) {
		if (event.origin !== server ) return;
	
		$scope.msg = event.data;
		console.log($scope.msg);
	}
	
	
	
	$scope.loadReport = function() {
		var url = 'data/reports/Edwin__Pun_facebook.json';
		//var reportName = 'Kathy Lien';
		
		$http.get(url).then(onSuccess, onError);
		
		function onSuccess(response) {
			var reports=response.data;
			//var reports = {};
			//reports[reportName] = report;
			//var storage = {};
			//storage.reports = reports;
			//console.log(reports);
			
			$window.localStorage.Edwin__Pun_facbook = JSON.stringify(reports);
		}
		
		function onError(data) {
			var alertPopup = $ionicPopup.alert({
				title: 'Error',
				template: JSON.stringify(data)
			});
		}
		
		
	}	
	
	//$scope.prefix = ''
	$scope.loadReports = function(prefix) {
		
		console.log('prefix : ', prefix);
		
		var newFile = prefix || '';
		
		console.log('newFile :', newFile);
		
		var url = 'data/reports';
		var piReports;
		$http.get(url + '/piReports.json').then(function(res) {
			piReports = res.data;
			console.log('piReports: ', piReports);
			
			store.set(newFile + 'piReports', piReports);
			
			piReports.forEach(function(itm) {
				var fileUrl = url + '/' + itm.file.replace(' ', '__') + '.json';
				$http.get(fileUrl).then(function(res) {
					var file = res.data;
					store.set(newFile + itm.file, file);
				}, function(err) {
					Utils.error($ionicPopup, err);
				})
				
			})
				console.log('successfully loaded');
				Utils.result($ionicPopup, null, 'reports loaded');
		}, function(err) {
			console.log(err);
			Utils.error($ionicPopup, err);
		})
		
		
		
	}

	
	
	$scope.test='original value';
	
	$scope.popupWin = function() {
		//$window.open('https://192.168.0.4:3000/pi', '_blank');
		//delete window.open;
		//var win = $window.open('https://192.168.0.4:3000/pi/merge', '_blank', 'menubar=yes, toolbar=yes, width=600, height=400');
		var win = $window.open('https://192.168.0.4:3000/pi/merge', '_system', 'location=yes,menubar=yes,toolbar=yes');
		win.addEventListener("beforeunload", function(e){
			$scope.test = $window.localStorage.getItem( 'test' );
			console.log('$scope.test');
			console.log('window closing... - fr event listener');
		}, false);
		
		win.onbeforeunload = function(){
			$scope.test = $window.localStorage.getItem( 'test' );
			console.log('window closing...');
		}
		console.log('win: ', win);
	}

	$scope.popupIAB = function() {
		console.log('what the..');
		
		var svr = init.getServer();
		
		//var win = cordova.InAppBrowser.open('https://192.168.0.4:3000/pi/merge', '_blank', 'location=no');
		
		var win = cordova.InAppBrowser.open(svr + '/pi/merge', '_blank', 'location=no,menubar=yes,toolbar=yes');
		
		
		win.addEventListener("loadstop", function() {
			win.executeScript({
				//code: "localStorage.getItem( 'test' )"
				code: "msg"
			}, function(value){
				console.log('loaded.., value: ', value);
				$scope.test = value[0];
				$window.localStorage.setItem('test', value[0]);
				console.log('$scope.test, cb of script: ', $scope.test);
				console.log('closing browser');
				//win.close();
			})
			console.log('browser just loaded...')
			console.log('$scope.test, cb from event: ', $scope.test);
		})
		
		win.addEventListener("exit", function() {
			win.executeScript({
				//code: "localStorage.getItem( 'test' )"
				code: "msg"
			}, function(value){
				console.log('exiting.., value: ', value);
				$scope.test = value[0];
				store.set('test', value[0]);
			})
			console.log('browser just exit...')
			console.log('$scope.test, cb fr exit', $scope.test);
			$scope.$apply();
		})
		
		
	}
	
	$scope.popupIAB2 = function() {
		var svr = init.getServer();
		var win = cordova.InAppBrowser.open(svr + '/pi', '_self', 'location=yes,menubar=yes,toolbar=yes');
	}

	$scope.popupIAB3 = function() {
		var svr = init.getServer();
		var win = cordova.InAppBrowser.open(svr + '/pi', '_system', 'location=yes,menubar=yes,toolbar=yes');
	}	
	
	
	$scope.changeState = function() {
			console.log('');
			console.log('--changeState');
			//$state.go('app.login' );
			$state.go('app.login', {nextState: 'anything'} );	
	}
	
	$scope.testError = function() {
		var url = 'https://server.local:3000/pi/error';
		var rsc = $resource(url);

		ApiSvc.getFriends('twitter').then(function(friends) {
			console.log('friends: ', friends);
		}).catch(function(err) {
			console.log('err: ', err);
			console.log('err.data.name', err.data.name)
			if (err.data.name && err.data.name == 'NoSocialToken') {
				console.log('no social token, reauthenticating ...');
				Auths.auth('twitter').then(function(profile){
					ApiSvc.getFriends('twitter').then(function(friedns) {
						console.log('friends: ', friends);
					}).catch(function(err) {
						console.log('err fr 2nd attempt: ', err);
					})
				})
			} else {
				console.log('unknown erorr: ', err);
			}
		})
	}
	
	$scope.installCert = function() {
		console.log('installing cert...');
		//installTrustedRootCert('https://192.168.0.4:3000/serverlocal.openssl.pem');
		var svr = init.getServer();
		installTrustedRootCert(svr + '/serverlocal.openssl.pem');
	}
	
	function installTrustedRootCert( rootCertUrl ){
		id = "rootCertInstaller";
		iframe = document.getElementById( id );
		if( iframe != null ) document.body.removeChild( iframe );
		iframe = document.createElement( "iframe" );
		iframe.id = id;
		iframe.style.display = "none";
		document.body.appendChild( iframe );
		iframe.src = rootCertUrl;
	}	
	
	
	console.log('$state: ', $state);
	
	$scope.createReport = function(name, source) {
		var target = {
			name: name
		}
		Reports.create(target, source);
	}
	
	$scope.showReports = function() {
		//var reports = Reports.list();
		var reports = store.get('piReports');
		console.log(reports);
		$ionicPopup.show({
			template: JSON.stringify(reports)
		})

	}

	//fb tests(client side)
	$scope.share = function(src) {
		External.share(src, function(err, res) {	
			if (err) {
				console.log('err from share: ', err);
				return;
			}
			console.log('res fr share: ', res);
		})
	
	}
	
	//fb send test (plugin) 
		//maybe only for fb??? 
	$scope.send = function(src) {
		External.send(src, msg, function(err, res) {
			if (err) {
				console.log('err from send: ', err);
				return;
			}
			console.log('res fr send: ', res);		
		})	
	}
	
	$scope.getFriends = function (src) {

		
		External.getFriends(src, function(err, res) {
			if (err) {
				console.log(err);
				return;
			}
			console.log('res fr getFriends: ', res)
			if (res.length == 0) {
				infoFriends(src);
			} else {
				//continue as usual 
			}
		});
	}
	
	
	$scope.actions = {
		invite: External.invite,
		analzye: ApiSvc.getProfile
			//put in me and apisvc should wrap it up in target before calling...if not possible pass 'me' to server to deal with ...
	}
	//before or after??? after ... 
	//even if not fb, if no friends, can use similar approach but need to check out twitter & yammer...! (but almost impossible!)
	function infoFriends(src) {
		if (src == 'facebook') {
			var friendsInfo = $ionicPopup.show({
				scope: $scope,
				title: 'Info: No Friends returned from ' + src,
				//translate!!!
				template: 'Due to new Facebook policy, your friend won\'t show up unless s/he also uses the app. Please click invite to \"Invite\" your friend to use the app or \"continue\" to analyze yourself',
					// + 'once your friend installs the app we can analyze her/his posts. '
					//options: invite, (?tell her/him about it), analyze yourself
				buttons: [
					{ 
						text: 'Invite',
						onTap: function(e) {
							$scope.action = 'invite';
						}
					},
					{
						text: '<b>Continue</b>',
						type: 'button-positive', 
						onTap: function(e) {
							$scope.action = 'analyze';
							//target = 'me'; but need to build a 'target' obj on me!!! 
								//or server handles it... ? 
								//currently server does not handle ... but can do it...
								//but if client side, better to do from client...
									//then nothing needs to be done on server side;
									//yet, if no client then still need to handle it on server 
						}
					}
				]
			})
			
			friendsInfo.then(function(res) {
				console.log('Tapped!', res);
				//console.log('$scope.items: ', $scope.items)
				//$scope.items[idx] = Reports.nameChanged(res);
				console.log('action: ', $scope.action);
				
				//invite: call function or do it here: 
					//External.invite(src, function(err, res) ..
				//analyze:
					//target = External.getSocialProfile(); if not possible put in 'me' - server needs to deal with!

				$scope.actions[$scope.action](src, function(err, res) {
					if (err) {
						console.log('err from invite: ', err);
						return;
					}
					console.log('res from invite: ', res);
				})
			});
			
		}
	}
	
	$scope.getPosts = function(src) {
		External.getPosts(src, null, function(err, res) {
			if (err) {
				console.log('err from getPosts: ', err);
				return;
			}
			console.log('res fr getPosts: ', res);			
		})
	}

	$scope.getDeviceInfo = function() {
		var dev = init.getDeviceInfo();
		console.log(dev);
	}
	
	
	$scope.setServer = function(serverName) {
		init.setServer(serverName);
	}

	
	$scope.importReport = function(file) {
		var rpts = Reports.list();
		
		External.shareReport('facebook', rpts[0], function(err, res) {
			console.log('err, res: ', err, res);
		})
		//$state.go('app.import', {file: file});
	}
})

.controller('AnalyzeCtrl', function($scope, InitFile, $http, $ionicModal, $window, $ionicPopup, $ionicLoading, Reports, $state, Auths, External, ApiSvc, Profiling) {
	//InitFile.copyFormat();
	var users;
	
	var server = 'https://server.local:3000';
	
	$scope.social ={};
	$scope.social.place = 'facebook';
	//= 'facebook';
	console.log('');
	console.log('=====analyze =======')
	console.log('$scope.place : ', $scope.place)
	
  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/people.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the getPPl modal to close it
  $scope.closePeople = function() {
    $scope.modal.hide();
  };

  
  
	$scope.actions = {
		invite: invite,
		analzye: $scope.getProfile
			//put in me and apisvc should wrap it up in target before calling...if not possible pass 'me' to server to deal with ...
	}
	//before or after??? after ... 
	//even if not fb, if no friends, can use similar approach but need to check out twitter & yammer...! (but almost impossible!)
	function infoFriends(src) {
		
		var friendsInfo;
		
		if (src == 'facebook') {
		
			friendsInfo = $ionicPopup.show({
				scope: $scope,
				title: 'Info: No Friends returned from ' + src,
				//translate!!!
				template: 'Due to new Facebook policy, your friend won\'t show up unless s/he also uses the app. Please click invite to \"Invite\" your friend to use the app or \"continue\" to analyze yourself',
					// + 'once your friend installs the app we can analyze her/his posts. '
					//options: invite, (?tell her/him about it), analyze yourself
				buttons: [
					{ 
						text: 'Invite',
						onTap: function(e) {
							$scope.action = 'invite';
						}
					},
					{
						text: '<b>Continue</b>',
						type: 'button-positive', 
						onTap: function(e) {
							$scope.action = 'analyze';
							//target = 'me'; but need to build a 'target' obj on me!!! 
								//or server handles it... ? 
								//currently server does not handle ... but can do it...
								//but if client side, better to do from client...
									//then nothing needs to be done on server side;
									//yet, if no client then still need to handle it on server 
						}
					}
				]
			})
			
			friendsInfo.then(function(res) {
				console.log('Tapped!', res);
				//console.log('$scope.items: ', $scope.items)
				//$scope.items[idx] = Reports.nameChanged(res);
				console.log('action: ', $scope.action);
				
				if ($scope.action == 'invite') {
					if (src != 'facebook') {
						
					}
					
					External.invite(src, function(err, res) {
						if (err) {
							console.log('err from invite: ', err);
							return;
						}
						console.log('res from invite: ', res);
					})
				} else {
					$scope.getProfile(src, null);
				}
			});
			
		}  else {
			friendsInfo = $ionicPopup.confirm({
				title: 'No friends!',
				template: 'No friends returned from ' + src + ', we\'ll analyze yourself?'
			})
			friendsInfo.then(function(res) {
				if (res) {
					$scope.getProfile(src, null);
				}
			})
		}
	}

	function invite() {
		
	}
  
  // Open the Friends modal
	$scope.getFriends = function(place) {
		  var place = $scope.social.place;
		  console.log('');
		  console.log('-----');
		  console.log('getPeople');
		  console.log('place: ' + place);
	
	
	//test only working for twitter (getTitterUsers)
	//$scope.targets = getTargets(place);
	//External.getUsers(place);
	
		//show loading
		$ionicLoading.show({
			template: 'getting your friends, please wait...'
		});
	
		//should perform client check first??? (as best efforts...or just rely on server...)
		External.getFriends(place, function(err, res) {
			if (err) {
				$ionicLoading.hide();
				
				if (err.name && err.name == 'NoSocialToken') {
					console.error('NoSocialToken fr getFriends API: ', err);
					
					//show confirm (& if ok auth(source) )
						var confirmPopup = $ionicPopup.confirm({
							title: err.name || 'Error',
							template: err.message || err
						});
						confirmPopup.then(function(res) {
							if (res) {
								//go to credits pages... // alternatively a full popup for pay, free.. but what's the point, everyone would choose free..
								console.log('logging user into source...');
								//how to handle nextState / nextUrl? or don't?
									//need all kinds unit test to handle exceptions!!! *** 
								Auths.auth(place).then(function() {
									$ionicPopup.alert({
										title: 'Login Successful',
										template: 'You have successfully logged into ' + place + ', please continue.'
									})
								}).catch(function(err){
									$ionicPopup.alert({
										title: err.name || 'Error',
										template: err.message || err
									})
								})
							}
						})	
				// else if no authorization redirect to login or at least display erro msg...
					//but really, this should be registered as login required... 
				// data.name AuthError
				} else {
					console.log('other err fr getFriends api: ', err);
					$ionicPopup.alert({
							title: err.name || 'Error',
							template: err.message || err
					});
				}			
			} else {
				
				console.log('freinds : ', res.data);
				
				$ionicLoading.hide();
				if (res.data.length == 0) {
					infoFriends(place);
				} else {
					$scope.friends = res.data;
					//$scope.socialName =
					$scope.modal.show();
				}
			}
			
		})
  
	};

	$scope.getFriendsTest = function() {
		console.log('social.place: ', $scope.social.place);
	}
  
  // triggers the analyse request from the ppl list modal
	$scope.doAnalyze = function(person) {
    console.log('analyze request, target: ', person);


  };

  
	var progBar;
  //var piTree;
  
  	$scope.getProfile = function (place, target) {
		var place = $scope.social.place;
		//$scope.target = target;
		console.log('did i call? handle: ');
		console.log('target: ', target);
		
		var targetName = target ? target.id : target;
		
		//show up progress bar & message...(an other modal? or alert...)
		//add some animation... like the one fr Watson..
		progBar = $ionicPopup.show({
			template: 'Porgressing...this may take a few seconds to minutes, please wait and do not close the app.',
			title: 'Analyzing',
			subTitle: 'Porgressing',
			scope: $scope,
		});
		
		function onSuccess(profile) {
			//console.log(JSON.stringify(response.data));	
			
			//close popup
			//go to report state
			//transform report the the desire format (simplified) first
			
			console.log('profile');
			console.log(profile);
			$window.localStorage.rawReport = JSON.stringify(profile);
			
			var report = profile; //response.data;
			var piTree = Reports.transform(report);


			progBar.close();
			
			//report.summary = report.summary;
			//piTree.source = twitter;
			//also save to 'constant'
			//Reports.set(target.name, report);
			if (!target) {
				//self analysis...
				External.getSocialProfile(place, null, function(err, socialProf) {
					if (err) {
						//handle it!
						$ionicPopup.alert({
							title: err.name || 'Error',
							template: err.message || err
						})
						return;
					}
					target = {
						name: socialProf.name,
						image: socialProf.image 
					}
					Reports.create(target, place, profile);
				})
			} else {
				
				Reports.create(target, place, profile);
			}

			
			$scope.modal.hide(); // or remove???
			//$state.go('app.traits', {person: target.name});
			$state.go('app.traits', {file: Reports.list().pop().file});
			
		}
		
		function onError(data) {
			console.log(data);
			
			//with some additiona msg and enable the close button or close automatically 
		}
		
		Profiling.getProfile(place, targetName, function(err, res) {
			
			if (err) {
				
				progBar.close();
				console.log('err from getProfile: ', err);
				
				if (err.name && err.name  == 'NoCredit') {
					console.log('No credit');
					var confirmPopup = $ionicPopup.confirm(err.message);
					confirmPopup.then(function(res) {
						if (res) {
							//go to credits pages... // alternatively a full popup for pay, free.. but what's the point, everyone would choose free..
							console.log('redirect to get credits page');
							$state.go('app.credits');
						}
					})
				} else if (err.name && err.name == 'NoSocialToken') {
					//shouldn't need this as user should have gone thru getFriends...
					var confirmPopup = $ionicPopup.confirm(err.message);
					confirmPopup.then(function(res) {
						if (res) {
							//go to credits pages... // alternatively a full popup for pay, free.. but what's the point, everyone would choose free..
							console.log('login user with source');
							//ApiSvc.auth(source)
						}
					})
				} else if (err.name && err.name == 'NotEnoughText') {
					$ionicPopup.alert({
						title: err.name || 'Error',
						template: err.message || err
					});					
				} else {
					console.log('err from getProfile api: ', err);
				
					//show alert for err msg...
					$ionicPopup.alert({
						title: err.name || 'Error',
						template: err.message || err
					});
					
				}				
			} else {
				onSuccess(res.data.profile);
			}
		})
	
	}
  
 
})

.controller('PeopleCtrl', function($scope, InitFile, $ionicPopup, $ionicLoading, ApiSvc ) {
	
	//$scope.friends = Friends.all();
  
	console.log($scope);
  
	$scope.listlength = 20;
   
	$scope.loadMore = function(){
		if (!$scope.friends){
			$scope.$broadcast('scroll.infiniteScrollComplete');
		return;
    }

    if ($scope.listlength < $scope.users.length)
		$scope.listlength+=10;
		$scope.$broadcast('scroll.infiniteScrollComplete');
	}
		

	FB.login(function(response) {
		console.log('FB.login response');
		console.log(response);
	}, {scope: 'user_posts, user_friends'});
   
})


.controller('ReportsCtrl', function($scope, $window, Reports, $ionicPopup, $state, store, Auths, ApiSvc) {
	

	console.log('will this run again when re-entering the view?');
	
	$scope.items = Reports.list(); //loadReports();
	
	console.log('');
	console.log('reports: ', $scope.items);
	
	//alert: empty reports... 
	if (!$scope.items || $scope.items.length == 0) {
		var alertPopup = $ionicPopup.alert({
			title: 'Warning',
			template: 'There are no existing reports to open.'
		});
		alertPopup.then(function(res) {
			//console.log('clean up...');
		});
	};
	
	
  $scope.data = {
    showDelete: false
  };
  
	function changeReportName(item, idx) {
		$scope.item = item;
	  var editPopup = $ionicPopup.show({
		//template: '<input type="text" ng-model="item.name">',
		template: 	'<input type="text" ng-model="item.name" palceholder="name of the person">',
		title: 'Modify Report Name',
		//subTitle: 'Please use normal things',
		scope: $scope,
		buttons: [
		  { text: 'Cancel' },
		  {
			text: '<b>Save</b>',
			type: 'button-positive', 
			onTap: function(e) {
			  if (!$scope.item.name) {
				//don't allow the user to close unless he enters wifi password
				e.preventDefault();
			  } else {
				  //item.name = $scope.name;
				  //$scope.$apply();
				  console.log('$scope.name: ', $scope.item.name)
				return $scope.item;
			  }
			}
		  }
		]
	  });
	  
	  editPopup.then(function(res) {
		console.log('Tapped!', res);
		console.log('$scope.items: (bf calling nameChange) ', $scope.items)
		$scope.items[idx] = Reports.nameChanged(res);
		console.log('report after name changed called: ', res);
		console.log('$scope.items after nameChange: ', $scope.items);
		
	  });
	}

  
  $scope.edit = function(item, idx) {
    //$ionicPopup.alert({template: 'Edit Item: ' + item.name});
	console.log('idx: ', idx);
	changeReportName(item, idx);
	Reports.save($scope.items);
  };
  $scope.share = function(item) {
    //alert('Share Item: ' + item.name);
	console.log('sharing item: ', item);
	$scope.item = item;
	$scope.chooseSource();
  };
  
  //sharing
  //$scope.src = 'facebook';
	$scope.chooseSource = function() {
		console.log('did i get called? =========')
		//$scope.modal.show();
		$scope.sourceSelection =  $ionicPopup.show({
			templateUrl: 'templates/reports/choose-source.html',
			title: 'Choose social network to share to',
			//subTitle: 'Please use normal things',
			scope: $scope,
			buttons: [
				{
					text: 'Cancel' ,
					onTap: function(e) {
						return;
					}
				}
			]
		});
		
		$scope.sourceSelection.then(function(res) {
			console.log('Tapped!', res);
		});
	}
	
	//need to login first (and handle next url instead of calling function in controller...?) x
		//programactically 
	$scope.shareReport = function(src) {
		console.log('============share, $scope.src & $scope.item', src, $scope.item);
		
		//check if need to login 
		if (Auths.isAuthenticated(src)) {
			
		} else {
			//log user in 
			
			//share 
			
		}
		
		ApiSvc.reports.export({
				file: $scope.item.file, 
				name: $scope.item.name,
				date: $scope.item.date,
				image: $scope.item.image,
				source: $scope.item.source,
				content: store.get($scope.item.file)
		}).$promise.then(function(res){
			console.log('res: ', res);
		}).catch(function(err) {
			console.log('err: ', err);
		})
		
		$scope.sourceSelection.close();
		//$state.go('app.report.perspectives.facet', {perspective: perspective});

	}  
	
	// function export or service Reports.export
	
  
    $scope.moveItem = function(item, fromIndex, toIndex) {
		$scope.items.splice(fromIndex, 1);
		$scope.items.splice(toIndex, 0, item);
		Reports.save($scope.items);
	};
  
  $scope.onItemDelete = function(item) {
    $scope.items.splice($scope.items.indexOf(item), 1);
	Reports.removeFile(item.file);
	Reports.save($scope.items);
	//$scope.items = Reports.list();
	//console.log('delete: new $scope.items: ', $scope.items);
  };
  
  $scope.openReport = function(file) {
        console.log(file);
		//store the report
		//Reports.set(item.name, item);
		$state.go('app.traits', {file: file}); 
  };
  
  $scope.$on("$ionicView.beforeLeave", function(event, data) {
	  console.log('before leaving, $socpe.items: ', $scope.items);
	  console.log(data);
	  //Reports.save($scope.items);
  })
  
  
  //in case user never leaves the view and leaving the app on until powered off or crash (?)
   $scope.$on("$ionicView.unloaded", function(event, data) {
	  console.log('before destroyed, $scope.items: ', $scope.items);
	  console.log(data);
	  //Reports.save($scope.items);
  })
  
	//refresh data 
	$scope.doRefresh = function() {
		$scope.items = Reports.refresh();
		console.log('reports: from list: ', $scope.items);
		$scope.$broadcast('scroll.refreshComplete');
	}
	
	$scope.$on('$ionic.reconnectScope', function() {
		$scope.items = Reports.list();
	});

	$scope.$on('$ionicView.beforeEnter', function() {
		$scope.items = Reports.list();
	});	
})

//not used..(?)
.controller('ExportCtrl', function($scope, Reports, store, $stateParams) {
	console.log('');
	console.log('=======ExportCtrl');
	console.log('params: ', $stateParams);
})

//todo: use btoa & atob x? 
//userid/ in share url 
	//str.substring(str.indexOf('/')+1);
	//in export side, grab id fr store (store it when auth..?);
		//if none exists, to still allow sharing without logging in, use timestamp? (then no parent in db... - i.e. not mandatory - if empty assumes celebrity  )
		//or force user to login??? 
		//or take the risk of not being unique ... (since in this case, it must be a public report)
.controller('ImportCtrl', function($scope, Reports, store, $state, $stateParams, ApiSvc) {
	console.log('');
	console.log('=======ImportCtrl');
	console.log('params: ', $stateParams);
	
	//replacing - with space (for firstname lastname; reverse conversion required in links... )
	
	//no need any more since using 64 encode 
	//var name = $stateParams.file.replace('-', ' ');
	
	ApiSvc.reports.get({file: file}).$promise.then(function(res) {
		//add the file to reports (overwrites it if exists...or use the same kind of mechanism in naming - report service!) and open it 
		var report = res.data;
		console.log('report: ' , report);
		
		var target = {
			name: report.name,
			image: report.image
		}
		var file = Reports.create(target, report.source, null, report)
		//open it
		$state.go('app.traits', {file: file, opts: 'store'});
	
	}).catch(function(err) {
		console.log('err: ' , err);
	})

	
})


.controller('DisplayCtrl', function($scope, Reports, store, $state, $stateParams, ApiSvc) {
	console.log('');
	console.log('=======DisplayCtrl');
	console.log('params: ', $stateParams);
	
	//replacing - with space (for firstname lastname; reverse conversion required in links... )
	var name = $stateParams.file.replace('-', ' ');
	
	ApiSvc.reports.get({file: name}).$promise.then(function(res) {
		//add the file to reports (overwrites it if exists...or use the same kind of mechanism in naming - report service!) and open it 
		var report = res.data;
		console.log('report: ' , report);
		
		var target = {
			name: report.name,
			image: report.image
		}
		var file = Reports.create(target, report.source, null, report)
		//open it
		//now traits need to handle the report from filestore or memory (why can't local store???)
		$state.go('app.traits', {file: file});
	
	}).catch(function(err) {
		console.log('err: ' , err);
	})

	
})



.controller('TraitsCtrl', function($scope, Language, InitFile, Reports, $state, $stateParams, $ionicHistory) {
	console.log('TraitsCtrl');
	
	 //old approach
	//$scope.piTree = Reports.get($stateParams.person).tree;
	$scope.piTree = Reports.get($stateParams.file, $stateParams.opts).tree;
	console.log('piTree from TraitsCtrl');
	console.log($scope.piTree);
	
	$scope.file = $stateParams.file
	$scope.name = Reports.getName($scope.file);
	
	//var sampleTree = $scope.sampleTree = InitFile.getData('sampleTree');
	//$scope.score = "profile";
	$scope.scoreOpts = {
		score: "profile"	
	}
	$scope.languageToggle ={'en': true};	
	$scope.language = Language.getLanguage();
	$scope.languageName = InitFile.getLanguageName(language);
	console.log('lang name')
	console.log($scope.languageName);
	console.log(InitFile.getData());
	
	if ($scope.language == 'es' ) {
		$scope.languageToggle.en = false;
		$scope.languageDisplay = 'Spanish';
	}

	var facets = $scope.facets = InitFile.getData('facets');
	var viewNames=InitFile.getData('viewNames');	
	var viewIndex = InitFile.getData('viewIndex');
	
	//console.log('here - traits?');
	//console.log('facets: ');
	//console.log(facets);
	//$scope.b5data = InitFile.getData();
	//console.log('b5data: ');
	//console.log($scope.b5data);
	

	$scope.languageChange = function() {
		if ($scope.languageToggle.en == true) {
			$scope.language = 'en';

		} else {
			$scope.language ='es';
		}
		Language.setLanguage($scope.language);
		$scope.languageName = InitFile.getLanguageName($scope.language);
	}

	$scope.openFacet = function(facet) {
		//prepare and get profile.facet shared by all perspective
		//$scope.tree = $scope.piTree[facet];
		$ionicHistory.nextViewOptions({
			//disableBack: true,
			//historyRoot: true,
			//disableAnimate: true
			
		});		
		//var score = $scope.score == 'profile' ? null: $scope.score;
		var url = 'app.report.perspectives.facet';
		var perspective = facet == 'Needs' ? 'Approaching' : 'Relationship' ;
		//var viewName = facet == 'Needs' ? 'Business' : 'Love';
		//url = url + viewName;
		
		console.log('score: ', $scope.scoreOpts.score);
		
		$state.go(url, {file: $scope.file, facet: facet, perspective: perspective, score: $scope.scoreOpts.score});
	}
	
	$scope.backToReports = function() {
		$ionicHistory.nextViewOptions({
			disableBack: true,
			historyRoot: true,
			//disableAnimate: true
			
		});		
		$state.go('app.reports');
	}
})

.controller('SummaryCtrl', function($scope, Reports, $stateParams, $ionicPopup) {
	
	$scope.file = $stateParams.file;
	$scope.name = $scope.file.split('_')[0];
	
	//error checking? on file on report???
	$scope.report = Reports.get($scope.file);
	if ($scope.report) {
		$scope.summary = $scope.report.summary;
		$scope.behaviors = $scope.report.behaviors;
		console.log($scope.report);
	} else {
		$ionicPopup.alert({
			title: 'Report Empty',
			template: 'The report is empty or has an empty summary.'
		})
	}
})

.controller('ReportCtrl', function($scope, $rootScope, $state, Reports, $stateParams, InitFile, $ionicTabsDelegate, $timeout) { //, facetTree) {
	
	console.log('--ReportCtrl');
	console.log('params: ');
	console.log($stateParams);
	console.log('$scope: ', $scope);
	//$scope.$stateParams = $stateParams;
	
	$scope.file  = $rootScope.file = $stateParams.file;
	$scope.facet = $rootScope.facet = $stateParams.facet;
	$scope.score = $rootScope.score = $stateParams.score;
	//$scope.traitName = $scope.facet;
	
	$scope.name = $rootScope.name = Reports.getName($scope.file);	
	//prepare profile tree for this facet (ideally shared by all perspective...but cost is low)
	$scope.tree = $rootScope.tree = Reports.get($scope.file).tree[$scope.facet];
	
	$scope.scoreTest = false;
	
	if ($scope.score != 'profile') {
		//parent.scoreTest = true;
		$scope.scoreTest = true;
	}
	
	//getSummary that's specific to facet but independent to perspectives & views
	$scope.traitsSummary = InitFile.getData('Traits-Summary', $scope.facet);		
	//$state.go('app.report.perspectives', {perspective:'Relationship'});
	
	//if file, facet, score change doesn't re-run controller need to put above in init and detect chagne... 
})


//new design 
.controller('PerspectivesCtrl', function($scope, $rootScope, $ionicScrollDelegate, $timeout, $stateParams, InitFile, $document, $ionicGesture, $window, $state, $ionicSideMenuDelegate, $ionicHistory, $ionicTabsDelegate, TempShare, ColorScheme, PerspectiveDescription, $translate, Reports, $ionicTabsDelegate, $ionicModal, $ionicPopup) {
	
	console.log('perspective ctrl starts: ');
	console.log('params: ');
	console.log($stateParams);
	//console.log('scope - begining: ');
	//console.log($scope);


	
	$scope.$on('$ionicView.beforeEnter', function() {
			
			console.log('perspectives ctrl before entering?');
			//console.log('params: ');
			//console.log($stateParams);
			//console.log('$scope');
			//console.log($scope);
			//console.log("$scope.perspective: " + $scope.perspective);

	});	
	
	$scope.$on('$ionicView.beforeLeave', function() {
			//$stateParams.scoreToggle = $scope.scoreToggle;
			//$stateParams.traitName = $scope.traitName;
		//console.log('am i leaving? ');
		//TempShare.set('traitName', traitName);
		//TempShare.set('scoreToggle', scoreToggle);
	});
	
	
	//console.log($scope.$parent);
	 
	//console.log('tratis: ');
	//console.log($scope.traits);
	//console.log($scope.traits[0].children);
	
	// get top position
	$scope.getTopPos = function(item, items, height) {
		//var arr = Array.from(items);
		var arr = Object.keys(items).map(function(k) { return items[k] });
		//console.log(items);
		//console.log(arr);
		var pos = (arr.indexOf(item)-0)*height;
		//console.log('did i get called');
		//console.log(pos);
		return pos;
	}
	
	
	//var partial = $scope.traits.children.slice(0,2);
	//$scope.traits.children = partial;
	//console.log('=========$scope.traits.children[0]: ', $scope.traits.children[0]);
	
	
	//helper functions
		
	$scope.getCombos = function(combos, params) {
		var newInfo;
		
		var score = params; //.score;
		

		
		var combosScores = getScores(combos);
		
		//debug 
		//console.log('getCombos: combos -- score --  ', combos, score);
		//console.log('comboScores: ', combosScores);
		
		//can safely assume the score exists in combo.info since func is calling from {{placeHolder}} 
		//for now only assume single combo, if necessary need to change json to arr and below accordingly... or, can always use extra instead (better?) 
		newInfo = combos.info[score].info[combosScores];
		
		if (combos.info[score].hasOwnProperty('extra')) {
			//console.log('did i get called? - extra');
			// for now only process the first !!!
			var extra = combos.info[score].extra[0];
			//console.log('extra: ');
			//console.log(extra);
			var extraScores = getScores(extra);
			
			//console.log('extraScores: ');
			//console.log(extraScores);
			
			// *** can safely assume the score exists in combo.info since func is calling from {{placeHolder}} 
			newInfo += ' ' + extra.info[extraScores];
			
			console.log('newInfo: ' + newInfo);
		}
		return newInfo;
	}
	
	function getScores(combos) {
		var combosScores = $scope.getScoreAcross(combos.traits[0].trait, combos.traits[0].facet).replace(/(-high|-low)/,'');
		for (i=1; i<combos.traits.length; i++) {
			combosScores += ', ' + $scope.getScoreAcross(combos.traits[i].trait, combos.traits[i].facet).replace(/(-high|-low)/,'');
		}
		return combosScores;
	}
		
	$scope.getNonDefaultCombos = function(nondefault, params) {
		var newInfo;
		//console.log('did i get called? getNonDefaultCombos');
		return $scope.getCombos(nondefault[0], params);
	}	
	

	$scope.goback = function() {
		console.log('going back to traits...');
		$ionicHistory.nextViewOptions({
			//disableBack: true,
			//historyRoot: true,
			//disableAnimate: true
			
		});		
		$state.go('app.traits', {file: $scope.file});
	}
	
	function getTraits(traits) {
		$translate(traits[0].traitName).then(function(translation) {
			$scope.allTraits = translation;
		});
		for (i=1; i<traits.length; i++) {
			//$scope.allTraits += ', ' + traits.traitName;
			
			$translate(traits[i].traitName).then(function(translation) {
				$scope.allTraits += ', ' +translation;
			})
			
		}	
		
	}
	
	//getTrait($scope.traitsSummary.children, 'Altruism');

	function getTraitIdx(traits, traitName) {
		for (trait in traits) {
			if (traits[trait].traitName == traitName) {
				console.log(trait);
				return trait;
			}	
		}	
	}
	
	//$rootScope.getTrait = function(traits, traitName) {
	$scope.getTrait = function(traits, traitName) {	
		for (trait in traits) {
			console.log(trait);
		}	
	}
	
	//get score across facets (for combo)
	//$rootScope.getScoreAcross = function(traitName, facetName, scoreType) {
	$scope.getScoreAcross = function(traitName, facetName, scoreType) {
		//var score = 'low';
		if (test) {
			return $scope.score;
		} else {
			var facet = facetName ? facetName : $scope.facet;
			return Reports.getScore($scope.file, traitName, facet, scoreType);			
		}		
	}
	
	//within the same facet 
	//$rootScope.getScore = function(traitName, scoreType) {
	$scope.getScore = function(traitName, scoreType) {	
		//console.log('tree: ', tree);
		//if ($rootScope.scoreTest) {
		if ($scope.scoreTest) {	
			return $scope.score;
		} else {
			//console.log(' =========== getScore: ', Reports.getScoreFromFacet($scope.tree, traitName, scoreType));
			return Reports.getScoreFromFacet($scope.tree, traitName, scoreType);
			
		}
		
	}
	
	
	function getScoreFromFacet (facetName, traitName) {
		return 'high';
	}
	
	//don't use... use getScores in stead
	//takes the traits (array) and returns the combosScores
	$scope.getCombosScore = function(traits) {
		
		//error handling???
		if (traits.length == 1) {
			//single score
			return $scope.getScoreAcross(traits[0].trait, traits[0].facet);
		} else {
			//multiple scores
			//for now should be limited two only
			var scores = $scope.getScoreAcross(traits[0].trait, traits[0].facet);
			scores += ', ' + $scope.getScoreAcross(traits[1].trait, traits[1].facet);
			return scores;
		}
	}
	
	//$rootScope.getPerspectiveColor = function() {
	$scope.getPerspectiveColor = function() {
		return ColorScheme.getPerspectiveColor($scope.perspective);
	}
	

	//console.log($scope.perspectiveDescription);

	
	$scope.isIOS = function() {
		return ionic.Platform.isIOS();
	}
	
	

	
	function initTraits() {
		
		$scope.traitsSummary = InitFile.getData('Traits-Summary', $scope.facet);

		//initPerspective();
		

	}
	
	$scope.initPerspective = function(perspective) {
		
		$scope.perspective = perspective;
		$scope.traits = $rootScope.traits = InitFile.getData($scope.perspective, $scope.facet)
		console.log('perspective, facet, traits: ', perspective, $scope.facet, $scope.traits);	
		//$scope.viewColor = ColorScheme.getViewColor($scope.perspective, $scope.viewName);
		$scope.perspectiveColor = ColorScheme.getPerspectiveColor($scope.perspective);
		//$scope.viewOverlayColor = ColorScheme.getViewOverlayColor($scope.perspective, $scope.viewName);
	//$rootScope.perspectiveDescription = {
		$scope.perspectiveDescription = {	
			perspectiveDescription: InitFile.getData('Perspective-Description', $scope.perspective)
		}
		console.log('------------initPerspective, $scope ', $scope );
	}
	
	function initData() {
		//not needed in new design
		//$scope.traits = InitFile.getData($scope.perspective, $scope.traitName);
		$scope.allTraits='';
		getTraits($scope.traits.children);
		
		$scope.summaryDetails = {
			summaryDetails: $scope.traits.summary
		};
		console.log('traits in initdata()');
		console.log($scope.traits);
	}
	
	function init() {
		//initTraits();
		$scope.initPerspective($stateParams.perspective);
		initData();
		//console.log('this in init');
		//console.log(this);
	}	
	
	
	//popup approach (not using modal!)
	
	$scope.changePerspective = function() {
		console.log('did i get called? =========')
		//$scope.modal.show();
		$scope.changePopup =  $ionicPopup.show({
			templateUrl: 'templates/report/perspective-change.html',
			title: 'Change Perspective',
			//subTitle: 'Please use normal things',
			scope: $scope,
			buttons: [
				{
					text: 'Cancel' ,
					onTap: function(e) {
						return;
					}
				}
			]
		});
		
		$scope.changePopup.then(function(res) {
			console.log('Tapped!', res);
		});
	}
	
	$scope.perspectiveToggle = function(perspective) {
		console.log('============perspective toggle!, perspective & $scope.perspective', perspective, $scope.perspective);
		
		if ($scope.perspective != perspective) {
			$scope.changePopup.close();
			$scope.perspective = perspective;
			$scope.perspectiveChanged = true;
			$scope.initPerspective(perspective);
			//$scope.modal.hide();
			
			$ionicHistory.nextViewOptions({
				//disableBack: true,
				//historyRoot: true,
				//disableAnimate: true
				
			});			
			$state.go('app.report.perspectives.facet', {perspective: perspective});
		//, {reload: true});
		}
	}
	
	
	

	init();
	
})

.controller('ViewsCtrl', function($scope, $stateParams, $state, $ionicHistory, $ionicTabsDelegate) {
	console.log('======Views Ctrl ')
		
	$scope.tabs = $ionicTabsDelegate;	
	//$scope.AllViews = 

		
	$scope.onTabDeselected = function (viewName) {
		console.log('=========================deselected: ', viewName);
	}
		
	
	$scope.$on('$ionicView.enter', function(event) {
		console.log('views ctrl ====: enter view');
		
		
		$scope.onTabSelected = function(viewName) {
			console.log('==============tab seleted, viewName: ', viewName, '$scope.currentView', $scope.currentView);
			console.log('params: ', $stateParams, '$scope: ', $scope);
			//$state.go('app.report.perspectives.views', {viewName: viewName});
			//$rootScope.viewName = 
			
			//???
			//if ($scope.currentView != viewName) {
			//$scope.viewName = viewName;
			//$scope.viewChanged = true;
			//$scope.initView();
			
				$ionicHistory.nextViewOptions({
					//disableBack: true,
					//historyRoot: true,
					//disableAnimate: true
					
				});		
				$state.go('app.report.perspectives.trait.views.view.' + viewName);
			//}
			
		}
		
	
	})
	

})

.controller('ViewCtrl', function($scope, $rootScope, $state, $stateParams, ColorScheme,  $ionicTabsDelegate, InitFile) {
	
	console.log('==========view ctrl');

		//$scope.viewName = $stateParams.viewName;
		//$scope.$parent.$parent.$parent.$parent.currentView = $stateParams.viewName;

	console.log('$scope: ', $scope);
	
	/*
	var parent = $rootScope;
	//when only view change, this should not be called again...(???) //or still inherited by view???
	$scope.perspective = parent.perspective;

	$scope.traits = parent.traits;
	$scope.name = parent.name;
	$scope.score = parent.score;
	$scope.traitsSummary = parent.traitsSummary;
	$scope.getScore = parent.getScore;
	$scope.getRoles = parent.getRoles;
	$scope.getPerspectiveColor = parent.getPerspectiveColor;
	$scope.perspectiveToggle = parent.perspectiveToggle;
	$scope.PerspectiveSummaryTitle = parent.PerspectiveSummaryTitle;
	$scope.getView=parent.getView;
	$scope.goback = parent.goback;
	*/
	
	
	//role helper functions and combos 
	

	
	//all view related data & functions ... 
	function getPlaceHolder(info) {
		var	idx1 = info.indexOf('{{') + 2;
		var idx2 = info.indexOf('}}');
		return info.substring(idx1, idx2);
	}
	
	function processCombos(func, combos, params) {
		var newInfo;	
		//debug
		//console.log('===================processCombos')
		//console.log('params, ', params);
		
		return func(combos, params);
	}



	//all view related functions 
	//this one could be moved to TraitCtrl
	
	//use getRolseFromView instead!
	$scope.getRoles = function(viewName, views, score) {
			
			console.log('========getRoles, did i get called? ');
			//console.log('views: ');
			//console.log(views);
			//var views = trait.children;
			//var view;
			var role, extraRole;
			var comboStr;
			//hard coding score for now, remember to unify all 3 medium scores into one later!
			var comboScore = 'high'; // shouldn't be used 
			var combosScore = 'high, high';
			var roles;
			var idx1, idx2;
			var placeHolder;
			//var info, infos;
			var suffix, firstSuffix;
			var stdScore;
		
		
			
			for (i=0; i < views.length; i++) {
				
				//console.log('getroles, viewName: ');
				//console.log(viewName);
				
				var info;
				//initialize it deliberately to avoid value from previous iteration 
				var infos = null;
				
				view = views[i];
				
				//console.log('view: ', view);
				
				if (view['viewName'] == viewName ) {


					roles = new Array;
					

					
					for (j=0; j < view['roles'].length; j++) {

						if (view == undefined) {

							console.log('undefined! views[i]: ')
							console.log(views[i]);

						}
						
						if (view['roles'][j]['info'].hasOwnProperty(score)) {

							role = view['roles'][j];
							newRole = new Object;
							newRole.info = view['roles'][j]['info'][score];
							newRole.roleName = view['roles'][j]['roleName'];
							info = newRole.info;
							
							//debug: 
							if (newRole.roleName == 'superior') {

							}

							if (role.combo != undefined) {		
								console.log('combo!');
								//for now assume only one trait in the combo
								if (role.combo.info.hasOwnProperty(score)) {
									//comboStr = func ... or, for now:
									//get comboScore;
									comboStr = role.combo.info[score].info[comboScore];
									idx1 = info.indexOf('{{') + 2;
									idx2 = info.indexOf('}}');
									placeHolder = info.substring(idx1, idx2);
									newRole.info = info.replace(('{{' + placeHolder + '}}'), comboStr);

								}
								//need to format data!								
							}

							//for combos: (at this stage keep both, in case most of the combo is single...)

							if (role.combos != undefined) {		
								//console.log('combos!');															
								//console.log(views);
								//console.log(views[i].roles
								
								//hardcoding comboscores
								/*
								switch (role.combos.traits.length) {
									case 1: 
										combosScore = 'high'
										break;
									case 2: 
										combosScore = 'high, high';
										break;
								}
								*/
								
								//standardize score to 3 grades 
								stdScore = score.replace(/(-high|-low)/,'');
								placeHolder = getPlaceHolder(info);
								
								//for now assume only one trait in the combo
								if (role.combos.info.hasOwnProperty(stdScore)) {
									//comboStr = func ... or, for now:
									//get combosScore;
									
									//console.log('stdscore: ' + stdScore);
									console.log('comboScore(2): ' + combosScore);
									//console.log('role');
									//console.log(role);									
									//console.log('info - combos.info: ');
									//console.log(info);
									console.log('placeHolder: ', placeHolder);
									

									comboStr = processCombos($scope[placeHolder], role.combos, score);

									
									//newRole.info = info.replace(('{{' + placeHolder + '}}'), comboStr);
									newRole.info = info.replace(('{{' + placeHolder + '}}'), comboStr);

									//console.log('combos/placeholder: ' + placeHolder);
									//console.log('combos/info in newRole: ' + newRole.info);
								} else if (role.combos.hasOwnProperty('nondefault')) {
									//console.log(role.combos.nondefault);
									//to process array of info. for now, just process the first one
									// *** if non-default then no default; otherwise should use extra instead ***
									if (role.combos.nondefault[0].info.hasOwnProperty(stdScore)) {
										var nonDefaultInfo = role.combos.nondefault[0].info[stdScore];
										//console.log('info - nondefault: ');
										//console.log(info);
										
										//placeHolder = getPlaceHolder(info);
										comboStr = processCombos($scope[placeHolder], role.combos.nondefault, score);
										newRole.info = info.replace(('{{' + placeHolder + '}}'), comboStr);
									}
								}
								
								//need to format data!
								var tmp = newRole.info;
								infos = InitFile.formatInfo(tmp)
								//console.log('infos: ');
								//console.log(infos);
								//use a function?
								//infos = [];
								
								if (infos.length > 1 ) {
									firstSuffix =newRole.roleName.replace( /^\D+/g, '');
									if (firstSuffix == '') {
										firstSuffix = 0;
									}
									suffix = firstSuffix + 1;
									//console.log('suffix: ' + suffix);
								}

							}							
							
							
							//roles.push(newRole);
							//any remaining pages
							
							if (infos != undefined)  {
								newRole.info = infos[0];
								roles.push(newRole);
								for (k=1; k<infos.length; k++) {
									extraRole = new Object;
									extraRole.roleName = newRole.roleName + ' (' + (suffix+k) + ')' 
									extraRole.info = infos[k];
									roles.push(extraRole);
								}
								//console.log('roles');
								//console.log(roles);
							} else {
								roles.push(newRole);
							}
						}	
					}

					
					return roles;
				}
			}		
	}
	
	//provide  roles from a particular view 
	$scope.getRolesFromView = function(view, score) {
		
		//debug 
		//if (view.viewName == 'Business') 
			//console.log('=============getRolesFromView=======');
			//console.log('view, score: ', view, score);
		//
		
			var role, extraRole, newRole;
			var comboStr;
			//hard coding score for now, remember to unify all 3 medium scores into one later!
			var comboScore = 'high';
			var combosScore = 'high, high';
			var roles;
			var idx1, idx2;
			var placeHolder;
			//var info, infos;
			var suffix, firstSuffix;
			var stdScore;		
			roles = new Array;
			
					for (j=0; j < view['roles'].length; j++) {
						
						var info, infos;
						infos = null;
						
						if (view == undefined) {

							console.log('undefined! views[i]: ')
							console.log(views[i]);

						}
						
						if (view['roles'][j]['info'].hasOwnProperty(score)) {

							role = view['roles'][j];
							newRole = new Object;
							newRole.info = view['roles'][j]['info'][score];
							newRole.roleName = view['roles'][j]['roleName'];
							info = newRole.info;
							
							//debug: 
							//console.log('role: ', role);
							
							//if (newRole.roleName == 'superior') ...

							if (role.combo != undefined) {		
								console.log('combo!');
								//for now assume only one trait in the combo
								if (role.combo.info.hasOwnProperty(score)) {
									//comboStr = func ... or, for now:
									//get comboScore;
									comboStr = role.combo.info[score].info[comboScore];
									idx1 = info.indexOf('{{') + 2;
									idx2 = info.indexOf('}}');
									placeHolder = info.substring(idx1, idx2);
									newRole.info = info.replace(('{{' + placeHolder + '}}'), comboStr);

								}
								//need to format data!								
							}

							//for combos: (at this stage keep both, in case most of the combo is single...)
	
							if (role.combos) {	
								//console.log('combos!');															
								//console.log('role: ', role);
								
								//standardize score to 3 grades 
								stdScore = score.replace(/(-high|-low)/,'');
								placeHolder = getPlaceHolder(info);
								
								//for now assume only one trait in the combo
								if (role.combos.info.hasOwnProperty(stdScore)) {
									//comboStr = func ... or, for now:
									//get combosScore;
									
									//console.log('stdscore: ' + stdScore);
									//console.log('comboScore: ' + combosScore);
									//console.log('role');
									//console.log(role);									
									//console.log('info - combos.info: ');
									//console.log(info);
									
									
									//debug: 
									//console.log('placeholder: combos, role,  ' + placeHolder, role.combos, role, score, stdScore);
									//console.log('placeHolder: ', placeHolder);

									//comboStr = processCombos($scope[placeHolder], role.combos, score);
									comboStr = processCombos($scope[placeHolder], role.combos, stdScore);
									
									//newRole.info = info.replace(('{{' + placeHolder + '}}'), comboStr);
									newRole.info = info.replace(('{{' + placeHolder + '}}'), comboStr);

									//console.log('combos/placeholder: ' + placeHolder);
									//console.log('combos/info in newRole: ' + newRole.info);
								} else if (role.combos.hasOwnProperty('nondefault')) {
									//console.log(role.combos.nondefault);
									//to process array of info. for now, just process the first one
									// *** if non-default then no default; otherwise should use extra instead ***
									if (role.combos.nondefault[0].info.hasOwnProperty(stdScore)) {
										var nonDefaultInfo = role.combos.nondefault[0].info[stdScore];
										//console.log('info - nondefault: ');
										//console.log(info);
										
										//placeHolder = getPlaceHolder(info);
										comboStr = processCombos($scope[placeHolder], role.combos.nondefault, score);
										newRole.info = info.replace(('{{' + placeHolder + '}}'), comboStr);
									}
								}
								
								//need to format data!
								var tmp = newRole.info;
								infos = InitFile.formatInfo(tmp)
																
								//console.log('infos: ');
								//console.log(infos);

								//use a function?

								
								if (infos.length > 1 ) {
									firstSuffix =newRole.roleName.replace( /^\D+/g, '');
									if (firstSuffix == '') {
										firstSuffix = 0;
									}
									suffix = firstSuffix + 1;
									//console.log('suffix: ' + suffix);
								}

							}							
							
							
							//roles.push(newRole);
							//any remaining pages
							//console.log('infos', infos);
							//console.log('newRole', newRole);
							
							if (infos != undefined)  {
								newRole.info = infos[0];
								roles.push(newRole);
								for (k=1; k<infos.length; k++) {
									extraRole = new Object;
									extraRole.roleName = newRole.roleName + ' (' + (suffix+k) + ')' 
									extraRole.info = infos[k];
									roles.push(extraRole);
								}
								//console.log('roles');
								//console.log(roles);
							} else {
								//console.log('newRole: ', newRole);
								roles.push(newRole);
							}
						}	
					}		
					
					return roles;
	}
	
	$scope.getView = function(views, viewName) {
			for (i=0; i < views.length; i++) {
				//console.log('getroles, viewName: ');
				//console.log(viewName);
				//console.log('viewnames[i][viewName]: ');
				//console.log(views[i]['viewName']);
				if (views[i]['viewName'] == viewName ) {
					//console.log('views: ')
					//console.log(views[i]);
					//return views[i]['general']['high'];
					return views[i];
				}
			}		
	}

	$scope.getViewColor = function(viewName) {
		//console.log('===============viewName: viewColor: ', viewName, ColorScheme.getViewColor($scope.perspective, viewName));
		return ColorScheme.getViewColor($scope.perspective, viewName);
	}
	
	$scope.getViewOverlayColor = function(viewName) {
		return ColorScheme.getViewOverlayColor($scope.perspective, viewName);
	}	
	
	//needs to be called when view or ***perspective*** changes 
	$scope.initView = function(viewName) {
		//parent.viewColor =
		$scope.viewColor =  ColorScheme.getViewColor($scope.perspective, viewName);
		//$scope.perspectiveColor = ColorScheme.getPerspectiveColor($scope.perspective);
		//parent.viewOverlayColor =
		$scope.viewOverlayColor =  ColorScheme.getViewOverlayColor($scope.perspective, viewName);		
	}
	
	
	//deselect the tag if promgramatially going to the state
	$scope.checkTab = function() {
		var indexes = {
			Love: 0,
			Work: 1,
			Social: 2,
			Business: 3
		}	
		var idx = indexes[$scope.viewName];
		
		//console.log('================selected tab: ', $ionicTabsDelegate.selectedIndex(), 'idx: ', idx, 'param: ', $stateParams);
		
		if ($ionicTabsDelegate.selectedIndex() != idx ) {
			console.log('i am changing it to ', idx)
			//$ionicTabsDelegate.select(idx)
		}
	}
	
		var indexes = 
			{
				'Love': 0,
				'Work': 1,
				'Business': 2,
				'Social': 3
			};

	$scope.$on('$ionicView.beforeEnter', function(event) {
		console.log('view ctrl ====: before enter, $scope.viewName, $stateParams.viewName, selected tab, $state: ',  $scope.viewName, $stateParams.viewName, $ionicTabsDelegate.selectedIndex(), $state);
		if ($scope.viewName != $state.params.viewName) {
		//if ($ionicTabsDelegate.selectedIndex())...
			//this could be a cached page!
			//var idx = indexes[$stateParams.viewName];
			//$ionicTabsDelegate.select(idx);
			$scope.viewName = $state.params.viewName;
		}
	})

	$scope.$on('$ionicView.enter', function(event) {
		console.log('view ctrl ====: enter, $scope.viewName, $stateParams.viewName, selected tab : ',  $scope.viewName, $stateParams.viewName, $ionicTabsDelegate.selectedIndex());

	})
	
	//main 
	//$scope.initView();
	//$state.go('app.report.perspectives.views.facet');
})

.controller('FacetCtrl', function($scope, $rootScope, $state, $stateParams, $ionicModal) {
	console.log('FacetCtrl==== ');
	
	
	/*
	var parent = $rootScope;
	//$scope.traits = parent.traits;
	$scope.name = parent.name;
	$scope.score = parent.score;
	$scope.perspective = parent.perspective;
	$scope.traitsSummary = parent.traitsSummary;
	$scope.getScore = parent.getScore;
	$scope.getRoles = parent.getRoles;
	$scope.getPerspectiveColor = parent.getPerspectiveColor;
	$scope.perspectiveToggle = parent.perspectiveToggle;
	$scope.PerspectiveSummaryTitle = parent.PerspectiveSummaryTitle;
	$scope.getView=parent.getView;
	$scope.goback = parent.goback
	$scope.facet = parent.facet;
	$scope.traitName = parent.facet;
	*/
	
	//check if view & perspective changes - to del
	$scope.$on('$ionicView.beforeEnter', function(event){
		console.log('=======facet ctrl, before enter');
		console.log('params: ', $stateParams);
		//if ($scope.viewChanged) 
			//$scope.viewName = $stateParams.viewName;
			//change parent's viewname

			//initFacet();
			
		//
		//console.log('scope before checkTab: ', $scope);
		//$scope.checkTab();
		
		//check perspective 
		
	});	
	
	
	$scope.traitDetails = function(idx) {
		console.log('==============idx: ', idx);
		//$state.go('app.report.perspectives.views.view.trait', {option: 'notabs', traitIdx: idx});
		//var viewName = $scope.viewName || 'Love';
		//$state.go('app.report.perspectives.trait', {traitIdx: idx})
		var url = 'app.report.perspectives.trait.views.view.';
		url = $scope.facet == 'Needs' ? url + 'Business' : url + 'Love';
		$state.go(url, {traitIdx: idx});
	}
	
	//'$ionicView
	$scope.$on('$ionicView.loaded', function(event){
		//console.log('=========facet : did i get called?', 'param: ', $stateParams, $scope.viewName);
		//$scope.checkTab();
	});		


	//main 
	function initFacet() {
		//$scope.viewName = parent.viewName;
		//$scope.tratis = parent.traits;
		//$scope.viewColor = parent.viewColor;
		//$scope.viewOverlayColor parent.viewOverlayColor;			
	}

	
})

.controller('TraitCtrl', function($scope, $rootScope, $state, $stateParams) {
	console.log('=============TraitCtrl); //, params: ', $stateParams, '$scope', $scope);
	
	/*
	var parent = $rootScope;
	
	//should not need this 
	$scope.traits = parent.traits;
	$scope.name = parent.name;
	$scope.score = parent.score;
	$scope.perspective = parent.perspective;
	//$scope.traitsSummary = parent.traitsSummary;
	$scope.getScore = parent.getScore;
	$scope.getRoles = parent.getRoles;
	$scope.getPerspectiveColor = parent.getPerspectiveColor;
	$scope.perspectiveToggle = parent.perspectiveToggle;
	//$scope.PerspectiveSummaryTitle = parent.PerspectiveSummaryTitle;
	$scope.getView=parent.getView;
	$scope.goback = parent.goback;	
	*/	
	
	function initTrait(traitIdx) {
		$scope.traitIdx = traitIdx;
		//below is done outside of this function 
		//$scope.trait = $scope.traits.children[$scope.traitIdx];
		$scope.traitName = $scope.trait.traitName;
		$scope.traitSummary = $scope.traitsSummary.children[$scope.traitName];
		console.log('===================after initTrait: scope, traitsSummary ', $scope, $scope.traitsSummary);
	}
		

	/*
	var parent = $scope.$parent.$parent;
	
	$scope.trait = parent.traits.children[idx];
	$scope.traitName = $scope.trait.traitName;
	
	console.log('trait: ', $scope.trait);
	
	$scope.getRoles = parent.getRoles;
	$scope.score = $stateParams.score;
	
	//from facet: 
	$scope.traits = parent.traits;

	$scope.name = parent.name;
	$scope.viewName = $stateParams.viewName;
	$scope.perspective = parent.perspective;
	$scope.traitsSummary = parent.traitsSummary;
	
	$scope.getScore = parent.getScore;
	$scope.getRoles = parent.getRoles;
	$scope.getPerspectiveColor = parent.getPerspectiveColor;
	$scope.perspectiveToggle = parent.perspectiveToggle;
	$scope.PerspectiveSummaryTitle = parent.PerspectiveSummaryTitle;
	$scope.getView=parent.getView;
	//end of facet
	*/

	
	$scope.backToFacet = function(){
		$state.go('app.report.perspectives.facet' );	
	}
	
	//not working - new params not passing to here (ctrl/state)... for some reasons... 
		//as state is not instantiated again ... and the view gets old / original params ... 
	$scope.$on('$ionicView.beforeEnter', function(event) {
		console.log('trait ctrl ====: before enter, $scope.traitIdx, $stateParams, state.params, state.params.Idx $csope.perspectiveChanged',  $scope.traitIdx, $stateParams, $state.params, $state.params.traitIdx, $scope.perspectiveChanged);
		
		//if ($scope.traitIdx != $state.params.traitIdx) {
			//this is a cached page!
			//initTrait($state.params.traitIdx);
			console.log('$scope, trait: ', $scope, $scope.trait);
		//}
		
		//check if perspective has changed and relaod trait 
		//if ($stateParams.perspective != $state.params.perspective) {
		if ($scope.perspectiveChanged || $scope.traitIdx != $state.params.traitIdx) {
			$scope.trait = $scope.traits.children[$state.params.traitIdx];
			$scope.$parent.$parent.perspectiveChanged = false;
			
			if ($scope.traitIdx != $state.params.traitIdx) {
				initTrait($state.params.traitIdx);
			}
		}
	})	
	
	//initTrait();
	
})

.controller('LoveCtrl', function($scope, ColorScheme, $ionicTabsDelegate) {
	$scope.viewName = 'Love';
	//$scope.initView($scope.viewName);
		$scope.viewColor =  ColorScheme.getViewColor($scope.perspective, $scope.viewName);
		$scope.viewOverlayColor =  ColorScheme.getViewOverlayColor($scope.perspective, $scope.viewName);
	console.log('=============LoveCtrl, scope, trait: ', $scope, $scope.trait);
	
	//hide the tags bar if AllViews is true (LoveView is still the entry point)
	if ($scope.trait.AllViews) {
		$scope.viewName = 'AllViews';
		var shown = $ionicTabsDelegate.showBar(false);
		 console.log('shown (allviews) ', shown);
	} else {
		$ionicTabsDelegate.showBar(true);
		console.log('shown (no allviews): ', shown);
	}
})

.controller('WorkCtrl', function($scope, ColorScheme) {
	$scope.viewName = 'Work';
	//$scope.initView($scope.viewName);
		$scope.viewColor =  ColorScheme.getViewColor($scope.perspective, $scope.viewName);
		$scope.viewOverlayColor =  ColorScheme.getViewOverlayColor($scope.perspective, $scope.viewName);
	console.log('==============WorkCtl, scope: ', $scope);
})

.controller('SocialCtrl', function($scope, ColorScheme) {
	$scope.viewName = 'Social';
	//$scope.initView($scope.viewName);
		$scope.viewColor =  ColorScheme.getViewColor($scope.perspective, $scope.viewName);
		$scope.viewOverlayColor =  ColorScheme.getViewOverlayColor($scope.perspective, $scope.viewName);
	console.log('==============SocialCtrl, scope: ', $scope);
})

.controller('BusinessCtrl', function($scope, ColorScheme, $ionicTabsDelegate) {
	$scope.viewName = 'Business';
	//$scope.initView($scope.viewName);
		$scope.viewColor = ColorScheme.getViewColor($scope.perspective, $scope.viewName);
		$scope.viewOverlayColor =  ColorScheme.getViewOverlayColor($scope.perspective, $scope.viewName);
	console.log('=============Business Ctrl, scope: ', $scope);
	
	//hide the tags bar if it's a Need (BusinessView is the entry point for Needs)
	if ($scope.trait.traitType == 'need') {
		//$scope.viewName = 'AllViews';
		var shown = $ionicTabsDelegate.showBar(false);
		 console.log('shown (allviews) ', shown);
	} else {
		var shown = $ionicTabsDelegate.showBar(true);
		console.log('shown (no allviews): ', shown);
	}	
})

.controller('CardsCtrl2', function($scope, TDCardDelegate, $timeout, $stateParams, $attrs, $ionicGesture, $window, $interval) {

	var element = angular.element(document.querySelector('#rolecards'));
	$ionicGesture.on('dragright', function(e) {
		e.preventDefault();
		console.log('yes?');
	}, element);

	//$scope.viewName = $scope.$parent.viewName;
	var cardTypes = [];

	$attrs.$observe('cardtypes', function(value) {
		//console.log('value: ', value);
		cardTypes = JSON.parse(value);
		//console.log('attrs: did you call me?');
		//console.log(cardTypes);
		

		
		$scope.cards = {
			master: Array.prototype.slice.call(cardTypes, 0),
			active: Array.prototype.slice.call(cardTypes, 0),
			discards: [],
			liked: [],
			disliked: []
		}
		
		if ($scope.$parent.viewName=='Work') {
			//console.log('here?');
			//$scope.cards.active = null;
			//$scope.refreshCards;
		}
		
		//console.log('cards: ');
		//console.log($scope.cards);
    });



  $scope.cardDestroyed = function(index) {
    $scope.cards.active.splice(index, 1);
  };

  $scope.addCard = function() {
    var newCard = cardTypes[0];
    $scope.cards.active.push(angular.extend({}, newCard));
  }

  $scope.refreshCards = function() {
    // Set $scope.cards to null so that directive reloads
    $scope.cards.active = null;
    $timeout(function() {
      $scope.cards.active = Array.prototype.slice.call($scope.cards.master, 0);
    });
  }

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

.controller('CardCtrl2', function($scope, TDCardDelegate) {

})

////////////
// credits

.controller('CreditsCtrl', function($scope, ApiSvc, CreditSvc, Utils) {

	$scope.precheck = function(param, cb) {
		return CreditSvc.precheck(param, cb);	
	}
	
	//assume caller have checked requirement to call,  they'll get an error if not 
		//namely, free & prom /server side only; remaining (paid & prom/client) will throw error from server
		//optionally can check from here too ... 
	$scope.acquire = function(param, cb) {
		return CreditSvc.acquire(param, cb);
	}
	
	$scope.claim = function(param, claim, cb) {
		return CreditSvc.claim(param, claim, cb)
	} 
	
	/*
	$scope.error = function(popup, err) {
			var name = err.name || 'Error' ;
			var message = err.message || err || 'Pleae check network connection';
			if (err && !err.data) {
				//client side unexpected error
				name = err.name || 'Error';
				message = err.message || err;
			}
			popup.alert({
				title: name,
				template: message
			})
	}
	*/
	$scope.error = function(popup, err) {
		return Utils.error(popup, err);
	}
	
	$scope.result = function(popup, res, msg) {
		var message = 'Credit added to your account, you may check under menu/credits';
		popup.alert({
			template: message || msg
			//res.data || res
		})
	}
})

.controller('RecordsCtrl', function($scope, CreditSvc, Utils, $ionicPopup) {
	
	console.log('');
	console.log('My credits')
	$scope.items = CreditSvc.records();
	console.log('items: ', $scope.items);

	//extract and format dates
	$scope.extractDate = function(dat) {
		return Utils.extractDate(dat);
	}
	
	//refresh data 
	$scope.doRefresh = function() {
		CreditSvc.refresh(function(err, res){
			if (err) {
				Utils.error($ionicPopup, err);
			} else {
				$scope.items = CreditSvc.records();
				console.log('reports: from list: ', $scope.items);
			}
			$scope.$broadcast('scroll.refreshComplete');
		});

	}	
})



.controller('FreeCtrl', function($scope, $ionicPopup, $ionicLoading) {
	
		console.log('');
		console.log('FreeCtrl')
		
	$scope.acquire = function() {
		$ionicLoading.show();
		$scope.$parent.$parent.acquire('free', function(err) {
			$ionicLoading.hide();
			if (err) return $scope.$parent.$parent.error($ionicPopup, err);
			$scope.$parent.$parent.result($ionicPopup);
		})
	}
	
})

.controller('PaidCtrl', function($scope, $ionicLoading, $ionicPopup, PaymentSvc) {
	
		console.log('');
		console.log('PaidCtrl')
	
	$scope.purchase = function(num) {
		$ionicLoading.show();
		$scope.$parent.$parent.acquire(num, function(err, res) {
			$ionicLoading.hide();
			if (err) return $scope.$parent.$parent.error($ionicPopup, err);
			return $scope.$parent.$parent.result($ionicPopup);
		})
	}

})

.controller('PromCtrl', function($scope, $ionicPopup, $ionicLoading, External) {
	
		console.log('');
		console.log('PromCtrl')
		
		$scope.social = {};
		$scope.social.place = 'facebook';
	
	$scope.acquire = function(src) {
		$ionicLoading.show();
		$scope.$parent.$parent.acquire(src, function(err, res) {
			$ionicLoading.hide();
			if (err) {console.log('promctrl, err from acquired: ', err); return $scope.$parent.$parent.error($ionicPopup, err);}
			var msg;
			if (External.svc[src] && External.isClientAuth(src) && !External.isIabBrowser()) {
				//process via pop up, if it's iab no way to tell if it's successful or canceled.
					//(cancel will not error)
				msg = 'The credit should have been added to your account unless you cancelled the request before it\'s processed, ' + 'if you saw a blank page in the popup window please check network connectivity ' + 'or contact Support (External.getSupUrl())';
			}
			return $scope.$parent.$parent.result($ionicPopup, res, msg);
		})
	}	
	
 
})


///////////
// login 

.controller('LoginCtrl', function($scope, $state, store, Auths, $stateParams, $ionicLoading, $http, $timeout, $ionicPopup ) {
	
	//$scope.source = 'something';
	console.log('');
	console.log('-----');
	console.log('login ctrl');
	
	function doAuth() {
		
		console.log('do auth');

		//if auth, display auth info
		if (Auths.isAuthenticated()) {
			console.log('user already authenticated, fetching info to display...');
			//continue... - should've been handled in events... check that... 
			postLogin();
			//show login details 
		
		//attempt auto auth;
			//loading and msg: looking for fb or gp on the device ... (and cancel button???)
			//auto (try either of it, or if both give user the option?)
		} else {
			if (Auths.isClientAuth('facebook')) {
				
				console.log('---fb client available ...');
				
				Auths.clientAuth('facebook').then(function(profile) {
				//Auths.auth('facebook').then(function(profile) {
					console.log('success');
					$ionicLoading.hide();
					postLogin();
					
				})
				.catch(function(err){
					$ionicLoading.hide();
					console.log(err)
					//err handling! perhaps print the error to the view
					//depends on error, fallback to server (loginsvr)
					var error = processError(err);
					
					var msg = $ionicPopup.alert({
						title: error.name,
						template: error.message || 'network problems' 
							+ ' unable to auto login using device plugin, will login manually now'
					}).then(function(res) {
						$state.go('app.loginsrv', {nextState: $stateParams.nextState, nextParams: $stateParams.nextParams});
					})
					

				})
				
				$ionicLoading.show({
					template: 'Checking Facebook or Google Plus on this device...'
				});
				
			} else {
				
				console.log('no fb client, going to server login');
				
				//why do you need this?
				$ionicLoading.hide();
				
				$state.go('app.loginsrv', {nextState: $stateParams.nextState, nextParams: $stateParams.nextParams});				
			}
			

		}
		
		if ($stateParams) {
			console.log($stateParams);
		}
  }
  
  //processError were duplicated should check out and use util in services..
  
	function processError(err) {
		var error = {};
		if (err.data) {
			error.name = err.data.name || 'Error';
			error.message = err.data.message || JSON.stringify(err);
			return error;
		}
		
		if (err.name) {
			error.name = err.name;
			error.message = err.data.message || JSON.stringify(err);
			return error;
		}
		
		//a string
		error.name = 'Error';
		error.message = JSON.stringify(err);
		return error;
		
	}  
	
	//child also need to call this... (?)
  function postLogin() {
		if ($stateParams.nextState) {
		
			$state.go($stateParams.nextState, $stateParams.nextParams)
		} else {
				//show login details
			$scope.curSource = store.get('piLastSource');
			console.log('$scope.curSource: ', $scope.curSource);
		}	  
  }
  
	$scope.$on('$ionic.reconnectScope', function() {
		console.log('');
		console.log('reconnect');
		doAuth();
	});

	$scope.$on('$ionicView.beforeEnter', function() {
		console.log('');
		console.log('beforeEnter');
		//doAuth();
	});  
  
	doAuth();
  
	//test
	function testExchangeToken() {
		var url = 'https://server.local:3000/api/v1/clienttokens'
		//var url2 = 'https://server.local/pi';
		$http.post(url).then(function(res) {
		//$http.get(url2).then(function(res) {		
			console.log('suc' , res);
		}, function(err) {
			console.log('err', err);
		});	
	}

	
	
	//if there's a specific source
		// if there's specific source, may not need gui at all!
		// will need if it's server side
	$scope.targetSource = $stateParams.source || undefined;
	
	if ($scope.source) {
		//???
	}
	
	//next url???  
	$scope.loginsvr = function() {
		$state.go('app.loginsrv');
	}
	
})


.controller('LoginSvrCtrl', function($scope, Auths, External, store, $ionicPopup, $stateParams, $state) {
	
	console.log('');
	console.log('=========');
	console.log('loginSvrCtrl')
	console.log('stateParams: ', $stateParams);
	console.log($scope);
	
	$scope.isClientAuth = function (src) {
		return External.isClientAuth(src);
	}
	
	//main: 
	$scope.lastSource = store.get('piLastSource');
	
	$scope.authSources = {
		facebook: false,
		twitter: false,
		yammer: false
	}
	$scope.authSources[$scope.lastSource] = true;
	$scope.isAuth = function() {
		return Auths.isAuthenticated();
	}
	
	
	//functions:
	
	$scope.isAuthAt = function (src) {
		return Auths.isAuthenticated(src);
	}	
	
	
	$scope.isAuthSource = function(src) {
		return $scope.authSources[src];
	}
	$scope.getAuthSources = function() {
		var msg ='';
		for (var src in $scope.authSources) {
			if ($scope.isAuthAt(src)) {
				msg = msg + src + ' ';
			}
		}
		console.log('msg: ', msg);
		return msg;
	}
	$scope.login = function(source) {
		
		console.log('logging in via server, source: ' + source);
		Auths.serverAuth(source)
		.then(function(res) {
			console.log('res from serverAuth: ', res);
			postLogin();
		}).catch(function(err) {
			console.log('err from serverAuth: ', err);
			
			var error = processError(err);
			var msg = $ionicPopup.alert({
				title: error.name,
				template: error.message || 'Network problem' 
			})			
		})
	}
	
	function processError(err) {
		var error = {};
		if (err.data) {
			error.name = err.data.name || 'Error';
			error.message = err.data.message || JSON.stringify(err);
			return error;
		}
		
		if (err.name) {
			error.name = err.name;
			error.message = err.data.message || JSON.stringify(err);
			return error;
		}
		
		//a string
		error.name = 'Error';
		error.message = JSON.stringify(err);
		return error;
		
	}
	
	function postLogin() {
		if ($stateParams.nextState) {
		
			$state.go($stateParams.nextState, $stateParams.nextParams)
		} else {
				//show login details
			$scope.lastSource = store.get('piLastSource');
			console.log('$scope.lastSource: ', $scope.lastSource);
			$scope.authSources[$scope.lastSource] = true;
			//$state.go($state.current, {}, {reload: true});
			//$window.location.reload(true);
			$scope.authMsg +=  $scope.lastSource + ' ';
			
		}	  
	}
	
	$scope.authMsg = 'You have recently authenticated to : ' + $scope.getAuthSources();
})

.controller('LogoutCtrl', function($scope, $state, Auths) {
	//$scope.authenticated = false;

	$scope.logout = function() {
		console.log('logoutCtrl.logout - did i get called?');
		Auths.logout();
		$scope.authenticated = Auths.isAuthenticated();
	}	
	$scope.login = function() {
		$state.go('app.login');
	}
	
	//main 
	function doLogout() {
		$scope.authenticated = Auths.isAuthenticated();
		console.log('$scope.authenticated :', $scope.authenticated);
		if ($scope.authenticated) {
			$scope.logout();
			$scope.message = 'You have successfully logged out.';
		} else {
			$scope.message = 'You are not logged in.';
		}
	}

	doLogout();
	
  $scope.$on('$ionicView.beforeEnter', function() {
	  console.log('');
	  console.log('beforeEnter');
		doLogout();
  }); 	
})

;


