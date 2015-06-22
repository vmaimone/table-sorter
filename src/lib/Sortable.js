class Sortable {
  static factory() {
    return new Sortable();
  }

  constructor() {
    this.restrict = 'A';
    this.scope = { sortObj: '=' }
    this.controllerAs ='sorter',
    this.bindToController = true;
  }

  controller() {
    this.sortReverse = false;
    this.secondarySort = false;
    // Second level of sorting
    this.secondaryReverse = false;
  }

  link(scope,el,attr,sorter) {
    var tableHeaders = el.find('th');
    var isSortable = function(e) { return e.hasAttribute('sort-key') }
    sorter.tableHeaders = [].filter.call(tableHeaders, isSortable);
  }
}


export default Sortable;
