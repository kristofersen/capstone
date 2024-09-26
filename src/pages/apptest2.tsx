import React, { useState } from 'react';
import axios from 'axios';

interface ApplicationForm {
  age: number;
  address: string;
  phoneNumber: string;
  isActive: boolean;
}

interface Person {
  name: string;
  email: string;
  applicationForm: ApplicationForm;
  files: {
    document1: string | null;
    document2: string | null;
    document3: string | null;
  };
}

const AppTest2: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [person, setPerson] = useState<Person | null>(null);
  const [error, setError] = useState('');
  const [modalFile, setModalFile] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSearch = async (event: React.FormEvent) => {
    event.preventDefault();
    setError('');

    try {
      const response = await axios.get<Person[]>(`http://localhost:3000/api/${searchTerm}`);
      if (response.data.length > 0) {
        setPerson(response.data[0]); // Assuming you want the first match
      } else {
        setPerson(null);
        setError('No person found');
      }
    } catch (err) {
      setError('Error fetching person');
      console.error(err);
    }
  };

  const openModal = (filePath: string) => {
    setModalFile(filePath);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalFile(null);
  };

  const fetchDocumentUrl = (fileName: string | null): string | null => {
    if (!fileName) return null;
    // Assuming the backend is serving files from '/files' route
    return `http://localhost:3000/uploads/${fileName}`;
  };

  const renderDocument = (fileName: string | null) => {
    const fileUrl = fetchDocumentUrl(fileName);
    if (!fileUrl) return <span>Not uploaded</span>;

    const fileExtension = fileUrl.split('.').pop()?.toLowerCase();

    return (
      <span style={{ cursor: 'pointer', color: 'blue' }} onClick={() => openModal(fileUrl)}>
        {fileExtension === 'pdf' ? 'View PDF' : 'View Document'}
      </span>
    );
  };

  return (
    <div>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search by name or email"
          required
        />
        <button type="submit">Search</button>
      </form>

      {error && <p>{error}</p>}

      {person && (
        <div>
          <h2>Person Details</h2>
          <p>Name: {person.name}</p>
          <p>Email: {person.email}</p>
          <p>Age: {person.applicationForm.age}</p>
          <p>Address: {person.applicationForm.address}</p>
          <p>Phone Number: {person.applicationForm.phoneNumber}</p>
          <p>Is Active: {person.applicationForm.isActive ? 'Yes' : 'No'}</p>
          <h3>Documents</h3>
          <div>
            <p>Document 1: {renderDocument(person.files.document1)}</p>
            <p>Document 2: {renderDocument(person.files.document2)}</p>
            <p>Document 3: {renderDocument(person.files.document3)}</p>
          </div>
        </div>
      )}

      {isModalOpen && (
        <div className="modal" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            {modalFile && (
              <div>
                {modalFile.endsWith('.pdf') ? (
                  <iframe src={modalFile} style={{ width: '100%', height: '600px' }} title="PDF Viewer" />
                ) : (
                  <img src={modalFile} alt="Document" style={{ maxWidth: '100%', height: 'auto' }} />
                )}
              </div>
            )}
            <button onClick={closeModal}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AppTest2;
