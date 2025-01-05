import React, { useEffect, useState } from "react";
import "./App.css";
import { collection, onSnapshot } from "firebase/firestore";
import db from "./firebase/firebaseConfig";

function App() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const booksCollection = collection(db, "books");
    const unsubscribe = onSnapshot(booksCollection, (snapshot) => {
      const booksData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setBooks(booksData);
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className="library">
      <div className="shelf">
        {books.map((book, index) => (
          <React.Fragment key={book.id}>
            <div className={`book ${book.borrowed ? "borrowed" : ""}`}>
              <div className="title">{book.name}</div>
              {book.borrowed && (
                <div className="borrowed-date">Borrowed: {book.borrowedOn}</div>
              )}
              <div className="author">~ {book.author}</div>
            </div>

            {index < books.length - 1 && <div className="divider"></div>}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}

export default App;
