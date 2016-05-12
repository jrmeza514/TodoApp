(() => {
  /*
    Define Todo App Module
  */
  const app = angular.module('todoApp' , [] );

  app.controller('TodoAppController', ['$scope', ( $scope ) => {
    /*
      Define the cahced todo list, localStorage key and count
    */
    $scope.todos = [];
    $scope.todoLocalStorageKey = "TODO";
    $scope.todoLocalStorageCount = 0;

    $scope.saveTodos = () => {
      /*
        Clear any existing todos from localStorage
      */
      localStorage.clear();
      /*
        Iterate through all cached  Instances of the Todo Class
      */
      for( let i = 0; i < $scope.todos.length; i++){
        let todo = $scope.todos[i];
        /*
          Save the Object as a Json String
        */
        localStorage.setItem( $scope.todoLocalStorageKey + ( i + 1 )  , JSON.stringify( todo ) );
      }
      /*
        Upated the localStorage count of todos
      */
      localStorage.setItem( $scope.todoLocalStorageKey , $scope.todos.length );
      /*
        update cached value of todoLocalStorageCount
      */
      $scope.todoLocalStorageCount = $scope.todos.length;

      /*
        return the full array of saved values
      */
      return $scope.todos;
    };

    $scope.loadTodos = () => {
      /*
        Empty the Array
      */
      $scope.todos = [];

      /*
        Get the Freshest number of localSorage Todos
      */
      $scope.todoLocalStorageCount = localStorage.getItem( $scope.todoLocalStorageKey ) || 0;
      /*
        Iterate through all the todos in localSorage
      */
      for (let i = 0; i < $scope.todoLocalStorageCount; i++) {
        /*
          Get JSON Srting for Object
        */
        let json = localStorage.getItem( $scope.todoLocalStorageKey + ( i + 1 ) );
        /*
          Parse and Process Json
        */
        let obj = JSON.parse( json );
        let title = obj.title;
        let content = obj.content;
        let completed = obj.completed;
        let timestamp = obj.timestamp;

        /*
          Create New Instance of the Todo Object
        */
        let todo = new Todo( title , content );
        todo.setCompleted( completed );
        todo.setTimestamp( timestamp );
        todo.remove = () => {
          $scope.removeTodo( i );
          console.log(i);
        };
        /*
          Set its value at the proper index
        */
        $scope.todos[i] = todo;
      }

      return $scope.todos;
    };

    $scope.addTodo = ( title , content ) => {
      /*
        Create new Instance of the Todo class
      */
      var todo = new Todo( title , content );
      todo.setCompleted( false );
      todo.setTimestamp( Date.now() );
      /*
        Add the Todo Object to the $scope todos array
      */
      $scope.todos.unshift( todo );
      /*
        Save all the cached todos to the localStorage object
      */
      $scope.saveTodos();
      /*
        return the added todo
      */
      $scope.loadTodos();
      return todo;
    };

    $scope.removeTodo = ( index ) => {
      $scope.todos.splice( index , 1 );
      $scope.saveTodos();
      $scope.loadTodos();
    };
    if( localStorage.getItem( $scope.todoLocalStorageKey ) ){
      $scope.loadTodos();
    }
  }]);

  app.controller('NewTodoController', ['$scope', ( $scope ) => {
    $scope.newTodo = {
      title: '',
      content: '',
      completed: false
    };
  }]);

})();
