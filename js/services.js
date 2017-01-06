
function headService($http) {
	var offset = 0;
	var size = 10;
	var isRequesting = false;
	this.getLists = function(id) {
		var  url = 'http://c.m.163.com/nc/article/list/'+id+'/'+offset+'-'+size+'.html';
		return $http.get(url);
	}
	this.getNext = function(id) {
		if(!isRequesting) {
			isRequesting = true;
			offset += size;
			return this.getLists(id);
		}
	}
	this.Refresh = function(id) {
		offset = Math.floor(Math.random() * 10 + 1);
		return this.getLists(id);
	}
	this.setReqState = function(state) {
		isRequesting = state;
	}
	this.getDetail = function(id) {
		var url = 'http://c.m.163.com/nc/article/' + id + '/full.html';
		return $http.get(url);
	}
}



function topicService($http) {
	var offset = 0;
	var size = 10;
	var isRequesting = false;
	this.getLists = function(id) {
		var url = "http://c.m.163.com/newstopic/list/expert/6YOR5bee/" + offset + "-" + size + ".html";
		return $http.get(url);
	}
	this.gettoplist = function(){
		var url = 'http://topic.comment.163.com/topic/list/subject/'+offset+'-'+size+'.html';
		return $http.get(url);
	}
	this.getNexttop = function(){
		offset += size;
		return this.gettoplist();
	}
	this.getNext = function(id) {
		if(!isRequesting) {
			isRequesting = true;
			offset += size;
			return this.getLists(id);
		}
	}
	this.Refresh = function(id) {
		offset = Math.floor(Math.random() * 10 + 1);
		return this.getLists(id);
	}
	this.setReqState = function(state) {
		isRequesting = state;
	}
	this.getDetail = function(id) {
		var url = 'http://c.m.163.com/nc/article/' + id + '/full.html';
		return $http.get(url);
	}
	
}

angular.module('starter.services', [])
.service('headService',headService)
//头部列表
	.factory('headList', ['$http', function($http) {
		var service = {
			getHead: function() {
				var url = 'http://c.m.163.com/nc/topicset/ios/subscribe/manage/listspecial.html';
				return $http.get(url);
			}
		}
		return service;
	}])
	//跟帖
	.service('commentService', ['$http', function($http) {
		var offset = 0,
			size = 10;
		this.getComment = function(id) {
			var url = 'http://comment.api.163.com/api/v1/products/a2869674571f77b5a0867c3d71db5856/threads/' + id + '/app/comments/newList?format=building&headLimit=3&ibc=newsappios&limit=' +
				size + '&offset=' + offset + '&showLevelThreshold=5&tailLimit=2';
			return $http.get(url);
		}
		this.getNext = function(id){
			size = size+10;
			return this.getComment(id);
		}
	}])
	//直播
	.service('liveService',['$http',function($http){
		var page = 2;
		this.getfirst = function(){
			var url = 'http://data.live.126.net/livechannel/previewlist/1.json';
			return $http.get(url);
		}
		this.getNext = function(){
			var url = 'http://data.live.126.net/livechannel/previewlist/' + page + '.json';
			page = page +1;
			return $http.get(url);
		}
		this.getDetail = function(id){
			var url = 'http://data.chat.126.net/route_room?topicid='+id;
			return $http.get(url);
		}
	}])
	//话题
	.service('topicService',topicService)
	.service('topicDetailService',['$http',function($http){
		this.getDetail = function(id){
			var  url = 'http://c.m.163.com/newstopic/qa/'+id+'.html';
			return $http.get(url);
		}
		var offset = 0;
		var size =10;
		this.lateqa = function(id){
		offset += size;
		var  url = 'http://c.m.163.com/newstopic/list/latestqa/'+id+'/'+offset+'-'+size+'.html';
		return $http.get(url);
	}
	}])
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
.factory('Chats', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var chats = [{
    id: 0,
    name: 'Ben Sparrow',
    lastText: 'You on your way?',
    face: 'img/ben.png'
  }, {
    id: 1,
    name: 'Max Lynx',
    lastText: 'Hey, it\'s me',
    face: 'img/max.png'
  }, {
    id: 2,
    name: 'Adam Bradleyson',
    lastText: 'I should buy a boat',
    face: 'img/adam.jpg'
  }, {
    id: 3,
    name: 'Perry Governor',
    lastText: 'Look at my mukluks!',
    face: 'img/perry.png'
  }, {
    id: 4,
    name: 'Mike Harrington',
    lastText: 'This is wicked good ice cream.',
    face: 'img/mike.png'
  }];

  return {
    all: function() {
      return chats;
    },
    remove: function(chat) {
      chats.splice(chats.indexOf(chat), 1);
    },
    get: function(chatId) {
      for (var i = 0; i < chats.length; i++) {
        if (chats[i].id === parseInt(chatId)) {
          return chats[i];
        }
      }
      return null;
    }
  };
});
