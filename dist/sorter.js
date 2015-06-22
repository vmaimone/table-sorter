
'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var Sortable = (function () {
  function Sortable() {
    _classCallCheck(this, Sortable);

    this.restrict = 'A';
    this.scope = { sortObj: '=' };
    this.controllerAs = 'sorter', this.bindToController = true;
  }

  _createClass(Sortable, [{
    key: 'controller',
    value: function controller() {
      this.sortReverse = false;
      this.secondarySort = false;
      // Second level of sorting
      this.secondaryReverse = false;
    }
  }, {
    key: 'link',
    value: function link(scope, el, attr, sorter) {
      var tableHeaders = el.find('th');
      var isSortable = function isSortable(e) {
        return e.hasAttribute('sort-key');
      };
      sorter.tableHeaders = [].filter.call(tableHeaders, isSortable);
    }
  }], [{
    key: 'factory',
    value: function factory() {
      return new Sortable();
    }
  }]);

  return Sortable;
})();
'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var SortKey = (function () {
  function SortKey() {
    _classCallCheck(this, SortKey);

    this.restrict = 'A';
    this.require = '^sortable';
    this.scope = { sortKey: '@' };
  }

  _createClass(SortKey, [{
    key: 'link',
    value: function link($scope, $element, $attrs, sortable) {

      // the 'this' object from this directive's controller
      // var scope = $scope.SortKeyCtrl;
      // debugger;
      // set some css so the users know the header is clickable
      $element.css('cursor', 'pointer');

      // Handle sorting (ctrl+click to activate second level sort)
      $element.on('click', function (event) {
        var col = $scope.sortKey;

        if (event.ctrlKey || event.shiftKey) {
          sortable.secondarySortCol = sortable.secondaryReverse ? '-' + col : col;
          sortable.secondaryReverse = !sortable.secondaryReverse;
        } else {
          sortable.sortCol = sortable.sortReverse ? '-' + col : col;
          sortable.sortReverse = !sortable.sortReverse;
        }

        // set the sort-obj that the view model uses
        sortable.sortObj = [sortable.sortCol, sortable.secondarySortCol];
        // manually apply the changes
        $scope.$apply();
      });
    }
  }], [{
    key: 'factory',
    value: function factory() {
      return new SortKey();
    }
  }]);

  return SortKey;
})();



'use strict';

var app = angular.module('Sorter', []).directive('sortable', Sortable.factory).directive('sortKey', SortKey.factory);
