import { useState, useEffect } from 'react';
import * as XLSX from 'xlsx';
import axios from 'axios';

const Task2 = () => {
    const [data, setData] = useState([]);
    const [fileData, setFileData] = useState(null);

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                const ab = e.target.result;
                const wb = XLSX.read(ab, { type: 'array' });
                const sheetName = wb.SheetNames[0];
                const ws = wb.Sheets[sheetName];
                const jsonData = XLSX.utils.sheet_to_json(ws);
                setFileData(jsonData);
            };
            reader.readAsArrayBuffer(file);
        }
    };

    const handleUpload = async () => {
        try {
            await axios.post('http://localhost:9000/add-task2', { data: fileData });
            alert("Data uploaded successfully");
        } catch (error) {
            console.error("Error uploading data", error);
            alert("Error uploading data");
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:9000/get-task2');
                setData(response.data);
            } catch (error) {
                console.error("Error fetching data", error);
            }
        };

        fetchData();
    }, [handleUpload]);

    return (
        <div>
            <div>
                <input type="file" accept=".xlsx, .xls" onChange={handleFileChange} />
                {fileData && (
                    <div>
                        <button onClick={handleUpload}
                            className="bg-green-500 text-white px-4 py-2 rounded"
                        >Upload Data</button>
                    </div>
                )}
            </div>
            <h2>Stored Data</h2>
            <table className="mt-4 w-full border" border="1">
                <thead>
                    <tr>
                        {data.length > 0 && Object.keys(data[0]).map((key) => (
                            <th key={key}>{key}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {data.map((row, index) => (
                        <tr key={index}>
                            {Object.values(row).map((value, idx) => (
                                <td key={idx}>{value}</td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Task2;


