import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Task1 = () => {
  const [fields, setFields] = useState([{ name: '', value: '' }]);
  const [data, setData] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:9000/get-task1');
        setData(response.data);
      } catch (err) {
        console.error('Error fetching data:', err);
        setError('Failed to fetch data');
      }
    };
    fetchData();
  }, []);

  const addField = () => setFields([...fields, { name: '', value: '' }]);

  const removeField = (index) =>
    setFields(fields.filter((_, i) => i !== index));

  const updateField = (index, key, value) => {
    const newFields = [...fields];
    newFields[index][key] = value;
    setFields(newFields);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:9000/add-task1', {
        fields,
      });
      console.log('Data submitted:', response.data);
      setData((prev) => [...prev, ...fields]);
      setFields([{ name: '', value: '' }]); 
    } catch (err) {
      console.error('Something went wrong:', err);
      setError('Failed to submit data');
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <form onSubmit={handleSubmit} className="space-y-4">
        {fields.map((field, index) => (
          <div key={index} className="flex items-center space-x-2">
            <input
              type="text"
              value={field.name}
              onChange={(e) => updateField(index, 'name', e.target.value)}
              placeholder="Field Name"
              className="border rounded px-2 py-1 flex-1"
            />
            <input
              type="text"
              value={field.value}
              onChange={(e) => updateField(index, 'value', e.target.value)}
              placeholder="Field Value"
              className="border rounded px-2 py-1 flex-1"
            />
            {fields.length > 1 && (
              <button
                type="button"
                onClick={() => removeField(index)}
                className="text-red-500"
              >
                Remove
              </button>
            )}
          </div>
        ))}
        <button
          type="button"
          onClick={addField}
          className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
        >
          Add Field
        </button>
        <button
          type="submit"
          className="bg-green-500 text-white px-4 py-2 rounded"
        >
          Submit
        </button>
      </form>

      {error && <p className="text-red-500 mt-4">{error}</p>}
      {data.length > 0 && (
        <table className="mt-4 w-full border">
          <thead>
            <tr>
              <th className="border px-4 py-2">Field Name</th>
              <th className="border px-4 py-2">Field Value</th>
            </tr>
          </thead>
          <tbody>
            {data.map((row, index) => (
              <tr key={index}>
                <td className="border px-4 py-2">{row.name}</td>
                <td className="border px-4 py-2">{row.value}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Task1;
