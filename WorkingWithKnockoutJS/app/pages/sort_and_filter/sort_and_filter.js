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


        self.headers = ko.observableArray([ new Header('First Name', 'fname'),
                                            new Header('Last Name', 'lname'),
                                            new Header('Age', 'age'),
                                            new Header('Age Group', 'agegroup')]);


        self.sort = function (header, e) {

            var sortKey = header.sortKey;

            switch (sortKey) {
                case 'fname':
                    self.people.sort(function (a, b) {
                        return a.firstName < b.firstName ? -1 : a.firstName > b.firstName ? 1 : 0;
                    });
                    break;
                case 'lname':
                    self.people.sort(function (a, b) {
                        return a.lastName < b.lastName ? -1 : a.lastName > b.lastName ? 1 : 0;
                    });
                    break;
                case 'age':
                    self.people.sort(function (a, b) {
                        return a.age < b.age ? -1 : a.age > b.age ? 1 : 0;
                    });
                    break;
                case 'agegroup':
                    self.people.sort(function (a, b) {
                        return a.ageGroup < b.ageGroup ? -1 : a.ageGroup > b.ageGroup ? 1 : 0;
                    });
                    break;
            };
        };

        return self;
    }

    return { viewModel: SortFilterViewModel ,template: SortFilterTemplate };
});
