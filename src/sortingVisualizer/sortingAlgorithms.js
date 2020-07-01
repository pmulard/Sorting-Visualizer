var compareColor = 'aqua';
var defaultColor = 'orange';
var sortedColor = 'purple';
var secondCompareColor = 'yellowgreen';

// SELECTION SORT
export const selectionSort = (array) => {   
    var animations = [];

    for (let i=0; i < array.length; i++) {
        let min = i;

        for (let j = i+1; j < array.length; j++) {
            if (array[min] > array[j]) {
                min = j;
            }
        }
        // Turns on color for bars to be compared
        animations.push([i, min, compareColor, 'COMPARING']);
        // Swaps height (values) of bars
        animations.push([i, array[i], min, array[min], 'SWAP_VALUES']); 
        // Resets bars back to default/sorted color
        animations.push([i, min, defaultColor, sortedColor, 'SORTED']); 

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
            // Changes color and values for bars as they shift
            animations.push([index, array[index], index+1, array[index+1], compareColor, 'COMPARING'])
            // Resets color of bars back to default now that swap is completed
            animations.push([index, index+1, sortedColor, 'DONE_COMPARING'])
            index -= 1;
        }
        
        array[index+1] = unsortedElement;
        // Changes the height of the last bar in iteration to reflect
        // unsorted element being put in it's correct place
        animations.push([index+1, array[index+1], 'SORTED'])
    }
    return animations;
}



// SHELL SORT
export const shellSort = (array) => { 
    let space = Math.floor(array.length/2);
    const animations = [];
    
    while (space > 0) {

        if (space % 2 === 0) { // Improves efficiency by assuring space is odd
            space += 1;
        }

        for (let i=0; i < space; i++) {

            // Changes color for all bars per index iteration within
            // each space iteration
            let barIndexArray = [];
            for (let barIndex=i; barIndex < array.length; barIndex+=space) {
                barIndexArray.push(barIndex);
            }
            animations.push([barIndexArray, secondCompareColor, 'COMPARING'])

            const last = array.length-1;
            for (let j = i+space; j <= last; j+=space) {
                let unsortedElement = array[j];
                let index = j-space;

                while (index >= 0 && unsortedElement < array[index]) {
                    array[index+space] = array[index];
                    // Changes color and values for bars as they shift
                    animations.push([index, array[index], index+space, array[index+space], compareColor, 'SHIFTING'])
                    // Resets color of bars back to compareColor now that the swap is completed,
                    // unless space=1, in which it is colored as completed
                    if (space === 1) {
                        animations.push([index, index+space, sortedColor, 'DONE_SHIFTING'])
                    } else {
                        animations.push([index, index+space, secondCompareColor, 'DONE_SHIFTING'])
                    }
                    index -= space;
                }

                array[index+space] = unsortedElement;
                // Changes the height of the last bar in iteration to reflect
                // unsorted element being put in it's correct place
                animations.push([index+space, array[index+space], 'LAST_SHIFT'])
                // Changes the color of the last bar to be sorted when on the 
                // final pass
                if (space === 1) {
                    // Changes color to sorted if the first element is properly sorted
                    // on the very last pass when space=1
                    if (index === 0) {
                        animations.push([index, sortedColor, 'SORTED'])
                    }
                    animations.push([index+space, sortedColor, 'SORTED'])
                }
            }
            
            // Resets each space iteration to default color unless it's
            // the last iteration (space=1)
            if (barIndexArray.length !== array.length) {
                animations.push([barIndexArray, defaultColor, 'DONE_COMPARING']);
            }
        }
        space = Math.floor(space/2);
    }
    return animations;
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