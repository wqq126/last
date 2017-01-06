angular.module('starter.controllers', [])

.controller('NewListCtrl', ['$stateParams', '$scope', 'headService', function($stateParams, $scope, headService) {
	var id = $stateParams.id || 'T1348654204705';
	headService.getLists(id).then(function(res) {
		$scope.items = res.data[id];
	})
	$scope.loadMore = function() {
		var promise = headService.getNext(id);
		if(promise) {
			promise.then(function(res) {
				var items = res.data[id];
				$scope.items = $scope.items.concat(items);
				$scope.$broadcast('scroll.infiniteScrollComplete');
				headService.setReqState(false);
			})
		}
	}
	$scope.doRefresh = function() {
		var promise = headService.Refresh(id);
		if(promise) {
			promise.then(function(res) {
				var items = res.data[id];
				$scope.items = items;
				$scope.$broadcast('scroll.refreshComplete');
				headService.setReqState(false);
			})
		}

	}
	$scope.dialog = false;
	$scope.btnHtml = '不想看';
	$scope.isPause2 = false;
	$scope.delBrn = function($event, item) {
		$scope.dosee = false;
		$event.preventDefault();
		$scope.idx = $scope.items.indexOf(item);
		$scope.source = item.source;
		$scope.dialog = true;
	}
	$scope.shoeOk = function($event) {
		if(!$scope.dosee) {
			$scope.btnHtml = '确定';
			$scope.dosee = true
		} else {
			$scope.items.splice($scope.idx, 1);
			$scope.dialog = false;
			$scope.btnHtml = '不想看';
			$scope.dosee = false;
		}
	}

}])

//新闻详情控制器
.controller('newsDetail', ['$scope', 'headService', '$stateParams', function($scope, headService, $stateParams) {
		var id = $stateParams.id;
		headService.getDetail(id).then(function(res) {
			$scope.news = res.data[id];
			var REG_img = '<!--IMG#(.*?)?-->';
			var regExpression = new RegExp(REG_img, 'mg');

			$scope.bodys = res.data[id].body.replace(regExpression, function(a, b) {
				for(var i = 0; i < res.data[id].img.length; i++) {
					if(i == b) {
						b = res.data[id].img[i].src;
					}
				}
				return '<img src =' + b + '>';
			})
			if(res.data[id].title != '您的客户端版本需要升级') {
				$scope.morereply = true;
			}
		})
	}])
	//直播控制器
	.controller('liveCtrl', ['liveService', '$scope', function(liveService, $scope) {
		liveService.getfirst().then(function(res) {
			$scope.items = res.data.live_review;
			$scope.tops = res.data.top;
			$scope.subs = res.data.sublives;
		})
		$scope.loadMore = function() {
			var promise = liveService.getNext();
			if(promise) {
				promise.then(function(res) {
					var more = res.data.live_review;
					if($scope.items) {
						$scope.items = $scope.items.concat(more);
						$scope.$broadcast('scroll.infiniteScrollComplete');
					}
				})
			}
		}
	}])
	.controller('liveDetail', ['liveService', '$scope', '$stateParams', function(liveService, $scope, $stateParams) {
		var id = $stateParams.id;
		liveService.getDetail(id).then(function(res) {
			$scope.items = res.data.last_log;

		})
	}])
	//话题控制器
	.controller('topicCtrl', ['topicService', '$scope', function(topicService, $scope) {
		$scope.wenba = true;

		topicService.getLists().then(function(res) {
			$scope.items = res.data.data.expertList;
		})
		$scope.topwebba = function() {
			topicService.getLists().then(function(res) {
				$scope.items = res.data.data.expertList;
				$scope.wenba = true;
			})

		}
		$scope.totopic = function() {
			topicService.gettoplist().then(function(res) {
				$scope.topics = res.data.data.subjectList;
				$scope.wenba = false;
			})
		}
		$scope.loadMore = function() {
			if($scope.wenba) {
				var promise = topicService.getNext();
				if(promise){
					promise.then(function(res){
						var more = res.data.data.expertList;
					$scope.items = $scope.items.concat(more);
					$scope.$broadcast('scroll.infiniteScrollComplete');
					})
				}else{
					$scope.$broadcast('scroll.infiniteScrollComplete');
				}
			}else{
				var promise = topicService.getNexttop();
				if(promise){
					promise.then(function(res){
						var more = res.data.data.subjectList;
						$scope.topics = $scope.topics.concat(more);
						$scope.$broadcast('scroll.infiniteScrollComplete');
					})
				}else{
					$scope.$broadcast('scroll.infiniteScrollComplete');
				}
			}
		}
	}])
	//话题详情
	.controller('topicDetailCtrl', ['topicDetailService', '$scope', '$stateParams', function(topicDetailService, $scope, $stateParams) {
		var id = $stateParams.id;
		topicDetailService.getDetail(id).then(function(res) {
			$scope.expert = res.data.data.expert;
			$scope.description = $scope.expert.description;
			$scope.items = res.data.data.hotList;
			$scope.hots = res.data.data.hotList;
			$scope.lates = res.data.data.latestList;
			$scope.description = $scope.description.substring(0, 25);
		})
		$scope.ishot = true;
		
		$scope.isHot = function() {
			$scope.hots = $scope.items;
			$scope.lating = false;
		}
		$scope.islate = function() {
			$scope.hots = $scope.lates;
			$scope.lating = true;
		}
		$scope.filter = false;
		$scope.filterdata = function() {
			if(!$scope.filter) {
				$scope.description = $scope.expert.description;
				$scope.filter = !$scope.filter;
			} else {
				$scope.description = $scope.description.substring(0, 25);
				$scope.filter = !$scope.filter;
			}
		}
		$scope.loadMore = function(){
			if($scope.lating){
				var promise = topicDetailService.lateqa(id);
				if(promise){
					promise.then(function(res){
						var more = res.data.data;
						$scope.hots =$scope.hots.concat(more);			
						$scope.$broadcast('scroll.infiniteScrollComplete');
					})
				}else{
					$scope.$broadcast('scroll.infiniteScrollComplete');
				}
			}else{
				$scope.$broadcast('scroll.infiniteScrollComplete');
			}
		}
	}])