/**
 * Heap sort implementation with visualization
 * @param {Array} array - The array to be sorted
 * @param {Function} setArray - State setter function to update the array
 * @param {Number} speed - Speed multiplier (0.25x to 2x)
 * @returns {Promise} - Resolves when sorting is complete
 */
// Heap sort implementation
const heapSort = (array, setArray, speed = 1, pauseRef) => {
  return new Promise((resolve) => {
    const delay = 1000 / speed;
    const arr = [...array];
    const animations = [];
    
    // Create animation instructions
    heapSortHelper(arr, animations);
    
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
      
      const [idx1, idx2] = animations[i];
      const newArr = [...arr];
      const temp = newArr[idx1];
      newArr[idx1] = newArr[idx2];
      newArr[idx2] = temp;
      
      setArray(newArr);
      i++;
      setTimeout(animate, delay);
    }
    
    animate();
  });
  
  function heapSortHelper(arr, animations) {
    const n = arr.length;
    
    // Build max heap
    for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
      heapify(arr, n, i, animations);
    }
    
    // Extract elements from heap one by one
    for (let i = n - 1; i > 0; i--) {
      animations.push([0, i]);
      const temp = arr[0];
      arr[0] = arr[i];
      arr[i] = temp;
      
      heapify(arr, i, 0, animations);
    }
  }
  
  function heapify(arr, n, i, animations) {
    let largest = i;
    const left = 2 * i + 1;
    const right = 2 * i + 2;
    
    if (left < n && arr[left] > arr[largest]) {
      largest = left;
    }
    
    if (right < n && arr[right] > arr[largest]) {
      largest = right;
    }
    
    if (largest !== i) {
      animations.push([i, largest]);
      const swap = arr[i];
      arr[i] = arr[largest];
      arr[largest] = swap;
      
      heapify(arr, n, largest, animations);
    }
  }
};

export { heapSort };
