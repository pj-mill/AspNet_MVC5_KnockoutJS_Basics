define(["jquery", "knockout", "text!./json.html"], function ($, ko, JsonTemplate) {

    function Person(params) {
        var self = this;
        self.firstName = params.firstName;
        self.lastName = params.lastName;
        self.age = params.age;
    }

    function Header(title, sortkey) {
        var self = this;
        self.title = title;
        self.sortKey = sortkey;
        self.asc = ko.observable(true);
    }

    function JsonViewModel() {

        self.people = ko.observableArray([]);
        self.peopleBinding = ko.computed(function () { return self.people(); });

        self.headers = ko.observableArray([ new Header('First Name', 'firstName'),
                                            new Header('Last Name', 'lastName'),
                                            new Header('Age', 'age')]);

        self.read = function () {
            $.getJSON("app/pages/json/people.json", function (data) {
                self.people.removeAll();

                $.each(data.people, function (idx, item) {
                    self.people.push(new Person(item));
                });

            });
        };

        self.save = function () {
            // Add another person to the array
            var person = new Person({
                "firstName": "Helen",
                "lastName": "Of Troy",
                "age": 24
            });
            
            self.people.push(person);

            // Convert to json
            var data = ko.toJSON({ people: self.people });
            
            // Write to file
            $.post("home/saveperson", data, function (rv) {
               //self.load();
            });

            //ko.utils.postJson("app/pages/json/people.json", data);

            /*
            $.ajax({
                url: "app/pages/json/people.json",
                dataType: "json",
                headers: { 
                    "Content-Type": "application/json",
                    "X-HTTP-Method-Override": "POST" },
                type: "POST",
                data: data,
                processdata: true,

                success: function (rv) {
                    alert('ok');
                },

                error: function (xhr, textStatus, errorThrown) {
                    alert('error');
                }
            });
            */
        };
    }

    return { viewModel: JsonViewModel, template: JsonTemplate };
});
