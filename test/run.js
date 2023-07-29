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
    code: '#include <iostream>\n\nint main() {\n    int x = 5;\n    int y = 0;\n    int result = x / y;\n    return 0;\n}',
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
    code: '#include <iostream>\n\nint main() {\n    // Error: Missing semicolon\n    return 0;\n}',
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
    for (const id of ids) {
      const res = await axios.get("http://localhost:3000/code", {
        params: {
          submit_id: id,
        },
      });

      output.push({ ...res.data, id });
    }
  } catch (error) {
    console.error(error);
  }
}

run().then(() =>
  setTimeout(() => checkOutput().then(() => console.log(output)), 10000)
);
