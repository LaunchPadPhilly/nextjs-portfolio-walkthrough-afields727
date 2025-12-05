"use client";
import React, { useState } from 'react';

const TechnologyInput = ({ technologies, onChange }) => {
  const [inputValue, setInputValue] = useState('');
  const predefinedTechnologies = ['JavaScript', 'React', 'Next.js', 'Tailwind CSS', 'Node.js'];

  const handleAdd = () => {
    if (inputValue && !technologies.includes(inputValue)) {
      onChange([...technologies, inputValue]);
      setInputValue('');
    }
  };

  const handleRemove = (techToRemove) => {
    onChange(technologies.filter(tech => tech !== techToRemove));
  };

  const handlePredefinedClick = (tech) => {
    if (!technologies.includes(tech)) {
      onChange([...technologies, tech]);
    }
  };

  return (
    <div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px', marginBottom: '10px' }}>
        {predefinedTechnologies.map(tech => (
          <button
            key={tech}
            type="button"
            onClick={() => handlePredefinedClick(tech)}
            disabled={technologies.includes(tech)}
            style={{ padding: '5px 10px', borderRadius: '5px', border: '1px solid #ccc' }}
          >
            {tech}
          </button>
        ))}
      </div>
      <div style={{ display: 'flex', gap: '10px' }}>
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyPress={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault();
              handleAdd();
            }
          }}
          placeholder="Type a technology"
          style={{ flexGrow: 1, padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }}
        />
        <button
          type="button"
          onClick={handleAdd}
          style={{ padding: '8px 15px', background: '#0070f3', color: 'white', border: 'none', borderRadius: '4px' }}
        >
          Add
        </button>
      </div>
      <div style={{ marginTop: '10px', display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
        {technologies.map(tech => (
          <div key={tech} style={{ background: '#eee', padding: '5px 10px', borderRadius: '5px', display: 'flex', alignItems: 'center' }}>
            {tech}
            <button
              type="button"
              aria-label="Remove"
              onClick={() => handleRemove(tech)}
              style={{ marginLeft: '10px', background: 'transparent', border: 'none', cursor: 'pointer', color: 'red', fontWeight: 'bold' }}
            >
              &times;
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TechnologyInput;
