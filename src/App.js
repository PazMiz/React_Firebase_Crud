import React, { useState, useEffect } from 'react';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';
import './App.css';

const firebaseConfig = {
  apiKey: 'AIzaSyCclB-KX1UeGdH8rs2IJTqJ6k2HbA17oY4',
  authDomain: 'pazpj-256be.firebaseapp.com',
  projectId: 'pazpj-256be',
  storageBucket: 'pazpj-256be.appspot.com',
  messagingSenderId: '3944589911',
  appId: '1:3944589911:web:65486b6a38add6a2271112',
  measurementId: 'G-5G0YXNH5EP',
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const storage = firebase.storage();

const App = () => {
  const [cars, setCars] = useState([]);
  const [model, setModel] = useState('');
  const [year, setYear] = useState('');
  const [color, setColor] = useState('');
  const [photoFile, setPhotoFile] = useState(null); // Added state for photo file

  useEffect(() => {
    fetchCars();
  }, []);

  const fetchCars = async () => {
    try {
      const querySnapshot = await db.collection('Cars').get();
      const carData = [];
      querySnapshot.forEach((doc) => {
        carData.push({ id: doc.id, ...doc.data() });
      });
      setCars(carData);
    } catch (error) {
      console.error('Error fetching cars:', error);
    }
  };

  const addCar = async (event) => {
    event.preventDefault();
    try {
      const carRef = db.collection('Cars').doc();
      const photoRef = storage.ref(`car_photos/${carRef.id}`);
      await photoRef.put(photoFile);

      await carRef.set({
        model,
        year: parseInt(year),
        color,
        photoUrl: await photoRef.getDownloadURL(),
      });

      console.log('Car added successfully!');
      fetchCars();
      setModel('');
      setYear('');
      setColor('');
      setPhotoFile(null); // Reset the photo file state
    } catch (error) {
      console.error('Error adding car:', error);
    }
  };

  const deleteCar = async (carId) => {
    try {
      await db.collection('Cars').doc(carId).delete();
      console.log('Car deleted successfully!');
      fetchCars();
    } catch (error) {
      console.error('Error deleting car:', error);
    }
  };

  function updateCar(carId, model, year, color) {
    db.collection('Cars')
      .doc(carId)
      .update({
        model: model,
        year: year,
        color: color,
      })
      .then(() => {
        console.log('Car updated successfully!');
      })
      .catch((error) => {
        console.error('Error updating car: ', error);
      });
  }

  return (
    <div>
      <header>
        <h1>Welcome to Paz Firebase CRUD</h1>
      </header>

      <main>
        <p>This is a CRUD FIRE BASE HTML page deployed to Firebase Hosting By Paz.</p>
        <p>Feel free to customize and enhance it as you like!</p>

        <div id="carList">
          {cars.map((car) => (
            <div key={car.id} className="car-card">
              <h2>{car.model}</h2>
              <img src={car.photoUrl} alt={`${car.model} Car`} className="resized-image" /> {/* Apply the resized-image class */}
              <p>Year: {car.year}</p>
              <p>Color: {car.color}</p>
              <button className="delete-button" onClick={() => deleteCar(car.id)}>
                Delete
              </button>
              <h3>Edit Car:</h3>
              <label htmlFor={`edit-model-${car.id}`}>Model:</label>
              <input
                type="text"
                className="model-input"
                id={`edit-model-${car.id}`}
                value={model}
                onChange={(e) => setModel(e.target.value)}
              />
              <label htmlFor={`edit-year-${car.id}`}>Year:</label>
              <input
                type="number"
                className="year-input"
                id={`edit-year-${car.id}`}
                value={year}
                onChange={(e) => setYear(e.target.value)}
              />
              <label htmlFor={`edit-color-${car.id}`}>Color:</label>
              <input
                type="text"
                className="color-input"
                id={`edit-color-${car.id}`}
                value={color}
                onChange={(e) => setColor(e.target.value)}
              />
              <button
                className="update-button"
                onClick={() => updateCar(car.id, model, parseInt(year), color)}
              >
                Update
              </button>
            </div>
          ))}
        </div>

        <h2>Add a New Car</h2>
        <form onSubmit={addCar} className="car-form">
          <label htmlFor="model">Model:</label>
          <input
            type="text"
            id="model"
            name="model"
            value={model}
            onChange={(e) => setModel(e.target.value)}
            required
          />

          <label htmlFor="photo">Photo:</label>
          <input
            type="file"
            id="photo"
            accept="image/*"
            onChange={(e) => setPhotoFile(e.target.files[0])}
            required
          />

          <label htmlFor="year">Year:</label>
          <input
            type="number"
            id="year"
            name="year"
            value={year}
            onChange={(e) => setYear(e.target.value)}
            required
          />

          <label htmlFor="color">Color:</label>
          <input
            type="text"
            id="color"
            name="color"
            value={color}
            onChange={(e) => setColor(e.target.value)}
            required
          />

          <button type="submit">Add Car</button>
        </form>
      </main>
    </div>
  );
};

export default App;
