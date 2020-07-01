import React from 'react';
import * as sortingAlgorithms from './sortingAlgorithms.js';
import './SortingVisualizer.css';

// Controls the speed of the animations
const SPEED_MS = 75;
const DEFAULT_COLOR = '#7f78d2';
var sortIsRunning = false;

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
        for (let i=0; i < 100; i++) {
            array.push(getRandomInt(5, 600));
            // array.push(i+1)
        }
        this.setState({array});
        resetColors();
        sortIsRunning = false;
    }



    // SORTING ALGORITHMS

    selectionSort() {
        while (sortIsRunning === false) {
            sortIsRunning = true;
            let animations = sortingAlgorithms.selectionSort(this.state.array);
            const selectionSortSpeed = SPEED_MS/2;

            for (let i=0; i < animations.length; i++) {
                const arrayBars = document.getElementsByClassName('array-bar');
                const animationType = animations[i][animations[i].length-1];
            
                if (animationType === 'COMPARING') {
                    // For turning on color for bars to be compared
                    const [barOneIndex, barTwoIndex, color] = animations[i];
                    const barOneStyle = arrayBars[barOneIndex].style;
                    const barTwoStyle = arrayBars[barTwoIndex].style;
                    setTimeout(() => {
                        barOneStyle.backgroundColor = color;
                        barTwoStyle.backgroundColor = color;
                    }, i*selectionSortSpeed);
                } else if (animationType === 'SWAP_VALUES') {
                    // For swapping height (values) of bars
                    setTimeout(() => {
                        const [barOneIndex, barOneValue, barTwoIndex, barTwoValue] = animations[i];
                        const barOneStyle = arrayBars[barOneIndex].style;
                        const barTwoStyle = arrayBars[barTwoIndex].style;
                        barOneStyle.height = `${barTwoValue}px`;
                        barTwoStyle.height = `${barOneValue}px`;
                    }, i*selectionSortSpeed);
                } else { // Assertion: animationType === 'SORTED'
                    // For resetting bars back to default/sorted color
                    const [sortedBarIndex, otherBarIndex, defaultColor, sortedColor] = animations[i];
                    const sortedBarStyle = arrayBars[sortedBarIndex].style;
                    const otherBarStyle = arrayBars[otherBarIndex].style;    
                    setTimeout(() => {
                        otherBarStyle.backgroundColor = defaultColor;
                        sortedBarStyle.backgroundColor = sortedColor;
                    }, i*selectionSortSpeed);
                }
            }
        }
    }

    insertionSort() {
        while (sortIsRunning === false) {
            sortIsRunning = true;
            let animations = sortingAlgorithms.insertionSort(this.state.array);
            const insertionSortSpeed = SPEED_MS/20;

            for (let i=0; i < animations.length; i++) {
                const arrayBars = document.getElementsByClassName('array-bar');
                const animationType = animations[i][animations[i].length-1];

                if (animationType === 'COMPARING') {
                    // Changes color and values for bars as they shift
                    const [barOneIndex, barOneValue, barTwoIndex, barTwoValue, color] = animations[i];
                    const barOneStyle = arrayBars[barOneIndex].style;
                    const barTwoStyle = arrayBars[barTwoIndex].style;
                    setTimeout(() => {
                        barOneStyle.backgroundColor = color;
                        barOneStyle.height = `${barTwoValue}px`;
                        barTwoStyle.backgroundColor = color;
                        barTwoStyle.height = `${barOneValue}px`;
                    }, (i-1)*insertionSortSpeed); // Prevents flashing affect in visual by removing delay
                } else if (animationType === 'DONE_COMPARING') {
                    // Resets color of bars back to default now that swap is completed
                    const [barOneIndex, barTwoIndex, color] = animations[i];
                    const barOneStyle = arrayBars[barOneIndex].style;
                    const barTwoStyle = arrayBars[barTwoIndex].style;
                    setTimeout(() => {
                        barOneStyle.backgroundColor = color;
                        barTwoStyle.backgroundColor = color;
                    }, i*insertionSortSpeed);
                } else { // Assertion: animationType === 'SORTED'
                    // Changes the height of the last bar in iteration to reflect
                    // unsorted element being put in it's correct place
                    const [finalBarIndex, finalBarValue] = animations[i];
                    const finalBarStyle = arrayBars[finalBarIndex].style;
                    setTimeout(() => {
                        finalBarStyle.height = `${finalBarValue}px`;
                    }, i*insertionSortSpeed);
                }
            }
        }
    }

    shellSort() {
        while (sortIsRunning === false) {
            sortIsRunning = true;
            let animations = sortingAlgorithms.shellSort(this.state.array);
            const shellSortSpeed = SPEED_MS/6;

            for (let i=0; i < animations.length; i++) {
                const arrayBars = document.getElementsByClassName('array-bar');
                const animationType = animations[i][animations[i].length-1];

                if (animationType === 'COMPARING') {
                    // Changes color for all bars in the grouping for index iteration
                    // per each space iteration
                    const [barIndexArray, color] = animations[i];
                    setTimeout(() => {
                        for (let bar=0; bar < barIndexArray.length; bar++) {
                            const barIndex = barIndexArray[bar];
                            const barStyle = arrayBars[barIndex].style;
                            barStyle.backgroundColor = color;
                        }
                    }, (i-1)*shellSortSpeed); // Prevents flashing affect in visual by removing delay
                } else if (animationType === 'SHIFTING') {
                    // Changes color and values for bars as they shift
                    const [barOneIndex, barOneValue, barTwoIndex, barTwoValue, color] = animations[i];
                    const barOneStyle = arrayBars[barOneIndex].style;
                    const barTwoStyle = arrayBars[barTwoIndex].style;
                    setTimeout(() => {
                        barOneStyle.backgroundColor = color;
                        barOneStyle.height = `${barTwoValue}px`;
                        barTwoStyle.backgroundColor = color;
                        barTwoStyle.height = `${barOneValue}px`;
                    }, (i-1)*shellSortSpeed); // Prevents flashing affect in visual by removing delay
                } else if (animationType === 'DONE_SHIFTING') {
                    // Resets color of bars back to compareColor now that the swap 
                    // is completed
                    const [barOneIndex, barTwoIndex, color] = animations[i];
                    const barOneStyle = arrayBars[barOneIndex].style;
                    const barTwoStyle = arrayBars[barTwoIndex].style;
                    setTimeout(() => {
                        barOneStyle.backgroundColor = color;
                        barTwoStyle.backgroundColor = color;
                    }, i*shellSortSpeed);
                } else if (animationType === 'LAST_SHIFT') {
                    // Changes the height of the last bar in iteration to reflect
                    // unsorted element being put in it's correct place
                    const [finalBarIndex, finalBarValue] = animations[i];
                    const finalBarStyle = arrayBars[finalBarIndex].style;
                    setTimeout(() => {
                        finalBarStyle.height = `${finalBarValue}px`;
                    }, i*shellSortSpeed);
                } else if (animationType === 'SORTED') {
                    // Changes the color of bars to sorted when on the final pass
                    const [finalBarIndex, color] = animations[i];
                    const finalBarStyle = arrayBars[finalBarIndex].style;
                    setTimeout(() => {
                        finalBarStyle.backgroundColor = color;
                    }, i*shellSortSpeed);
                } else { // Assertion: animationType === 'DONE_COMPARING'
                    // Resets color for all bars in the grouping for index iteration
                    // per each space iteration
                    const [barIndexArray, color] = animations[i];
                    setTimeout(() => {
                        for (let bar=0; bar < barIndexArray.length; bar++) {
                            const barIndex = barIndexArray[bar];
                            const barStyle = arrayBars[barIndex].style;
                            barStyle.backgroundColor = color;
                        }
                    }, i*shellSortSpeed);
                }
            }
        }
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
                            style={{height: `${element}px`, backgroundColor: `${DEFAULT_COLOR}`}}>
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

// Resets bar colors to default
function resetColors() {
    const arrayBars = document.getElementsByClassName('array-bar');
    for (let i=0; i < arrayBars.length; i++) {
        const barStyle = arrayBars[i].style;
        barStyle.backgroundColor = DEFAULT_COLOR;
    }
}