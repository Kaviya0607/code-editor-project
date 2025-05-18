import React, { useState } from 'react';

function App() {
  const [code, setCode] = useState('print("Hello, World!")');
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [isRunning, setIsRunning] = useState(false);

  async function runCode() {
    setIsRunning(true);
    setOutput('Running...');
    try {
      const response = await fetch('http://localhost:5000/run', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          language: 'python',
          code,
          input,
        }),
      });
      const data = await response.json();
      setOutput(data.output || 'No output');
    } catch (error) {
      setOutput('Error: ' + error.message);
    }
    setIsRunning(false);
  }

  return (
    <div style={{ maxWidth: 700, margin: '20px auto', fontFamily: 'Arial, sans-serif' }}>
      <h2>Python Code Editor</h2>

      <label><b>Code:</b></label><br />
      <textarea
        rows={10}
        cols={80}
        value={code}
        onChange={(e) => setCode(e.target.value)}
        style={{ fontFamily: 'monospace', fontSize: 14 }}
        placeholder="Write your Python code here"
      />

      <br /><br />

      <label><b>Input (optional):</b></label><br />
      <textarea
        rows={3}
        cols={80}
        value={input}
        onChange={(e) => setInput(e.target.value)}
        style={{ fontFamily: 'monospace', fontSize: 14 }}
        placeholder="Enter input for your program..."
      />

      <br /><br />

      <button
        onClick={runCode}
        disabled={isRunning}
        style={{ padding: '10px 20px', fontSize: 16, cursor: isRunning ? 'wait' : 'pointer' }}
      >
        {isRunning ? 'Running...' : 'Run Code'}
      </button>

      <br /><br />

      <label><b>Output:</b></label><br />
      <textarea
        rows={10}
        cols={80}
        value={output}
        readOnly
        style={{ fontFamily: 'monospace', fontSize: 14, backgroundColor: '#f0f0f0' }}
        placeholder="Output will appear here"
      />
    </div>
  );
}

export default App;
