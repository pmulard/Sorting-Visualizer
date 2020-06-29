// SELECTION SORT
export const selectionSort = (array, i=0) => {
    if (i+1 >= array.length) {
        return array
    }
    selectionSortSwap(array, i+1)
    return selectionSort(array, i+1)
}

const selectionSortSwap = (array, j) => {
    baseIndex = j-1
    minIndex = baseIndex
    for (j; j < array.length; j++) {
        if (array[j] < array[minIndex]) {
            minIndex = j
        }
    }
    temp = array[baseIndex]
    array[baseIndex] = array[minIndex]
    array[minIndex] = array[temp]
}



// INSERTION SORT
export const insertionSort = (array, i=1) => {
    if (i >= array.length) {
        return array
    }
    insertionSortSwap(array, i)
    return insertionSort(array, i+1)
}

const insertionSortSwap = (array, i) => {
    unsortedElement = array[i]
    index = i-1
    while (index >= 0 && unsortedElement < array[index]) {
        array[index+1] = array[index]
        index -= 1
    }
    array[index+1] = unsortedElement
}



// MERGE SORT
export const mergeSort = (array) => {
    tempArray = array.slice()
    return mergeSortDivide(tempArray)
}

const mergeSortDivide = (array) => {
    if (array.length < 2) {
        return array
    }

    const mid = Math.floor(array.length/2)
    const left = array.slice(0, mid)
    const right = array.slice(mid)

    return mergeSortMerge(mergeSortDivide(left), mergeSortDivide(right))
}

const mergeSortMerge = (left, right) => {
    sortedArray = []
    while (left.length && right.length) {
        if (left[0] < right[0]) {
            sortedArray.push(left.shift())
        } else {
            sortedArray.push(right.shift())
        }
    }
    return sortedArray
}
