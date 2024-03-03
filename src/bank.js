// Define a class for the customer's transactions
var Transaction = /** @class */ (function () {
    function Transaction(amount) {
        this.amount = amount;
        this.date = new Date();
    }
    return Transaction;
}());
// Define a class to represent a bank customer
var Customer = /** @class */ (function () {
    function Customer(name, id) {
        this.transactions = [];
        this.name = name;
        this.id = id;
    }
    // Method to retrieve the customer's name
    Customer.prototype.getName = function () {
        return this.name;
    };
    // Method to retrieve the customer's ID
    Customer.prototype.getId = function () {
        return this.id;
    };
    // Method to retrieve all transactions of the customer
    Customer.prototype.getTransactions = function () {
        return this.transactions;
    };
    // Method to calculate and return the customer's balance
    Customer.prototype.getBalance = function () {
        return this.transactions.reduce(function (total, transaction) { return total + transaction.amount; }, 0);
    };
    // Method to add a new transaction to the customer's transactions
    Customer.prototype.addTransaction = function (amount) {
        // Validate the amount type should be number
        if (typeof amount !== "number" || isNaN(amount)) {
            console.log("Invalid transaction amount.");
            return false;
        }
        if (this.getBalance() + amount >= 0) {
            var newTransaction = new Transaction(amount);
            var lengthBefore = this.transactions.length;
            var lengthAfter = this.transactions.push(newTransaction);
            return lengthBefore < lengthAfter;
        }
        else {
            console.log("Transaction failed for Customer ID: ".concat(this.id, ". Insufficient amount to withdraw"));
            return false;
        }
    };
    return Customer;
}());
// Define a class to bank's branches
var Branch = /** @class */ (function () {
    function Branch(name) {
        this.name = name;
        this.customers = [];
    }
    // Method to retrieve the branch name
    Branch.prototype.getName = function () {
        return this.name;
    };
    // Method to retrieve all customers of the branch
    Branch.prototype.getCustomers = function () {
        return this.customers;
    };
    // Method to add a new customer to the branch
    Branch.prototype.addCustomer = function (customer) {
        // Validate customer object
        if (!(customer instanceof Customer)) {
            console.log("Invalid customer object.");
            return false;
        }
        if (!this.customers.includes(customer)) {
            this.customers.push(customer);
            return true; // Return true if customer is added successfully
        }
        else {
            return false; // Return false if customer already exists
        }
    };
    // Method to add a transaction for a specific customer of the branch
    Branch.prototype.addCustomerTransaction = function (customerId, amount) {
        var customer = this.customers.find(function (customer) { return customer.getId() == customerId; });
        if (customer) {
            var result = customer.addTransaction(amount);
            return result; // Return true if transaction added successfully
        }
        else {
            console.log("Transaction failed for Customer ID: ".concat(customerId, ". Customer not found in ").concat(this.getName(), " branch."));
            return false; // Return false if customer not found
        }
    };
    return Branch;
}());
// Define a class to represent a bank
var Bank = /** @class */ (function () {
    function Bank(name) {
        this.branches = [];
        this.name = name;
    }
    // Method to add a new branch to the bank
    Bank.prototype.addBranch = function (branch) {
        // Validate branch object
        if (!(branch instanceof Branch)) {
            console.log("Invalid branch object.");
            return false;
        }
        if (!this.checkBranch(branch) && !this.findBranchByName(branch.getName())) {
            this.branches.push(branch);
            console.log("Branch \"".concat(branch.getName(), "\" has been added to ").concat(this.name, " bank."));
            console.log("--------------------------------------------");
            return true; // Return true if branch added successfully
        }
        else {
            console.log("Branch \"".concat(branch.getName(), "\" already exists in ").concat(this.name, " bank."));
            console.log("--------------------------------------------");
            return false; // Return false if branch already exists
        }
    };
    // Method to add a new customer to a specific branch of the bank
    Bank.prototype.addCustomer = function (branch, customer) {
        if (!(branch instanceof Branch) || !(customer instanceof Customer)) {
            console.log("Invalid branch or customer object.");
            return false;
        }
        if (branch.addCustomer(customer)) {
            console.log("Customer \"".concat(customer.getName(), "\" has been added to ").concat(branch.getName(), " branch."));
            console.log("--------------------------------------------");
            return true; // Return true if customer added successfully
        }
        else {
            console.log("Customer \"".concat(customer.getName(), "\" already exists in ").concat(branch.getName(), " branch."));
            console.log("--------------------------------------------");
            return false; // Return false if customer already exists
        }
    };
    // Method to add a transaction for a specific customer of a specific branch
    Bank.prototype.addCustomerTransaction = function (branch, customerId, amount) {
        if (!(branch instanceof Branch)) {
            console.log("Invalid branch object.");
            return false;
        }
        var result = branch.addCustomerTransaction(customerId, amount);
        if (result) {
            console.log("Transaction successful for Customer ID: ".concat(customerId, " in ").concat(branch.getName(), " branch."));
            console.log("--------------------------------------------");
        }
        else {
            console.log("--------------------------------------------");
        }
        return result; // Return true if transaction added successfully, false otherwise
    };
    // Method to find a branch by its name
    Bank.prototype.findBranchByName = function (branchName) {
        var foundedBranches = this.branches.filter(function (branch) { return branch.getName() === branchName; });
        return foundedBranches.length > 0 ? foundedBranches : null;
    };
    // Method to check if a given branch exists in the bank
    Bank.prototype.checkBranch = function (branch) {
        return this.branches.includes(branch);
    };
    // Method to list all customers of a specific branch and including their transactions (optional)
    Bank.prototype.listCustomers = function (branch, includeTransactions) {
        console.log("Customers at ".concat(branch.getName(), " branch:"));
        branch.getCustomers().forEach(function (customer) {
            console.log("Customer Name: ".concat(customer.getName()));
            console.log("Customer ID: ".concat(customer.getId()));
            if (includeTransactions) {
                console.log("Transactions:", customer.getTransactions());
            }
            console.log("---------------------");
        });
        console.log("--------------------------------------------");
    };
    // Method to search for customers across all branches by name or ID
    Bank.prototype.searchCustomers = function (query) {
        // We nned the customer and branch names so we will return both as result
        var results = [];
        this.branches.forEach(function (branch) {
            var customers = branch.getCustomers();
            customers.forEach(function (customer) {
                if (customer.name.toLowerCase().includes(query.toLowerCase()) ||
                    customer.id.toString() === query) {
                    results.push([customer, branch]);
                }
            });
        });
        return results;
    };
    return Bank;
}());
// ------------------------------------------------ Perform some transactions ------------------------------------------------
var arizonaBank = new Bank("Arizona");
var westBranch = new Branch("West Branch");
var westBranch2 = new Branch("West Branch");
var sunBranch = new Branch("Sun Branch");
var customer1 = new Customer("John", 1);
var customer2 = new Customer("Anna", 2);
var customer3 = new Customer("John", 3);
var customer4 = new Customer("John", 1);
arizonaBank.addBranch(westBranch);
arizonaBank.addBranch(westBranch);
arizonaBank.addBranch(westBranch2);
arizonaBank.addBranch(sunBranch);
arizonaBank.addCustomer(westBranch, customer1);
arizonaBank.addCustomer(westBranch, customer1);
arizonaBank.addCustomer(westBranch, customer4);
arizonaBank.addCustomer(westBranch, customer3);
arizonaBank.addCustomer(sunBranch, customer1);
arizonaBank.addCustomer(sunBranch, customer2);
arizonaBank.addCustomerTransaction(westBranch, customer1.getId(), -3000);
arizonaBank.addCustomerTransaction(westBranch, customer1.getId(), 2000);
arizonaBank.addCustomerTransaction(westBranch, customer2.getId(), 1000);
customer1.addTransaction(-1000);
console.log("Customer ".concat(customer1.getName(), "'s Balance: ").concat(customer1.getBalance()));
console.log("--------------------------------------------");
console.log("Customers at West Branch:");
arizonaBank.listCustomers(westBranch, true);
console.log("Customers at Sun Branch:");
arizonaBank.listCustomers(sunBranch, true);
// Example of search
// Accept name and Id
var searchFor = "4";
console.log("Search Results for '".concat(searchFor, "':"));
var searchResult = arizonaBank.searchCustomers(searchFor);
if (searchResult.length > 0) {
    searchResult.forEach(function (_a) {
        var customer = _a[0], branch = _a[1];
        console.log("Customer Name: ".concat(customer.name, ", Customer ID: ").concat(customer.id, ", Found in Branch: ").concat(branch.name));
    });
}
else {
    console.log("No result is found for this name/Id");
}
