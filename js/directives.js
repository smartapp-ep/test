angular.module('ipa.directives', ['ionic'])

//using directive somehow never work! perhaps, wrong event! 
/*
  .directive('noScroll', function($document) {

  return {
    restrict: 'A',
    link: function($scope, $element, $attr) {

		$document.on('touchmove', function(e) {
		//$element.on('touchmove', function(e) {		  
			console.log('touchmove!')
			//if ($element) {
				e.preventDefault();
				//$element.text($element.text + "<div>touchmove!</div>");
				angular.element(document.querySelector('#test2')).text('Scroll!');
			//}	
      });
    }
  }
})





	.directive ('checkscroll', function($document) {
		return {
			restrict: 'A',
			link: function($scope, $element, $attr) {
						$scope.$apply();
				//getParentOrSelfWithClass(element, className)
				 angular.element(document.querySelector('#test2'))
  .text('Ready');
				//$document.on('touchmove', function(e) {
					//element.text("what the hell?");
					//element.append('what?');

				$element.on('touchmove', function(e) {	
					e.preventDefault();
					//$element.append('touchmove!');
					//$console.log('scrolled!');
					angular.element(document.querySelector('#test2')).text('Scroll!');
				});
			},
			template: 'what the heck?'
		}	
	})
	
	
	.directive ('checkscroll2', function($document) {
		return {
			restrict: 'E',

			template: 'what the heck?'
		};	
	})

*/	

//directive works! and once forever! for both work & love tags (or both pages) - loaded only once?
/*
	.directive ('checkscroll3', function($document) {
		return {
			restrict: 'A',
			link: function($scope, $element, $attr) {

				//getParentOrSelfWithClass(element, className)
				 angular.element(document.querySelector('#test3')).text('Ready');
				//$document.on('touchmove', function(e) {
					//element.text("what the hell?");
					//element.append('what?');

				$element.on('dragright', function(e) {	
					e.preventDefault();
					e.stopPropagation();
					//$element.append('touchmove!');
					//$console.log('scrolled!');

					angular.element(document.querySelector('#test3')).text('Scroll!');
				});
			}
			//template: 'what the heck?'
		}	
	})
*/

	.directive ('noscroll', function($document) {
		return {
			restrict: 'A',
			link: function($scope, $element, $attr) {

				//getParentOrSelfWithClass(element, className)
					//angular.element(document.querySelector('#test3')).text('Ready');
				//$document.on('touchmove', function(e) {
					//element.text("what the hell?");
					//element.append('what?');

				$element.on('dragright', function(e) {	
					e.preventDefault();
					e.stopPropagation();
					//$element.append('touchmove!');
					//$console.log('scrolled!');

					angular.element(document.querySelector('#test3')).text('Scroll!');
				});
			}
			//template: 'what the heck?'
		}	
	})
	
;