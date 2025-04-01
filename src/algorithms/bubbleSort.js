/**
 * Bubble sort implementation with visualization
 * @param {Array} array - The array to be sorted
 * @param {Function} setArray - State setter function to update the array
 * @param {Number} speed - Speed multiplier (0.25x to 2x)
 * @param {Object} pauseRef - Reference to pause state
 * @returns {Promise} - Resolves when sorting is complete
 */
const bubbleSort = (array, setArray, speed = 1, pauseRef) => {
 return new Promise((resolve) => {
   const delay = 1000 / speed;
   const arr = [...array];
   let i = 0;
   let j = 0;
   let swapped = false;
   
   const step = () => {
     if (pauseRef.current) {
       setTimeout(step, delay);
       return;
     }

     if (i >= arr.length) {
       resolve(arr);
       return;
     }
     
     if (j >= arr.length - i - 1) {
       i++;
       j = 0;
       
       if (!swapped) {
         resolve(arr);
         return;
       }
       
       swapped = false;
       setTimeout(step, delay / 4);
       return;
     }
     
     if (arr[j] > arr[j + 1]) {
       const temp = arr[j];
       arr[j] = arr[j + 1];
       arr[j + 1] = temp;
       swapped = true;
       setArray([...arr]);
     }
     
     j++;
     setTimeout(step, delay);
   };
   
   setTimeout(step, delay);
 });
};
export { bubbleSort };