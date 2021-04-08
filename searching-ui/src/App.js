import React from "react";
import "./App.css";

class App extends React.Component {
  handleSubmit = (event) => {
    // alert("An essay was submitted: " + this.state.value);
    event.preventDefault();
    const { dataset, number } = event.target;
    let input_string = dataset.value.split(",");
    // Sanitize
    input_string = dataset.value
      .replace(/\s+/g, "")
      .split(",")
      .filter((element) => !isNaN(element))
      .map((element) => parseInt(element))
      .sort(function (a, b) {
        return a - b;
      });
    // const results = this.linearSearch(input_string, parseInt(number.value));
    const results = this.binarySearch(input_string, parseInt(number.value), 0);
    console.log(results);
    // if (results[0] === -1) {
    //   alert(
    //     `Couldn't find the number ${number.value} after ${results[1]} tries`
    //   );
    // } else {
    //   alert(`Took ${results[1]} tries`);
    // }
  };

  linearSearch(array, value) {
    let tries = 0;
    for (let i = 0; i < array.length; i++) {
      tries += 1;
      if (array[i] === value) {
        return [i, tries];
      }
    }
    return [-1, tries];
  }
  binarySearch(array, value, tries, start, end) {
    var start = start === undefined ? 0 : start;
    var end = end === undefined ? array.length : end;
    console.log(start, end)

    if (start > end) {
      return [-1, (tries += 1)];
    }

    const index = Math.floor((start + end) / 2);
    const item = array[index];
    // ToDo: updated results for values greater than last item in array.
    if (item === value) {
      return [index, (tries += 1)];
    } else if (item < value) {
      return this.binarySearch(array, value, tries + 1, index + 1, end);
    } else if (item > value) {
      return this.binarySearch(array, value, tries + 1, start, index - 1);
    }
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Enter a dataset of numbers:
          <textarea name="dataset" />
        </label>
        <label>
          Enter Value to look for:
          <input type="number" name="number" placeholder="30" required />
        </label>
        <input type="submit" value="Submit" required />
      </form>
    );
  }
}

export default App;
