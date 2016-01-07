define(["knockout", "text!./crud.html"], function (ko, ListFormTemplate) {

    // Model
    function Product(code, name, price, qty) {
        var self = this;
        self.productCode = ko.observable(code);
        self.productName = ko.observable(name);
        self.productPrice = ko.observable(price);
        self.productQty = ko.observable(qty);
    }

    // View Model
    function ListFormViewModel() {
        var self = this;
                
        self.currentProduct = ko.observable(new Product('', '', 0, 0));
        self.currentIndex = ko.observable(0);
        self.editing = ko.observable(false); // Form visible/invisible flag
        self.actionName = ko.observable('Edit Product');
        self.products = ko.observableArray([new Product('Product1', 'LCD TV', 400.99, 20),
                                            new Product('Product2', 'HD TV', 625.99, 15)]);

        self.newProduct = function () {
            self.actionName("New Product");
            self.currentProduct(new Product('', '', 0, 0));
            self.editing(true);
        }

        self.save = function () {
            // Is this a new product ?
            if (self.currentProduct().productCode() == '') {
                // Create New Product Code and add a new product to the array
                var productCode = 'Product' + self.products.length + 1;
                self.products.push(new Product(productCode , self.currentProduct().productName(), self.currentProduct().productPrice(), self.currentProduct().productQty()));
            }
            else {
                // Get a ref to the product at 'currentIndex' within the array
                var product = self.products()[self.currentIndex()];

                // Assign new values )productCode is readonly
                product.productName(self.currentProduct().productName());
                product.productPrice(self.currentProduct().productPrice());
                product.productQty(self.currentProduct().productQty());
            }

            self.editing(false);
        }

        self.cancel = function () {
            self.editing(false);
        }

        self.edit = function (product) {
            self.actionName("Edit Product");
            self.currentIndex(self.products.indexOf(product));
            self.currentProduct(new Product(product.productCode(), product.productName(), product.productPrice(), product.productQty()));
            self.editing(true);
        }

        self.remove = function (product) {
            //self.actionName("Remove Product");
            self.products.remove(product);
        }

        return self;
    }

    return { viewModel: ListFormViewModel, template: ListFormTemplate };
});
