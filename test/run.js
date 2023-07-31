const data = [
  {
    code: '#include <iostream>\n\nint main() {\n    std::cout << "\\"Hello, World!\\"" << std::endl;\n    return 0;\n}',
    filename: "HelloWorld.cpp",
    input: " ",
    lang: "cpp",
  },
  {
    code: 'public class HelloWorld {\n    public static void main(String[] args) {\n        System.out.println("\\"Hello, World!\\"");\n    }\n}',
    filename: "HelloWorld.java",
    input: " ",
    lang: "java",
  },
  {
    code: 'print("\\"Hello, World!\\"")',
    filename: "HelloWorld.py",
    input: " ",
    lang: "python",
  },
  {
    code: '#include <iostream>\n\nint main() {\n    int a = 10, b = 5;\n    std::cout << "Sum: " << a + b << std::endl;\n    std::cout << "Difference: " << a - b << std::endl;\n    std::cout << "Product: " << a * b << std::endl;\n    std::cout << "Division: " << a / b << std::endl;\n    std::cout << "This is a basic functionality C++ program!" << std::endl;\n    return 0;\n}',
    filename: "BasicFunctionality.cpp",
    input: " ",
    lang: "cpp",
  },
  {
    code: 'public class BasicFunctionality {\n    public static void main(String[] args) {\n        for (int i = 1; i <= 5; ++i) {\n            System.out.print(i + " ");\n        }\n        System.out.println();\n        int a = 10, b = 5;\n        System.out.println("Sum: " + (a + b));\n        System.out.println("Difference: " + (a - b));\n        System.out.println("Product: " + (a * b));\n        System.out.println("Division: " + (a / b));\n        System.out.println("This is a basic functionality Java program!");\n    }\n}',
    filename: "BasicFunctionality.java",
    input: " ",
    lang: "java",
  },
  {
    code: '# Print numbers from 1 to 5\nfor i in range(1, 6):\n    print(i, end=\' \')\nprint()\n\n# Simple arithmetic operations\na, b = 10, 5\nprint("Sum:", a + b)\nprint("Difference:", a - b)\nprint("Product:", a * b)\nprint("Division:", a / b)\n\n# Print a simple message\nprint("This is a basic functionality Python program!")',
    filename: "BasicFunctionality.py",
    input: " ",
    lang: "python",
  },
  {
    code: "#include <iostream>\n\nint main() {\n    int x = 5;\n    int y = 0;\n    int result = x / y;\n    return 0;\n}",
    filename: "MoreErrors.cpp",
    input: " ",
    lang: "cpp",
  },
  {
    code: 'public class RandomError {\n    public static void main(String[] args) {\n        System.out.println("Value of x: " + x);\n        int x = 10;\n        while (true) {\n            System.out.println("Hello!");\n        }\n    }\n}',
    filename: "RandomError.java",
    input: " ",
    lang: "java",
  },
  {
    code: '# Generate a random number and check if it is even or odd\nimport random\nnumber = random.randint(1, 10)\nif number % 2 == 0:\n    print(number, "is even")\nelse:\n    print(number, "is odd")\n',
    filename: "RandomError.py",
    input: " ",
    lang: "python",
  },
  {
    code: "#include <iostream>\n\nint main() {\n    // Error: Missing semicolon\n    return 0;\n}",
    filename: "ErrorExample.cpp",
    input: " ",
    lang: "cpp",
  },
  {
    code: 'public class AnotherErrorExample {\n    public static void main(String[] args) {\n        int a = 10;\n        int b = 0;\n        int result = a / b;\n        System.out.println("This line won\'t be executed");\n    }\n}',
    filename: "AnotherErrorExample.java",
    input: " ",
    lang: "java",
  },
  {
    code: '# Calculate the factorial of a number\nn = 5\nfactorial = 1\nfor i in range(1, n+1):\n    factorial *= i\nprint("Factorial of", n, "is:", factorial)\n',
    filename: "RandomErrors.py",
    input: " ",
    lang: "python",
  },
  {
    code: '// C++ - Calculate the sum of elements in an array:\n#include <iostream>\n\nint main() {\n    int arr[] = {1, 2, 3, 4, 5};\n    int n = sizeof(arr) / sizeof(arr[0]);\n    int sum = 0;\n\n    for (int i = 0; i < n; ++i) {\n        sum += arr[i];\n    }\n\n    std::cout << "Sum of elements: " << sum << std::endl;\n    return 0;\n}',
    filename: "ArraySum.cpp",
    input: " ",
    lang: "cpp",
  },
  {
    code: '// Java - Calculate the average of numbers in an array:\npublic class ArrayAverage {\n    public static void main(String[] args) {\n        int[] arr = {5, 10, 15, 20, 25};\n        int sum = 0;\n\n        for (int num : arr) {\n            sum += num;\n        }\n\n        double average = (double) sum / arr.length;\n        System.out.println("Average: " + average);\n    }\n}',
    filename: "ArrayAverage.java",
    input: " ",
    lang: "java",
  },
  {
    code: '# Python - Find the maximum and minimum elements in a list:\nnumbers = [3, 8, 1, 6, 12, 4]\nmax_number = max(numbers)\nmin_number = min(numbers)\n\nprint("Maximum number:", max_number)\nprint("Minimum number:", min_number)\n',
    filename: "MinMax.py",
    input: " ",
    lang: "python",
  },
  {
    code: '// C++ - Basic pointer usage:\n#include <iostream>\n\nint main() {\n    int x = 10;\n    int *ptr = &x;\n\n    std::cout << "Value of x: " << *ptr << std::endl;\n    std::cout << "Memory address of x: " << ptr << std::endl;\n\n    return 0;\n}',
    filename: "PointerExample.cpp",
    input: " ",
    lang: "cpp",
  },
  {
    code: '// Java - Create and use a custom class:\nclass Person {\n    String name;\n    int age;\n\n    Person(String name, int age) {\n        this.name = name;\n        this.age = age;\n    }\n\n    void introduce() {\n        System.out.println("Hi, I\'m " + name + " and I\'m " + age + " years old.");\n    }\n}\n\npublic class CustomClassExample {\n    public static void main(String[] args) {\n        Person person = new Person("Alice", 30);\n        person.introduce();\n    }\n}',
    filename: "CustomClassExample.java",
    input: " ",
    lang: "java",
  },
  {
    code: '# Python - Working with dictionaries:\nstudent = {\n    "name": "John Doe",\n    "age": 21,\n    "major": "Computer Science",\n    "gpa": 3.8\n}\n\nprint("Student\'s name:", student["name"])\nprint("Student\'s age:", student["age"])\nprint("Student\'s major:", student["major"])\nprint("Student\'s GPA:", student["gpa"])\n',
    filename: "DictionaryExample.py",
    input: " ",
    lang: "python",
  },
];

const ids = [];
const output = [];
const { default: axios } = require("axios");

async function run() {
  try {
    for (const json of data) {
      const res = await axios.post("http://localhost:3000/code", json);
      ids.push(res.data.submit_id);
    }
  } catch (error) {
    console.log(error);
  }
}

async function checkOutput() {
  try {
    const set = new Set(ids);

    while (set.size > 0) {
      for (const id of set) {
        try {
          const res = await axios.get("http://localhost:3000/code", {
            params: {
              submit_id: id,
            },
          });

          console.log(res.data)
          set.delete(id);
        } catch (error) {}
      }
    }
  } catch (error) {
    console.error(error);
  }
}

run()
  .then(() => checkOutput())
  .then(() => {
    console.log(output);
  });
