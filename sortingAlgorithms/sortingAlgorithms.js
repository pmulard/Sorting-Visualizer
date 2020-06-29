// Merge Sort
export const mergeSort = (array) => {
    tempArray = array.slice()
    mergeSortDivide(tempArray)
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