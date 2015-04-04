angular.module('Sortable',[])
  .directive('sortable', function() {
    return {
      restrict: 'A',
      scope: { sortObj: '=' },
      controllerAs: 'SortCtrl',
      bindToController: true,
      controller: function() {
        // First level of sorting
        this.sortReverse = false;
        this.secondarySort = false;
        // Second level of sorting
        this.secondaryReverse = false;
      }
    }
  })

  .directive('sortKey', function() {
    return {
      restrict: 'A',
      require: '^sortable',
      controllerAs: 'SortKeyCtrl',
      bindToController: true,
      scope: { sortKey: '@' },
      controller: function() { this.sortKey = this.sortKey || ''},
      link: link
    }

    
    function link($scope,$element,$attrs,SortCtrl) {

      // the 'this' object from this directive's controller
      var scope = $scope.SortKeyCtrl 

      // Handle sorting (ctrl+click to activate second level sort)
      $element.on('click', function(event) {
          var col = scope.sortKey;
          if (event.ctrlKey || event.shiftKey) {
              SortCtrl.secondarySortCol = SortCtrl.secondaryReverse ? '-' + col : col;
              SortCtrl.secondaryReverse = !SortCtrl.secondaryReverse
          } else {
              SortCtrl.sortCol = SortCtrl.sortReverse ? '-' + col : col;
              SortCtrl.sortReverse = !SortCtrl.sortReverse
          }

          // set the sort-obj that the view model uses
          SortCtrl.sortObj = [SortCtrl.sortCol, SortCtrl.secondarySortCol];
          // manually apply the changes
          $scope.$apply();
      });

    }


  })
