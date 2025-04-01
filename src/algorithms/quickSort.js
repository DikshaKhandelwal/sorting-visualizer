/**
 * Quick sort implementation with visualization
 * @param {Array} array - The array to be sorted
 * @param {Function} setArray - State setter function to update the array
 * @param {Number} speed - Speed multiplier (0.25x to 2x)
 * @returns {Promise} - Resolves when sorting is complete
 */
// Quick sort implementation
const quickSort = (array, setArray, speed = 1, pauseRef) => {
 return new Promise((resolve) => {
   const delay = 1000 / speed;
   const arr = [...array];
   const animations = [];
   
   // Create animation instructions
   quickSortHelper(arr, 0, arr.length - 1, animations);
   
   // Play the animations
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
     
     const [action, indices] = animations[i];
     const newArr = [...arr];
     
     if (action === 'swap') {
       const [idx1, idx2] = indices;
       const temp = newArr[idx1];
       newArr[idx1] = newArr[idx2];
       newArr[idx2] = temp;
     }
     
     setArray(newArr);
     i++;
     setTimeout(animate, delay);
   }
   
   animate();
 });
 
 function quickSortHelper(arr, low, high, animations) {
   if (low < high) {
     const partitionIndex = partition(arr, low, high, animations);
     quickSortHelper(arr, low, partitionIndex - 1, animations);
     quickSortHelper(arr, partitionIndex + 1, high, animations);
   }
 }
 
 function partition(arr, low, high, animations) {
   const pivot = arr[high];
   let i = low - 1;
   
   for (let j = low; j < high; j++) {
     if (arr[j] < pivot) {
       i++;
       animations.push(['swap', [i, j]]);
       const temp = arr[i];
       arr[i] = arr[j];
       arr[j] = temp;
     }
   }
   
   animations.push(['swap', [i + 1, high]]);
   const temp = arr[i + 1];
   arr[i + 1] = arr[high];
   arr[high] = temp;
   
   return i + 1;
 }
};


export { quickSort};
