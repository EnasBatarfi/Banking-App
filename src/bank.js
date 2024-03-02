// Define a class for the customer's transactions
class Transaction {
  constructor(amount) {
    this.amount = amount;
    this.date = new Date();
  }
}

// Define a class to represent a bank customer
class Customer {
  constructor(name, id) {
    this.name = name;
    this.id = id;
    // Initialize an empty array to store transactions
    this.transactions = [];
  }

  // Method to retrieve the customer's name
  getName() {
    return this.name;
  }

  // Method to retrieve the customer's ID
  getId() {
    return this.id;
  }

  // Method to retrieve all transactions of the customer
  getTransactions() {
    return this.transactions;
  }

  // Method to calculate and return the customer's balance
  getBalance() {
    return this.transactions.reduce(
      (total, transaction) => total + transaction.amount,
      0
    );
  }

  // Method to add a new transaction to the customer's transactions
  addTransaction(amount) {
    const newTransaction = new Transaction(amount);
    this.transactions.push(newTransaction);
  }
}

// Define a class to bank's branches
class Branch {
  constructor(name) {
    this.name = name;
    // Initialize an empty array to store customers
    this.customers = [];
  }

  // Method to retrieve the branch name
  getName() {
    return this.name;
  }

  // Method to retrieve all customers of the branch
  getCustomers() {
    return this.customers;
  }

  // Method to add a new customer to the branch
  addCustomer(customer) {
    if (!this.customers.includes(customer)) {
      this.customers.push(customer);
      return true; // Return true if customer is added successfully
    } else {
      return false; // Return false if customer already exists
    }
  }

  // Method to add a transaction for a specific customer of the branch
  addCustomerTransaction(customerId, amount) {
    const customer = this.customers.find(
      (customer) => customer.getId() === customerId
    );
    if (customer) {
      customer.addTransaction(amount);
      return true; // Return true if transaction added successfully
    } else {
      return false; // Return false if customer not found
    }
  }
}

// Define a class to represent a bank
class Bank {
  constructor(name) {
    this.name = name;
    // Initialize an empty array to store branches
    this.branches = [];
  }

  // Method to add a new branch to the bank
  addBranch(branch) {
    if (!this.branches.includes(branch)) {
      this.branches.push(branch);
      console.log(
        `Branch "${branch.getName()}" has been added to ${this.name} bank.`
      );
      console.log("--------------------------------------------");
      return true; // Return true if branch added successfully
    } else {
      console.log(
        `Branch "${branch.getName()}" already exists in ${this.name} bank.`
      );
      console.log("--------------------------------------------");
      return false; // Return false if branch already exists
    }
  }

  // Method to add a new customer to a specific branch of the bank
  addCustomer(branch, customer) {
    if (branch.addCustomer(customer)) {
      console.log(
        `Customer "${customer.getName()}" has been added to ${branch.getName()} branch.`
      );
      console.log("--------------------------------------------");
      return true; // Return true if customer added successfully
    } else {
      console.log(
        `Customer "${customer.getName()}" already exists in ${branch.getName()} branch.`
      );
      console.log("--------------------------------------------");
      return false; // Return false if customer already exists
    }
  }

  // Method to add a transaction for a specific customer of a specific branch
  addCustomerTransaction(branch, customerId, amount) {
    const result = branch.addCustomerTransaction(customerId, amount);
    if (result) {
      console.log(
        `Transaction successful for Customer ID: ${customerId} in ${branch.getName()} branch.`
      );
      console.log("--------------------------------------------");
    } else {
      console.log(
        `Transaction failed for Customer ID: ${customerId}. Customer not found in ${branch.getName()} branch.`
      );
      console.log("--------------------------------------------");
    }
    return result; // Return true if transaction added successfully, false otherwise
  }

  // Method to find a branch by its name
  findBranchByName(branchName) {
    return this.branches.find((branch) => branch.getName() === branchName);
  }

  // Method to check if a given branch exists in the bank
  checkBranch(branch) {
    return this.branches.includes(branch);
  }

  // Method to list all customers of a specific branch and including their transactions (optional)
  listCustomers(branch, includeTransactions) {
    console.log(`Customers at ${branch.getName()} branch:`);
    branch.getCustomers().forEach((customer) => {
      console.log(`Customer Name: ${customer.getName()}`);
      console.log(`Customer ID: ${customer.getId()}`);
      if (includeTransactions) {
        console.log(`Transactions:`, customer.getTransactions());
      }
      console.log("---------------------");
    });
    console.log("--------------------------------------------");
  }
}

// ------------------------------------------------ Perform some transactions ------------------------------------------------
const arizonaBank = new Bank("Arizona");
const westBranch = new Branch("West Branch");
const sunBranch = new Branch("Sun Branch");
const customer1 = new Customer("John", 1);
const customer2 = new Customer("Anna", 2);
const customer3 = new Customer("John", 3);

arizonaBank.addBranch(westBranch);
arizonaBank.addBranch(sunBranch);

arizonaBank.addCustomer(westBranch, customer1);
arizonaBank.addCustomer(westBranch, customer3);
arizonaBank.addCustomer(sunBranch, customer1);
arizonaBank.addCustomer(sunBranch, customer2);

arizonaBank.addCustomerTransaction(westBranch, customer1.getId(), 3000);
arizonaBank.addCustomerTransaction(westBranch, customer1.getId(), 2000);
arizonaBank.addCustomerTransaction(westBranch, customer2.getId(), 3000);

customer1.addTransaction(-1000);

console.log(
  `Customer ${customer1.getName()}'s Balance: ${customer1.getBalance()}`
);
console.log("--------------------------------------------");

console.log("Customers at West Branch:");
arizonaBank.listCustomers(westBranch, true);

console.log("Customers at Sun Branch:");
arizonaBank.listCustomers(sunBranch, true);
