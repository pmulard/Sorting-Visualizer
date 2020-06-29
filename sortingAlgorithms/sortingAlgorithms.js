// Merge Sort
export const mergeSort = (array) => {
    tempArray = []
    mergeSortDivide(array, tempArray, 0, array.length-1)
}

// const mergeSortDivide = (array, tempArray, first=0, last=array.length-1) => {
//     if (first < last) {
//         mid = (first+last) / 2
//         mergeSortDivide(array, tempArray, first, mid)
//         mergeSortDivide(array, tempArray, mid+1, last)

//         // Doesn't need to divide if there are two elements left. (first <)
//         if (array[mid] === array[mid+1]) { 
//             mergeSortMerge(array, tempArray, first, mid, last)
//         }
//     }
// }


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