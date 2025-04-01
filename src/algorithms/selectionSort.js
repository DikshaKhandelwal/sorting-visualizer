/**
 * Selection sort implementation with visualization
 * @param {Array} array - The array to be sorted
 * @param {Function} setArray - State setter function to update the array
 * @param {Number} speed - Speed multiplier (0.25x to 2x)
 * @returns {Promise} - Resolves when sorting is complete
 */
const selectionSort = (array, setArray, speed = 1, pauseRef) => {
 return new Promise((resolve) => {
   const delay = 1000 / speed;
   const arr = [...array];
   let i = 0;
   let j = 0;
   let minIndex = 0;
   
   const step = () => {
     if (pauseRef.current) {
       setTimeout(step, delay);
       return;
     }

     if (i >= arr.length - 1) {
       resolve(arr);
       return;
     }
     
     if (j === i) {
       minIndex = i;
       j++;
       setTimeout(step, delay / 2);
       return;
     }
     
     if (j >= arr.length) {
       // Swap the found minimum element with the first element
       if (minIndex !== i) {
         const temp = arr[i];
         arr[i] = arr[minIndex];
         arr[minIndex] = temp;
         setArray([...arr]);
       }
       
       i++;
       j = i;
       setTimeout(step, delay);
       return;
     }
     
     // Find the minimum element
     if (arr[j] < arr[minIndex]) {
       minIndex = j;
     }
     
     j++;
     setArray([...arr]);
     setTimeout(step, delay);
   };
   
   setTimeout(step, delay);
 });
};

export { selectionSort };
