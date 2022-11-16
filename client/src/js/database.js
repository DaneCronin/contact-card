import { openDB } from 'idb';
import 'regenerator-runtime/runtime';

export const initdb = async () => {
  // We are creating a new database named 'contact_db' which will be using version 1 of the database.
  openDB('contact_db', 1, {
    // Add our database schema if it has not already been initialized.
    upgrade(db) {
      if (db.objectStoreNames.contains('contacts')) {
        console.log('contacts store already exists');
        return;
      }
      // Create a new object store for the data and give it a key name of 'id' which will increment automatically
      db.createObjectStore('contacts', { keyPath: 'id', autoIncrement: true });
      console.log('contacts store created');
    }
  })
};


//Export a function to GET from database
export const getDb = async() => {
    console.log('GET from the database');
    //Create a connection to the IndexedDB database and the version we want to use
    const contactDb = await openDB('contact_db', 1);
    //Create new transaction and specify the store and data priveleges
    const tx = contactDb.transaction('contacts', 'readonly');
    //Open up desired object store
    const store = tx.objectStore('contacts');

    //Use .getAll() to get all data 
    const request = store.getAll();

    //Get confirmation of request
    const result = await request;
    console.log('result.value', result);
    return result;

    //Create connection to new database:
//     const contactDb = await openDB('library_db', 1.0);
// const tx = contactDb.transaction('books', 'readonly');
// const store = tx.objectStore('books');
// const request = store.getAll();
// const result = await request;
// return result;
};

//Export a function to POST to the database
export const postDb = async(name, email, phone, profile) => {
    console.log('POST to the databse');

    //create a connection to the database and specify version
    const contactDb = await openDB('contact', 1);
    //create new transaction and specify the store and data priveleges
    const tx = contactDb.transaction('contacts', 'readwrite');
    //open up the desired object store
    const store = tx.objectStore('contacts');
    //Use the .add() method on the store to pass in content
    const request = store.add({name: name, email: email, phone: phone, profile: profile });
    //get confirmation of request
    const result = await request;
    console.log('data saved to database', result);
}