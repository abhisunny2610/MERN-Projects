const n = 6; // Number of rows

for (let i = 1; i <= n; i++) {
    let row = '';
    for (let j = 1; j <= n; j++) {
        if (j <= n - i) {
            row += ' '; // Add spaces
        } else {
            row += '*'; // Add stars
        }
    }
    console.log(row);
}



for (let i = 1; i <= n; i++) {
    let row = ''
    for (let j = 1; j <= n; j++) {
        if (j <= n - i) {
            row += "*"
        } else {
            row += " "
        }
    }

    console.log(row)
}


// 1. FizzBuzz
// Write a program that prints numbers from 1 to 100.

// If the number is divisible by 3, print "Fizz".
// If divisible by 5, print "Buzz".
// If divisible by both, print "FizzBuzz".

function fizzBuzz(count) {
    for (let i = 1; i <= count; i++) {
        if (i % 3 === 0 && i % 5 === 0) {
            console.log(i, "FizzBuzz");
        } else if (i % 3 === 0) {
            console.log(i, "Fizz");
        } else if (i % 5 === 0) {
            console.log(i, "Buzz");
        } else {
            console.log(i);
        }
    }
}

// fizzBuzz(100)


// 2. Palindrome Checker
// Write a function to check if a given string is a palindrome (reads the same backward as forward).
// Example: "racecar" → true, "hello" → false.

let str1 = "racecar"

function checkPalindrome(str) {
    let str2 = "";
    for (let i = str.length - 1; i >= 0; i--) {
        str2 += str[i];
    }
    if (str2 === str) {
        console.log(true);
    } else {
        console.log(false);
    }
}


// checkPalindrome(str1)

// 3. Factorial Calculator
// Write a function to calculate the factorial of a number n.
// Example: factorial(5) → 120.

function factorial(num) {
    let factorialvalue = 1

    for (let i = num; i >= 1; i--) {
        factorialvalue *= i
    }
    console.log("f value", factorialvalue)
}

// factorial(5)

// 4. Reverse a Number
// Write a function to reverse a given integer.
// Example: reverseNumber(1234) → 4321.

function reverseInteger(num) {
    let x = num.toString()
    let reverValue = ""

    for (let i = x.length - 1; i >= 0; i--) {
        reverValue += x[i]
    }

    console.log("Reverse integer", Number(reverValue))
}

// reverseInteger(4321)

// 5. Prime Number Checker
// Write a function to check if a given number is prime.
// Example: isPrime(7) → true, isPrime(10) → false.

function checkPrime(num) {
    if (num <= 1) {
        console.log("Non-Prime");
        return;
    }

    for (let i = 2; i <= Math.sqrt(num); i++) {
        if (num % i === 0) {
            console.log("Non-Prime");
            return;
        }
    }

    console.log("Prime");
}

// checkPrime(5); // Prime
// checkPrime(4); // Non-Prime
// checkPrime(1); // Non-Prime

// 7. Sum of Digits
// Write a function to calculate the sum of the digits of a number.
// Example: sumOfDigits(123) → 6.

function sumOfDigits(num) {
    let sum = 0;
    for (let i = 0; i < num.toString().length; i++) {
        sum += parseInt(num.toString()[i]);
    }

    console.log(sum);
}

// sumOfDigits(123); 

// 15. Remove Duplicates from an Array
// Write a function that removes duplicates from an array and returns a new array with unique elements.


function removeDuplicateFromArray(arr) {
    let arr2 = []
    for (let i = 0; i <= arr.length - 1; i++) {
        if (!arr2.includes(arr[i])) {
            arr2.push(arr[i])
        }
    }
    return arr2
}

// console.log(removeDuplicateFromArray([1, 2, 2, 3, 3, 4]));
// console.log(removeDuplicateFromArray([5, 5, 5, 6, 7]));

// 13. Find the Second Largest Number in an Array
// Write a function that returns the second largest number from an array of integers.

function secondLargestNumber(arr) {
    arr.sort((a, b) => b - a)
    console.log(arr.sort((a, b) => b - a))
    for (let i = 1; i < arr.length; i++) {
        if (arr[i] !== arr[0]) {
            return arr[i];
        }
    }

    return null;
}
// console.log(secondLargestNumber([1, 2, 3, 4, 5])); // 4
// console.log(secondLargestNumber([10, 10, 10, 8, 8])); // 8

// 3. Find Missing Number
// Given an array of n - 1 numbers in the range from 1 to n, find the missing number. The numbers in the array are distinct.

function findMissingNumber(arr) {
    // Sort the array in ascending order
    arr.sort((a, b) => a - b);

    // Iterate through the array to find the missing number
    for (let i = 0; i < arr.length - 1; i++) {
        if (arr[i + 1] !== arr[i] + 1) {
            console.log("Missing number:", arr[i] + 1);
            return;
        }
    }
    console.log("Missing number:", arr[arr.length - 1] + 1);
}

let missingNumber = [1, 2, 4, 5, 6];
findMissingNumber(missingNumber);


let arr = [1, 2, 3, 4, 5, 6, 7, 8]
let arr1 = []
for (let i = 0; i < arr.length; i += 2) {
    arr1.push([arr[i], arr[i + 1]])
}

console.log("Output result", arr1)



let name = "Abhishek"
let reversename = ""



for (let i = name.length - 1; i >= 0; i--) {
    reversename += name[i]
}

console.log(reversename)


// useEffect(()=> {

// }, [name])

// useEffect(()=> {

// }, [])

// useEffect(()=> {

// })


let str3 = "abbchdddA"
let counting = {}
for (let i = 0; i <= str3.length - 1; i++) {
    let char = str3[i];
    counting[char] = (counting[char] || 0) + 1;
}

console.log("Ouput", counting)