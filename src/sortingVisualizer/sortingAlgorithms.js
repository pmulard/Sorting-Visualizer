// SELECTION SORT
export const selectionSort = (array) => {
    for (let i=0; i < array.length; i++) {
        let min = i;
        for (let j = i+1; j < array.length; j++) {
            if (array[min] > array[j]) {
                min = j;
            }
        }
        if (min !== i) {
            let tmp = array[i];
            array[i] = array[min];
            array[min] = tmp;
        }
    }
    return array
}



// INSERTION SORT
export const insertionSort = (array, i=1) => {
    if (i >= array.length) {
        return array
    }
    insertionSortSwap(array, i)
    return insertionSort(array, i+1)
}

export const insertionSortSwap = (array, i) => {
    let unsortedElement = array[i]
    let index = i-1
    while (index >= 0 && unsortedElement < array[index]) {
        array[index+1] = array[index]
        index -= 1
    }
    array[index+1] = unsortedElement
}



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