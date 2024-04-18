#! /usr/bin/env node
// Importing inquirer
import inquirer from "inquirer";
// Making multiple variables for balance & pin
let myBalance = 12000;
let myPin = 2233;
// Printing Welcome msg
console.log("\x1b[33m" + "\n\tWelcome to \`Abdul Saboor\` - ATM Machine\n" + "\x1b[0m");
// Creating the process of taking input from the users
let inputPin = await inquirer.prompt([
    {
        name: "pin",
        type: "number",
        message: "Enter your Pin code:",
    }
]);
// Using If-else chain to print msg for wrong input and for correct input
if (inputPin.pin === myPin) {
    console.log("\x1b[32m" + "\nCorrect Pin ,You have logged in succesfully!\n" + "\x1b[0m");
    // Giving choices to the user after he is logged in
    let options = await inquirer.prompt([
        {
            name: "operations",
            type: "list",
            message: "What would you like to do :",
            choices: ["Withdraw Amount", "Check Balance"]
        }
    ]);
    // Giving the user choices for withdrawal method 
    if (options.operations === "Withdraw Amount") {
        let wdMethod = await inquirer.prompt([
            {
                name: "WithdrawMethod",
                type: "list",
                message: "Select a Withdrawal method:",
                choices: ["Fast Cash", "Enter Amount"]
            }
        ]);
        // Creating the process if the user chose fast cash 
        if (wdMethod.WithdrawMethod === "Fast Cash") {
            let fCash = await inquirer.prompt([
                {
                    name: "fastCash",
                    type: "list",
                    message: "select an Amount for Fast Cash",
                    choices: ["1000", "2000", "5000", "10000", "20000", "50000"]
                }
            ]);
            // Printing the msg if the user enters amount that is greater then his balance then using else to print WD successful
            if (fCash.fastCash > myBalance) {
                console.log("\x1b[31m" + "\nYour balance is insufficient.\n" + "\x1b[0m");
            }
            else {
                myBalance -= fCash.fastCash;
                console.log("\x1b[32m" + `\nThe amount withdraw of ${fCash.fastCash} has been done succesfully!\n` + "\x1b[0m");
                console.log(`Your remaining balance is: ${"\x1b[33m" + myBalance + "\x1b[0m"}\n`);
            }
        }
        // Creating the  process if the user chose to enter the particular amount
        else if (wdMethod.WithdrawMethod === "Enter Amount") {
            let wdAmount = await inquirer.prompt([
                {
                    name: "amount",
                    type: "number",
                    messsage: "Enter the amount to withdraw:"
                }
            ]);
            // Printing the msg if the user enters amount that is greater then his balance then using else to print WD successful
            if (wdAmount.amount > myBalance) {
                console.log("\x1b[31m" + "\nYour balance is insufficient.\n" + "\x1b[0m");
            }
            else {
                myBalance -= wdAmount.amount;
                console.log("\x1b[32m" + `\nThe amount withdraw of ${wdAmount.amount} has been done succesfully!\n` + "\x1b[0m");
                console.log(`Your remaining balance is: ${"\x1b[33m" + myBalance + "\x1b[0m"}\n`);
            }
        }
    }
    // Printing the msg for current balance
    else if (options.operations === "Check Balance") {
        console.log(`\nYour current Account Balance is: ${"\x1b[33m" + myBalance + "\x1b[0m"}\n`);
    }
}
// Printing the msg if the user enters an incorrect pin
else {
    console.log("\x1b[31m" + "\nIncorrect Pin , Please try again!\n" + "\x1b[0m");
}
