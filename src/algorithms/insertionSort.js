/**
 * Insertion sort implementation with visualization
 * @param {Array} array - The array to be sorted
 * @param {Function} setArray - State setter function to update the array
 * @param {Number} speed - Speed multiplier (0.25x to 2x)
 * @returns {Promise} - Resolves when sorting is complete
 */
// Insertion sort implementation
const insertionSort = (array, setArray, speed = 1, pauseRef) => {
 return new Promise((resolve) => {
   const delay = 1000 / speed;
   const arr = [...array];
   let i = 1;
   let j = i;
   let current = arr[i];
   let comparing = true;
   
   const step = () => {
     if (pauseRef.current) {
       setTimeout(step, delay);
       return;
     }

     if (i >= arr.length) {
       resolve(arr);
       return;
     }
     
     if (comparing) {
       if (j > 0 && arr[j - 1] > current) {
         arr[j] = arr[j - 1];
         j--;
         setArray([...arr]);
         setTimeout(step, delay);
       } else {
         arr[j] = current;
         comparing = false;
         setArray([...arr]);
         setTimeout(step, delay);
       }
     } else {
       i++;
       if (i < arr.length) {
         j = i;
         current = arr[i];
         comparing = true;
       }
       setTimeout(step, delay);
     }
   };
   
   setTimeout(step, delay);
 });
};

export { insertionSort};
