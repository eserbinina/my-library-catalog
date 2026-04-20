import { useState } from 'react'

function LibrarianHomePage() {
  const [books] = useState([
    { id: 1, title: "Война и мир", author: "Лев Толстой", electronic: true, paper: true },
    { id: 2, title: "Преступление и наказание", author: "Федор Достоевский", electronic: true, paper: true },
    { id: 3, title: "Мастер и Маргарита", author: "Михаил Булгаков", electronic: true, paper: true },
    { id: 4, title: "Евгений Онегин", author: "Александр Пушкин", electronic: true, paper: true },
    { id: 5, title: "Анна Каренина", author: "Лев Толстой", electronic: true, paper: true },
    { id: 6, title: "Преступление и наказание", author: "Федор Достоевский", electronic: true, paper: true },
    { id: 7, title: "Мастер и Маргарита", author: "Михаил Булгаков", electronic: true, paper: true },
    { id: 8, title: "Евгений Онегин", author: "Александр Пушкин", electronic: true, paper: true },
    { id: 9, title: "Анна Каренина", author: "Лев Толстой", electronic: true, paper: true },
    { id: 10, title: "Мертвые души", author: "Николай Гоголь", electronic: true, paper: false }
  ])

  const [searchTerm, setSearchTerm] = useState('')

  const filteredBooks = books.filter(book =>
    book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    book.author.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', backgroundColor: '#f9f9f9', minHeight: '100vh' }}>
      
      <div style={{
        backgroundColor: '#2c3e50',
        padding: '15px 20px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        color: 'white'
      }}>
        <h2 style={{ margin: 0 }}>📚 Панель библиотекаря</h2>
        <button style={{ padding: '6px 15px', backgroundColor: '#f44336', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
          Выйти
        </button>
      </div>

      <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '20px' }}>
        
        <div style={{ textAlign: 'center', marginBottom: '25px' }}>
          <h1 style={{ fontSize: '28px', color: '#333' }}>Электронный библиотечный каталог</h1>
          <p style={{ color: '#666' }}>Колледж ААСК</p>
        </div>

        <input
          type="text"
          placeholder="Поиск..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ width: '100%', padding: '12px', marginBottom: '20px', borderRadius: '8px', border: '1px solid #ddd' }}
        />

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '20px' }}>
          {filteredBooks.map(book => (
            <div key={book.id} style={{ backgroundColor: '#fff', padding: '18px', borderRadius: '12px' }}>
              <h3>{book.title}</h3>
              <p>{book.author}</p>
              <button style={{ width: '100%', padding: '8px', backgroundColor: '#3636FF', color: 'white', border: 'none', borderRadius: '8px' }}>
                Подробнее
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default LibrarianHomePage