/*
The Startup module says that it is dependent on jQuery, KnockoutJS and BootStrap. 
Note, it uses the same names that were used in RequireJS configuration. 
The function parameters are instances of the dependencies requested in the array, so if you put another input parameter like boots it would have instance of the bootstrap library. 
We’ll just keep this in mind for now.

Next it declares a function that has jQuery and KO lib references as input parameters.

In the function we ‘register’ our ‘greeter’ component. Note, that we have moved the registration from the greeting.js to startup. 
Also note instead of specifying the hard-coded template and view model, we are simply configuring a ‘require’ property, that points to the folder where the greeting.js is (without the js).

Needless to say, as we add more components they will need to be registered here.

To initialize routing, we use Require’s module loading to request for it in the required collection. Note the syntax ./router. 
This is because router.js is not a part of the Scripts folder rather it is in the same folder as startup.js and also the fact that it’s not defined in require.configure.js.

*/

define(['jquery', 'knockout', './router', 'bootstrap', 'knockout-projections', 'knockout-validation'], function ($, ko, router) {

    // REGISTER COMPONENTS
    ko.components.register('subtitle', { require: 'app/components/subtitle/subtitle' });
    ko.components.register('addresslabel', { require: 'app/components/address/address' });
    ko.components.register('login', { require: 'app/components/login/login' });
    ko.components.register('sectiontitle', { require: 'app/components/sectiontitle/sectiontitle' });

    
    // REGISTER PAGES
    ko.components.register('home', { require: 'app/pages/home/home' });
    ko.components.register('components', { require: 'app/pages/components/components' });
    ko.components.register('bindingform', { require: 'app/pages/binding_form/binding_form' });
    ko.components.register('bindinglist', { require: 'app/pages/binding_list/binding_list' });
    ko.components.register('crud', { require: 'app/pages/crud/crud' });
    ko.components.register('validation', { require: 'app/pages/validation/validation' });
    ko.components.register('bindingcustom', { require: 'app/pages/binding_custom/binding_custom' });
    ko.components.register('sortfilter', { require: 'app/pages/sort_and_filter/sort_and_filter' });
    
    
    // APPLY BINDINGS
    ko.applyBindings({ route: router.currentRoute });
});
