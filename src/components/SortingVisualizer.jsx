import React, { useState, useEffect, useRef } from "react";
import { bubbleSort } from "../algorithms/bubbleSort";
import { selectionSort } from "../algorithms/selectionSort";
import { insertionSort } from "../algorithms/insertionSort";
import { mergeSort } from "../algorithms/mergeSort";
import { quickSort } from "../algorithms/quickSort";
import { heapSort } from "../algorithms/heapSort";
import "./styles.css";


const SortingVisualizer = () => {
  const [array, setArray] = useState([]);
  const [sorting, setSorting] = useState(false);
  const [sortType, setSortType] = useState("");
  const [arraySize, setArraySize] = useState(50);
  const [sortSpeed, setSortSpeed] = useState(1); // Change default to 1 (normal speed)
  const [darkMode, setDarkMode] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [isCustomInputOpen, setIsCustomInputOpen] = useState(false);
  const [customArrayInput, setCustomArrayInput] = useState("");
  const pauseRef = useRef(false);

  // Add speed options
  const speedOptions = [
    { value: 0.25, label: "0.25x" },
    { value: 0.5, label: "0.5x" },
    { value: 1, label: "1x" },
    { value: 1.5, label: "1.5x" },
    { value: 2, label: "2x" },
  ];

  // Algorithm color definitions - using a single color per algorithm with different shades
  const algorithmColors = {
    bubble: {
      base: "#3b82f6", // blue-500
      light: "#93c5fd", // blue-300
      dark: "#1d4ed8"   // blue-700
    },
    selection: {
      base: "#8b5cf6", // violet-500
      light: "#c4b5fd", // violet-300
      dark: "#6d28d9"   // violet-700
    },
    insertion: {
      base: "#10b981", // emerald-500
      light: "#6ee7b7", // emerald-300
      dark: "#047857"   // emerald-700
    },
    merge: {
      base: "#ef4444", // red-500
      light: "#fca5a5", // red-300
      dark: "#b91c1c"   // red-700
    },
    quick: {
      base: "#f59e0b", // amber-500
      light: "#fcd34d", // amber-300
      dark: "#b45309"   // amber-700
    },
    heap: {
      base: "#ec4899", // pink-500
      light: "#f9a8d4", // pink-300
      dark: "#be185d"   // pink-700
    }
  };

  // Updated algorithm button definitions with improved text styles
  const algorithmButtons = [
    { name: "Bubble Sort", key: "bubble", bgColor: "bg-blue-500", textColor: "text-black text-xl font-bold", hoverColor: "hover:bg-blue-600", activeColor: "active:bg-blue-700", darkBgColor: "dark:bg-blue-600", darkHoverColor: "dark:hover:bg-blue-700", darkTextColor: "dark:text-white" },
    { name: "Selection Sort", key: "selection", bgColor: "bg-violet-500", textColor: "text-black text-xl font-bold", hoverColor: "hover:bg-violet-600", activeColor: "active:bg-violet-700", darkBgColor: "dark:bg-violet-600", darkHoverColor: "dark:hover:bg-violet-700", darkTextColor: "dark:text-white" },
    { name: "Insertion Sort", key: "insertion", bgColor: "bg-emerald-500", textColor: "text-black text-xl font-bold", hoverColor: "hover:bg-emerald-600", activeColor: "active:bg-emerald-700", darkBgColor: "dark:bg-emerald-600", darkHoverColor: "dark:hover:bg-emerald-700", darkTextColor: "dark:text-white" },
    { name: "Merge Sort", key: "merge", bgColor: "bg-red-500", textColor: "text-black text-xl font-bold", hoverColor: "hover:bg-red-600", activeColor: "active:bg-red-700", darkBgColor: "dark:bg-red-600", darkHoverColor: "dark:hover:bg-red-700", darkTextColor: "dark:text-white" },
    { name: "Quick Sort", key: "quick", bgColor: "bg-amber-500", textColor: "text-black text-xl font-bold", hoverColor: "hover:bg-amber-600", activeColor: "active:bg-amber-700", darkBgColor: "dark:bg-amber-600", darkHoverColor: "dark:hover:bg-amber-700", darkTextColor: "dark:text-white" },
    { name: "Heap Sort", key: "heap", bgColor: "bg-pink-500", textColor: "text-black text-xl font-bold", hoverColor: "hover:bg-pink-600", activeColor: "active:bg-pink-700", darkBgColor: "dark:bg-pink-600", darkHoverColor: "dark:hover:bg-pink-700", darkTextColor: "dark:text-white" }
  ];

  useEffect(() => {
    resetArray();
  }, [arraySize]);

  const resetArray = () => {
    setArray(generateRandomArray(arraySize));
    setSorting(false);
    setSortType("");
  };

  const handleCustomArraySubmit = (e) => {
    e.preventDefault();
    try {
      const newArray = customArrayInput
        .split(/[,\s]+/)
        .map(num => parseInt(num.trim()))
        .filter(num => !isNaN(num));

      if (newArray.length < 2) {
        alert("Please enter at least 2 valid numbers");
        return;
      }

      setArray(newArray);
      setIsCustomInputOpen(false);
      setCustomArrayInput("");
    } catch (error) {
      alert("Invalid input. Please enter numbers separated by commas or spaces");
    }
  };

  const handleSort = (algorithm) => {
    if (sorting) return;
    
    setSorting(true);
    setSortType(algorithm);
    pauseRef.current = false;
    setIsPaused(false);
    
    // Use fallback sorting implementations if the imported algorithms don't exist
    const sortingFunctions = {
      bubble: bubbleSort,
      selection: selectionSort,
      merge: mergeSort,
      quick: quickSort,
      insertion: insertionSort,
      heap: heapSort
    };
    
    // Try to use the imported algorithms first, if available
    try {
      const importedAlgorithms = {
        bubble: window.bubbleSort,
        selection: window.selectionSort,
        merge: window.mergeSort,
        quick: window.quickSort,
        insertion: window.insertionSort,
        heap: window.heapSort
      };
      
      // Check if we can use the imported sorting algorithm
      if (typeof importedAlgorithms[algorithm] === 'function') {
        importedAlgorithms[algorithm]([...array], setArray, sortSpeed, pauseRef)
          .then(() => {
            setSorting(false);
          })
          .catch(err => {
            console.error(err);
            setSorting(false);
          });
      } else {
        // Otherwise use our fallback implementation
        sortingFunctions[algorithm]([...array], setArray, sortSpeed, pauseRef)
          .then(() => {
            setSorting(false);
          })
          .catch(err => {
            console.error(err);
            setSorting(false);
          });
      }
    } catch (error) {
      // If there's any error, use the fallback
      console.warn(`Using fallback ${algorithm} sort implementation`);
      sortingFunctions[algorithm]([...array], setArray, sortSpeed, pauseRef)
        .then(() => {
          setSorting(false);
        })
        .catch(err => {
          console.error(err);
          setSorting(false);
        });
    }
  };

  const handlePauseResume = () => {
    setIsPaused(!isPaused);
    pauseRef.current = !pauseRef.current;
  };

  const generateRandomArray = (size) => {
    return Array.from({ length: size }, () => Math.floor(Math.random() * 500) + 10);
  };

  const getBarColor = (index, value) => {
    if (!sorting) return darkMode ? "rgb(129, 140, 248)" : "rgb(79, 70, 229)";
    
    if (!algorithmColors[sortType]) return darkMode ? "rgb(129, 140, 248)" : "rgb(79, 70, 229)";
    
    // Calculate a shade based on the value's position in the array
    // This will create a gradient effect with the same base color
    const colorObj = algorithmColors[sortType];
    const position = value / 500; // Normalize between 0 and 1
    
    // Interpolate between light and dark shades based on position
    const r1 = parseInt(colorObj.light.slice(1, 3), 16);
    const g1 = parseInt(colorObj.light.slice(3, 5), 16);
    const b1 = parseInt(colorObj.light.slice(5, 7), 16);
    
    const r2 = parseInt(colorObj.dark.slice(1, 3), 16);
    const g2 = parseInt(colorObj.dark.slice(3, 5), 16);
    const b2 = parseInt(colorObj.dark.slice(5, 7), 16);
    
    const r = Math.floor(r1 + (r2 - r1) * position);
    const g = Math.floor(g1 + (g2 - g1) * position);
    const b = Math.floor(b1 + (b2 - b1) * position);
    
    return `rgb(${r}, ${g}, ${b})`;
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${darkMode ? "bg-gray-900 text-white" : "bg-gray-50 text-gray-900"}`}>
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Sorting Visualizer</h1>
          <button 
            onClick={() => setDarkMode(!darkMode)} 
            className={`p-2 rounded-full ${darkMode ? "bg-yellow-400 text-gray-900" : "bg-gray-800 text-white"}`}
          >
            {darkMode ? "🌞" : "🌙"}
          </button>
        </div>
        
        <div className="bg-white shadow-lg rounded-lg overflow-hidden mb-8 dark:bg-gray-800">
          <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex flex-wrap justify-between items-center gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Array Size: {arraySize}
              </label>
              <input
                type="range"
                min="10"
                max="100"
                value={arraySize}
                onChange={(e) => setArraySize(parseInt(e.target.value))}
                disabled={sorting}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-300 dark:text-white-300 mb-1">
                Sort Speed
              </label>
              <select
                value={sortSpeed}
                onChange={(e) => setSortSpeed(parseFloat(e.target.value))}
                disabled={sorting}
                className="w-full p-2 bg-gray-50 rounded-md border border-gray-300 focus:ring-2 focus:ring-blue-500 dark:bg-gray-600 dark:border-gray-600 text-black font-medium"
              >
                {speedOptions.map((option) => (
                  <option 
                    key={option.value} 
                    value={option.value} 
                    className="bg-gray-50 dark:bg-gray-600 text-black font-medium"
                  >
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
            
            <div className="flex gap-2">
              <button
                onClick={resetArray}
                disabled={sorting}
                className={`px-4 py-2 rounded-md font-medium text-lg ${
                  sorting
                    ? "bg-gray-300 text-gray-700 cursor-not-allowed dark:bg-gray-700 dark:text-gray-400"
                    : "bg-green-500 text-black font-bold hover:bg-green-600 active:bg-green-700 dark:bg-green-600 dark:hover:bg-green-700 dark:text-white"
                }`}
              >
                Reset Array
              </button>

              <button
                onClick={() => setIsCustomInputOpen(true)}
                disabled={sorting}
                className={`px-4 py-2 rounded-md font-medium text-lg ${
                  sorting
                    ? "bg-gray-300 text-gray-700 cursor-not-allowed dark:bg-gray-700 dark:text-gray-400"
                    : "bg-blue-500 text-black font-bold hover:bg-blue-600 active:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-700 dark:text-white"
                }`}
              >
                Custom Array
              </button>
              
              {sorting && (
                <button
                  onClick={handlePauseResume}
                  className="px-4 py-2 rounded-md font-bold text-lg bg-yellow-500 text-black hover:bg-yellow-600 active:bg-yellow-700 dark:bg-yellow-600 dark:hover:bg-yellow-700 dark:text-white"
                >
                  {isPaused ? "Resume" : "Pause"}
                </button>
              )}
            </div>
          </div>
          
          <div className="p-4">
            <div className="array-container h-96 flex items-end justify-center gap-px">
              {array.map((value, index) => (
                <div
                  key={index}
                  className="array-bar transition-all duration-100"
                  style={{
                    height: `${value}px`,
                    width: `${Math.max(2, 800 / arraySize)}px`,
                    backgroundColor: getBarColor(index, value),
                    transition: sorting ? "height 0.1s ease" : "none"
                  }}
                ></div>
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
          {algorithmButtons.map((algo) => (
            <button
              key={algo.key}
              onClick={() => handleSort(algo.key)}
              disabled={sorting}
              className={`relative overflow-hidden px-4 py-3 rounded-lg font-medium transition-colors ${
                sorting
                  ? "bg-gray-300 text-gray-700 cursor-not-allowed dark:bg-gray-700 dark:text-gray-400"
                  : `${algo.bgColor} ${algo.textColor} ${algo.hoverColor} ${algo.activeColor} ${algo.darkBgColor} ${algo.darkHoverColor} ${algo.darkTextColor}`
              } ${sortType === algo.key ? "ring-4 ring-offset-2 ring-offset-gray-50 ring-blue-500 dark:ring-offset-gray-900" : ""}`}
            >
              {algo.name}
              {sorting && sortType === algo.key && (
                <span className="absolute inset-0 flex justify-center items-center bg-black bg-opacity-20">
                  <span className="h-4 w-4 rounded-full border-2 border-current border-t-transparent animate-spin"></span>
                </span>
              )}
            </button>
          ))}
        </div>

        <div className={`bg-white shadow rounded-lg p-4 dark:bg-gray-800 transition-all ${sorting ? "opacity-100" : "opacity-0"}`}>
          <h3 className="text-lg text-white dark:text-white font-medium mb-2">
            {sorting ? `Running ${sortType.charAt(0).toUpperCase() + sortType.slice(1)} Sort...` : "Select an algorithm to start"}
          </h3>
          <div className="text-sm text-gray-600 dark:text-gray-400">
            <p>
              {sorting ? "Watch the visualization in real-time. The speed of the animation can be adjusted using the dropdown above." : ""}
            </p>
          </div>
        </div>
      </div>

      {/* Custom Array Input Modal */}
      {isCustomInputOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-md w-full mx-4">
            <h3 className="text-lg font-medium mb-4">Enter Custom Array</h3>
            <form onSubmit={handleCustomArraySubmit}>
              <textarea
                value={customArrayInput}
                onChange={(e) => setCustomArrayInput(e.target.value)}
                placeholder="Enter numbers separated by commas or spaces (e.g., 64, 34, 25, 12, 22, 11, 90)"
                className="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 mb-4"
                rows={4}
              />
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsCustomInputOpen(false)}
                  className="px-4 py-2 rounded-md bg-gray-200 text-gray-800 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-md bg-blue-500 text-black font-bold hover:bg-blue-600 dark:text-white"
                >
                  Apply
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default SortingVisualizer;