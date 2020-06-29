import React from 'react';
import * as sortingAlgorithms from './sortingAlgorithms.js';
import './SortingVisualizer.css';

export default class SortingVisualizer extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            array: [],
        };
    }

    // When app loads for the first time
    componentDidMount() {
        this.resetArray();
    }

    resetArray() {
        const array = [];
        for (let i=0; i < 20; i++) {
            array.push(getRandomInt(5,500))
        }
        this.setState({array});
    }



    // Sorting Algorithms
    selectionSort() {
        let arrayCopy1 = JSON.parse(JSON.stringify(this.state.array))
        let arrayCopy2 = JSON.parse(JSON.stringify(this.state.array))
            arrayCopy1.sort((a,b) => a-b)
        const sortedArray = sortingAlgorithms.selectionSort(arrayCopy2)
        console.log(this.compareSorts(arrayCopy1, sortedArray))
    }
    insertionSort() {
        let arrayCopy1 = JSON.parse(JSON.stringify(this.state.array))
        let arrayCopy2 = JSON.parse(JSON.stringify(this.state.array))
            arrayCopy1.sort((a,b) => a-b)
        const sortedArray = sortingAlgorithms.insertionSort(arrayCopy2)
        console.log(this.compareSorts(arrayCopy1, sortedArray))
    }
    shellSort() {
        let arrayCopy1 = JSON.parse(JSON.stringify(this.state.array))
        let arrayCopy2 = JSON.parse(JSON.stringify(this.state.array))
            arrayCopy1.sort((a,b) => a-b)
        const sortedArray = sortingAlgorithms.shellSort(arrayCopy2)
        console.log(this.compareSorts(arrayCopy1, sortedArray))
    }
    mergeSort() {
        let arrayCopy1 = JSON.parse(JSON.stringify(this.state.array))
        let arrayCopy2 = JSON.parse(JSON.stringify(this.state.array))
            arrayCopy1.sort((a,b) => a-b)
        const sortedArray = sortingAlgorithms.mergeSort(arrayCopy2)
        console.log(this.compareSorts(arrayCopy1, sortedArray))
        console.log(this.printArrays(sortedArray, []))
    }
    quickSort() {}
    compareSorts(array1, array2) {
        if (array1.length !== array2.length) {
            return false
        }
        for (let i=0; i < array1.length; i++) {
            // console.log(`'comparing ${array1[i]} with ${array2[i]}.`)
            if (array1[i] !== array2[i]) {
                return false
            }
        }
        return true
    }
    printArrays(array1, array2) {
        console.log("State: " + array1.toString())
        console.log("Sorted: " + array2.toString())
    }



    render() {
        const {array} = this.state;

        return (
            <div className="app-container">
                <div className="array-bar-container">
                    {array.map((element, index) => (
                        <div className="array-bar" key={index} 
                            style={{height: `${element}px`}}>
                        </div>
                    ))}
                </div>
                <div className="buttons-container">
                    <button onClick={() => this.resetArray()}>Generate New Array</button>
                    <button onClick={() => this.selectionSort()}>Selection Sort</button>
                    <button onClick={() => this.insertionSort()}>Insertion Sort</button>
                    <button onClick={() => this.shellSort()}>Shell Sort</button>
                    <button onClick={() => this.mergeSort()}>Merge Sort</button>
                    <button onClick={() => this.quickSort()}>Quick Sort</button>
                </div>
            </div>
        );
    }
}

// From https://www.w3schools.com/js/js_random.asp
// Min and Max are both inclusive.
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1) ) + min;
}

