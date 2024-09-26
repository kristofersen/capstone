import React, { useState } from 'react';
import axios from 'axios';

const AppTest: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [age, setAge] = useState<number | ''>('');
  const [address, setAddress] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isActive, setIsActive] = useState(false);
  const [files, setFiles] = useState<{
    document1: File | null;
    document2: File | null;
    document3: File | null;
  }>({
    document1: null,
    document2: null,
    document3: null,
  });

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>, doc: 'document1' | 'document2' | 'document3') => {
    const selectedFiles = event.target.files;
  if (selectedFiles && selectedFiles.length > 0) {
    setFiles((prev) => ({
      ...prev,
      [doc]: selectedFiles[0],
    }));
  } else {
    setFiles((prev) => ({
      ...prev,
      [doc]: null, 
    }));
  }
};
const logFormData = (formData: FormData) => {
    for (const [key, value] of formData.entries()) {
      console.log(`${key}:`, value);
    }
  };


  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('name', name);
    formData.append('email', email);
    formData.append('age', String(age));
    formData.append('address', address);
    formData.append('phoneNumber', phoneNumber);
    formData.append('isActive', String(isActive));

    if (files.document1) formData.append('document1', files.document1);
    if (files.document2) formData.append('document2', files.document2);
    if (files.document3) formData.append('document3', files.document3);

    logFormData(formData);

    try {
      const response = await axios.post('http://localhost:3000/apptesting', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Name"
        required
      />
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        required
      />
      <input
        type="number"
        value={age}
        onChange={(e) => setAge(Number(e.target.value))}
        placeholder="Age"
        required
      />
      <input
        type="text"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        placeholder="Address"
        required
      />
        <input
            type="text"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            placeholder="Phone Number"
            required
        />
        <label>
            Is Active:
            <input
            type="checkbox"
            checked={isActive}
            onChange={() => setIsActive(!isActive)}
            />
        </label>
      <input type="file" onChange={(e) => handleFileChange(e, 'document1')} required />
      <input type="file" onChange={(e) => handleFileChange(e, 'document2')} required />
      <input type="file" onChange={(e) => handleFileChange(e, 'document3')} required />
      <button type="submit">Submit</button>
    </form>
  );
};

export default AppTest;