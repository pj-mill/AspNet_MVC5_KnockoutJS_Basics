define(["knockout", "text!./sort_and_filter.html"], function (ko, SortFilterTemplate) {

    function Person(firstname, lastname, age) {
        var self = this;
        self.firstName = firstname;
        self.lastName = lastname;
        self.age = age;
        self.ageGroup = (age < 12) ? 'Child' : (age > 12 && age < 20) ? 'Teenager' : 'Adult';
    }

    function Header(title, sortkey) {
        var self = this;
        self.title = title;
        self.sortKey = sortkey;
        self.asc = ko.observable(true);
    }

    function SortFilterViewModel() {
        var self = this;

        self.people = ko.observableArray([  new Person('Peter', 'Murphy', 48),
                                            new Person('James', 'Murphy', 10),
                                            new Person('Susan', 'Kavanagh', 17),
                                            new Person('Jeremy', 'Keene', 18),
                                            new Person('Megan', 'Murphy', 20),
                                            new Person('James', 'Kavanagh', 13),
                                            new Person('Martha', 'Murphy', 8),
                                            new Person('Paul', 'Murphy', 34)]);


        self.headers = ko.observableArray([new Header('First Name', 'firstName'),
                                            new Header('Last Name', 'lastName'),
                                            new Header('Age', 'age'),
                                            new Header('Age Group', 'ageGroup')]);


        self.filters = ko.observableArray([{ title: 'Show All', filter: '' },
                                            { title: 'Children', filter: 'Child' },
                                            { title: 'Teenagers', filter: 'Teenager' },
                                            { title: 'Adults', filter: 'Adult' }]);


        /*****************************************************************************************/
        // FILTERING MEMBERS
        /*****************************************************************************************/
        self.currentFilter = ko.observable('');

        self.filteredPeople = ko.computed(function () {
            if (self.currentFilter() == '') {
                return self.people();
            }
            else {
                
                var matchingItems = [];
                var counter = self.people().length;
                for (var i = 0 ; i < counter ; i++) {
                    var currentItem = self.people()[i];
                    if (currentItem.ageGroup == self.currentFilter()) {
                        matchingItems.push(currentItem);
                    }
                }
                return matchingItems;
            }            
        },this);


        /*****************************************************************************************/
        // SORTING MEMBERS
        /*****************************************************************************************/
        self.currrentHeader = self.headers[0]; //set the default sort

        self.sort = function (header, e) {
            //if this header was just clicked a second time
            if (self.currrentHeader === header) {
                header.asc = !header.asc; //toggle the direction of the sort
            } else {
                self.currrentHeader = header; //first click, remember it
            }

            // Get the sort key field (firstname, lastname, etc..)
            var prop = self.currrentHeader.sortKey;

            // Create an ascending and a descending sort function
            var ascSort = function (a, b) { return a[prop] < b[prop] ? -1 : a[prop] > b[prop] ? 1 : 0; };
            var descSort = function (a, b) { return a[prop] > b[prop] ? -1 : a[prop] < b[prop] ? 1 : 0; };

            // Determine which sort algorithm to use
            var sortFunc = self.currrentHeader .asc ? ascSort : descSort;

            self.people.sort(sortFunc);
        };
        
        return self;
    }

    return { viewModel: SortFilterViewModel ,template: SortFilterTemplate };
});
