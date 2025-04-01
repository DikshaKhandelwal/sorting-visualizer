/**
 * Merge sort implementation with visualization
 * @param {Array} array - The array to be sorted
 * @param {Function} setArray - State setter function to update the array
 * @param {Number} speed - Speed multiplier (0.25x to 2x)
 * @returns {Promise} - Resolves when sorting is complete
 */
// Simple merge sort implementation
const mergeSort = (array, setArray, speed = 1, pauseRef) => {
 const delay = 1000 / speed;
 const arr = [...array];
 
 // Use a more visual approach for merge sort
 return new Promise((resolve) => {
   const animations = [];
   const auxiliaryArray = arr.slice();
   
   mergeSortHelper(arr, 0, arr.length - 1, auxiliaryArray, animations);
   
   let i = 0;
   function animate() {
     if (pauseRef.current) {
       setTimeout(animate, delay);
       return;
     }

     if (i === animations.length) {
       resolve(arr);
       return;
     }
     
     const [index, newHeight] = animations[i];
     const newArr = [...arr];
     newArr[index] = newHeight;
     setArray(newArr);
     
     i++;
     setTimeout(animate, delay);
   }
   
   animate();
 });
 
 function mergeSortHelper(mainArray, startIdx, endIdx, auxiliaryArray, animations) {
   if (startIdx === endIdx) return;
   const middleIdx = Math.floor((startIdx + endIdx) / 2);
   mergeSortHelper(auxiliaryArray, startIdx, middleIdx, mainArray, animations);
   mergeSortHelper(auxiliaryArray, middleIdx + 1, endIdx, mainArray, animations);
   doMerge(mainArray, startIdx, middleIdx, endIdx, auxiliaryArray, animations);
 }
 
 function doMerge(mainArray, startIdx, middleIdx, endIdx, auxiliaryArray, animations) {
   let k = startIdx;
   let i = startIdx;
   let j = middleIdx + 1;
   
   while (i <= middleIdx && j <= endIdx) {
     if (auxiliaryArray[i] <= auxiliaryArray[j]) {
       animations.push([k, auxiliaryArray[i]]);
       mainArray[k++] = auxiliaryArray[i++];
     } else {
       animations.push([k, auxiliaryArray[j]]);
       mainArray[k++] = auxiliaryArray[j++];
     }
   }
   
   while (i <= middleIdx) {
     animations.push([k, auxiliaryArray[i]]);
     mainArray[k++] = auxiliaryArray[i++];
   }
   
   while (j <= endIdx) {
     animations.push([k, auxiliaryArray[j]]);
     mainArray[k++] = auxiliaryArray[j++];
   }
 }
};

export { mergeSort};
