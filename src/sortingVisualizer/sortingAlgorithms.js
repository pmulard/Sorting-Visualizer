var compareColor = 'aqua';
var defaultColor = 'orange'

// SELECTION SORT
export const selectionSort = (array) => {   
    const animations = [];

    for (let i=0; i < array.length; i++) {
        let min = i;

        for (let j = i+1; j < array.length; j++) {
            if (array[min] > array[j]) {
                min = j;
            }
        }

        animations.push([i, min, compareColor]); // Turns on color for bars to be compared
        animations.push([i, array[i], min, array[min]]); // Swaps height (values) of bars
        animations.push([i, min, defaultColor]); // Resets bars back to default color

        if (min !== i) {
            let tmp = array[i];
            array[i] = array[min];
            array[min] = tmp;
        }
    }
    return animations;
}



// INSERTION SORT
export const insertionSort = (array, i=1) => {
    var animations = [];

    for (let i=1; i < array.length; i++) {

        let unsortedElement = array[i];
        let index = i-1;

        while (index >= 0 && unsortedElement < array[index]) {
            array[index+1] = array[index];
            // Changes color and values for bars as they shift up
            animations.push([index, array[index], index+1, array[index+1], compareColor])
            // Resets color of bars back to default now that swap is completed
            animations.push([index, index+1, defaultColor])
            index -= 1;
        }

        array[index+1] = unsortedElement;
    }
    return animations;
}

// export const insertionSortSwap = (array, i) => {
//     let unsortedElement = array[i];
//     let index = i-1;
//     while (index >= 0 && unsortedElement < array[index]) {
//         array[index+1] = array[index];
//         // Changes color and values for bars as they shift up
//         animations.push(['posSwap', index, array[index], index+1, array[index+1]])
//         animations.push(['colorOff', index, index+1])
//         index -= 1;
//     }

//     animations.push([i, index+1, compareColor]); // Turns on color for bars to be compared
//     animations.push([i, array[i], min, array[min]]); // Swaps height (values) of bars
//     animations.push([i, min, defaultColor]); // Resets bars back to default color

//     array[index+1] = unsortedElement;
// }



// SHELL SORT
export const shellSort = (array) => { 
    let space = Math.floor(array.length/2)
    while (space > 0) {
        if (space % 2 === 0) { // Improves efficiency by assuring space is odd
            space += 1
        }
        for (let i=0; i < space; i++) {
            shellSortIncrementSort(array, space, i, array.length-1)
        }
        space = Math.floor(space/2)
    }
    return array
}

export const shellSortIncrementSort = (array, space, first, last) => {
    for (let j = first+space; j <= last; j+=space) {
        let unsortedElement = array[j]
        let index = j-space
        while (index >= 0 && unsortedElement < array[index]) {
            array[index+space] = array[index]
            index -= space
        }
        array[index+space] = unsortedElement
    }
}



// MERGE SORT
export const mergeSort = (array) => {
    if (array.length < 2) {
        return array
    }
    var mid = Math.floor(array.length/2)
    var left = mergeSort(array.slice(0, mid))
    var right = mergeSort(array.slice(mid)) 

    return mergeSortMerge(left, right)
}

export const mergeSortMerge = (left, right) => {
    var sortedArray = []
    while (left.length > 0 && right.length > 0) {
        if (left[0] < right[0]) {
            sortedArray.push(left.shift())
        } else {
            sortedArray.push(right.shift())
        }
    }
    return sortedArray.concat(left.length ? left : right)
}