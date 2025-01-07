import React, { useEffect, useState } from "react";
import "./App.css";
import { collection, onSnapshot } from "firebase/firestore";
import db from "./firebase/firebaseConfig";

function App() {
  const [books, setBooks] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

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

  const handleSearch = (e) => {
    setSearchQuery(e.target.value.toLowerCase());
  };

  const filteredBooks = books.filter((book) => {
    const searchLower = searchQuery.toLowerCase();
    return (
      book.name.toLowerCase().includes(searchLower) ||
      book.author.toLowerCase().includes(searchLower)
    );
  });

  return (
    <>
      <div className="searchbox-container">
        <input
          type="text"
          placeholder="Search books..."
          className="search"
          value={searchQuery}
          onChange={handleSearch}
        />
        <a
          href="https://library-management-system-dashboard.vercel.app"
          target="_blank"
          rel="noopener noreferrer"
          className="add-books"
        >
          Add Books
        </a>
      </div>
      <div className="library">
        <div className="shelf">
          {filteredBooks.map((book, index) => (
            <React.Fragment key={book.id}>
              <div className={`book ${book.borrowed ? "borrowed" : ""}`}>
                <div className="title">{book.name}</div>
                {book.borrowed && (
                  <div className="borrowed-date">
                    Borrowed: {book.borrowedOn}
                  </div>
                )}
                <div className="author">~ {book.author}</div>
              </div>
              {index < filteredBooks.length - 1 && (
                <div className="divider"></div>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    </>
  );
}

export default App;
