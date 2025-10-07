<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>JavaScript Example</title>
</head>
<body>
  <h2>Check if a Number is Positive, Negative, or Zero</h2>

  <input type="number" id="num" placeholder="Enter a number">
  <button onclick="checkNumber()">Check</button>

  <p id="result"></p>

  <script>
    function checkNumber() {
      let num = document.getElementById("num").value;
      let result = "";

      if (num > 0) {
        result = `${num} is Positive`;
      } else if (num < 0) {
        result = `${num} is Negative`;
      } else {
        result = "The number is Zero";
      }

      document.getElementById("result").innerText = result;
    }
  </script>
</body>
</html>
