angular.module('starter')
.directive('isSelect',function(){
	return {
		restrict:'C',
		link:function(scope,ele,attr){
			ele.on('click',function(){
				var isSelect = $(this).hasClass("glyphicon-pause");
				if(isSelect){
					$(this).removeClass("glyphicon-pause");
				}else{
					$(this).addClass("glyphicon-pause");
				}
			})
		}
	}
})

.directive('moreBtn',function(){
	return {
		restrict:'C',
		link:function(scope,ele,attr){
			scope.filteralldescription = scope.description;
//			console.log(alldescription)
			
			ele.on('click',function(){
				var isSelect = $(this).hasClass("ion-chevron-up");
				if(isSelect){
					$(this).removeClass("ion-chevron-up");
					$(this).addClass("ion-chevron-down");
				}else{
					$(this).removeClass("ion-chevron-down")
					$(this).addClass("ion-chevron-up");
				}
			})
		}
	}
})
.directive('changeList',function(){
	return {
		restrict:'C',
		link:function(scope,ele,attr){
			ele.on('click',function(){
				$(this).siblings().removeClass("hotandlate");
				$(this).addClass("hotandlate");
			})
		}
	}
})
.directive('navBar', ['headList', '$state', function(headList, $state) {
		return {
			restrict: 'CE',
			templateUrl: 'templates/navBar.html',
			link: function(scope, ele, attr) {
				headList.getHead().then(function(res) {
					scope.headerList = res.data.tList;
//					console.log(res.data.tList)
				});
				ele.on('click touch', 'a', function(e) {
					var a = e.target;
					$('.navbar a').removeClass('checked')
					$(this).addClass('checked');
					var navBar = $(ele).find('.navbar');
					var rect = a.getBoundingClientRect();
					var nvaBarEle = $(ele).find('.navbar');
					var left = nvaBarEle[0].offsetLeft - 1 * (rect.left - window.innerWidth / 2);
					if(left > 0) {
						left = 0;
					}
					navBar.css({
						left: left + 'px',
					});

				})

			}

		}
	}])


.directive('commentList', function() {
		return {
			restrict: 'EC',
			controller: function($stateParams, commentService, $scope, $state) {
				var replyId = $stateParams.id;
				commentService.getComment(replyId).then(function(data) {
					$scope.commentIds = data.data.commentIds;
					$scope.comments = data.data.comments;
					$scope.data = data.data;
//					console.log(typeof $scope.commentIds)
				});
				$scope.loadMore = function() {
					var promise = commentService.getNext(replyId);
					if(promise) {
						promise.then(function(res) {
							$scope.commentIds  = res.data.commentIds;
							$scope.comments = res.data.comments;
							$scope.data = res.data;
							
//							$scope.commentIds = angular.extend($scope.commentIds,commentIds);
//							$scope.comments = angular.extend($scope.comments,comments);
//							$scope.data = angular.extend($scope.data,data);
//							console.log($scope.commentIds)
							$scope.$broadcast('scroll.infiniteScrollComplete');
						})
					}
					$scope.$broadcast('scroll.infiniteScrollComplete');
//					commentService.setReqState(false);
				}
			},
			link: function(scope, ele, attr) {
				ele.on('scroll', function() {
					var bheight = $(ele).height();
					console.log(bheight);
					//				获取滚动条的高度
					var sheight = $(ele)[0].scrollHeight;
					//滚动条距离顶部的距离
					var stop = $(ele).scrollTop();
					if(stop >= sheight - bheight - 10) {
						console.log('到底');
						scope.loadMore();
					}
				})
			}
		}
	})
	.directive('comment', function() {
		return {
			scope: {
				data: '='
			},
			transclude: 'element',
			compile: function() {
				return {
					post: function($scope, $element, $attr, ctr, $transclude) {
						var ids = $scope.data.split(',');

						var lastEle;

						angular.forEach(ids, function(val, indx) {
							$transclude(function(clone, scope) {
								scope.id = val;

								if(indx == 0) {
									$element.after(clone);
									lastEle = clone;

								} else {
									scope.comments[val] && lastEle.append(clone);
									lastEle = clone;
								}
							})
						})

					}
				}
			}
		}
	});