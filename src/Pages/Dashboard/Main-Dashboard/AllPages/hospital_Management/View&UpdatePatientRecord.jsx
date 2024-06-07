import React, { useState } from 'react';
import { Button, InputGroup, FormControl } from 'react-bootstrap';
import axios from 'axios';
import { Card, ListGroup, ListGroupItem } from 'react-bootstrap';
import MedRecs from './MedRecs';
import { RefreshCw } from 'lucide-react';
import Dropzone, { useDropzone } from 'react-dropzone';
import { FilePlus } from 'lucide-react';
const ViewPatient = () => {
  const [forms, setForms] = useState([{ title: '', file: null }]);
  const [patientData, setPatientData] = useState(null);
  const [patientId, setPatientId] = useState('');
  const url = `http://localhost:4000/patients/uploadDoc/${patientId}`;

  const handleInputChange = (index, event) => {
    const { name, value, files } = event.target;
    const newForms = [...forms];
    if (name === 'title') {
      newForms[index].title = value;
    } else if (name === 'file') {
      newForms[index].file = files[0];
      if (files[0]) {
        const originalFilename = files[0].name;
        newForms[index].originalFilename = originalFilename;
      }
    }
    setForms(newForms);
  };
  const handleDrop = (index, acceptedFiles) => {
    const newForms = [...forms];
    newForms[index].file = acceptedFiles[0];
    if (acceptedFiles[0]) {
      const originalFilename = acceptedFiles[0].name;
      newForms[index].originalFilename = originalFilename;
    }
    setForms(newForms);
  };
  const handleAddTemplate = () => {
    setForms([...forms, { title: '', file: null }]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();

      for (const form of forms) {
        if (form.title && form.file) {
          formData.append(`title`, form.originalFilename);
          formData.append(`file`, form.file);
        } else {
          console.warn('Skipping form: Missing title or file');
        }
      }

      console.log(formData);
      const response = await axios.post(url, formData);

      console.log('Form submitted successfully:', response.data);
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  const handleChange = (e) => {
    setPatientId(e.target.value);
  };

  async function fetchId() {
    const dummyData = {
      username: "2434",
      name: "ddsctt",
      age: 4,
      gender: "Male",
      contactNumber: 678888,
      bloodGroup: "AB+",
      documents: [],
      __v: 15,
      medicalRecords: [],
      healthIssues: [],
    };
    setPatientData(dummyData);
  }

  return (
    <div className="p-6">
      <div className="mb-4 flex items-center">
        <label htmlFor="patientId" className="mr-2">Unique ID:</label>
        <input
          type="text"
          name="patientId"
          value={patientId}
          onChange={handleChange}
          className="mr-2 p-2 border rounded"
          placeholder="Enter Patient ID"
        />
        <Button onClick={fetchId} className="bg-blue-500 text-white px-4 py-2 flex gap-2 rounded hover:bg-blue-600">
          <RefreshCw />
          Fetch Data</Button>
      </div>
      {patientData ? (
        <div>
          <Card className="mb-4 shadow-lg">
            <Card.Header className="bg-blue-500 text-white font-extrabold text-4xl pl-4">Patient Details</Card.Header>
            <ListGroup variant="flush" className='p-4'>
              {/* <ListGroupItem>
                Full Name: <span className="float-right">{patientData.name} {patientData.lastName}</span>
              </ListGroupItem>
              <ListGroupItem>
                Age: <span className="float-right">{patientData.age}</span>
              </ListGroupItem>
              <ListGroupItem>Gender: <span className="float-right">{patientData.gender}</span></ListGroupItem>
              <ListGroupItem>
                Contact Number: <span className="float-right">{patientData.contactNumber}</span>
              </ListGroupItem>
              <ListGroupItem>Blood Group: <span className="float-right">{patientData.bloodGroup}</span></ListGroupItem> */}
              <ListGroupItem className="flex justify-between">
                <span className="font-semibold text-gray-600">Full Name:</span>
                <span>{patientData.name} {patientData.lastName}</span>
              </ListGroupItem>
              <ListGroupItem className="flex justify-between">
                <span className="font-semibold text-gray-600">Age:</span>
                <span>{patientData.age}</span>
              </ListGroupItem>
              <ListGroupItem className="flex justify-between">
                <span className="font-semibold text-gray-600">Gender:</span>
                <span>{patientData.gender}</span>
              </ListGroupItem>
              <ListGroupItem className="flex justify-between">
                <span className="font-semibold text-gray-600">Contact Number:</span>
                <span>{patientData.contactNumber}</span>
              </ListGroupItem>
              <ListGroupItem className="flex justify-between">
                <span className="font-semibold text-gray-600">Blood Group:</span>
                <span>{patientData.bloodGroup}</span>
              </ListGroupItem>
              <MedRecs medRecs={patientData.medicalRecords} />
            </ListGroup>
          </Card>
          <div className="flex justify-center items-center min-h-screen bg-blue-100">
            <form
              action={url}
              encType="multipart/form-data"
              method="post"
              onSubmit={handleSubmit}
              className="w-full max-w-lg p-6 bg-white border border-blue-500 rounded shadow-lg"
            >
              {forms.map((form, index) => (
                <div key={index} className="mb-4">
                  <InputGroup className="mb-3">
                    <InputGroup.Text>Title</InputGroup.Text>
                    <FormControl
                      name="title"
                      value={form.title}
                      onChange={(e) => handleInputChange(index, e)}
                    />
                  </InputGroup>
                  <div className="mb-3">
                    <Dropzone onDrop={(acceptedFiles) => handleDrop(index, acceptedFiles)}>
                      {({ getRootProps, getInputProps }) => (
                        <div {...getRootProps()} className="border-dashed border-2 p-4 rounded cursor-pointer text-center">
                          <input {...getInputProps()} name="file" />
                          <p>Drag & drop a file here, or click to select a file</p>
                          <FilePlus className="mx-auto" size={24} />
                        </div>
                      )}
                    </Dropzone>
                  </div>
                </div>
              ))}
              <Button className="mb-3 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600" type="button" onClick={handleAddTemplate}>Add Template</Button>
              <Button className="ml-4 mb-3 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600" type="submit">Apply</Button>
            </form>
          </div>

        </div>
      ) : (
        <div className="text-center text-blue-500">Loading...</div>
      )}
    </div>
  );
};

export default ViewPatient;
