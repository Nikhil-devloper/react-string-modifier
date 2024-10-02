import React, { useState } from 'react';
import { Clipboard } from 'lucide-react';

const App = () => {
  const [inputString, setInputString] = useState('');
  const [result, setResult] = useState('');
  const [copied, setCopied] = useState(false);

  const handleModify = () => {
    const resultString = `find . -type f \\( -name 'config.json' -o -name 'globalConfig.json' \\) -exec sed -i '' -E 's/"vaultToken": "[^"]*"/"vaultToken": "${inputString}"/' {} \\;`;
    setResult(resultString);
    navigator.clipboard.writeText(resultString);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-[350px] p-4 bg-white">
      <h2 className="text-xl font-bold mb-3 text-gray-800">Vault Token Updater</h2>
      <input
        type="text"
        value={inputString}
        onChange={(e) => setInputString(e.target.value)}
        placeholder="Enter new vault token"
        className="w-full px-3 py-2 text-sm text-gray-700 border rounded focus:outline-none focus:border-blue-500 mb-3"
      />
      <button 
        onClick={handleModify} 
        className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition duration-300 flex items-center justify-center text-sm"
      >
        <Clipboard className="mr-2" size={16} />
        {copied ? 'Copied!' : 'Copy to Clipboard'}
      </button>
      {result && (
        <div className="mt-3 p-2 bg-gray-100 rounded text-xs">
          <h3 className="font-semibold text-gray-700 mb-1">Generated Command:</h3>
          <p className="text-gray-600 break-all">{result}</p>
        </div>
      )}
    </div>
  );
};

export default App;
