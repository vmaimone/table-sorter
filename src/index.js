import Sortable from './lib/Sortable';
import SortKey from './lib/SortKey';

const app = angular
  .module('Sorter',[])
  .directive('sortable', Sortable.factory)
  .directive('sortKey', SortKey.factory)

export default app.name;
