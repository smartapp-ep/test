
var constants = angular.module('ipa.constants', ['ionic', 'ipa.services']);
//var data;

//dev for fitToPage, loaded in config's platform.ready 
var dev = {};

var languages = ['en', 'es'];
//var languages = ['en'];
var language = 'en';
var languageNames = {
	'en': 'English',
	'es': 'Spanish'
}


var	businessView = {
						"viewName": "Business",
						"general": {
							"high": "She/he feels fulfilled when helping people and is generally considered a helpful person in the business network.", 
							"medium": "From time to time, there can be some inner conflicts between helping you and getting straight to business.",
							"low": "S/he places own interest beyond anything else, good relationship is not too vital, depends on the role s/he is in, so try to focus on business."
						},				
						"roles": [{
							"roleName": "client",
							"info": {
								"high": "If your product or service matches other competitors, then telling her/him how desperately you need the order, and the reasons why this order will help your situation could help you to get the deal.",
								"medium": "S/he may be having some inner conflicts if you did a good job in showing how helpful it'd be to have her/his order. There's always chance that S/he is tempted to place the order as helping you could fulfil her/himself too. Yet if s/he's in the egoism mood, then s/he will be very much focus on business.",
								"low": "S/he place own interest before anything, so good relationship will not help your sales. In stead, focus on the real sales stuffs: understand what problem is he facing with, what are the paint points, how your products or service can eliminate the paint points or meets his demands, how are you doing compared to your competitors etc."						
							}
						},
						{
							"roleName": "sales",
							"info": {
								"high": "S/he may want to get your order very much, but at the meant time, if you feel their genuineness in helping you, that means s/he  truly believe the service and product can help you; if you don't then chance is that s/he her/himself does not think the product or service can help, s/he's purely trying to make a sales.",
								"medium": "You usually do not need to care about the relationship unless s/he is a large upstream supplier whose can significantly affect your business if the supply is not steady. <br><br> For half of the time s/he feels fulfilled when s/he's able to help you. So exaggerating a little about how important their supply will not hurt.",
								"low": "S/he place own interest before anything, so will try to push and get your order with little regards to whether you really need the product or service.; if provider..., that need good relationship, try convincing her/him from him/her's perspective. (For example? ...)"
							}					
						}]
					};

/*
var perspectives ={
	"en": ['Relationship', 'Approaching', 'Self-Improvement'],
	"es": ['Relación', 'Acercamiento', 'Self-Improvement']
}

var facets = {
	"en": ["Agreeableness", "Conscientiousness", "Introversion-Extroversion", "Neuroticism", "Openness", "Needs", "Values"],
	"es": ["Agradabilidad", "Conciencia", "La introversión-extraversión", "Neuroticismo", "Apertura", "Needs", "Valores"]
}
*/

var facets = ["Agreeableness", "Conscientiousness",  "Extraversion", "Neuroticism", "Openness", "Needs", "Values"];
var perspectives = ['Relationship', 'Approaching', 'Self-Improvement'];

var perspectiveDescriptions = {
	'en': {
			'Relationship': 'relationship building',
			'Approaching': 'approaching the target, or making first impression',
			'Self-Improvement': 'self improvement, usually you are doing the analysis on your own personality and seeking self improvement, or doing this for your partner and friends so you can advise how they can make improvements'
	},
	'es': {
			'Relationship': 'construyendo una relación',
			'Approaching': 'Se acerca al objetivo, o hacer la primera impresión',
			'Self-Improvement': 'Mejora del uno mismo, por lo general que está haciendo el análisis de su propia personalidad y la búsqueda de la superación personal, o haciendo esto por su pareja y amigos para que puedan aconsejar cómo pueden hacer mejoras'
	}
};

var viewNames = ['Love', 'Work', 'Social', 'Business'];
var viewIndex = {
	'Love': 0,
	'Work': 1,
	'Social': 2,
	'Business': 3
}

var data;

var initDataCompleted = false;

var dirtyPromise = 35000;



/** 
	File utility for initialization and pre-processing 
*/
constants.provider('InitFile', function() {
	data = new Object;
	var initInjector = angular.injector(['ng']);
    var $http = initInjector.get('$http');
	var $q = initInjector.get('$q');
	var structure = new Object;
	//var $timeout = initInjector.get($timeout);
	
	//data['en'] = new Object;
	//data['es'] = new Object;

	
	console.log('who run first, constants.provider');
	

	setupLanguage(languages, perspectives);
	
	/*
	data['Relationship'] = new Object;
	data['Approaching'] = new Object;
	data['Self-Perspective'] = new Object;
	data['facets'] = facets;
	data.language = 'en';
	*/
	
	function setupLanguage(languages, properties) {
		var language;
		for (i=0; i< languages.length; i++) {
			language = languages[i];
			data[language] = new Object;
			data[language]['Perspective-Description'] = new Object;

			var property;
			for (j=0; j< properties.length; j++) {
				property = properties[j];
				data[language][property] = new Object;
				data[language]['Perspective-Description'][property] = perspectiveDescriptions[language][property];
			}
			//data[language]['facets'] = facets[language];
		}
		
		data['facets'] = facets;
		data['viewNames'] = viewNames;
		data['viewIndex'] = viewIndex;
		data.languageNames = languageNames;
		
	}
	
	//function(s) to process data
	//reads sample and extracts the structure
	function getStructure(sample) {
		var structure = new Array();
		
		/*
		for (i=0; i<sample.tree.children.length; i++) {
				sample.tree.children[i];
		}
		*/
		
		var b5;
		
		b5 = sample.tree.children[0].children[0].children;
		all = sample.tree.children;		
		//console.log('inside fucntion: ');
		//console.log(b5);
		
		console.log('all: ');
		console.log(all);
		
		getFacetStructure(b5,structure);
		
		
	//for needs and values only:
	
	for (k=1; k<all.length; k++) {
		//b5 = all[k].children[0].children;
		b5 = all[k].children[0];
		var facet = new Object;
		
		facet.traitName = all[k].name;
		facet.traitType = all[k].id;
		
		console.log('b5: ');
		console.log(b5);
		
		facet.children = new Array;
		
		//structure[b5.id] = facet;
		
		for (i=0; i<b5.children.length; i++) {
			var trait = new Object;
			trait.traitName = b5.children[i].id;
			trait.traitType = 'trait';
			//facet.children = new Array;
			
			facet.children.push(trait);		
		}
		structure.push(facet);
	}	
		//console.log('b5: ');
		//console.log(b5);
		console.log('b5Info & tooltips & structure: ');
		console.log(data.Relationship);
		console.log(data.tooltips);
		console.log(structure);
		return structure;
	}
	
	//helper function to fetch structure from sample
	
	function getFacetStructure(traits, structure) {
	
		var b5 = traits;
		
		for (i=0; i<b5.length; i++) {
			var facet = new Object;
			facet.traitName = b5[i].id;
			facet.traitType = 'facet';
			facet.children = new Array;

				for (j=0; j<b5[i].children.length; j++) {
					console.log(b5[i].children.length);
					
					var trait = new Object;
					trait.traitName = b5[i].children[j].id;
					trait.traitType = 'trait';
					facet.children.push(trait);
				}
				
			structure.push(facet);	
			
		}
		
		//return structure;
	
	}
	
	//fetch from tooltips and inject into description of each trait - creating a new info obj(s) from existing structure obj
	function populateGeneral(tooltips, b5Info) {
		
		var b5tooltips = new Object;
		//b5tooltips = tooltips.big5;
		var trait = new Object;
		trait = b5Info.Agreeableness[0];
		
		for (i=0; i<structure.length; i++) {
			var traitName = structure[i].traitName;
			var traitCat = structure[i].traitType;
			
			//structure[i].info = new Object;
			//structure[i].views = new Object;			
			//structure[i].info = trait.info;
			//structure[i].views = trait.views;

			//console.log('b5tooltips[traitName].valueOf');
			//console.log(b5tooltips[traitName]);
			
			if (traitCat == 'facet') {
				traitCat = 'big5';
			}
			
			b5tooltips = tooltips[traitCat];
			
			//console.log('traitCat & b5tooltips: ');
			//console.log(traitCat);
			//console.log(b5tooltips);
			
			structure[i].description = b5tooltips[traitName];
			
			for (k=0; k<structure[i].children.length; k++) {
				traitName = structure[i].children[k].traitName;
				structure[i].children[k].info = trait.info;
				structure[i].children[k].views = trait.views;
				structure[i].children[k].description = b5tooltips[traitName];
			}

		}
	
		console.log('new structure: ')	
		console.log(JSON.stringify(structure));
		
		//return structure;
	}
	
	function toObject (traitsArr) {
		var traitsObj = new Object;
		for (i=0; i< traitsArr.length; i++) {
			var traitName = traitsArr[i].traitName;
			traitsObj[traitName] = traitsArr[i];
		}
		return traitsObj;
	}
	
	function addObjects (arr, object, func1, func2) {
		//console.log('am i in? addObjects: ');
		var language;
		
		// debug, only en, need to change later	
		for (i=0; i<languages.length-1; i++) {			
			language = languages[i];

			// change length later
			for (j=2; j<perspectives.length; j++) {
				var property = perspectives[j];
				
				
				for (trait in data[language][property]) {
				//if (trait == "Agreeableness") {		
				
				//	console.log('I did call? ' + 'trait: ' + trait );
				//remove later!

					func1(arr, object, data[language][property][trait], property, func2);
					
					//console.log("data[language][property][trait]['children']");
					//console.log(data[language][property][trait]['children']);
					
					//change length later!
					for (m=0; m < data[language][property][trait]['children'].length; m++) {
						
						//console.log('how many times did i call?' + 'K: ' + m + ' and data below: ');
						//console.log(data[language][property][trait]['children'][m]);
						//*** hard-coded branching: if property is needed
						//func1(arr, object, data[language][property][trait]['children'][m], property, func2);
						//*** if language is needed:
						func1(arr, object, data[language][property][trait]['children'][m], language, func2);						
						
						//console.log('did anything change?');
						//console.log(data[language][property][trait]['children'][k]);	
					}

				}
				
			}
		}
	}

	//looks the function is cached... if calling the 2nd time... at least data is; work around attempt: duplicate function
		//additional func3 for root level processing 
	function processObjects (arr, object, func1, func2, func3) {
		console.log('am i in? processObjects, data: ', data);
		var language;
		
		// debug, only en, need to change later	
		for (i=0; i<languages.length-1; i++) {			
			language = languages[i];

			// change length later
			for (j=0; j<perspectives.length; j++) {
				var property = perspectives[j];
				
				for (trait in data[language][property]) {
				//if (trait == "Agreeableness") {		
				
				//	console.log('I did call? ' + 'trait: ' + trait );
				//remove later!
				
				//root level processing 
					if (data[language][property][trait].general) {
						func3(data[language][property][trait], language, property);
					}
				
					func1(arr, object, data[language][property][trait], property, func2, property);
					
					//console.log("data[language][property][trait]['children']");
					//console.log(data[language][property][trait]['children']);
					
					//change length later!
					for (m=0; m < data[language][property][trait]['children'].length; m++) {
					

						
						//processing root level (on each view)
						var views = data[language][property][trait]['children'][m].views;
						for (n = 0; n < views.length; n++ ) {
							if (views[n].general) {
								func3(views[n], language, property);
							}
						}
						
						//console.log('how many times did i call?' + 'K: ' + m + ' and data below: ');
						//console.log(data[language][property][trait]['children'][m]);
						//*** hard-coded branching: if property is needed
						//func1(arr, object, data[language][property][trait]['children'][m], property, func2);
						//*** if language is needed:
						func1(arr, object, data[language][property][trait]['children'][m], language, func2, property);						
						
						//console.log('did anything change?');
						//console.log(data[language][property][trait]['children'][k]);

					}

				}
				
			}
		}
	}

	//copy of proecessObjects and process the specified perspective & language 
	function processPerspective(arr, object, func1, func2, func3, language, perspective) {
		//console.log('am i in? processPerspective, data: ', data);
		var language;
		
		// debug, only en, need to change later	
			
			//language = languages[i];

			// change length later

				var property = perspective;
				
				for (trait in data[language][property]) {
				//if (trait == "Agreeableness") {		
				
				//	console.log('I did call? ' + 'trait: ' + trait );
				//remove later!
				
				//root level processing 
					if (data[language][property][trait].general) {
						func3(data[language][property][trait], language, property);
					}
				
					func1(arr, object, data[language][property][trait], property, func2, property);
					
					//console.log("data[language][property][trait]['children']");
					//console.log(data[language][property][trait]['children']);
					
					//change length later!
					for (m=0; m < data[language][property][trait]['children'].length; m++) {
					

						
						//processing root level (on each view)
						var views = data[language][property][trait]['children'][m].views;
						for (n = 0; n < views.length; n++ ) {
							if (views[n].general) {
								func3(views[n], language, property);
							}
						}
						
						//console.log('how many times did i call?' + 'K: ' + m + ' and data below: ');
						//console.log(data[language][property][trait]['children'][m]);
						//*** hard-coded branching: if property is needed
						//func1(arr, object, data[language][property][trait]['children'][m], property, func2);
						//*** if language is needed:
						func1(arr, object, data[language][property][trait]['children'][m], language, func2, property);						
						
						//console.log('did anything change?');
						//console.log(data[language][property][trait]['children'][k]);

					}

				}
				


	}
	
	//copy of processFormat and format the specified perspective & language
	function formatPerspective(arr, object, func1, func2, language, perspective) {
		//console.log('am i in? addObjects: ');

		
		// debug, only en, need to change later	
			

			// change length later

				var property = perspective;
				
				
				for (trait in data[language][property]) {
				//if (trait == "Agreeableness") {		
				
				//	console.log('I did call? ' + 'trait: ' + trait );
				//remove later!

					func1(arr, object, data[language][property][trait], property, func2);
					
					//console.log("data[language][property][trait]['children']");
					//console.log(data[language][property][trait]['children']);
					
					//change length later!
					for (m=0; m < data[language][property][trait]['children'].length; m++) {
						
						//console.log('how many times did i call?' + 'K: ' + m + ' and data below: ');
						//console.log(data[language][property][trait]['children'][m]);
						//*** hard-coded branching: if property is needed
						//func1(arr, object, data[language][property][trait]['children'][m], property, func2);
						//*** if language is needed:
						func1(arr, object, data[language][property][trait]['children'][m], language, func2);						
						
						//console.log('did anything change?');
						//console.log(data[language][property][trait]['children'][k]);
					}
				}
				
			
	}	
	
	
	function processFormats (arr, object, func1, func2) {
		//console.log('am i in? addObjects: ');
		var language;
		
		// debug, only en, need to change later	
		for (i=0; i<languages.length-1; i++) {			
			language = languages[i];

			// change length later
			for (j=0; j<perspectives.length-2; j++) {
				var property = perspectives[j];
				
				
				for (trait in data[language][property]) {
				//if (trait == "Agreeableness") {		
				
				//	console.log('I did call? ' + 'trait: ' + trait );
				//remove later!

					func1(arr, object, data[language][property][trait], property, func2);
					
					//console.log("data[language][property][trait]['children']");
					//console.log(data[language][property][trait]['children']);
					
					//change length later!
					for (m=0; m < data[language][property][trait]['children'].length; m++) {
						
						//console.log('how many times did i call?' + 'K: ' + m + ' and data below: ');
						//console.log(data[language][property][trait]['children'][m]);
						//*** hard-coded branching: if property is needed
						//func1(arr, object, data[language][property][trait]['children'][m], property, func2);
						//*** if language is needed:
						func1(arr, object, data[language][property][trait]['children'][m], language, func2);						
						
						//console.log('did anything change?');
						//console.log(data[language][property][trait]['children'][k]);
					}
				}
				
			}
		}
	}	
	
	function values(object) {
		for(key in object) {
			//console.log('object: ');
			//console.log(object);
			if(object.hasOwnProperty(key)) {
				//console.log('data[key]');
				//console.log(data[key]);
				return object[key];
 
			}
		}	
	}
	
	function keys(object) {
		for(key in object) {
			if(object.hasOwnProperty(key)) {
				return key;
			}
		}
	}
		
	
	function addDetailsConfig (arr, object, data, property) {
		for (i=0; i<arr.length; i++) {
			var key = keys(arr[i]);
			var obj = values(arr[i]);
			if (i == 1 && data.traitType != 'trait' && property == 'Relationship') {
				//setup config for facetDetails for relationship only; (2nd in the arr)
				data[key] = obj;
				
				//console.log('debug adding objects: ')
				//console.log('data: ')
				//console.log(data);
				//console.log('key: ');
				//console.log(key);
				//console.log('obj');
				//console.log(obj);
			}
			if (i==0 && data.traitType != 'trait') {
				//add perspectiveDetails for each facet & each perspective
				data[key] = obj;
			}
		}
		if (data.traitType == 'trait') {
			var key = keys(object);
			var value = values(object);
			// add viewDetails to each trait;
			data[key] = value;
		}
	}

	var summaryDetails = new Object;
	function copySummary () {
		for (trait in data.en.Relationship) {
			console.log('copying: ')
			//console.log(trait);
			summaryDetails[trait] = new Object;
			summaryDetails[trait].description = data.en.Relationship[trait].description;
			summaryDetails[trait].summary = data.en.Relationship[trait].summary;
			summaryDetails[trait].general = data.en.Relationship[trait].general;			
			summaryDetails[trait].children = new Object;
			for (i=0; i< data.en.Relationship[trait].children.length; i++) {
				var childTrait = data.en.Relationship[trait].children[i];
				summaryDetails[trait].children[childTrait.traitName] = new Object;
				summaryDetails[trait].children[childTrait.traitName].description = childTrait.description;
				summaryDetails[trait].children[childTrait.traitName].info = childTrait.info;
			}
		}
		console.log('summaryDetails: ');
		console.log(summaryDetails);
		console.log(JSON.stringify(summaryDetails));
	}
	
	
	//originally for generic purpose now used for populateMedium due to mem ref prob 
	// process each info node and reformat when necessary
	// for each role and each view
		//additional parameter perspective to handle 'Approaching' differently
		
	function processRoles (dummyArr, dummyObj, data, dummyStr, func, perspective) {
		
		//console.log('am i here? - processRoles');
		//gets the 'data', process each role and each info node
		// calls fitTopage for each info;
		// calls addNewNode for the new page; X (fitToPage will do that) by accessing the global data node;
		
		// only interested in trait (incl need & value)
		
		if (data.traitType == 'trait' || data.traitType == 'need' || data.traitType == 'value') {
			var view;
			//console.log('-------');
			//console.log('trait: ');
			//console.log(data.traitName);
			
			
			//change later!
			for (vw=0; vw< data.views.length; vw++) {
				view = data.views[vw];
				//console.log('why didnt i pass business view? ');
				//console.log('vw & data: ');
				//console.log(vw);
				//console.log(data);
				//var roles=JSON.parse(JSON.stringify(view.roles));
				
				//view.newRoles=func(roles);
				
				//should use the following generic but seems memory problem at the 3rd object...
				//func(view);
				
				//as a work around, calling child func directly
				func(view, dummyStr, perspective);
			}
			
			
		}
		

	}
	
	//attempt to work around the annoying cached data in same function (???) 
		//not used??? X ... the two functions are confusing... 
	function formatRoles (dummyArr, dummyObj, data, dummyStr, func) {
		
		//console.log('am i here? - processRoles');
		//gets the 'data', process each role and each info node
		// calls fitTopage for each info;
		// calls addNewNode for the new page; X (fitToPage will do that) by accessing the global data node;
		
		// only interested in trait (incl need & value)
		
		if (data.traitType == 'trait' || data.traitType == 'need' || data.traitType == 'value') {
		//debug: 
		//if (data.traitName == 'Self-efficacy') {
			var view;
			//console.log('-------');
			//console.log('trait: ');
			//console.log(data);
			console.log('formatRoles');
			
			for (vi=0; vi< data.views.length; vi++) {
			//debug
			//for (vi=3; vi< data.views.length; vi++) {
				view = data.views[vi];
				//console.log('why didnt i pass business view? ');
				//console.log('vi & data: ');
				//console.log(vi);
				//console.log(data);
				
				var roles=JSON.parse(JSON.stringify(view.roles));
				
				//view.newRoles=func(roles);
				
				//should use the following generic but seems memory problem at the 3rd object...
				//func(view);
				
				//as a work around, calling child func directly
				func(view, roles);
			}
			
		}
		

	}	
	
	function addRole (view, roles) {
		//var roles = view.roles;
		
		var role;
		var pages;
		var newRoles =[];
		
		//console.log('am i here? & view:');
		//console.log(view);
		//change later!
		//for (j=0; j<roles.length; j++) {
			//var role;

			for (ro=0; ro< roles.length; ro++) {
				role = roles[ro];
			
			//only for roles with no combo, combo will be formated on the fly
			if (!role.hasOwnProperty('combo') && !role.hasOwnProperty('combos')) {	
				//newRoles.push(role);
				//console.log('what the hell? view, role, k')
				//console.log(view)
				//console.log(role);
				//console.log(k);
				

				var firstSuffix =role.roleName.replace( /^\D+/g, '');
				if (firstSuffix == '') {
					firstSuffix = 0;
				}
				//var newRoleNum = 0
				var suffix = firstSuffix + 1;
				
				for (score in role.info) {
					//console.log('score: ' + score);

		//console.log('info about to break fitTopage -- view.viewName, role.roleName, score & view object: ');
		//console.log(view.viewName +' , ' + role.roleName + ' , ' + score);
		//console.log(view);
		
					pages = fitToPage(role.info[score]);
					
				//debug:
				//if (pages.length > 2 && role.roleName == 'team-mate') 
						//console.log('pages - fr addRole: '); // if not empty');
						//console.log(pages);
				
					
					var needNew = true;

					var newRole;
					var firstRole;
					
					if (pages.length > 0) {
						
						//always push first page
						var idx = findIdx(newRoles, role.roleName);
						if (idx == -1) {
							//role not exist, create it
							firstRole = new Object;
							firstRole.roleName = role.roleName;
							firstRole.info = new Object;
							firstRole.info[score] = pages[0];
							newRoles.push(firstRole);
						} else {
							//role exists
							firstRole = newRoles[idx];
							firstRole.info[score] = pages[0];
																					
						}
						
							
																	
							for (p=1; p<pages.length; p++) {
								
								//console.log("shouldn't be extra page? ");
								//console.log('suffix bef if');
								//console.log(suffix);
								
								var extraRole;
								var extraRoleName = role.roleName + ' (' + (p+1) + ')';
								
								//console.log('extra role name');
								//console.log(extraRoleName);								
								
								var idx = findIdx(newRoles, extraRoleName);
								//does the role exist?
								if (idx==-1) {
									extraRole = new Object;
									extraRole.roleName = extraRoleName;
									extraRole.info = new Object;
									extraRole.info[score] = pages[p];
									newRoles.push(extraRole);
									//suffix += suffix;
								} else {
									//console.log('idx:');
									//console.log(idx);
									
									extraRole = newRoles[idx];
									extraRole.info[score] = pages[p];
								}
														
							}		
					}
				
				// // debug
				}	
			} else { 
				//unchanged if the role has combo/s
				newRoles.push(role);
			} //end if
			} //for

		
		
		view.roles = newRoles;
		//view.newRoles = newRoles;
		//roles = newRoles;
		//return newRoles;
			
	}
	
	function copyNewRoles(view) {
		view.roles = view.newRoles;
	}
	
	function findIdx (roles, roleName) {
		var role;
		for (x=0; x<roles.length; x++) {
			role = roles[x];
			//console.log('role.roleName');
			//console.log(role.roleName);
			//console.log('roleName');
			//console.log(roleName);
			//console.log('roles');
			//console.log(roles);
			if (role.roleName == roleName) {
				//console.log('did you find the idx or not?');
				//console.log(i);
				return x;
			}
		}
		return -1;
	}
	
	function addRoles(pages, roles) {
		for (i=0; i< pages.length; i++) {
			page.roleName;
			page.info;
		}
	}

	//formatting for display (preparing by creating new cards)
	//returns an arr of additional cards / pages 
	// *** Note -- doesn't consider html tags except for <br> ****
	function fitToPage(info) {
		
		//console.log('fit to page being called');
		
		//punctuation word count (0.5 appears best in browser but 1 in device?)
		var pun = 0.5;
		//space length
		var space = 1;
		
		var pages=[];
		const maxCharPerLine = dev.platform == 'ios' ? 42 : 44;
		const maxLinePerPage = 10;
		//var words = info.split(/\s+/);
		var words = info.split(' ');
		//Count = 1st word length
		//For each word, temp count+=1+ word .length
		//If count > max per line, start next line with this word; 
		//Else continue

		//When a page is full, create (or copy?) a new node, then continue with the remaining text, until finished
		var wordCount = words[0].length;
		var lineCount = 1;
		var pageCount = 1;
		var curWordCount = wordCount;
		var curPage = '';
		var wordBuffer = '';
		var pageBuffer = '';
		
		curWordCount = words[0].length; // + space;
			//change: space will be counted before the word instead
		curPage = curPage + words[0]; //+ ' ';
		var curLine = curPage;
		var matchedPage = '';
		
		//console.log('words, starting count & curpage');
		//console.log(words);
		//console.log(curWordCount);
		//console.log(curPage);
		
		
		for (i=1; i<words.length; i++) {
				
			//check if word is line break...: 
			
			//curWordCount += 1 + words[i].length;
			//curPage += words[i] + ' ';
			
			//debug
			/*
			if ( words[i] == 'something' && words[i-1] == 'that' && words[i-2] == 'find') {
					console.log('------------------');
					console.log('current word : ' + words[i]);
					console.log('current line : ' + curLine);
					console.log('wordcount : ' + curWordCount);
					console.log('current line count : ' + lineCount);
					console.log('current cur page: ' + curPage);
					console.log('pageBuffer: ', pageBuffer);
			}
			if ( words[i] == 'could' && words[i-1] == 'something' && words[i-2] == 'that' && words[i-3] == 'find') {
					console.log('------------------');
					console.log('current word : ' + words[i]);
					console.log('current line : ' + curLine);
					console.log('wordcount : ' + curWordCount);
					console.log('current line count : ' + lineCount);
					console.log('current cur page: ' + curPage);
					console.log('pageBuffer: ', pageBuffer);
			}			
			
			
			if (lineCount == 12 && words[i] == 'Note:') {
					console.log('------------------');
					console.log('current word : ' + words[i]);
					console.log('current line : ' + curLine);
					console.log('wordcount : ' + curWordCount);
					console.log('current line count : ' + lineCount);
					console.log('current cur page: ' + curPage);
					console.log('pageBuffer: ', pageBuffer);
			}
			
			
			if (lineCount == 10 && words[i] == 'that' && words[i-1] == 'find') {
					console.log('------------------');
					console.log('current word : ' + words[i]);
					console.log('current line : ' + curLine);
					console.log('wordcount : ' + curWordCount);
					console.log('current line count : ' + lineCount);
					console.log('current cur page: ' + curPage);
					console.log('pageBuffer: ', pageBuffer);
			}
			*/
				
			
			// check line count first, next page even if word count not reaching max
			if (lineCount > maxLinePerPage) {
				//next page and reset counters
				//continue as usual
				
				//console.log('setting for next page:');
				//console.log('linecount before reset is ' + lineCount );
				//console.log('current word count is ' + curWordCount);
				//console.log('currentline (?) is: ' + curLine);
				//console.log(curPage);
				
				pages.push(curPage);
				//console.log('curWord: ', words[i]);
				//console.log('curPage: ', curPage);
				
				//reset curWordCount
				//curWordCount += pageBuffer.length - space; //previously added space 
				curWordCount = pageBuffer.length;
				curPage= curLine = pageBuffer.slice(0);
				
				//curLine = pageBuffer;
				
				pageBuffer = '';
				lineCount = 1;
				
				//continue;

			}
			
			//else or continue? (don't forget space! X shouldn't incl space; yet need to deal with exact match, i.e = condition and no space at next word, or doesn't matter -- since space on first word in next line is ok...); also need to deal with special case - line break;
			if (words[i] != '<br><br>' && (curWordCount + space + words[i].length > maxCharPerLine)) {
				//since no word longer than 10 chars, new page & new line won't happen simultaneously;
				//but, once increase to next line, could become new page, yet, next loop will take care of that - as long as not in the same loop.
				//next line and reset line counter
				//continue as usual
				
				//deal with special case when current word belongs to next line as well as next page (should be curLine not just curWord in this case!?)
				if (lineCount == maxLinePerPage) {
					pageBuffer += ' ' + words[i];		
					//pageBuffer += curLine + words[i] + ' ';
					
					//console.log('pagebuffer: ' + pageBuffer);
					
					//lineBuffer += words[i] + ' ';
					
					//console.log('---');
					//console.log('current word right before new line: ' + words[i]);
					//console.log('current line right before new line: ' + curLine);
					//console.log('wordcount right before new line: ' + curWordCount);
					//console.log('current line count before new line: ' + lineCount);
					//console.log('current cur page before new line: ' + curPage);					
				}
				
				//debug
				//console.log('---');
				//console.log('current line right before new line: ' + curLine);
				//console.log('wordcount right before new line: ' + curWordCount);
				//console.log('current line count before new line: ' + lineCount);
				//console.log('current cur page before new line: ' + curPage);
				
				//lineBuffer += words[i] + ' ';
				
				lineCount += 1;
				//resest curWordCount to 0 (+ curWord.length will be added later);
				
				//for a new line, offset the space before it (which will be added later)
				//curWordCount = 0;
				curWordCount = -1;
				//newLine = true;
				
				//curWordCount = words[i].length;
				curLine = '';
				//continue;
				
				

			}
			
			//continue from above + else
			//update word count & curPage
			if (words[i] == '<br><br>') {
				lineCount += 2; //possible jumping two lines if happens to >maxChar, but skipping a blank line - or, the line break not needed for new pages... (so it should be better to skip it) -?
				curWordCount = 0;
				
				curLine = '';
				
				//if after increase lineCount > maxLine (page full) add current word (<br><br>) to page buffer
				if (lineCount > maxLinePerPage) {
					pageBuffer += ' ' + words[i];		
					//pageBuffer += curLine + words[i] + ' ';
					
					//console.log('pagebuffer: ' + pageBuffer);
					
					//lineBuffer += words[i] + ' ';
					
					//console.log('---');
					//console.log('current word right before new line: ' + words[i]);
					//console.log('current line right before new line: ' + curLine);
					//console.log('wordcount right before new line: ' + curWordCount);
					//console.log('current line count before new line: ' + lineCount);
					//console.log('current cur page before new line: ' + curPage);					
				}				
				
			} else {
				
				//special characters that occupies less space 
				
				//var specChars = /(['])([.])([,])([!])([-])([/])([;])([(])([)])([i])([l])/;
				//var specChars = /[':.,!;il)]/g;
				var lightChars = /[':.,!;ilI/]/g;
				var heavyChars = /[OUoum]/g;
				curWordCount += words[i].replace(lightChars, '').length;
				var puns = words[i].match(lightChars);
				var punsCount = puns ? puns.length : 0;
				curWordCount += punsCount * pun + space;
				//curWordCount += words[i].match(/([az]*)/ig).length + 1;
				//matchedPage +=words[i].match(/([az]*)/ig);
				//curWordCount += words[i].replace(/([']*)([.]*)([,]*)([!]*)([-]*)([/]*)([;]*)([(]*)([)]*)/g, '').length + pun;
				//curWordCount += words[i].length + space;
				curLine += ' ' + words[i];
			}
			
			// no problem until next line happens to be in new page! (ideally should not add the current word if it's already in pageBuffer... but that will add many comparison (for each word), now it's added but won't be displayed anyway... yet if in future decide to write to json permanently then should remove it!)
			//better soln would be use if else but then will repeat some lines of codes, yet that can be avoided by using sub functions .. 
			
			if (pageBuffer == '') {
				//console.log('here? pageBuffer: ' + pageBuffer);
				//var spacing =  newLine ? '' : ' ';
				curPage += ' ' + words[i];
				
				//curLine += words[i] + ' ';
			} 

			
		}
		
		//remaining page
		if (curPage != '') {
			pages.push(curPage);
		}
		
		//special case when the last word is in buffer 
		if (pageBuffer != '' ) {
			pages.push(pageBuffer);
		}
		
		//console.log('pages in fitToPage');
		//console.log(pages);
		//console.log('matchedPage: ');
		//console.log(matchedPage);
		//console.log('linecount:');
		//console.log(lineCount);
		return pages;
		
	}
	
	// function(s) to add the business view to each trait (for traitType = 'trait'
	function addView(dummyArr, newView, trait, dummyStr, dummyFunc) {
		//only add to trait type of 'trait'
		//console.log('did you call me? - addView');
		if (trait.traitType == 'trait') {
		//var view;
		//if the view doesn't exist
		//console.log('unbelievable!');
			if (trait.views.length == 3) {
				trait.views[3] = newView;
				console.log('did you add the view? - views: ');
				//console.log(trait.views);
			}
		}
	}

// instead of changing the already defined 2-level func in addObjects, use hard-corded func for 3rd level	
var specifiedFunc = populateMedium;
	
	//generic processRole function (but hardcoded for populateMedium due to mem ref prob)
	function processRole(view, language, perspective) {
		var func = specifiedFunc;
		var role;
		for (v=0; v<view.roles.length; v++) {
			role = view.roles[v];
			func(role, language, perspective);
		}
	}


	
	//populating the medium-high & medium-low info nodes to for each role
	function populateMedium(role, language, perspective) {
	
		var subject = {
			'en': {
				'Relationship': 'you',
				'Approaching': 's/he',
				'Self-Improvement': 'you'
			},
			'es': {
				'Relationship': 'you',
				'Approaching': 's/he',
				'Self-Improvement': 'you'				
			}
		};

		var score = {
			'en': {
				'Relationship': 'score',
				'Approaching': 'scores',
				'Self-Improvement': 'score'
			},
			'es': {
				'Relationship': 'score',
				'Approaching': 'scores',
				'Self-Improvement': 'score'				
			}
		};

		var have = {
			'en': {
				'Relationship': 'have',
				'Approaching': 'has',
				'Self-Improvement': 'have'
			},
			'es': {
				'Relationship': 'have',
				'Approaching': 'has',
				'Self-Improvement': 'have'				
			}
		};
		
		var mediumWordings = {
			'en': {
				'medium': 'While ' + subject[language][perspective] + ' ' +score[language][perspective]+ ' in the medium range, ' + subject[language][perspective] + ' ' +have[language][perspective]+ ' tendency towards to the ',
				'medium-high': 'higher end.',
				'medium-low': 'lower end.'
			},
			'es': {
				'medium': 'While '+ subject[language][perspective] +' ' +score[language][perspective]+ ' in the medium range, ' + subject[language][perspective] +' ' +have[language][perspective]+ ' tendency towards to the ',
				'medium-high': 'higher end',
				'medium-low': 'lower end'
			}	
			
		};
		
		//var language = languageSelected;
		var scores = ['medium-high', 'medium-low'];
		var score;
		var info = role.info || role.general; //also handles general 
		//for each role:
		for (s=0; s< scores.length; s++) {
			score = scores[s];
			//only populate if there's no existing info && if medium is defined
			if (info.medium && (info[score] == null || info[score] == undefined)) {
				info[score] = info.medium + ' <br><br> ' +  'Note: ' + mediumWordings[language].medium + mediumWordings[language][score];
				//console.log('did you add the score? - role: ');
				//console.log(role);
			}
		}
	}
	
	//add medium-high & low for root obj
		//or should do this in the fly before display??? 
	function populateMediumToGeneral(obj, language, perspective) {
		//console.log('=======perspective: ', perspective);
		populateMedium(obj, language, perspective);
	}
	

	
	this.initData = function(language,name,url,facet) {
		$http.get(url).then(onSuccess, onError);
		
		function onSuccess(response) {
			//constants.constant('b5Suggestions', response.data);
			//console.log(response.data)
			//data.name = name;
			if (facet) {
				//console.log('data[name][facet] - (writing into data): ');

				data[language][name][facet] = response.data;
				//console.log(temp);
				//console.log(data);
			} else if (language) {
				data[language][name] = response.data;
				//console.log('tooltips: ');
				//console.log(data.tooltips);
				
				//debug
				//if (language == 'en' && name == 'Relationship') {
					//add medium-high/low
					processPerspective([], null, processRoles, processRole, populateMediumToGeneral, language, name);
					//format (fit to page)
					formatPerspective([], null, formatRoles, addRole, language, name);
				//}
				
			} else {
				data[name] = response.data;
			}
			//data = response.data
			//constants.constant('b5test', response.data);
			//constants.constant('b5test', 'test');			
		}
		
		function onError(data) {
			console.log(data);
		}
		
		//return data
	};
	
	//not used 
	this.initPopulateMedium = function() {
		console.log('----------initPopulateMedium');
		processObjects([], null, processRoles, processRole, populateMediumToGeneral);
	};
	
	//not used
	this.initFormatData = function() {
		console.log('--------------initFormatData');
		processFormats([], null, formatRoles, addRole);
	};
	


// works but problem with resolve 

	this.$get = function($q, $timeout) {
			return {
				getData: function(name, facet) {					
					
					console.log('am i here');
					console.log('data: ', data);
					console.log('name, facet: ', name, facet);
					console.log('language: ', language);
					console.log('data[language]: ', data[language]);
					console.log('data[language][name]: ', data[language][name]);
					//console.log('data[language][name][facet]: ', data[language][name][facet])
					if (initDataCompleted) {
						console.log('yes data completed');
					} else {
						console.log('data not yet completed');
					}
					
					
					//generating data: use once only
					
					//console.log('debug: new structure');
					//console.log(data);
					
					//structure = getStructure(data.sampleTree);
					//console.log(structure);
					//console.log(JSON.stringify(structure));
					
					//populateGeneral(data.tooltips, data.Relationship);
					//console.log('new b5info (Relationship): ');
					//console.log(data.Relationship);
					
					
					//console.log(JSON.stringify(toObject(data.Relationship)));
					
					// *** adding details config to json ***
					var arr = [{
						perspectiveDetails: {
								'Love': 'true'
						}
					},		
					{
						facetDetails: {
							'Love': 'true'
						}	
						
					}];
					
					var object = {
						viewDetails: {
							'Love': 'true'
						}
					}
					
					//addObjects(arr, object, addDetailsConfig);
					//console.log(data.en.Relationship);
					//console.log(JSON.stringify(data.en['Self-Improvement']));
					//console.log(JSON.stringify(data.es));
					
					
					//*** copy summary ***
					//copySummary();
					
					if (facet) {
						//console.log('data[name][facet] - reading from data: ');
						//console.log(name);
						//console.log(facet);
						//console.log(data[language][name][facet]);
						//console.log(data);
						return data[language][name][facet];
					} else if (name) {
						return data[name];
					} else {
						return data;
					}
				},
		
				getDataPromise: function(name, facet) {
					
					console.log('----------');
					console.log('getDataPromise');
					
					var deferred = $q.defer();
					var res = {};
					
					console.log('this: ' , this);
					
					var result;
					
					console.log('result: ', result);
					
					//this could be {} when initializing... 
					if (initDataCompleted) {
						result = this.getData(name,facet);
						console.log('am i here? result: ', result);
						res.data = result;
						deferred.resolve(res);
					} else {
						// promise approach... 
						//dirty approach using timeout...(?)
						$timeout(function() {
							console.log('am i here?');
							res.data = this.getData(name,facet);
							deferred.resolve(res);
						}.bind(this), dirtyPromise);
					}
					return deferred.promise;
				},
				
				setLanguage: function(detectedLanguage) {
					language = detectedLanguage;
					//$translate.use(language);
				},
				
				getLanguage: function() {
					return language;
				},
				
				formatData: function() {
					processFormats([], null, formatRoles, addRole);
					//console.log('calling test format: ');
					//console.log(data.en.Relationship);
				},
				
				//takes a info (at a particular score) and return an array of formated pages 
					//not used, use formatData instead(?)
					//used by controller calling directly 
				formatInfo: function(info) {
					return fitToPage(info);
				},
				
				copyFormat: function() {
					addObjects([], null, processRoles, copyNewRoles);
					//console.log(data.en.Relationship);
				},
				
				getLanguageName: function(language) {
					return data.languageNames[language];
				},
				
				addView: function(newView) {
					//need to provide a dummy func as 2nd func, anything will do
					
					//if new view is not provided or null is provided, then use hardcoded var
					if (newView == null || newView == undefined) {
						console.log('did you call me? 1');
						addObjects([], businessView, addView, copyNewRoles);
					} else {
						console.log('did you call me? 2');
						addObjects([], newView, addView, copyNewRoles);
					}
				},
				
				populateMedium: function() {
					processObjects([], null, processRoles, processRole, populateMediumToGeneral);
				}
				
				// should put in service instead??? 
				//setReport: function(person, piTree) ... moved to services ...							
				
			}
	}

})


constants.config (function(InitFileProvider) {
	
	//loadFiles();
	
	//device test 
		//var dev = {};
		//hardcoding platform for now
		
		ionic.Platform.ready(function() {
			if (ionic.Platform.isIPad() || ionic.Platform.isIOS()) {
				dev.platform = 'ios';
			} else if (ionic.Platform.isAndroid()) {
				dev.platform = 'andriod';
			} else {
				var error = new Error();
				error.name = 'UnSupported';
				error.message = 'Your phone is not supported'
				throw error;
			}
			console.log('platform ready, device: ', dev);
			loadFiles();
		})
			
	
	

	//InitFileProvider.initData('facets', 'info/suggestion/facets.json');
	
	//do not need below any more since now only 1 file for all traits/facets
	/*
	initDataDir('Relationship', facets, 'info/suggestion/b5/relationship');
	initDataDir('Approaching', facets, 'info/suggestion/b5/approaching');
	initDataDir('Self-Perspective', facets, 'info/suggestion/b5/self-perspective');	
	*/
	
	//moved to platform.ready 
	//console.log('who run first? constants.config, loading files...');
	//loadFiles();
	
	//InitFileProvider.initData('Relationship', 'info/suggestion/relationship/traits.json');
	//InitFileProvider.initData('Approaching', 'info/suggestion/approaching/traits.json');
	//InitFileProvider.initData('Improvement', 'info/suggestion/self-perspective/traits.json');	
	
	//InitFileProvider.initData('b5Self-Perspective', 'info/suggestion/b5-Self-Perspective.json');	
	//InitFileProvider.initData(null,'sampleTree', 'data/sample-tree.json');
	//InitFileProvider.initData('tooltips', 'info/suggestion/b5/temp/tooltips.json');
	
	
	//InitFileProvider.initData('b5-TargetRelation', 'info/suggestion/B5-TargetRelationshipHigh.json');
	
	//below not used any more - done in initData from loadFiles 
	//InitFileProvider.initPopulateMedium();
	//InitFileProvider.initFormatData();
	
	
	
	function loadFiles () {
		var language;
		for (i=0; i <= languages.length; i++) {
			
			if (i == languages.length) {
				//singal initDataCompleted
				console.log('initDataCompleted!');
				initDataCompleted = true;
				console.log('data[language]', data.en);
				console.log('data[language][name]', data.en['Traits-Summary']);
				return;
			}
			
			language = languages[i];
			
			//addition: also load the traits-summary/info which is not specific to perspective (perspective independent) 
			InitFileProvider.initData(language, 'Traits-Summary', 'info/suggestion/' +language + '/Traits-Summary.json');			
			
			var perspective;
			
			for (j=0; j< perspectives.length; j++) {
				perspective = perspectives[j];
				InitFileProvider.initData(language, perspective, 'info/suggestion/'+language+'/' + perspective + '/traits.json');
				//console.log('info/suggestion/'+language+'/' + perspective + '/traits.json');
			}
			
		}
		
	}
	
	// dir read
	function initDataDir (name, files, dirUrl) {
		
		var facetName;
		for (i = 0; i < files.length; i++) {
			//console.log('i: ');
			//console.log(i);
			facetName = files[i];
			//InitFileProvider.initDataArray(name, files[i], dirUrl+'/'+files[i]+'.json');
			InitFileProvider.initData(name,  dirUrl+'/'+files[i]+'.json' , files[i])
		}
		//return data
	}
});


constants.service('Initilization', function(language) {

	//only need to initialize if not the default language
	if (language != 'es') {
		facets = ["Agradabilidad", "Conciencia", "La introversión-extraversión", "neuroticismo", "apertura", "Needs", "Valores"]
	}	
	
});



