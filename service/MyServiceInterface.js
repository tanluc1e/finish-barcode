import db from '../db';
import {
  encode,
  decode,
  encodeComponents,
  decodeComponents,
} from 'firebase-encode';
import { ref, get, set, getDatabase, remove } from 'firebase/database'

export const addItem = (username, barcode, itemName, price, upctype) => {
  const db = getDatabase();
  const encodedUsername = encode(username);
  const encodedBarcode = encode(barcode.toString());
  const encodedName = encode(itemName.toString());
  const encodedPrice = encode(price.toString());
  const encodedUPC = encode(upctype.toString());

  const itemRef = ref(db, `/accounts/${encodedUsername}/barcodes/${encodedBarcode}`);

  set(itemRef, {
    name: encodedName,
    price: encodedPrice,
    upc: encodedUPC,
    date: new Date().toJSON(),
    barcode: encodedBarcode,
  });
};


export const delItem = (username, userBarcode) => {
  const encodedUsername = encode(username);
  const encodedUserBarcode = encode(userBarcode);
  const itemRef = ref(db, `/accounts/${encodedUsername}/barcodes/${encodedUserBarcode}`);

  remove(itemRef)
    .then(() => {
      console.log('Item deleted successfully');
    })
    .catch((error) => {
      console.error('Error deleting item:', error);
    });
};

export const registerAcc = (username, password) => {
  const encodedUsername = encode(username);
  const encodedPassword = encode(password);

  return new Promise((resolve, reject) => {
    if (username === '') {
      reject('Username cannot be left blank');
      return;
    }
    const userRef = ref(db, `/accounts/${encodedUsername}`);
    get(userRef)
      .then((snapshot) => {
        if (snapshot.exists()) {
          reject(`User "${username}" already exists`);
        } else {
          set(userRef, {
            password: encodedPassword,
          })
            .then(() => {
              resolve(`User ${username} added!`);
            })
            .catch((error) => {
              reject(`Error creating user: ${error.message}`);
            });
        }
      })
      .catch((error) => {
        reject(`Error checking for user existence: ${error.message}`);
      });
  });
};