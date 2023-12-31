import React, { useState } from 'react';
import styles from "../styles/contactForm.module.css";

const ContactForm = () => {
  const [file1, setFile1] = useState(null);
  const [file2, setFile2] = useState(null);
  const [name, setName] = useState('');

  const handleQuestion1Submit = async (e) => {
    e.preventDefault();

    const formData1 = new FormData();
    formData1.append('fileInput', file1);

    try {
      // Send question 1 data to /process-datavis
      await fetch('https://backend101-7d354c8ad6cc.herokuapp.com/process-datavis', {
        method: 'POST',
        body: formData1,
      });

      // Reset form fields
      setFile1(null);

      // Show success message
      alert('Question 1 submitted successfully!');
    } catch (error) {
      console.error('Error:', error);
      // Show error message
      alert('An error occurred. Please try again.');
    }
  };

  const handleQuestion2Submit = async (e) => {
    e.preventDefault();

    const formData2 = new FormData();
    formData2.append('file1', file2[0]);
    formData2.append('file2', file2[1]);
    formData2.append('name', name);

    try {
      // Send question 2 data to /process-files
      const response = await fetch('https://backend101-7d354c8ad6cc.herokuapp.com/process-files', {
        method: 'POST',
        body: formData2,
      });

      if (response.ok) {
        // Convert the response to a Blob object
        const blob = await response.blob();

        // Create a download link for the Excel file
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'result.xlsx';
        link.click();

        // Reset form fields
        setFile2(null);
        setName('');

        // Show success message
        alert('Question 2 submitted successfully!');
      } else {
        throw new Error('Response not OK');
      }
    } catch (error) {
      console.error('Error:', error);
      // Show error message
      alert('An error occurred. Please try again.');
    }
  };

  return (
    <div className={styles.container}>
      <form className={styles.form}>
        <div>
          <label htmlFor="file1">Upload Global data sheet for visualisations </label>
          <input type="file" id="file1" accept=".xlsx,.xls" onChange={(e) => setFile1(e.target.files[0])} />
          <button type="submit" onClick={handleQuestion1Submit}>Submit Question 1</button>
        </div>
        <div>
          <label htmlFor="file2">Question 2: Upload Two Excel Sheets</label>
          <input type="file" id="file2" accept=".xlsx,.xls" multiple onChange={(e) => setFile2(e.target.files)} />
          <div>
            <label htmlFor="name">Name</label>
            <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} />
          </div>
          <button type="submit" onClick={handleQuestion2Submit}>Submit Question 2</button>
        </div>
      </form>
    </div>
  );
};

export default ContactForm;
