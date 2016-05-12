(() => {
  const app = angular.module('todoApp');

  app.controller('TodoElementController', ['$scope', ( $scope ) =>{
    $scope.complete = () => {
      const isCompleted  = $scope.todo.isCompleted();
      $scope.todo.setCompleted(!isCompleted);
      $scope.save();
    };
  }]);


  app.directive('todoItem', [ () => {
    return {
      restric: 'E',
      templateUrl: 'templates/todo-item/index.html',
      controller: 'TodoElementController',
      controllerAs: 'todo',
      scope: {
        todo: '=',
        save: '='
      }
    };
  }]);
})();
