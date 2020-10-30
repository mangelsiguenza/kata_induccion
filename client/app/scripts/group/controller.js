'use strict';

angular.module('Group')
.controller('group', function ($scope) {

  $scope.controller_loaded = 'Group loaded!';

  function teamBuilding (team, array) {
    var temp= [];
    var aux = 0;

    array.map(function(item) {
      temp[item] = (temp[item] || 0) + 1;
    });

    temp.map( function (item) {
      team.push({candidate: parseInt(Object.keys(temp)[aux]), repeated: item });
      aux++;
    });

    return team;
  }

  $scope.groupSelection = function(input) {
    var stockholmPeople = [];
    var tempStockholmPeople = [];
    var londonPeople = [];
    var tempLondonPeople = [];
    var team = [];
    var inputArray = [];
    try {
      inputArray = JSON.parse(input);
    } catch (e) {
      return 'error';
    }

    inputArray.map(function(item) {tempStockholmPeople.push(item[0]);});
    inputArray.map(function(item) {tempLondonPeople.push(item[1]);});
    stockholmPeople = teamBuilding(stockholmPeople, tempStockholmPeople);
    londonPeople = teamBuilding(londonPeople, tempLondonPeople);

    inputArray.map(function(item) {
      var tempStockholm, tempLondon;
      tempStockholm = find(stockholmPeople, item[0]);
      tempLondon = find(londonPeople, item[1]);

      if (tempStockholm.repeated > tempLondon.repeated) {
        team.push(tempStockholm.candidate);
      } else {
        team.push(tempLondon.candidate);
      }
    });

    var selected = deleteRepeats(team).sort();

    if (selected.length > 3 ) {
      var length = selected.length -1;
      var checkSelection= [];

      selected.map( function (item) {
        var count = 0;
        var indice = item < 2000 ? 0 : 1;
        var deleteElement = selected.filter(function(value) { return value !== item; });

        deleteElement.map(function (it) {
          inputArray.map(function(element) {
            if (item === element[indice] &&  element[indice === 1 ? 0 : 1] === it) {
              count ++;
            }
          });
        });
        if (count !== length ) {
          checkSelection.push(item);
        }
        selected = deleteRepeats(checkSelection);
      });
    }

    $scope.selectedPeople = selected;
    return selected;
  };

  function find (array, candidate) {
    var temp;
    array.map(function(item) {
      if (candidate === item.candidate) {
        temp = item;
      }
    });
    return temp;
  }

  function deleteRepeats (candidate) {
    var array = candidate.filter(function(item, index, array) {
      return array.indexOf(item) === index;
    });
    return array;
  }
})
.config(function ($routeProvider) {
  $routeProvider
  .when('/group', {
    templateUrl: 'scripts/group/views/group.html',
    controller: 'group'
  });

});
