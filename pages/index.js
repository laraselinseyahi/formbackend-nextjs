import React, { useState } from 'react';
import styles from "../styles/contactForm.module.css";


const ContactForm = () => {
  const [file1, setFile1] = useState(null);
  const [name_patients, setName2] = useState('');
  const [file3, setFile3] = useState(null);
  const [file2a, setFile2a] = useState(null);
  const [file2b, setFile2b] = useState(null);
  const [name, setName] = useState('');

  const handleQuestion1Submit = async (e) => {
    e.preventDefault();

    const formData1 = new FormData();
    formData1.append('fileInput', file1);

    try {
      // Send question 1 data to /process-datavis
      const response = await fetch('https://backend101-7d354c8ad6cc.herokuapp.com/process-datavis', {
        method: 'POST',
        body: formData1,
      });
      
      if (response.ok) {
        const blob = await response.blob();
  
        // Create a download link for the HTML file
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'result.html';
        link.click();
  
        // Show success message
        alert('Question 1 submitted successfully!');
      } else {
        throw new Error('Response not OK');
      }
    } catch (error) {
      console.error('Error:', error);
      // Show error message
      alert('An error occurred. Please try again.');
    }
  };

  const handleQuestion3Submit = async (e) => {
    e.preventDefault();

    const formData3 = new FormData();
    formData3.append('fileInputsubset', file3);
    formData3.append('patientnames', name_patients);

    try {
      // Send question 1 data to /process-datavis
      const response = await fetch('https://backend101-7d354c8ad6cc.herokuapp.com/datavis-subset', {
        method: 'POST',
        body: formData3,
      });
      
      if (response.ok) {
        const blob = await response.blob();
  
        // Create a download link for the HTML file
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'result.html';
        link.click();
  
        // Show success message
        alert('Question 3 submitted successfully!');
      } else {
        throw new Error('Response not OK');
      }
    } catch (error) {
      console.error('Error:', error);
      // Show error message
      alert('An error occurred. Please try again.');
    }
  };


  const handleQuestion2Submit = async (e) => {
    e.preventDefault();

    const formData2 = new FormData();
    formData2.append('globalfile', file2a);
    formData2.append('patientfile', file2b);
    formData2.append('username', name_patients);



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
       // setFile2(null);
       // setName('');

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
      <body className={styles.body}>
      <form className={styles.form}>
        <div>
          <label htmlFor="file1"  className={styles.label}>Upload Global data sheet for global visualisations </label>
          <input type="file" name="file1" id="file1" accept=".xlsx,.xls" onChange={(e) => setFile1(e.target.files[0])} />
          <button type="submit" onClick={handleQuestion1Submit} className={styles.button}>Create Global Data Visualizations</button>
        </div>
        <div></div>
        <div></div>
        <div>
          <label htmlFor="file3"  className={styles.label}>Upload Global data sheet for subset visualisations </label>
          <input type="file" name="file3" id="file3" accept=".xlsx,.xls" onChange={(e) => setFile3(e.target.files[0])} />
        <div>
          <label htmlFor="name_patients" className={styles.label}>Input patient names for subset visualisations</label>
          <input type="text" name="name_patients" id="name_patients" value={name_patients} onChange={(e) => setName2(e.target.value)} />
        </div>
          <button type="submit" onClick={handleQuestion3Submit} className={styles.button}>Create Subset Data Visualizations</button>
        </div>
        <div>
        <div></div>
        </div>
        <div>
          <label htmlFor="file2a" className={styles.label}>Upload global data sheet</label>
          <input type="file" name="file2a" id="file2a" accept=".xlsx,.xls" onChange={(e) => setFile2a(e.target.files[0])} />
        </div>
        <div>
          <label htmlFor="file2b" className={styles.label}>Upload patient data sheet</label>
          <input type="file" name="file2b" id="file2b" accept=".xlsx,.xls" onChange={(e) => setFile2b(e.target.files[0])} />
        </div>
        <div>
          <label htmlFor="name" className={styles.label}>Input patient name</label>
          <input type="text" name="name" id="name" value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <div>
          <button type="submit" onClick={handleQuestion2Submit} className={styles.button}>Carry patient data to global</button>
        </div>
      </form>
      </body>
    </div>
  );
};

export default ContactForm;
