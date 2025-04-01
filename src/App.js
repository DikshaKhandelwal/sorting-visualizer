import React from 'react';
import SortingVisualizer from './components/SortingVisualizer';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Algorithm Visualizer</h1>
        <p>A tool to visualize sorting algorithms</p>
      </header>
      
      <main>
        <SortingVisualizer />
      </main>
      
      <footer>
        <div className="container">
          <p>
            This visualizer helps understand how different sorting algorithms work by animating the process.
          </p>
          <div className="algorithm-info">
            <h3>About the algorithms:</h3>
            <div className="algo-grid">
              <div className="algo-card">
                <h4>Bubble Sort</h4>
                <p>Time Complexity: O(n²)</p>
                <p>Space Complexity: O(1)</p>
              </div>
              <div className="algo-card">
                <h4>Selection Sort</h4>
                <p>Time Complexity: O(n²)</p>
                <p>Space Complexity: O(1)</p>
              </div>
              <div className="algo-card">
                <h4>Insertion Sort</h4>
                <p>Time Complexity: O(n²)</p>
                <p>Space Complexity: O(1)</p>
              </div>
              <div className="algo-card">
                <h4>Merge Sort</h4>
                <p>Time Complexity: O(n log n)</p>
                <p>Space Complexity: O(n)</p>
              </div>
              <div className="algo-card">
                <h4>Quick Sort</h4>
                <p>Time Complexity: O(n log n)</p>
                <p>Space Complexity: O(log n)</p>
              </div>
              <div className="algo-card">
                <h4>Heap Sort</h4>
                <p>Time Complexity: O(n log n)</p>
                <p>Space Complexity: O(1)</p>
              </div>
            </div>
          </div>
        </div>
      </footer>

      <footer className="bg-gray-100 dark:bg-gray-800 py-8">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
              Sorting Visualizer
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Created by{" "}
              <span className="font-semibold text-indigo-600 dark:text-indigo-400">
                Diksha Khandelwal
              </span>
            </p>
            <div className="border-t border-gray-200 dark:border-gray-700 pt-4 mt-4">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                © {new Date().getFullYear()} All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;