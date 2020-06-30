import React from 'react';
import * as sortingAlgorithms from './sortingAlgorithms.js';
import './SortingVisualizer.css';

// Controls the speed of the animations
const SPEED_MS = 20;

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
        for (let i=0; i < 200; i++) {
            array.push(getRandomInt(5,500))
        }
        this.setState({array});
    }



    // Sorting Algorithms
    selectionSort() {
        const animations = sortingAlgorithms.selectionSort(this.state.array);
        for (let i=0; i < animations.length; i++) {
            const arrayBars = document.getElementsByClassName('array-bar');
            const isColorChange = i%3 !== 1;
            if (isColorChange) {
                const [barOneIndex, barTwoIndex, color] = animations [i];
                const barOneStyle = arrayBars[barOneIndex].style;
                const barTwoStyle = arrayBars[barTwoIndex].style;
                setTimeout(() => {
                    barOneStyle.backgroundColor = color;
                    barTwoStyle.backgroundColor = color;
                }, i*SPEED_MS)
            } else {
                setTimeout(() => {
                    const [barOneIndex, barOneValue, barTwoIndex, barTwoValue] = animations[i];
                    const barOneStyle = arrayBars[barOneIndex].style;
                    const barTwoStyle = arrayBars[barTwoIndex].style;
                    barOneStyle.height = `${barTwoValue}px`;
                    barTwoStyle.height = `${barOneValue}px`;
                }, i*SPEED_MS);
            }
        }
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
                        <div className="array-bar" id={`bar-${element}`} key={index} 
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

