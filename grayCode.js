var grayCodes = [];

function getNrOfGrayCodes(nBits) {
    return Math.pow(2, nBits)
}

function getGrayCodes(nBits) {
    grayCodes = []
    
    var array = []
    recursiveGrayCode(array, nBits, 0)
    
    return grayCodes
}

function recursiveGrayCode(array, nBits, index) {
    if(nBits == 0)
        grayCodes.push(array.slice())
    else {
        array[index] = false
        recursiveGrayCode(array, nBits-1, index+1)
        array[index] = true
        recursiveGrayCode2(array, nBits-1, index+1)
    }
}

function recursiveGrayCode2(array, nBits, index) {
    if(nBits == 0)
        grayCodes.push(array.slice())
    else {
        array[index] = true
        recursiveGrayCode(array, nBits-1, index+1)
        array[index] = false
        recursiveGrayCode2(array, nBits-1, index+1)
    }
}

function printCombination(nBits) {
    var nrOfCombinations = Math.pow(2, nBits)
    for(i=0; i < nrOfCombinations; i++)
        console.log(grayCodes[i])
}