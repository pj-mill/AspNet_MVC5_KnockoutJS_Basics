define(["knockout", "text!./binding_form.html"],function(ko,bindingFormTemplate){

    function Employee() {

        var self = this;

        self.FirstName = ko.observable("Paul");
        self.LastName = ko.observable("Millar");

        self.FullName = ko.computed(function () {
            return self.FirstName() + " " + self.LastName();
        });

        self.DateOfBirth = ko.observable("21/07/1970");
        self.EducationList = ko.observableArray();
        self.Gender = ko.observable("0");

        self.DepartmentList = ko.observableArray([{ Id: '0', Name: "Computer Science" }, { Id: '1', Name: "Business & Law" }]);
        self.DepartmentList.push({ Id: '2', Name: "Arts & Media" });

        self.DepartmentId = ko.observable("1");
    }

    function bindingFormViewModel(){
        var self = this;

        self.Employee = new Employee();
        self.Message = ko.observable("");

        self.reset = function () {
            self.Employee.FirstName("");
            self.Employee.LastName("");
            self.Employee.DateOfBirth("");
        };

        self.submit = function () {
            var json1 = ko.toJSON(self.Employee);
            $.ajax({
                url: '/Home/SaveEmployee',
                type: 'POST',
                dataType: 'json',
                data: json1,
                contentType: 'application/json; charset=utf-8',
                success: function (data) {
                    // do something with data
                }
            });

            self.Message("Submitted");
            //self.reset();
        };

        // TITLE BINDINGS
        self.Title = ko.observable("Form Binding");

        self.currentPageTitle = ko.computed(function () {
            document.title = self.Title();
            return self.Title();
        }, this);


        return self;
    }

    return { viewModel: bindingFormViewModel, template: bindingFormTemplate };
});
