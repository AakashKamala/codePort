import React, { useState } from 'react';
import axios from 'axios';
import './CodeConverter.css';

const CodeConverter = () => {
  const [code, setCode] = useState('');
  const [targetLanguage, setTargetLanguage] = useState('');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    try {
      setLoading(true);

      const response = await axios.get(
        `http://localhost:7000/api/code/codeconverter?message=${encodeURIComponent(
          code
        )}&targetLanguage=${encodeURIComponent(targetLanguage)}`
      );

      setResult(response.data.response);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="code-converter-container">
      <h1>CodePort</h1>
      <div className="input-section">
        <label htmlFor="codeInput">Source Code:</label>
        <textarea id="codeInput" value={code} onChange={(e) => setCode(e.target.value)} />
      </div>
      <div className="input-section">
        <label htmlFor="languageInput">Target Language:</label>
        <input
          id="languageInput"
          type="text"
          value={targetLanguage}
          onChange={(e) => setTargetLanguage(e.target.value)}
        />
      </div>
      <div className="button-section">
        <button onClick={handleSubmit} disabled={loading}>
          {loading ? 'Converting...' : 'Convert Code'}
        </button>
      </div>
      <div className="result-section">
        <h2>Result:</h2>
        <pre>{result}</pre>
      </div>
    </div>
  );
};

export default CodeConverter;
