var defaultColor = '#7f78d2';
var sortedColor = '#613885';
var compareColor = '#3fc5f0';
var secondCompareColor = '#83b87b';

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
export const insertionSort = (array) => {
    var animations = [];

    for (let i=1; i < array.length; i++) {

        let unsortedElement = array[i];
        let index = i-1;

        // Makes sure first index is colored sorted after each iteration
        if (index === 0) {
            animations.push([index, index, sortedColor, 'DONE_COMPARING']);
        }

        while (index >= 0 && unsortedElement < array[index]) {
            array[index+1] = array[index];
            // Changes color and values for bars as they shift
            animations.push([index, array[index], index+1, array[index+1], compareColor, 'COMPARING']);
            // Resets color of bars back to default now that swap is completed
            animations.push([index, index+1, sortedColor, 'DONE_COMPARING']);
            index -= 1;
        }

        // Makes sure index is colored sorted if it is smaller
        // than unsortedElement
        animations.push([index+1, index+1, sortedColor, 'DONE_COMPARING']);
        
        array[index+1] = unsortedElement;

        // Changes the height of the last bar in iteration to reflect
        // unsorted element being put in it's correct place
        animations.push([index+1, array[index+1], 'SORTED']);
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
                // Changes the color of the last bar to sorted when on the 
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
            // the last iteration
            if (space !== 1) {
                animations.push([barIndexArray, defaultColor, 'DONE_COMPARING']);
            }
        }
        space = Math.floor(space/2);
    }
    return animations;
}



// MERGE SORT
export const mergeSort = (array) => {
    var auxArray = array.splice();
    var animations = [];
    mergeSortDivide(array, 0, array.length-1, auxArray, animations);
    return animations;
}

const mergeSortDivide = (array, startIndex, endIndex, auxArray, animations) => {
    if (startIndex === endIndex) {
        return;
    }
    var midIndex = Math.floor((startIndex + endIndex)/2);
    mergeSortDivide(auxArray, startIndex, midIndex, array, animations);
    mergeSortDivide(auxArray, midIndex+1, endIndex, array, animations);

    return mergeSortMerge(array, startIndex, midIndex, endIndex, auxArray, animations);
}

const mergeSortMerge = (array, startIndex, midIndex, endIndex, auxArray, animations) => {
    let i = startIndex;
    let j = midIndex;
    let k = endIndex;
    animations.push([startIndex, endIndex, secondCompareColor, 'GROUPING_ARRAY'])
    
    while (i <= midIndex && j <= endIndex) {
        animations.push([i, j, compareColor, 'COMPARING']);
        
        if (auxArray[i] <= auxArray[j]) {
            array[k] = array[i];
            animations.push([k, array[i], 'CHANGING_VALUE']);
            animations.push([i, j, secondCompareColor, 'DONE_COMPARING']);
            i++;
        } else {
            // Assertion: auxArray[i] > auxArray[j]
            array[k] = array[j];
            animations.push([k, array[j], 'CHANGING_VALUE']);
            animations.push([i, j, secondCompareColor, 'DONE_COMPARING']);
            j++;
        }
    }
    // while (i <= midIndex) {
    //     animations.push([i, j, compareColor, 'COMPARING']);
    //     array[k] = array[i];
    //     animations.push([k, array[i], 'CHANGING_VALUE']);
    //     animations.push([i, j, secondCompareColor, 'DONE_COMPARING']);
    //     i++;
    // }
    // while (j <= endIndex) {
    //     animations.push([i, j, compareColor, 'COMPARING']);
    //     array[k] = array[j];
    //     animations.push([k, array[j], 'CHANGING_VALUE']);
    //     animations.push([i, j, secondCompareColor, 'DONE_COMPARING']);
    //     j++;
    // }



    
    // while (i <= midIndex && j <= endIndex) {
    //     // These are the values that we're comparing; we push them once
    //     // to change their color.
    //     animations.push([i, j, compareColor, 'COMPARING']);
    //     // These are the values that we're comparing; we push them a second
    //     // time to revert their color.
    //     animations.push([i, j, compareColor, 'DONE_COMPARING']);
    //     if (auxArray[i] <= auxArray[j]) {
    //       // We overwrite the value at index k in the original array with the
    //       // value at index i in the auxiliary array.
    //       animations.push([k, auxArray[i], 'CHANGING_VALUE']);
    //       array[k++] = auxArray[i++];
    //     } else {
    //       // We overwrite the value at index k in the original array with the
    //       // value at index j in the auxiliary array.
    //       animations.push([k, auxArray[j], 'CHANGING_VALUE']);
    //       array[k++] = auxArray[j++];
    //     }
    // }
    // while (i <= midIndex) {
    //     // These are the values that we're comparing; we push them once
    //     // to change their color.
    //     animations.push([i, i, compareColor, 'COMPARING']);
    //     // These are the values that we're comparing; we push them a second
    //     // time to revert their color.
    //     animations.push([i, i, compareColor, 'DONE_COMPARING']);
    //     // We overwrite the value at index k in the original array with the
    //     // value at index i in the auxiliary array.
    //     animations.push([k, auxArray[i], 'CHANGING_VALUE']);
    //     array[k++] = auxArray[i++];
    //   }
    //   while (j <= endIndex) {
    //     // These are the values that we're comparing; we push them once
    //     // to change their color.
    //     animations.push([j, j, compareColor, 'COMPARING']);
    //     // These are the values that we're comparing; we push them a second
    //     // time to revert their color.
    //     animations.push([j, j, compareColor, 'DONE_COMPARING']);
    //     // We overwrite the value at index k in the original array with the
    //     // value at index j in the auxiliary array.
    //     animations.push([k, auxArray[j], 'CHANGING_VALUE']);
    //     array[k++] = auxArray[j++];
    //   }

    animations.push([startIndex, endIndex, defaultColor, 'DONE_GROUPING_ARRAY']);
}