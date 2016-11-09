// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
//var services = angular.module('ipa.services', ['ionic, 'ipa.constants']);
var services = angular.module('ipa.services', ['ionic', 'pascalprecht.translate', 'ngResource']);


//due to change of design, not really should call dev, but more appropriately jsClientAuth
var jsClientAuth = false;

//var server = 'https://server.local:3000';
//var server = 'https://192.168.2.151';
var server = 'https://direct-keel-136302.appspot.com';

var apiUrl = server + '/api/v1';
var userUrl = apiUrl + '/users';
var loginUrl = server + '/pi/auth/external';
var supportUrl = server + '/pi/support';

var user1Name = 'oghazjm_panditsen_1469707416@tfbnw.net';
var user1Id = '101356316976304';
var usre2name = 'zwvadyw_bharambesky_1469707417@tfbnw.net';
var user2Id = '103528133425233'
var pw = 'NewH0pe';

var storeUrl = {
	ios: 'www.example.com',
	andriod: 'www.example.com'
}
var storeUrls = 'ios: applestore/appId; android: androidplay/appId';

var storeUrlsSvr = server + '/pi/personality360';



//for client side 
//moving them all to init service... will that be a little more efficient? 

	var clients = {};
	//clients.facebook = FB;
	
	//to delete? 
	var clientApis = {};
	clientApis.facebook = {};
	clientApis.facebook.login = 'login';
	clientApis.facebook.scope = 'user_posts, user_friends';
	
//below plugin related could move to External 	
	var hasPlugin = {
		facebook: false,
		google: false
	};

	var clientAuth = {
		facebook: false,
		google: false,
		twitter: false,
		yammer: false
	}
	
//not needed any more due to change of design 	
	var accessTokens = {
		facebook: {
			
		},
		google: {
			
		}
	}	
	

	var device = {};
	var browser = window;
	

services.service('TempShare', function() {
	var tempShare = new Object;
	return {
		set: function(property, value) {
			tempShare[property] = value;
		},
		get: function(property) {
			return tempShare[property];
		}
	}
})

			//'Work': '#C3FDB8',
			//'Social': '#FFFFCC'
services.service('ColorScheme', function() {
	var colors = {
		'Relationship': {
			'Love': '#00BFFF',
			'Work': '#5EFB6E', //'#54C571',
			'Social': '#F9F468', //'#FFFA61' //'#FFE87C'//'#FFF380' //'#FFDB58'
			'Business': '#F5CFA8'
		},
		'Approaching': {
			'Love': '#8D38C9',
			'Work': '#A1C935',
			'Social': '#FBB917',	
			'Business': '#F94E7D'				
		},
		'Self-Improvement': {
			'Love': '#306EFF',
			'Work': '#00FF00',
			'Social': '#FFFF00',
			'Business': '#FB7F36'			
		}
	};
	
	var overlayColors = {
		'Relationship': {
			'Love': '#DBEEF5',
			'Work': '#CFF7D3', //'#54C571',
			'Social': '#F5F2A8', //'#FFE87C'//'#FFF380' //'#FFDB58'
			'Business': '#F7E8DA'
		},
		'Approaching': {
			'Love': '#E7D0F7',
			'Work': '#CAE08F',
			'Social': '#F1CE7C',
			'Business': '#FFB6CA'			
		},
		'Self-Improvement': {
			'Love': '#8EACF3',
			'Work': '#A9FBA9',
			'Social': '#F9F98A',
			'Business': '#FDD2B8'			
		}		
	};
	
	return {
	
		getViewColor: function(perspective, viewName) {
			//console.log('colors');
			//console.log(colors);
			//console.log('perspective');
			//console.log(perspective);
			return colors[perspective][viewName];
		},
		getPerspectiveColor: function(perspective) {
			return colors[perspective]['Love'];
		},
		getViewOverlayColor: function(perspective, viewName) {
			return overlayColors[perspective][viewName];
		}		
	}
})

services.service('PerspectiveDescription', function() {
	var descriptions = new Object;
	descriptions = {
		'Relationship': 'relationship building',
		'Approaching': 'approaching the target, or making first impression',
		'Improvement': 'self improvement, usually you are doing the analysis on your own personality and seeking self improvmemnt, or doing this for your parnter and friends so you can advise how they can make improvements'
	}
	
	return {
		getDescription: function(perspective) {
			return descriptions[perspective];
		}
	}
})

services.service('Language', function($translate, InitFile) {
	var language = 'en';
	return {
		getLanguage: function() {
			return language;
		},
		setLanguage: function(detectedLanguage) {
			language = detectedLanguage;
			$translate.use(language);
			InitFile.setLanguage(language);
		}
	}
})

var test;
services.service('init', function($timeout, $window, filestore, Reports){
	
	//run in app so should not need this... (???) 
	//it wasn't called in app; but below is fine since the init service is being called... 
	
	ionic.Platform.ready(function(){
		//clt = clients[source];
		$timeout(function() {
			console.log('');
			console.log('======set browser');
			console.log('');
			setBrowser($window);
		}, 1000)		
	})

		
		var initFileReports = function() {
			
			console.log('init: filestore: ', filestore);
			
			filestore.initFileReports();
			//filestore.setTest('fxxx');
			//console.log('getTest: ', filestore.getTest());
			
			$timeout(function() {
				console.log('init service, 3s after initFileReports ...')
				console.log('init: filestore: ', filestore);
				Reports.setReports(filestore.getFileReports());
				
				console.log('filereports, reports: ', filestore.getFileReports(), Reports.getReports());
			}, 3000);			
			
		}
	
	
	return {
		setTest: function(anything) {
			test = anything;
		},
		getTest: function() {
			return test;
		},
		setClient: setClient,
		checkPlugins: checkPlugins,
		getClient: function() {
			return clients;
		},
		getPlugins: function() {
			return hasPlugin;
		},
		setDeviceInfo: deviceInfo,
		getDeviceInfo: function() {
			return device;
		},
		setServer : function(serverName) {
			server = serverName;
		},
		getServer: function() {
			return server;
		},
		
		initFileReports: initFileReports

	}
})
//helper function and variables for fb and auths
	
	//config in service provider or platform.run to set client when device ready(?)
	// for now...
	
	function checkPlugins(src) {
		if (src) checkPlugin(src);
		//check all 
		checkPlugin('facebook');
		checkPlugin('google');
	}
	function checkPlugin(src) {
		if (src == 'facebook') {
			if (window && window.cordova && window.facebookConnectPlugin) {
				hasPlugin.facebook = true;
				clients.facebook = facebookConnectPlugin;
				clientAuth.facebook = true;
			} else {
				//on production, there'll be no js client!
				clients.facebook = FB;
				if (jsClientAuth) {
					clientAuth.facebook = true;
					//need to change site url!!!
				}
			}
		} else {
			//google 
		}
	}
	
	function setClient(source) {
		
		if (source == 'facebook') {
			
			//clients.facebook = window && window.cordova && window.facebookConnectPlugin ? facebookConnectPlugin : FB;
			//clients.facebook.svc = window && window.cordova && window.facebookConnectPlugin ? FBPlugin : FBJS;
			checkPlugin(source);
			return clients.facebook;
			
		} else if (source == 'google') {
			
		} else {
			//(fall back to) use server side
		}
		
	}

	function deviceInfo(platform) {
		
		console.log('device info: did i get called???');

			if (platform.isIPad() || platform.isIOS()) {
				device.platform = 'ios';
			} else if (platform.isAndroid()) {
				device.platform = 'android';
			} else {
				//var error = new Error();
				//error.name = 'UnSupported';
				//error.message = 'Your phone is not supported'
				//throw error;
				device.platform = 'unsupported'; //platform.device();
			}

		device.lang = navigator.language.split('-')[0]
		
		//for dev - remove for prd!! 
		//device.platform = 'andriod';
		//device.lang = 'en';
		console.log('device: ',device);
	}	
	
	function setBrowser(win) {

				var iab = window.cordova && cordova.InAppBrowser? true : false;
				browser = iab ? cordova.InAppBrowser : win; 		
	}
	
	
//client side only; switch (fallback  to server side) should be in ext /social 
services.service('facebook', function(store, $timeout) {
	var accessToken;
	var exp; 
	var profile;
	
	var source = 'facebook';
	var clt;
	ionic.Platform.ready(function(){
		//clt = clients[source];
		$timeout(function() {
			console.log('');
			console.log('======set client in fb service');
			console.log('');
			checkClt();
		}, 1000)		
	})
	
	
	//to delete 

	
	//this is related but independent to piAuthen..
		//if piAuth  but not / logged in;
		//if not piAuth but not / logged in;
	
	function isTokenExp() {
		return exp >= new Date();
	}
	
	function getToken(cb) {
		
		//still necessary? not saving a local copy any more (won't get that from server...)
		if (accessToken && !isTokenExp()) return cb(null, token);
		
		
		//prd: 
		//if (hasPlugin.facebook == true)
			checkClt();
			loginStatus(function(err, t, e) {
				if (err) return cb(err, null);
				accessToken = t;
				exp = new Date().getTime() + e*1000;
				return cb(null, t);
			})
		//else getTokenFrSvr('facebook') 
			//won't be able to call api as that's on higher level... 
			// -- so simply throw an err; or external checks token before calling 
			// here is pure client side! and lower level, keep it clean! 
	}
	
	//any better approach??? instead of calling it every time??? 
	function checkClt() {
		if (!clt) {
			clt = clients[source] || setClient(source);
		}
		if (!clt) {
				throw new Error('No client service for ' + source);
		}		
	}
	
	function loginStatus(cb) {
		//checkClt();
		clt.getLoginStatus(function(res) {
			console.log('res fr loginstatus: ', res)
			if (res.status === 'connected') {
				return cb(null, res.authResponse.accessToken, res.authResponse.expiresIn);
			} else {
				//??? log user in? 
					//also, check hasPlugin['facebook'] to determine how to login ... (or this is the auth's job!)
						//not only checking clt, but plugin, more precisely, shouldn't check svc, check plugin or both... 
						//and can't use auths as dependence is one way only ...so check there instead 
						//maybe ext should pass a token for 'server side' (server side auth but still runs on client...);
							//ofc it still have the option to run on server... 
							// -- so a method for external to call: setToken; and / or getTokenFrSvr (throws err if exp on server);
								//client then call auths to login (who checks both svc & plugin to decide how user's auth'ed)
								
					//or, here, won't care... the caller ensures it, before calling the client methods!			
				//still checks HasPlugin when prd? 
				login(function(token, expires) {
					return cb(null, token, expires);
				}, function(err){
					return cb(err);
				});
				
				//if (success.status === 'not_authorized') the user is logged in to Facebook, but has not authenticated your app
				//else The person is not logged into Facebook, so we're not sure if they are logged into this app or not.
				
				
				console.log('getLoginStatus', success.status);		
				//direct user to login or auth(src)(???) former: nextState, latter... how to deal with? or dealt with in ext?
			}
			
		}, function(err) {
			console.log('err fr loginstatus: ', err)
			return cb(err, null);
		})
	}
	
	
	function login(suc, fail, secondTime) {
		
		console.log('');console.log('===================');
		console.log('fb service login');
		console.log('clt', clt);
		
		//re-attempt to get clients

		//checkClt();
		clt.login(['email', 'public_profile'], function(res) {
			
			console.log('fb client login, res: ', res);
			
			if(res.authResponse) {
				console.log('')
				console.log('authResponse: ', res.authResponse);
				
				//var authRes = res.authResponse;
				//profile.userId = {userId: authRes.userID};
				
				store.set('pifacebook', res.authResponse.userID);
				return suc(res.authResponse.accessToken, res.authResponse.expiresIn);
				
			} else {
				return fail('No authResponse from facebook\'s response');
			}
		}, function(res){
			
			//if res.errorCode == '4201' - user cancelled dialog, but could also indicate falling back to use web login!
			
			if (res.errorCode=='4201' && !secondTime) {
				//could be due to falling back to web login, give it one more try
				
				$timeout(function() {
					return login(suc, fail, true);
				}, 2000);
				
				
			} else {
			
				console.log('fb client login fail, res: ', res);
				return fail(res);
			}
		})
	}
	
	
	function getFriends(cb) {
		//checkClt();
		//need to check login... graph api different to dialogs!!! 
		//actually, need access token...(?) since it's api! not gui, won't initiate login... 
		getToken(function(err, token) {
			
			console.log('');
			console.log('========');
			console.log('getFriends');
			console.log('err, token: ', err, token);
			
			if (err) return cb(err);
			
			console.log('calling friends api');
			
			clt.api('/me/friends?accessToken=' + token, null, function(res) {
				console.log('res: ', res);
				if (res && !res.error) {
					console.log('res: ', res);
					return cb(null, res)
					/*
					if (res.data.length == 0) ...
						//no friends... handle it.. on client side!
							//or even before calling!
						//also wrap different social provider in ext / social ... 
					... else ...
						
					...*/
				} else {
					console.log('err fr get friends: ', res);
					return cb(err, null);
				}
			}, function(err) {
				console.log('err fr get friends: ', err);
				return cb(err, null);
			})			
		})

	}
	
	function share(cb) {
		//checkClt();
		
		var opt = 
			{
				method: 'share',
				//href: ionic.Platform.isAndroid() ? storeUrl.android : storeUrl.ios,
				href: storeUrlsSvr,
				quote: 'Very acculate personality analysis!'
			};		
		
		if (hasPlugin.facebook) {
			clt.showDialog(opt, 
				function(res) {
					processRes(res, cb);
				},
				function(err) {
					return cb(err);
				}
			)
		} else {
			clt.ui(opt,
				  // callback
				function(res) {
					processRes(res, cb);
				}			
			)
		}
		
		function processRes(res, cb) {
						if (res && !res.error_message) {
							console.log('Posting completed.');
							//call server without verification?
								//otherwise it's the res.post_id;
								//but require publish_actions
								//so additional login if to impl - X fb deals with the permission automatically... 
							console.log('res: ', res);
							//res is []; should return true;
							
							console.log('cb: ', cb);
							
							return cb(null, res)
						} else {
							//if err res is null... 
							//could also reach this if user cancels login!
							console.log('Error while posting.');
							console.log('res: ', res);
							var error = new Error();
							error.name = 'PostError';
							error.message = 'Error in posting or usre cancelled';
							return cb(error);
							
						}			
		}
	}
	
	//permission: eg. 'email,user_likes'
	function authorizeLogin(permission) {
		clt.login(function(response) {
		  // handle the response
		}, {scope: permission});		
	}
	
	//fallback to server (in ext/social) to use send 
		//i.e. ext need additional check to make sure clt is plugin and use server side (but if js available then send first)
		//though it'll additionally check here... if no plugin simply throw err... 
	function invite(cb) {
		if (hasPlugin.facebook) {
			//check login status and login user if necessary ...
				
				clt.appInvite(
					{
						url: '',
						picture: ''
					}
				), function(res) {
					if(res) {
						if(res.completionGesture == "cancel") {
							// user canceled, bad guy
						} else {
							// user really invited someone :)
							console.log('invited, res: ', res)
						}
					} else {
						// user just pressed done, bad guy
						console.log('user clicked done, res: ', res);
					}
					//return nothing and continue anyhow...
					return cb(null);
				}, function(err) {
					console.log('err from invite cb');
					//throw err;
					return cb(err);
				}
		} // else ??? use js sdk but the sdk should be being used already (in clt already)
		
		var err = new Error();
		err.name = 'InviteNotCalled';
		err.message = 'No fb plugin or fb app not install or user not login to app';
		throw err;
	}
	
	//for js (x??)
	//not completed yet... 
	function suggest(cb) {
		//check login status again??? social does this before calling! 
		//* so would assume no problem in login!!!
		
		var opt = {
			method: 'send',
			//mobile_iframe: true,
			display: 'popup',
			caption: "Check this out.",
			link: "http://example.com",
			description: "The site I told you about",
			picture: "http://example.com/image.png"			
		};
		
		if (hasPlugin.facebook) {
			clt.showDialog(opt, 
				function(res) {
					//??? check various case??? 
					return cb(null, res);
				},
				function(err) {
					return cb(err);
				}
			)
		} else {
			clt.ui(opt, function(res) {
				console.log('res fr send: ', res);
				//possible res:
					//sent: Object {success: true}
					//cancel: null 
					//not sure if it's err??? 
				//according fb - there's no response ... 
				return cb(null);
			});	
		}
	}
	
	function send(opt, cb) {
		if (hasPlugin.facebook) {
			clt.showDialog(opt, 
				function(res) {
					//??? check various case??? 
					return cb(null, res);
				},
				function(err) {
					return cb(err);
				}
			)
		} else {
			clt.ui(opt, function(res) {
				console.log('res fr send: ', res);
				//possible res:
					//sent: Object {success: true}
					//cancel: null 
					//not sure if it's err??? 
				//according fb - there's no response ... 
				return cb(null);
			});	
		}		
	}
	
	//test 
	function send_redirect(opt, cb) {
		
		var url = 'http://www.facebook.com/dialog/send?app_id=184363881626173&link='+opt.link
			+ '&redirect_uri=example.com';
		window.open(url, '_blank', "width=400,height=300");
		return cb(null);
		
	}
	
	

	function send2(url, msg, img, cb) {
		//check login status again??? social does this before calling! 
		//* so would assume no problem in login!!!
		
		var opt = {
			method: 'send',
			//mobile_iframe: true,
			display: 'popup',
			caption: "Check this out.",
			link: url,
			description: msg,
			picture: img			
		};
		
		if (hasPlugin.facebook) {
			clt.showDialog(opt, 
				function(res) {
					//??? check various case??? 
					return cb(null, res);
				},
				function(err) {
					return cb(err);
				}
			)
		} else {
			clt.ui(opt, function(res) {
				console.log('res fr send: ', res);
				//possible res:
					//sent: Object {success: true}
					//cancel: null 
					//not sure if it's err??? 
				//according fb - there's no response ... 
				return cb(null);
			});	
		}
	}
	
	
	function getProfile(id, cb) {
		
		console.log('facebook.getProfile');
		
		var prof;
		if (!id || id == 'me' || id == store.get('pifacebook') ) {
			prof = profile || store.get('facebookProfile');
			if (prof) return cb(null, prof);
		}
		
		id = id || 'me';
		getToken(function(err, token) {
			if (err) return cb(err);
			clt.api('/'+id + '?accessToken=' + token, function(res) {
				console.log('res: ', res);
				if (res && !res.error) {
					console.log('res: ', res);
					prof = res;
					prof.image = "http://graph.facebook.com/" + prof.id + '/picture';
					if (id == 'me') {
						profile = prof; 
						store.set('facebookProfile', prof);
					}
					
					return cb(null, prof);
				} else {
					console.log('err fr get profile: ', res);
					return cb(err, null);
				}
			})			
		})		
	}
	
	function getPosts(id, cb) {
		
		console.log('');
		console.log('getPosts');
		
		id = id || 'me';
		getToken(function(err, token) {
			if (err) return cb(err);
			clt.api('/'+id + '/posts?accessToken=' + token, function(res) {
				if (res && !res.error) {
					/* handle the result */
					//var posts = []
					var posts = '';
					res.data.forEach(function(itm) {
						//posts.push(itm);
						posts += itm.message + ' ';
					})
					return cb(null, posts);
				}
				console.log('err from getPosts: ', err);
				//ext check size before calling api???
				
				var error = new Error();
				error.name = 'GetPostsError';
				error.message = 'problem in getting posts from ' + src + ' ' + res;
				return cb(error);

			});			
		})				
	}
	
	return {
		login: login,
		getFriends: getFriends,
		share: share,
		invite: invite,
		suggest: suggest,
		getProfie: getProfile,
		getPosts: getPosts,
		getProfile: getProfile,
		send: send,
		loginStatus: loginStatus //for test
	}
})


services.service('External', function($http, $window, store, facebook, ApiSvc, $timeout, $interval, $translate) { 

	
	//source either as query or parameter for json / restful style or both  
	var usersUrl = server + '/pi/analyze/getusers';
	var svc = {
		facebook: facebook,
		google: false,
		twitter: false,
		yammer: false
	};
		
	var requiredTxt = 100;
	var Tempdb = ApiSvc.Tempdb;
	
	//*** client side login, caller should check clientAuth first!***
	function login(source, suc, err) {
		
		return svc[source].login(suc, err);
	}	
	
	function share(src, cb) {
		//client or server
		if (clientAuth[src]) {
			//dialog, so unless plugin or jsClientAuth enabled, server side graph api 
			//actually regardless dialog or api, as long as jsClientAuth disable, will server side 
			//i.e. the only condition to run client side is this switch
				//the above is partly wrong! dialogue does not need login yet does need ip address locked up (?)
			return svc[src].share(cb);

		} else if (svc[src]) {
			console.log('server side share - browser');
			return shareSvr(src, cb);
		}
		
		//server side... by apiSvc
		console.log('server side share - api');
		ApiSvc.share(src, cb);

	}
	
	var socialPath = server + '/pi/social'; 
	
	//client side share on server (not api)
	function shareSvr(src, cb) {
		
		//var storeUrlEncoded = encode(storeUrlsSvr);
		
		var shareUrl = socialPath + '/' + src + '/share' + '?token=' + store.get('piToken');
		
		var win = browser.open(shareUrl, '_blank', 'location=no, menubar=yes, toolbar=yes, width=600, height=400');
		
		//the two use cases to handle result and cb;
	}
	
	//send msg 
		//maybe only for fb!!!
		//not sure about yammer... 
		//maybe email as fallback??? 
	function send(src, target, msg, cb) {
		//fb only (client only...)
		//error handling if not supported / fb ?
	}
	
	//fb only!
	//only prepares the message to send, caller does next step of export
		//or should import as first step??? perhaps yes!
	function shareReport_hold(src, rpt, cb) {
		
		//error handling... or caller to check source!
		//src = 'facebook';
		
		//lang handling!!! (use translate?) or the caller translates it??? 
		
		var userId = store.get('userId');
		
		//if there's no user id then assume it's one of the celebrities 
		userId = userId ? userId : 'celebrity';
		
		//or encoded ... (?)
		//var url = server + '/reports/import/' + userId + '/' + encodeURI(rpt.name);
		//var url = 'https://direct-keel-136302.appspot.com/static/v1/www/#/app/test';
		var url = "http://www.opentext.com";
		
		var caption, description;
		
		
		
		//can't find a way to pass parameters to multiple translations
			//one way around this is to do this in init (against lazy) - a bit of overhead but who cares!
			//or get it directly from files (still need to do something on init)
			//or writing a function that takes a chain of promises... very awkward ... 
			
			//or dynamically & manually replacing variable... - string manipulating .. 
		
		$translate('shareReportCaption', {name: rpt.name}).then(function(shareReportCaption) {
			caption = shareReportCaption;
		}, function(transId) {
			//error! 
			console.log('translation error! id: ', transId);
		});
		
		$translate('shareReportDescription', {name: rpt.name}).then(function(shareReportDescription) {
			description = shareReportDescription;
		}, function(transId) {
			//error! 
			console.log('translation error! id: ', transId);
		});
		
		$translate(['shareReportCaption', 'shareReportDescription'], {name: rpt.name}).then(function(trans){
			caption = trans.shareReportCaption;
			description = trans.shareReportDescription;
			console.log('translated caption, description ', caption, description);

			var opt = {
				name: rpt.name + "'s Personality Report",
				method: 'send',
				//mobile_iframe: true,
				//display: 'popup',
				//caption: caption,
				link: url //,
				//description: description,
				//picture: "http://example.com/image.png"			
				//picture: rpt.image
			};
/*			
var opt=...
method: "send",
caption: "Check this out.",
href: "http://example.com",
description: "The site I told you about",
picture: "http://example.com/img.png",
name: "My name"
...			
*/		
			console.log('opt: ', opt);
			
			return svc[src].send(opt, cb);
			//next step actually exports the report.... caller calls!
				//or prev steps... 
			
		},function(transIds) {
			console.log('error: ', transIds);
			return ('Error in translating');
		}); 		

	}
	
	function shareReport(src, rpt, cb) {
		
		var userId = store.get('userId');
		
		//if there's no user id then assume it's one of the celebrities 
		userId = userId ? userId : 'celebrity';
		var link = server + '/app/reports/import/' + userId + '/' + btoa(rpt.name); //encodeURI(rpt.name);
		
		console.log('link: ', link);

		
		$translate(['shareReportCaption', 'shareReportDescription'], {name: rpt.name}).then(function(trans){
			caption = trans.shareReportCaption;
			description = trans.shareReportDescription;
			console.log('translated caption, description ', caption, description);



			//client or server
			if (clientAuth[src]) {
				
				var opt = {
					quote: caption + ' -- ' + description,
					method: 'share',
					//mobile_iframe: true,
					//display: 'popup',
					//caption: caption,
					href: link //,
					//description: description,
					//picture: "http://example.com/image.png"			
					//picture: rpt.image
				};

				console.log('opt: ', opt);
				
				return svc[src].send(opt, cb);
				
				/*
				svc[src].send(opt, function(err){
					if (err) {
						console.log('err: ', err);
						if (err == 'Cannot show dialog') {
							console.log('no fb app installed...')
							//ideally prompting a msg but ...
							//shareReportSvr(src, link);
								//the above doesn't work, either just give out error or alternative??? (like sharing / emailing??? sms???)
								//or post on own time line??? - that's sharing... 
								//or use api??? 
									//also sharing (server side) won't be used on device!
									//need to handle accordingly (from client...)
							return cb(err);
						} else {
							return cb(err);
						}
					}
				});
				*/

			} else if (svc[src]) {
				console.log('server side share - browser');
				shareReportSvr(src, link);
				return cb(null);
			}
			
			//server side... by apiSvc
			console.log('server side share - api');
			//further processing required... 
			
			//ApiSvc.shareReport(src, opt, cb);

			

			//next step actually exports the report.... caller calls!
				//or prev steps... 
			
		},function(transIds) {
			console.log('error: ', transIds);
			return ('Error in translating');
		});		
		
	}	
	
	function shareReportSvr(src, link) {
		var url = server + '/social/' + src + '/send.html?' + link; 
		browser.open(url, '_blank', "width=400,height=300");
	}
	
	
	function encode(url) {
		var urlArr = url.replace('https', '').split('/');
		var urlEncoded = 'https%3A%2F%2F' + urlArr[0];
		for (var i=1; i< urlArr.length; i++) {
			urlEncoded += '%2F' + urlArr[i];
		}
		return urlEncoded;
	}
	
	function suggest(src, cb) {	
		//if client side
		if (clientAuth[src]) {

			return svc[src].suggest(cb);

		} 
		//server side
		ApiSvc.share(src, cb);

	}
	
	function invite(src, cb){
		//if client side, -> if plugin ... 
		if (clientAuth[src]) {

				if (hasPlugin[src]) {
					return svc[src].invite(cb)
				} 
				//fall back to use suggest (//mainly for dev)
				return svc[src].suggest(cb);

		} 
		//fall back to use server side: ApiSvc.suggest(src, cb)
			//there's no server side ... 
		
		// X return cb(new Error('No inivite functionality available for ' + src)); X
		
		//***********
		//use send message ! - to impl ***********
	}
	
	function getFriends(src, cb) {
		
		console.log('ext getFriends, src: ', src);
		if (clientAuth[src]) {
			//should uniform response..
			return svc[src].getFriends(cb);

		} else {
			//server side 
			console.log('no client, attempt server side getFriends');
			ApiSvc.getFriends(src)
			.then(function(res) {
				return cb(null, res);
			}).catch(function(err){
				return cb(err);
			});			
		}
	}
	
	//possible: source/'text' (client side), target(me if null...)
	//if test should be a post!
		//since all other functions all use cb, will use cb too...
	function getProfile(src, target, cb) {

		console.log('');
		console.log('ext.getProfile')
		console.log('src: ', src, 'target: ', target);
		
		//if client side
		if (clientAuth[src]) {
			
			console.log('am i here 1 ?');
			
			//checkAccessToken(src, function(err) ...
				
				//if (err) return cb(err);
				
				if (!target) {
					
					//get own profile info and construct target ...
					//and need to store info! pi + source + profile 
					getSocialProfile(src, null, function(err, profile) {
						if (err) return cb(err);
						
						console.log('profiel: ', profile);
						
						return getProfileClientSide(src, profile.id, cb);
					})
				} else {
					//??? //ever tested!!! **** 
					return getProfileClientSide(src, target, cb);
				}
			//...

		} else {
			ApiSvc.getProfile(src, target)
			.then(function(res) {
				return cb(null, res);
			}).catch(function(err) {
				return cb(err);
			});
		}
	}
	
	////////////////////
	//client side only 
	function getProfileClientSide(src, target, cb) {
						getPosts(src, target, function(err, posts) {
							if (err) return cb(err);
							//check size!
							if (posts.split(' ').length < requiredTxt) {
								
								console.log('am i here 2 ?');
								
								var error = new Error();
								error.name = 'NotEnoughText';
								error.message = 'there\'s not enough texts for analysis';
								
								console.log('what the heck');
								
								return cb(error, null);
							} 
							return ApiSvc.getProfile('text', posts)
							.then(function(res) {
								return cb(null, res);
							}).catch(function(err){
								return cb(err);
							});
						})		
	}
	
	function getSocialProfile(src, id, cb) {
		
		console.log('ext.getSocialProfile');
		
		if (!id) {
			var profile = store.get('pi_' + src + '_profile');
			if (profile) return cb(null, profile);
		}
		
		if (clientAuth[src]) {
			svc[src].getProfile(id, function(err, profile) {
				if (err) return cb(err, null);
				store.set('pi_' + src+'_profile', profile);
				return cb(null, profile);
			})
		}
		//server side... 
	}
	
	function getPosts(src, id, cb) {
		if (clientAuth[src]) {
			return svc[src].getPosts(id, cb);
		}
		//server side
	}
	
	//for client side running on server only!
		//the only use case is - facebook dialogs (unless it's decided to run js sdk for graph api as well)
			//not preferably 
	function promCredit(src, cb) {
		var promUrl = socialPath + '/' + src + '/promotion' + '?token=' + store.get('piToken');
		//var win = browser.open(promUrl, '_blank', 'location=no, menubar=yes, toolbar=yes, width=600, height=400');
		
		//promise..
			//two ways to get status or don't bother since will display on popup;
			//either way, will resolve / reject so caller close / hide loading...
				//two ways one is to receive close event; the other (iab) also add to close event 
		return popup(promUrl, cb);	
	}
	
	
	function popup(url, cb) {
		//var deferred = $q.defer();
		
		var msgPosted = false;
		var timeout, error;
		openPopup(url);
		
		function openPopup(url) {
			
				var win;			
				win = browser.open(url, '_blank', 'location=no, menubar=yes, toolbar=yes, width=600, height=400');
				//win = $window.open(url, '_blank', 'location=no, menubar=yes, toolbar=yes, width=600, height=400');
				
				
				//console.log(win.location);
				
				if (browser != window) {
					
					win.addEventListener("exit", function() {
						/*
						Tempdb.get('popup', function(err, res) ...
							if (err) return cb(err);
							return cb(null, res);
						//...
						*/
						//no way to tell if it succeeds or not or if user cancels (programatically), rely on status displayed on popup 
						return cb(null);

					})		
					
				} else {
					console.log('win: ', win);
					console.log('win: ', win.Window.msg);
					console.log('msgPosted: ', msgPosted);
					
					$window.addEventListener("message", receiveMessage, false);		
					//win.addEventListener("message", receiveMessage, false);
					//$window.on("beforeunload", function() .. 
					//win.on("beforeunload", function() ...
					//win.addEventListener("onbeforeunload", function() ...
						
					$window.addEventListener("onbeforeunload", function() {						
						console.log('from client: window closing'); 
						//$timeout(function() ...
							if (!msgPosted) {
								//reset switch to false
								//msgPosted = true;
								var error = new Error();
								error.name = 'UserCancelled';
								error.message = 'You have closed the popup window before the request is completed.';
								return cb(error);
							}
						//..., 1000);
					});
					
					interval = $interval(function() {
						
						console.log('win location', win.location.toString());
						if (msgPosted) {
							
							msgPosted = true;
							$interval.cancel(interval);
							$timeout.cancel(timeout);
							return;
						}
						if (win.closed) {

							$interval.cancel(interval);
							$timeout.cancel(timeout);
							msgPosted = true;
							
							console.log('win is closed!');
							error = new Error();
							error.name = 'UserCancelled';
							error.message = 'window has been closed, the request was cancelled. If you saw a blank page, ' + ' please check netework connectoin, or conact Support ('+ supportUrl+'). ';
							//$interval.clear(interval);
							
							return cb(error);
							
						} else {
							console.log('win still opened');
						}
					}, 5000);
					
					timeout = $timeout(function() {
						if (msgPosted) {
							
							msgPosted = true;							
							$interval.cancel(interval);
							return;
						}						
						if (win.closed) {
							console.log('win is closed!');
							error = new Error();
							error.name = 'UserCancelled';
							error.message = 'Window has been closed, the request was cancelled. If you saw a blank page, ' + ' please check netework connectoin, or conact Support ('+ supportUrl+'). ';							
						} else {
							console.log('win still opened');
							error = new Error();
							error.name = 'TimeoutError';
							error.message = 'Request has timeout, if you saw a blank page, ' + ' please check netework connectoin, or conact Support ('+ supportUrl+'). ';
						}
						
						$interval.cancel(interval);
						msgPosted = true;
						return cb(error);
						
					}, 35000);					
				
				}
				
				
		}
		
		function receiveMessage(event) {
			
			console.log('data from popup: ', event.data);
			console.log('msgPosted: ', msgPosted);
			
			if (!msgPosted) {
				msgPosted = true;
				$interval.cancel(interval);
				$timeout.cancel(timeout);
				
				if (event.origin !== server) {
					//return; //reject the promise
					//deferred.reject('Fail to receive message, event origin ' + event.origin + ' is not registered');
					return cb(new Error('Fail to receive message, event origin ' + event.origin + ' is not registered'));
				}
				
				if (event.data.status == 'ok') {
					
					return cb(null, event.data); 
					
				} else if (event.data.status == 'initialized') {
					var error = new Error();
					error.name = 'UserCancelled';
					error.message = 'You have closed the popup window before the credit request is completed.';
					return cb(error);		

				} else {
					//console.log(event.data);
					var error = new Error();
					error.name = event.data.name;
					error.message = event.data.message;
					return cb(error)
				}
			}
		}
		
	
	}
	
	
	
	
	/////////////////////////////
	//server side auth for client 
	//	-- won't use due to change 
	
	function isServerAuthForClient(src) {
		//checkPlugin(src);
		//equivalent to svc[src] && (hasPlugin or !hasPlugin && jsClientAuth)
		return (svc[src] && clientAuth[src])
	}
		
	//prompt user to login or auth here... no let caller handle (preferably with promise)
		//or how (the callers) wait & continue with cb? 
		// they don't - eg analyze, they just restart after login - adv in caller / gui 
	//wont use due to change
	function checkAccessToken(src, cb) {
		if (isServerAuthForClient(src)) {
			if (!accessTokens[src].token || accessTokens[src].exp < new Date() ) {
				ApiSvc.getSocialToken(src)
				.then(function(err, res) {
					console.log('res from getSocialToken');
					accessTokens[src].token = res.data.token;
					accessTokens[src].exp = res.data.exp;
				}).catch(function(err) {
					return cb(err);
				});
			} else {
				return cb(null);
			}
		} else {
			return cb(null);
		}
	}
	
	
	//expose clientAuth[src] so importer from other module can check; same module doesn't need to since it's global to the module 
	function isClientAuth(src) {
		return clientAuth[src];
	}
	
	function isIabBrowser() {
		return browser != window;
	}
	
	function getSupUrl() {
		return supportUrl;
	}
	
	return {
		login: login, 	
		svc: svc,
		getFriends: getFriends,
		share: share,
		invite: invite,
		suggest: suggest,
		getProfile: getProfile,
		getSocialProfile: getSocialProfile,
		isClientAuth: isClientAuth,
		promCredit: promCredit,
		isIabBrowser: isIabBrowser,
		getSupUrl: getSupUrl,
		shareReport: shareReport,
		getPosts: getPosts //for test
	}
});

services.service('ErrHandler', function() {
	return {
		msgPrompt: function(msg) {
			console.log(msg);
		}
	}
})


	
	
//read / write file as storage 
// mainly for pi reports stored as files (but could possibly be more general)
services.service('filestore', function($http) {
	
	
//get reports from file store if running on server (global)

	//setup of file path: 
	var fileUrl = 'data/reports';
	var filereports;
	var filestores = {};	
	var test;

	function getFile (file) {
		return $http.get(fileUrl + '/' + file);
	}

	function initFileReports() {
		test = 'what the hell';
		console.log('');
		console.log('=============filestore service : platform ready, reading files...');
		console.log('location: ', window.location);

		if (window.location.hostname != 'localhost' && window.location.hostname != '' ) {
			getFile('piReports.json').then(function(res) {
				filereports = res.data;
				
				console.log('filereports: ', filereports);
				
				if (filereports) {
					filereports.forEach(function(itm) {
						var fileUrl =  itm.file.replace(' ', '__') + '.json';
						getFile(fileUrl).then(function(res) {
							var file = res.data;
							filestores[itm.file] = file;
						}, function(err) {
							console.error("Error reading files: ", err);
						})
						
					})				
					
				}
			}, function(err){
				console.error('Error in reading files: ', err);
			})
		}
	}
	
	
	function getFileFromStore(file) {
		console.log('filestores: ', filestores);
		return filestores[file];
	}

	return {
		initFileReports: initFileReports,
		get: getFileFromStore,
		filereports: filereports,
		test: test,
		setTest: function(val) {
			test = val;
		},
		getFileReports: function() {
			return filereports;
		}
	}
})


services.service('Reports', function(store, filestore, $timeout) {
	
	console.log('');
	console.log('=============report service');
	console.log('location: ', window.location);
	
	var reports;
	var curReport;
	
	//ionic.Platform.ready(function() 
		//console.log('report service, platform ready...');
		
		$timeout(function() {
			console.log('report service, 3s after platform ready ...')
			//reports = filestore.filereports;
			
			//console.log('filereports, reports: ', filestore.reports, reports);
		}, 3000);
	
	function score(rawScore) {
		switch (Math.floor(rawScore * 5)) {
			case 4: 
				return 'high';
				break;
			case 3: 
				return 'medium-high';
				break;
			case 2:
				return 'medium';
			case 1: 
				return 'medium-low';
			default: 
				return 'low'				
		}
	};
	
	function formatScore(rawScore) {
		return Math.floor(rawScore * 100)+'%';
	}
	
	function findTrait(facet, trait, report) {
		report.tree.children
	};
	
	function transformTrait(item, newTree) {
			newTree.traitName = item.name;
			newTree.traitType = item.hasOwnProperty('category') ? 'facet' : item.children[0].category;
			newTree.rawScore = item.percentage ? item.percentage : item.children[0].percentage; // process to format of % later
			newTree.score = score(newTree.rawScore);
			newTree.PCScore = formatScore(newTree.rawScore);
	}
	
	function changeKey (obj, key, newkey) {
		obj[newkey] = obj[key];
		delete obj[key];
	}
	
	//report here is report content / body / piTree... -> or profile, profile.tree is piTree...
	function transformReport(report) {
		var tree = report.tree;
		var newTree = {};
		// b5:
		var b5 = tree.children[0].children[0].children;
		b5.forEach(function(item, idx, arr) {
			newTree[item.id] = {};
			transformTrait(item, newTree[item.id]);
			newTree[item.id].children = {};
			
			var traits = item.children;
			
			traits.forEach(function(subItem, subIdx, subArr) {
				var subTree = {};
				transformTrait(subItem, subTree);
				newTree[item.id].children[subItem.id] = subTree;
			});
		})
		
		//needs & values
		for (i=1; i<3; i++) {
			var nv = tree.children[i];
			newTree[nv.name] = {};
			transformTrait(nv, newTree[nv.name]);
			//for needs & values, use names not ids
			//changeKey(newTree, nv.id, nv.name);
			
			newTree[nv.name].children = {};
						
			nv.children[0].children.forEach(function(item, idx, arr) {
				var subTree = {};
				//subtree[item.id] = {};
				transformTrait(item, subTree);
				newTree[nv.name].children[item.id] = subTree;
			});
		}
		
		//behavior - may or may not exists!
		if (tree.children[3]) {
			newTree.behavior = {};
			var favorite = tree.children[3].children[0].children;
			newTree.behavior.day = favorite[0].name;
			newTree.behavior.time = favorite[1].name;
		}
		return newTree;
	}
	
	//either provide a raw profile or import of report content (converted & formatted)
	function create(target, source, profile, importReport) {
		var file = target.name + '_' + source
		//store.set(file, profile);


		reports = reports || store.get('piReports') || [];

		var duplicate = store.get(file);
		console.log('file', file);
		console.log('duplicate: ', duplicate);
		if (duplicate) {
				
				var appendix = findNextAppendix(target.name, source);
				target.name += appendix;
				file = target.name + '_' + source;
		}
		
		var report = {
			name: target.name,
			file: file,
			image: target.image,
			source: source,
			date: new Date()
		}
		
		if (importReport) report.date = importReport.date; 
		
		reports.push(report);
		
		console.log('reports pushed, new value: ', reports);
		setTimeout(function() {
			console.log('reports pushed, new value after 1.5 sec: ', reports);
			store.set('piReports', reports);
		}, 1500);
		
		console.log('reports pushed: ', reports);
		store.set('piReports', reports);		
		
		//convert file and store it
		
		var piTree = 'pi reports';
		
		//for test (?)
		if (profile) {
			piTree = transformReport(profile);
			profile.tree = piTree;
		} else if (importReport) {
			profile = importReport.content;
		}
		
		store.set(report.file, profile);
		
		//return the new file (name) in case duplicate
		return file; 
	}
	
	function findNextAppendix(name, source) {
		var i;
		for (i =1; i<10; i++) {
			var file = name + i + '_' + source;
			if (!store.get(file)) {
				return i;
			}
		}
		return i;
	}
	
	function list() {
		
		console.log('list: filereports, reports: ', filestore.filereports, reports);
		console.log('filestore: ', filestore);
		
		if (reports) return reports;
		reports = store.get('piReports');
		return reports;
	}
	
	function save(rpts) {
		reports = rpts;
		store.set('piReports', rpts);
	}
	
	
	function changeName(oldName, newName) {
		
	}
	
	//-----
	//report is a report container (contains meta data) and pointer (to the actual report) ;
	//piTree is the content of report
	
	//change file name according to person / report name
	function nameChanged(report) {
		var filename = report.name + '_'+ report.source;
		if (filename != report.file) {
			var piTree = store.get(report.file);
			store.remove(report.file);

			//reports = reports || list();
			//delete reports[report.file];
			report.file = filename;

			//reports[report.file] = report;
			
			store.set(report.file, piTree);
			//store.set('piReports', reports);
			return report;
		}
	}
	
	//dont use - changed to array approach
	function removeFile(file) {
		//assuming reports in mem already??? just in case...
		//reports = reports || list();
		//delete reports[report.file];
		//store.set('piReports', reports);
		//new approach, only remove file, reports array will be saved when leaving the view...
		store.remove(file);
	}
	
	function refresh() {
		reports = store.get('piRerports', true);
		console.log('reports: from refresh: ', reports);
		//setTimeout(function() {
			return list();
		//}, 1000)
	}
	
	return {
		set: function(person, piTree) {
			//reports[person] = piTree;
			
			curReport = piTree;
		},
		get: function(file, opts) {
			//old approach
			//return person ? reports[person] : curReport;
			
			if (opts == 'store') return store.get(file);
			
			//check if running on client or server OR if it's an import (then fetch from store even running on server)
				//todo: not sure about ios!
			//if (window.location.hostname == 'localhost' || window.location.hostname == '' ) {
			//if (navigator.userAgent != 'Googlebot') {
				
			//to cover the case of opening imported files, as long as it's in the store then open it... 
			if (store.get(file)) {
				return store.get(file);
			} else {
				return filestore.get(file);
			}
		},
		
		getScore: function(file, trait, facet, pc) {
			//console.log(facet);
			//console.log(curReport);
			var scoreType = pc ? 'PCScore' : 'score';
			
			var report = this.get(file);
			
			//console.log('report from file: ', report);
			
			if (report.tree.hasOwnProperty(trait)) {
				return report.tree[trait][scoreType];
			} else {
				
				//debug 
				if (!report.tree[facet].children[trait]) {
					console.log('report.tree, trait, facet, scoreType ', report.tree, trait, facet, report.tree[facet].children[trait], scoreType);
				}
				return report.tree[facet].children[trait][scoreType];
			}
		},
		
		//not used??
		getScoreFromTree: function(tree, trait, facet, pc) {
			//console.log(facet);
			//console.log(curReport);
			var scoreType = pc ? 'PCScore' : 'score';
			
			//console.log('report from file: ', report);
			
			if (tree.hasOwnProperty(trait)) {
				return tree[trait][scoreType];
			} else {
				return tree[facet].children[trait][scoreType];
			}
		},
		
		//percent score only, facet only 
		getScoreFromFacet: function(facetTree, traitName, pc) {
			var scoreType = pc ? 'PCScore' : 'score';
			if (facetTree.traitName == traitName) {
				return facetTree[scoreType];
			} else {
				return facetTree.children[traitName][scoreType];
			}			
		},
		
		getName: function(file) {
			return file.split('_')[0];
		},
		
		transform: transformReport,
		
		create: create,
		list: list,
		nameChanged: nameChanged,
		removeFile: removeFile,
		save: save,
		refresh: refresh,
		
		//populate the reports from file if not empty - may not use... 
		setReports: function(fileReports) {
			reports = fileReports;
		},
		
		//for test only 
		getReports: function() {
			return reports;
		},
		//can't used!
		reports: reports
		
	}
})


services.service('CreditSvc', function(ApiSvc, External, store, PaymentSvc) {
	
	var Credits = ApiSvc.Credits;
	
	//possibe: num, type, src 
	function processParams(param) {
		
		var num, type, src, params;
	
		if (typeof(param) == 'number') {
			type = 'paid';
			src = 'paid';
			num = param;
		} else {
			type = param == 'paid' || param == 'free' ? param : 'prom';
			src = type == 'prom' ? param : type;
		}
		params = {
			type: type,
			src: src,
			num: num
		}
		return params;
	}
	
	function eligible(param, cb) {

		
	}
	
	
	//equivalent to validCurCredits server side
	function available(param, cb) {
		
	}
	
	function precheck(param, cb) {
		
		var params = processParams(param);
		if (params.src == 'paid') return cb(null, true);
		
		if (!eligibleForFree(params.src)) {
				var error = new Error();
				error.name = 'NotEligible';
				var msg; 
				var waitdays = drt.waitdays;
				switch (params.type) {
					case 'free': 
						msg = 'You are not eligible for free credits, if you have an existing free credit '
						+ 'please use it before requesting another one. Also note that you need to wait for '
						+ waitdays[params.src] + ' day(s) before requsting another free credit.';
						break;
					case 'prom':
						msg = 'You are not eligible for promotion credits at ' + params.src 
						+ ', if you have an existing promotion credit from ' + params.src 
						+ ' , please use it before requesting a new one; in addition you need to wait for ' 
						+ waitdays[params.src]  + ' day(s) before requsting another promotional credit for the same social site; '
						+ 'if you have not requested any promotion credits for other social site today please request for those social sites instead.'
						break;
					//case 'paid': 
						//msg = 'You are not eligible for paid credits, it\'s likely the payment has not received yet.'
				}
				error.message = msg;
				return cb(error, null);
		}
		
		checkPreflight(params.type, function(err, ok) {
			if (err) return cb(err);
			if (!ok) {
				var error = new Error();
				error.name = 'NotAvailable';
				error.message = 'All ' + params.type + ' credits have been released for this month. Please try again next month.'
				return cb(error, null);				
			}
			return cb(null, true);
		});
		
	}
	
	function eligibleForFree(src) {
		
		if (src == 'paid') return true;
		var rec = record(src);
		if (!rec) return true;
		
		console.log('rec: ', rec);
		
		var today = new Date();
		
		console.log('rec.exp: ', new Date(rec.exp));
		
		if (new Date(rec.exp) >= today) return false;
		
		//if not exp then need to check ist (nbf not relevant...)
		var waitdays = drt.waitdays;
		var mustIatBefore = new Date();
		mustIatBefore.setDate(today.getDate() - waitdays[src]);
		
		console.log('mustIatBefore', mustIatBefore, 'rec.iat', new Date(rec.iat));
		
		//if within a day (regardless ava!)
		//if (today.getDate() - rec.iat.getDate() < waitdays[src]) return false;
			//equivalent to below 
		if (new Date(rec.iat) > mustIatBefore ) return false;
		
		//when it gets to here, regardless ava's value (used or not), it's eligible
			//(since expired & not issued within wait (1) day)
		//if (rec.ava >0) return false;
		
		return true;		 
	} 
	
	function claim(src, postRes, cb) {
		Credits.claim({param: src, claim: postRes}, processResponse.bind(null, cb), processError.bind(null, cb));
	}
	
	function processArgs(args) {
		var argsCopy = (args.length === 1 ? [args[0]] : Array.apply(null, args));
		return argsCopy;
	}
	
	//single credit only!
	function processResponse () {
		var args = processArgs(arguments);
		var cb = args[0];
		var res = args[1];
		console.log('res in processRes: ', res);
			//if res.token? res.data.token???
			//save it!!!
			if (res && res.data && !res.data.length) add(res.data);
			//if (res.data && res.data.length) saves(res.data);
				//single cr only!
		return cb(null, res);		
	}
	
	function processError () {
		var args = processArgs(arguments);
		var cb = args[0];
		var err = args[1];		
		console.log('err from credit request: ', err);
		return cb(err);
	}
	
	function save(cr) {
		var src = cr.src;
		store.set('credits/' + src, cr);
	}
	
	//it's not acquireCredit any more, since client side check done ... 
		//just need to modify credit.request to utilize cache on server
		//(only edibility - it doesn't check availability that's why preferred to acquireCredit) 
			//since it's not needed any more 
	function saves(crs) {
		crs.forEach(function(cr) {
			if (cr) save(cr);
		})
	}
	
	function add(cr) {
		if (cr.type == 'paid') {
			//accumulative
			var existCr = store.get('credits/paid');
			if (existCr) {
				console.log('===cr: ', cr, 'existCr: ', existCr);
				cr.ava += existCr.ava;	
				//doesn't deal with the case when paid credit out of sync!
			} 
		}
		//simply save it
		console.log('cr: ', cr);
		save(cr);

	}
	
	
	//redesign is required if to use this 
	function use(src, cb) {
		var existCr = store.get('credits/' + src);

			//if ava <1 - should initiate a refresh..first...? 
		if (existCr && existCr.ava>0) {
			//rc.ava--;(?)
			existCr--;
			save(exsistCr);
			return cb(null);
		} else {
			//refresh.. (also two level of refresh!)
			//this could possibly lead to infinite loops! (if ava=0 but somehow use is initiated)
				//to avoid this best way is to do client check(?) first?
				
			//if to use this then a redesign of flow is require 
				//complete client side pre check is needed 
				//refresh is needed if necessary before calling server 
				//otherwise could fetch a updated rec and stuck in the loop forever 
			refresh(src, function(err) {
				if (err) return cb(err);
				return use(src, cb)
			})
		}		
	}

	
	function acquire(param, cb) {
		var params = processParams(param);
		
		console.log('......params: ', params);
		
		precheck(params.src, function(err, ok){
			if (err) return cb(err);
			//if no err then ok
			if (params.type == 'free') return Credits.acquire({param: param, claim: res}, processResponse.bind(null, cb), processError.bind(null, cb));
			
			if (params.type == 'prom') {
				if (External.svc[params.src]) {
					
					console.log('');
					console.log('---clientAuth: ', clientAuth);
					
					if (!External.isClientAuth(params.src)) {
						console.log('...01');
						return External.promCredit(params.src, function(err, res) {
							if (err) return cb(err);
							if (res && res.data) {
								return processResponse(cb, res);
							} 
							//no data in res, do a refresh 
							return refresh(params.src, function(err) {
								if (err) {
									var error = new Error();
									error.name = 'RefreshFailed';
									error.message = 'Credit added to your account but there is problem refreshing the records, please try a manual refresh from \'My Credits\' later, or contact Support.';
									return cb(error);
								}
								return cb(null);
							})
						})
					} 
					
					console.log('...02...');
					return External.share(params.src, function(err, res){
						if (err) return cb(err);
						return Credits.claim({param: params.src}, {claim: res}, processResponse.bind(null, cb), processError.bind(null, cb));
					})
					
				} else {
					return Credits.acquire({param: param}, processResponse.bind(null, cb), processError.bind(null, cb));	
				}
			} else {
				//call payment 
				console.log('CreditSvc acquire: paid credit');
				PaymentSvc.purchase(params.num, function(err, res) {
					if (err) return cb(err);

					claim(params.num, res.data, function(err) {
						if (err) return cb(err);
						return cb(null);
					})
				})
			}
		})
	}
	
	//?
	function hasValid(cb) {
		
	}
	
	//try to mimic db in local store; same codes on server
	function recordNames(param) {
		var params = [];
		if (!param) {
			params.push('credits/facebook');
			params.push('credits/twitter');
			params.push('credits/yammer');
			params.push('credits/free');
			params.push('credits/paid');
		} else if (param == 'free' || param == 'paid') {
			params.push('credits/'+param);
			
		} else if (param =='prom') {
			params.push('credits/facebook');
			params.push('credits/twitter');
			params.push('credits/yammer');			
			
		} else {
			params.push('credits/'+param);
		}
		return params;
	}
	
	//takes a credit name 
	function getRecord(name) {
		if (!name) return null;
		var credit = store.get(name);
		if (!credit) return null;
		return credit;
	}
	
	//takes an array of credit names
	function getRecords(names) {
		credits = [];
		
		if (!names || !names.length || names.length ==0) {
			return [];
		}
		names.forEach(function(name){
			if (name) {
				var credit = getRecord(name);
				if (credit) {
					credits.push(credit);
				}
			}
		})
		return credits;
	}

	//returns an array even for a single record!
	function records(param) {
		var names = recordNames(param);
		return getRecords(names);
	}
	
	//returns a single record or an array if multiple records 
	function record(param) {
		var recs = records(param);
		if (recs.length = 1)return recs[0];
		return recs;
	}

	
	//sync from svr 
	//mandatory: all, type, src 
	function refresh(param, cb) {
		
		cb = typeof(param) == 'function' ? param : cb;
		param = typeof(param) == 'function' ? 'all' : param;
		
		Credits.records({param: param}).$promise
		.then(function(res) {
			saves(res.data);
			return cb(null);
		}).catch(function(err){
			return cb(err);
		})
	}
	
	var preflight = {};
	var rt = {
		waitdays : {
				free: 1,
				twitter: 1,
				facebook: 1,
				yammer: 1,
				google: 1,
				paid: 0		
		},		
	}
	var drt = {
		expectedRequests: {
			daily:10,
			hourly: 0.5,
			threshold: 10
		},
		watson: {
				threshold: 500
			}
	}
	
	mergeDrt(drt, rt);
	
	function mergeDrt(drt, rt) {
		for (var key in rt) {
			drt[key] = rt[key]
		}
	}
	
	function validCache(life) {
		
	}
	
	function validPreflightCaching(pref) {
		//var pref = getPreflightFromClient(type);
		// if not in cache, not valid - get fr server 
		console.log('--pref: ', pref);
		
		if (!pref) return false;
		
		if (pref.remain < drt.expectedRequests.threshold) return false;
		//in this case should probably directly stop releasing! but on the caller's call ...
		
		//now check time in cache 
		var now = new Date();
		// cache time in hours
		var cachedTime = (now - new Date(pref.date))/1000/3600; 
		
		console.log('---cachedTime: ', cachedTime);
			
		var expectedRemain = pref.remain - cachedTime * drt.expectedRequests.hourly;
		
		console.log('---expectedRemains: ', expectedRemain);
		
		if (expectedRemain > drt.expectedRequests.threshold) {
			//the cached value is good to use;
			return true;
		} else {
			return false;
		}
		
	}
	
	function getPreflightFromClient(type) {
		console.log('---type: ', type);
		if (preflight[type]) return preflight[type];
		var pref = store.get('preflight/'+ type);

		if (pref) preflight[type]=pref;
		console.log('-----pref: ', pref);
		return pref;

	}
	
	function setPreflightToClient(type, remain) {
		var pref = {
			remain: remain,
			date: new Date()
		}
		preflight[type] = pref;
		store.set('preflight/' + type, pref);
	}
	
	
	function getPreflight(src, cb) {
		//take eitehr src or type... 
		var type = src == 'twitter' || src =='facebook' || src =='google' || src == 'yammer' ? 'prom' : src;
		//both memory and local storage??? as in cache on server, cost is low anyway ... 
		//then also have the concept of client side drt... 
		var pref = getPreflightFromClient(type);
		if (validPreflightCaching(pref)) {
			return cb(null, pref.remain);
		}
		//get from server and save 
		Credits.getPreflight({param:type}).$promise
		.then(function(res) {
			console.log('res from getPreflight(fr svr): ', res);
			setPreflightToClient(type, res.data);
			//return cb(null, res.data);
			return getPreflight(src, cb);
		}).catch(function(err) {
			return cb(err);
		})
	}
	
	function checkPreflight(src, cb) {
		getPreflight(src, function(err, remains) {
			if (err) return cb(err);
			return cb(null, remains>0);
		})
	}
	
	return {
		precheck: precheck,
		claim: claim,
		acquire: acquire,
		records: records,
		refresh: refresh,
		use: use
		//need client side credit check (before calling pi profile)
	}
})

services.service('Utils', function() {
	//only month & day
	function extractDate(dat) {
		
		//console.log('dat: ', dat);
		
		if (dat) {
			dat = new Date(dat);
			var day = dat.getDate();
			var mon = dat.getMonth()+1;
			var year = dat.getFullYear();
			return year + '/' + mon + '/' + day;
		} 
		return dat;
	}
	
	function errorPopup(popup, err) {
		var name = Error;
		var msg = JSON.stringify(err);
		if (err.data) {
			name = err.data.name ? err.data.name : name;
			msg = err.data.message? err.data.message : msg;
		}
		
		name = err.name ? err.name : name;
		msg = err.message ? err.message : msg;
		
		popup.alert({
			name: name,
			template: msg
		})
	}
	
	function resultPopup(popup, res, msg) {
		
		popup.alert({
			template: msg || res
		})		
	}
	return {
		extractDate: extractDate,
		error: errorPopup,
		result: resultPopup
	}
})

//if exposed directly, mostly return promise;
//if exposed via external (only), could return cb; 
	//(since external mostly return cb);
services.service('ApiSvc', function($resource, $q) {
	var creditsUrl = userUrl + '/credits';
	var shareUrl = userUrl + '/social/share';
	var crRsc;
	var shareRsc;
		
	//social
		//friends
	function getFriends(source) {
		var friendsUrl = userUrl + '/social/friends';
		var rsc = $resource(friendsUrl);
		return rsc.get({source: source}).$promise;
	}
	
	//getProfile
	function getProfile(source, target) {
		var profileUrl = userUrl + '/profiles';
		var rsc = $resource(profileUrl);
		if (source == 'text') {
			return rsc.save({source: 'text', target: target}).$promise;
		} else {
			return rsc.get({source: source, target: target}).$promise;		
		}
	}
	
	function getSocialProfile(src) {
		
	}
	
	function deviceInfo() {
		var dev = {};
		//hardcoding platform for now
		/*
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
		dev.lang = navigator.language.split('-')[0]
		
		//for dev - remove for prd!! 
		dev.platform = 'andriod';
		dev.lang = 'en';
		return dev;
	}
	
	//will call via external, so use cb instead of promise
	function share(src, cb) {
		
		shareRsc = shareRsc || $resource(shareUrl);
		var dev;
		try {
			dev = deviceInfo();
		} catch (err) {
			return cb(err);
		}
		
		shareRsc.get({source: src, lang: dev.lang}, function(err, res){
			if (err) return cb(err);
			return cb(res);
		})
	}
	
	//to del 
	/*
	function acquireCredit(opt, cb) {
		crRsc = crRsc || $resource(creditsUrl);
		return crRsc.save(opt, cb); 
	}
	*/
	
	var Credits = $resource(creditsUrl + '/:action/:param', 
		{param: '@param'}, 
		{
			precheck: {
				method: 'get', 
				params: {
					action: 'precheck'
				}
			},
			getPreflight: {
				method: 'get',
				params: {
					action: 'getPreflight'
				}
			},
			acquire: {
				method: 'post',
				params: {
					action: 'acquire'
				}
			},
			claim: {
				method: 'post',
				params: {
					action: 'claim',
					claim: '@claim'
				}
			},
			records: {
				method: 'get',
				params: {
					action: 'records'
				}
			}
		}
	);
	
	var tempdbUrl = server + '/tempdb';
	var Tempdb = $resource(tempdbUrl+'/:entityName', {entityName: '@entityName'});
	
	//external will call this if expired or null in global accessTokens 
		//promise or cb?
		//external will check 1. src available in plugin, 2. (if not) global accessTokens (& save to globale if not), before calling any client side 
		//maybe a promise easier for the caller 
	function getSocialToken(src) {
		var tokensUrl = userUrl + '/social/tokens'
		var rsc = $resource(tokensUrl);
		return rsc.get({source: src}).$promise;
	}
	
	function getPreflight(type) {
		
	}
	
	var reportsUrl = server + '/api/v1/reports';
	var reports = $resource(reportsUrl + '/:file', 
		{file: '@file'},
		{
			export: {
				method: 'post',
				params: {
					date: '@date',
					name: '@name',
					image: '@image',
					content: '@content'
				}
			}
		}
	);
	
	return {
		//checkCredits: checkCredits,
		getFriends: getFriends,
		getProfile: getProfile,
		//requestCredits: requestCredits,
		share: share,
		Credits: Credits,
		getSocialToken: getSocialToken,
		Tempdb: Tempdb,
		reports: reports
	}
})


var token;
var authenticated = false;

/**
*	Auths
*/


//var authenticated = false;	
services.service('Auths', function(External, jwtHelper, store, $q, $resource, $window) {
	
	//var token;
	//var authenticated = false;
	
	var tokenUrl = server + '/api/v1/clienttokens'; //to get authToken
	var loginUrl = server + '/pi/auth/external';
	
	//3 methods of auths (3 ways to login & logout, 2 ways to check tokens...
	//too complex!!!???
		//if source = 'internal' or null, then it's internal, otherwise it's specific to a source
	var isAuthenticated = function(source) {
		//return source ? checkAuth() : isAuth(source)
		if (source) {
			return isAuth(source);
		} else {			
			//return false;
			return checkAuth();
		}
	}
	
	function checkAuth() {
		
		console.log('');
		console.log('------checkAuth-----');
		console.log('authenticated: ', authenticated, 'token: ', token);
		
		if (authenticated) return true;
		//try get token and check expiry 
		var t =  token || store.get('piToken');
		if (!t) return false;
		
		console.log('t: ', t);
		
		
		var tokenPayload = jwtHelper.decodeToken(t);
		console.log('decoded token: ' , tokenPayload);
		
		if (jwtHelper.isTokenExpired(t)) {
			authenticated = false;
			//clean up token?
			token = undefined;
			store.remove('piToken');
			return false;
		}
		
		//hsa valid token 
		authenticated = true;
		token = t;
		return true;		
	}
	
	function isAuth(source) {
		var profile = store.get('pi_' + source + '_profile');
		if (!profile) return false;
		var exp = store.get('pi_' + source + '_exp');
		if (!exp) return true;
		if (new Date() > exp) return false;
		return true;
	}
	
	//get piToken by posting the client (fb) access token;
	var getAuthToken = function(source, accessToken) {
		
		var deferred = $q.defer();
		
		//also provide source as req query or change server side middle ware.. 
		//changing server side is once for all... so better
		var tokenRsc = $resource(tokenUrl, {}, { 
			post: {
				method: 'POST' //,
				//headers: {'skipAuthorization': true}
			}
		});
		
		tokenRsc.post({source: source, accessToken: accessToken}).$promise.then(function(res) {
			
			console.log('');
			console.log('requested token and res from server: ', res.data);
			
			if (res && res.data && res.data.token) {
				
				//below were done in postLogin
				//store.set('piToken', res.data.token); 				
				//store.set('piLastSource', source);
				
				//also set global variable authenticated, update authSource, store user profile(?)
				postLogin(res);
				
				deferred.resolve();
				//or return something and/or a promise? or a cb
			} else {
			//error handling (app err)
				deferred.reject('No piToken returned from server');
			}
		}, function(err) {
			//error handling (sys err)
			deferred.reject(err);
		})
		
		return deferred.promise;
		
	}
	
	//redirecting to login with or without source, programatically, otherwise router manages the redirection
	var toLogin = function() {
		
	}
	
	//main function, auth with or without source ? - may need a source! since if no source gui involved?
		//or not really - the 'auto' flow?
	//(no gui involved for client side... if server side, see if can reuse auth.login)
	
	//it not check if already auth'ed (to pi); 
		//there's use case where need to auth even auth'ed (having valid piToken)
		//caller's responsibility or using the login system in states... 
	var auth = function(source) {
		var deferred = $q.defer();
		
		//******************!!!!!!!!!!!!!!!!!!!
		//PRD: also check hasPlugin[source] !
			//if no source specified try client (put in 'facebook') - dealt with in login state...

		if (External.isClientAuth(source)) {
			clientAuth(source).then(function(profile) {
				deferred.resolve(profile);
			}).catch(function(err){
				//if err fallback to server login
				//should depends on err type !!!
				deferred.resolve(serverAuth(source));
			})
		} else {
			deferred.resolve(serverAuth(source));
		}
		return deferred.promise;
	}
	


	function autoAuth(source) {
		//attempt to do native auth, does not fallback to serve auth, instead leaving that for caller to decide
			//whereas calling auth(source) will try hard to auth the user to the source specified 
			//incl falling back to server side if native fails - same as clientAuth...
		//auth(source).then(function)
	}
	
	
	
	
	
	//difference from auth is - it will not try to auth thru server... and stops if client side fails...
	//also depends on how client side fails... if no response but no error, big problem!
	var doClientAuth = function(source) {
		var deferred = $q.defer();
		//if fb or gp, try native first, if not possible then fall back to server (this should be dealt with in External ...???)
			//maybe here as it's better in caller's control...
		External.login(source, suc, fail);
		//exchange token 
		//getAuthToken()
		
		function suc(res) {
			//if native, exchange token; alternatively dealt with in login (?) but handling here makes External more modularize... ? more of component in external, facebook
				//while here can dealt common requirement (eg both to fb & gp)
			//how to detect if it's native? 
			deferred.resolve(getAuthToken(source, res));
		}
		
		function fail(err) {
			deferred.reject(err);
		}		
		
		return deferred.promise;
	}
	

	
	//though not under auth, if there's piToken should send it over...
		//wasn't it sent automatically? 
	var serverAuth = function(source) {
		
		var url = loginUrl + '/' + source;
		var deferred = $q.defer();
		var token;
		
		//if has piToken still attach it even though it's not for auth purpose
		url = attachToken(source, url);
		
		console.log('');
		console.log('----serverAuth---------');
		console.log('url: ', url);
		
		openLogin(url);
		return deferred.promise;		
		
		
		function openLogin(url) {
			
			var test;
			
				var lgWin;
				var iab = window.cordova && cordova.InAppBrowser? true : false;
				var browser = iab ? cordova.InAppBrowser : $window; 
				
				lgWin = browser.open(url, '_blank', 'location=no,menubar=yes,toolbar=yes,width=600,height=400');
				console.log(lgWin.location);
				
				if (iab) {
					lgWin.addEventListener("loadstop", function() {
						lgWin.executeScript({
							//code: "localStorage.getItem( 'test' )"
							code: "msg"
						}, function(value){
							console.log('loaded.., value: ', value);
							test = value[0];
							store.set('test', value[0]);
							console.log('test, cb of script: ', test);
						})
						console.log('browser just loaded...')
						console.log('test, cb from event: ', test);
					})
					
					lgWin.addEventListener("exit", function() {
						console.log('browser just exit...')
						console.log('$test, cb fr exit', test);
						//create the 'event'
							var evt = {
								server: server,
								data: msg
							}
							receiveMessage(evt);
					})		
					
				} else {
					$window.addEventListener("message", receiveMessage, false);		
					//lgWin.addEventListener("message", receiveMessage, false);
				}
		}
		
		function receiveMessage(event) {
			if (event.origin !== server) {
				//return; //reject the promise
				deferred.reject('Fail to receive message, event origin ' + event.origin + ' is not registered');
			}
			
			if (event.data.token) {
				//save the token, (both to storage & memory), return the token...
				token = event.data.token;
				console.log(token);
				postLogin(event);

				
				//handle server side auth for client codes 
				//processServerAuthForClient(event.data);
				
				deferred.resolve(token);
				//return token; //?
			}
			else if (event.data.status == 'ok') {
				//resolved with the old token;
				return deferred.resolve(token);
			} else { // does this handle login error etc?
				console.log(event.data);
				deferred.reject('error : ' + JSON.stringiy(event.data));
			}
		}
		
		//for client side 
		function processServerAuthForClient(data) {
			if (External.isClientAuth(data.source)) {
				store.set('pi_' + data.source + '_profile', data.profile);
				accessTokens[source].token = data.accessToken;
				accessTokens[source].exp = data.exp;
			}

		}
			
	}
	
	function postLogin(res){
		if (res && res.data) {
			if (res.data.token) {
				authenticated = true;
				store.set('piToken', res.data.token);
			}
			if (res.data.profile) {
				store.set('pi_' + res.data.source + '_profile', res.data.profile);
			}
			
			if (res.data.exp) {
				store.set('pi_' + res.data.source + '_exp', res.data.exp);
			}
			store.set('piLastSource', res.data.source);
		}
	}
	
	function attachToken(source, url) {
		var t;
		if (isAuthenticated()) {
			t = token || store.get('piToken');
		}
		if (t) {
			url += '?token=' + t + '&source='  + source;
			return url;
		}
		return url;
	}
	
	var loginServer = function(source) {
		
	}
	
	//only logout of pi ... not any social (?)
	var logout = function() {
		if (authenticated) {
			console.log('did you get called?');
			token = undefined;
			store.remove('piToken');
			store.remove('piLastSource');
			//for profile, will be overwritten next time when login
			authenticated = false; 
		}
	}
	
	
	
	return {
		auth: auth,
		isAuthenticated: isAuthenticated,
		serverAuth: serverAuth,
		clientAuth: doClientAuth,
		logout: logout,
		isClientAuth: External.isClientAuth
	}

})


//wrapper for platform individual plugin 
	//should update credit record (refresh?) when successful?
services.service('PaymentSvc', function($timeout, init, AndroidIAB, IosIAB) {
	var prodId = 'credits';
	var platform; 
	//mock:
	var plugins = {
		android: false, //AndroidIAB,
		ios: false, //IosIAB,
		unsupported: false
	}
	var iabSvc;
	
	ionic.Platform.ready(function(){
		//clt = clients[source];
		$timeout(function() {
			console.log('');
			console.log('===get device info');
			console.log('');
			//platform = init.getDeviceInfo().platform;
			// check the plugin exists? .. no should check it its own service...
				//then it needs to expose a method to tell if plugin exists... 
				//???
			iabSvc = device.platform == 'android' ? AndroidIAB : IosIAB;
		}, 1000)		
	})
	
	//prodId mapping 
	prodMap = {
		3: 'credits3'
	}
	function purchase(num, cb) {
		console.log('platform: ', platform);
		console.log('iabSvc: ', iabSvc);
		console.log('AndroidIAB', AndroidIAB);
		iabSvc.purchase(prodId+num, function(err, res) {
			if (err) return cb(err);
			console.log('res from purchase: ', res);
			var claim = {
				receipt: res.data.receipt,
				platform: device.platform,
				orderId: res.data.orderId
			}
			return cb(null, {data: claim});
		});
	}
	
	return {
		purchase: purchase
	}
})

services.service('AndroidIAB', function() {
	//mock 
	var iab = {
		consumePurchase: consumePurchase,
		buy: buy
	}
	
	function buy(suc, fail, prodId) {
		var purTrans = {
			"orderId":"12999763169054705758.1385463868367493", 
			"packageName":"com.example.myPackage", 
			"productId":"credits3", 
			"purchaseTime":1397590291362, 
			"purchaseState":0, 
			"purchaseToken":"ndglbpnjmbfccnaocnppjjfa.AO-J1Ozv857LtAk32HbtVNaK5BVnDm9sMyHFJkl-R_hJ7dCSVTazsnPGgnwNOajDm-Q3DvKEXLRWQXvucyW2rrEvAGr3wiG3KnMayn5yprqYCkMNhFl4KgZWt-4-b4Gr29_Lq8kcfKCkI57t5rUmFzTdj5fAdvX5KQ", 
			"receipt": "{ data: 'stringified purchase data', signature: 'yyyy' }", 
			"signature": "qs54SGHgjGSJHSKJHIU"			
		}
		return suc(purTrans);
	};
	
	function consumePurchase(suc, fail, prodId) {
		
	}
	
	function consume(prodId, cb) {
		return iab.consumePurchase(success.bind(null, cb), fail.bind(null, cb), prodId);
	}
	
	function purchase(prodId, cb) {
		return iab.buy(success.bind(null, cb), fail.bind(null, cb), prodId)
	}
	function success() {
		var cb = arguments[0];
		var trans = arguments[1];
		var consumeTrans = { 
			"orderId":"12999763169054705758.1321583410745163", 
			"packageName":"com.smartmobilesoftware.trivialdrivePhonegap", 
			"productId":"gas", 
			"purchaseTime":1369402680000, 
			"purchaseState":0, 
			"purchaseToken":"ccroltzduesqaxtuuopnqcsc.AO-J1Oyao-HWamJo_6a4OQSlhflhOjQgYWbb-99VF2gcj_CB1dd1Sfp5d-olgouTWJ13Q6vc5zbl0SFfpofmpyuyeEmJ" 
		};

		var res = {
			data: trans
		}
		console.log('cb: ', cb);
		return cb(null, res);
	}
	
	function fail() {
		var cb = arguments[0];
		var err = arguments[1];
		return cb(err);
	}
	
	return {
		purchase: purchase
	}
})

services.service('IosIAB', function() {
	function purchase(prodId, cb) {
		
	}
	return {
		purchase: purchase
	}
})

//cb approach; (to use CreditSvc(?)
//return res ??? or res.data???
services.service('Profiling', function(CreditSvc, External, ApiSvc) {
	//getProfile
	function getProfile(src, target, cb) {
		
		External.getProfile(src, target, function(err, res) {
			
			if (err) return cb(err);
			
			//CreditSvc.use(res.data.src);//don't use ... problematic ...
			CreditSvc.save(res.data.credit)
			return cb(null, res);			
		})

	}

	return {
		getProfile: getProfile
	}
})




