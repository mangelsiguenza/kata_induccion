'use strict';

describe('Controller: select group', function () {

  beforeEach(module('Group'));

  var controller;
  var scope;

  beforeEach(inject(function ($rootScope, $controller) {
    scope = $rootScope.$new();
    controller = $controller('group', { $scope: scope });
  }));

  describe('On instance', function () {
    it('should set "controller_loaded" variable in scope', function () {
      expect(scope.controller_loaded).toContain('loaded');
    });
  });

  describe('when to press groupSelection', function () {
    it('should give error when not correctly entering the structure', function () {
      var result = scope.groupSelection('[[1009, 2000]');
      expect(result).toBe('error');
    });

    it('should give error when not entering text', function () {
      var result = scope.groupSelection([[1009, 2000]]);
      expect(result).toBe('error');
    });

    it('should return an array with a person Stockholm', function () {
      var result = scope.groupSelection('[[1009, 2001], [1009, 2000]]');
      expect(result).toEqual([1009]);
    });

    it('should return an array with a person london', function () {
      var result = scope.groupSelection('[[1009, 2000]]');
      expect(result).toEqual([2000]);
    });

    it('should return an array when more paired, medium', function () {
      var result = scope.groupSelection('[[1009, 2000], [1009, 2001],[1008, 2000]]');
      expect(result).toEqual([1009, 2000]);
    });

    it('should return an array when more paired, hard case 1', function () {
      var result = scope.groupSelection('[[1001, 2001], [1002, 2001],[1002, 2002],[1003, 2002],[1003, 2002]]');
      expect(result).toEqual([2001, 2002]);
    });

    it('should return an array when more paired, hard  case 2', function () {
      var result = scope.groupSelection('[[1004,2001],[1002,2001],[1004,2003],[1002,2001],[1004,2004]]');
      expect(result).toEqual([1004, 2001]);
    });

    it('should return an array when more paired, hard  case 3', function () {
      var result = scope.groupSelection('[[1001, 2001], [1002, 2001], [1001, 2001], [1003, 2002], [1001, 2003], [1004, 2003],[1001, 2004],[1005, 2004]]');
      expect(result).toEqual([2001, 2002, 2003, 2004]);
    });

  });

  describe('when going to /group', function () {

    var route, location, rootScope, httpBackend;

    beforeEach(inject(function ($route, $location, $rootScope, $httpBackend) {
      route = $route;
      location = $location;
      rootScope = $rootScope;
      httpBackend = $httpBackend;

      httpBackend.when('GET', 'scripts/group/views/group.html').respond('<div></div>');
    }));

    afterEach(function () {
      httpBackend.verifyNoOutstandingExpectation();
      httpBackend.verifyNoOutstandingRequest();
    });

    it('should use minesweeper.html and controller', function () {
      expect(route.current).toBeUndefined();

      location.path('/group');

      httpBackend.flush();

      expect(route.current.templateUrl).toBe('scripts/group/views/group.html');
      expect(route.current.controller).toBe('group');
    });
  });

});
