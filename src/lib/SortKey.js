class SortKey {
  static factory() {
    return new SortKey();
  }

  constructor() {
    this.restrict = 'A';
    this.require = '^sortable';
    this.scope = { sortKey: '@' };
  }



  link($scope,$element,$attrs,sortable) {

      // the 'this' object from this directive's controller
      // var scope = $scope.SortKeyCtrl;
      // debugger;
      // set some css so the users know the header is clickable
      $element.css('cursor','pointer')

      // Handle sorting (ctrl+click to activate second level sort)
      $element.on('click', function(event) {
          var col = $scope.sortKey;

          if (event.ctrlKey || event.shiftKey) {
              sortable.secondarySortCol = sortable.secondaryReverse ? '-' + col : col;
              sortable.secondaryReverse = !sortable.secondaryReverse
          } else {
              sortable.sortCol = sortable.sortReverse ? '-' + col : col;
              sortable.sortReverse = !sortable.sortReverse
          }

          // set the sort-obj that the view model uses
          sortable.sortObj = [sortable.sortCol, sortable.secondarySortCol];
          // manually apply the changes
          $scope.$apply();

      });

    }
}

export default SortKey;
