import { useParams, Link } from 'react-router-dom'

function BookPagePaper() {
  const { id } = useParams()
  
  // Данные книги (потом будут приходить с сервера)
  const book = {
    id: id,
    title: "Евгений Онегин",
    author: "Александр Пушкин",
    publisher: "Детская литература",
    person: "Александр Сергеевич Пушкин",
    rubric: "Художественная литература",
    year: "2018",
    mainTitle: "Евгений Онегин",
    keywords: ["роман в стихах", "поэзия", "XIX век", "Пушкин", "золотой век"],
    paperAvailable: true,
    paperCount: 5
  }

  return (
    <div style={{ 
      fontFamily: 'Arial, sans-serif', 
      backgroundColor: '#f9f9f9', 
      minHeight: '100vh' 
    }}>
      
      {/* ВЕРХНЯЯ ПАНЕЛЬ */}
      <div style={{
        backgroundColor: '#fff',
        borderBottom: '1px solid #eee',
        padding: '15px 20px',
        display: 'flex',
        justifyContent: 'flex-end',
        alignItems: 'center'
      }}>
        <button style={{
          padding: '8px 20px',
          backgroundColor: '#3636FF',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
          fontSize: '14px'
        }}>
          Вход в аккаунт
        </button>
      </div>

      {/* ОСНОВНОЕ СОДЕРЖАНИЕ */}
      <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '20px' }}>
        
        {/* ССЫЛКА НАЗАД */}
        <div style={{ marginBottom: '20px' }}>
          <Link to="/" style={{ 
            textDecoration: 'none', 
            color: '#3636FF',
            fontSize: '14px'
          }}>
            ← Назад к каталогу
          </Link>
        </div>

        {/* КАРТОЧКА КНИГИ */}
        <div style={{
          backgroundColor: '#fff',
          borderRadius: '16px',
          padding: '30px',
          boxShadow: '0 2px 10px rgba(0,0,0,0.05)'
        }}>
          
          {/* ЗАГОЛОВОК КНИГИ */}
          <h1 style={{ fontSize: '32px', margin: '0 0 5px 0', color: '#333' }}>{book.title}</h1>
          <p style={{ color: '#666', fontSize: '16px', marginBottom: '25px' }}>{book.author}</p>

          {/* ИНФОРМАЦИЯ О КНИГЕ - СЕТКА 2 КОЛОНКИ */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: '20px',
            marginBottom: '30px'
          }}>
            
            <div>
              <p style={{ margin: '0 0 5px 0', color: '#999', fontSize: '13px' }}>Автор</p>
              <p style={{ margin: '0 0 15px 0', color: '#333', fontSize: '16px', fontWeight: '500' }}>{book.author}</p>
              
              <p style={{ margin: '0 0 5px 0', color: '#999', fontSize: '13px' }}>Издательство</p>
              <p style={{ margin: '0 0 15px 0', color: '#333', fontSize: '16px' }}>{book.publisher}</p>
              
              <p style={{ margin: '0 0 5px 0', color: '#999', fontSize: '13px' }}>Основная рубрика</p>
              <p style={{ margin: '0 0 15px 0', color: '#333', fontSize: '16px' }}>{book.rubric}</p>
              
              <p style={{ margin: '0 0 5px 0', color: '#999', fontSize: '13px' }}>Основное заглавие</p>
              <p style={{ margin: '0', color: '#333', fontSize: '16px' }}>{book.mainTitle}</p>
            </div>

            <div>
              <p style={{ margin: '0 0 5px 0', color: '#999', fontSize: '13px' }}>Персоналия</p>
              <p style={{ margin: '0 0 15px 0', color: '#333', fontSize: '16px' }}>{book.person}</p>
              
              <p style={{ margin: '0 0 5px 0', color: '#999', fontSize: '13px' }}>Год издания</p>
              <p style={{ margin: '0', color: '#333', fontSize: '16px' }}>{book.year}</p>
            </div>
          </div>

          {/* КЛЮЧЕВЫЕ СЛОВА */}
          <div style={{ marginBottom: '30px' }}>
            <p style={{ margin: '0 0 10px 0', color: '#999', fontSize: '13px' }}>Ключевые слова</p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
              {book.keywords.map((keyword, index) => (
                <span key={index} style={{
                  backgroundColor: '#f0f0f0',
                  padding: '5px 12px',
                  borderRadius: '20px',
                  fontSize: '13px',
                  color: '#555'
                }}>
                  {keyword}
                </span>
              ))}
            </div>
          </div>

          {/* БУМАЖНАЯ ВЕРСИЯ */}
          <div style={{
            backgroundColor: '#e8f5e9',
            borderRadius: '12px',
            padding: '20px',
            marginBottom: '20px'
          }}>
            <h3 style={{ margin: '0 0 10px 0', color: '#2e7d32', fontSize: '18px' }}>Бумажная версия</h3>
            <p style={{ margin: '0 0 10px 0', color: '#333', fontSize: '16px' }}>
              В наличии: <strong>{book.paperCount}</strong> экземпляров
            </p>
            <p style={{ margin: 0, color: '#555', fontSize: '14px' }}>
              📍 Для получения книги обратитесь в библиотеку ААСК
            </p>
          </div>

        </div>
      </div>

      {/* ФУТЕР */}
      <footer style={{ 
        backgroundColor: '#2c3e50', 
        color: '#fff', 
        padding: '40px 20px', 
        marginTop: '40px' 
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '30px' }}>
          <div>
            <h3 style={{ margin: '0 0 10px 0', fontSize: '18px' }}>Библиотека ААСК</h3>
            <p style={{ margin: 0, color: '#ccc', fontSize: '13px' }}>Электронный библиотечный каталог<br />Алтайского архитектурно-строительного колледжа</p>
          </div>
          <div>
            <h4 style={{ margin: '0 0 10px 0', fontSize: '16px' }}>Навигация</h4>
            <ul style={{ listStyle: 'none', padding: 0 }}>
              <li><a href="#" style={{ color: '#ccc', textDecoration: 'none' }}>Главная</a></li>
              <li><a href="#" style={{ color: '#ccc', textDecoration: 'none' }}>Каталог</a></li>
              <li><a href="#" style={{ color: '#ccc', textDecoration: 'none' }}>Новинки</a></li>
              <li><a href="#" style={{ color: '#ccc', textDecoration: 'none' }}>О библиотеке</a></li>
            </ul>
          </div>
          <div>
            <h4 style={{ margin: '0 0 10px 0', fontSize: '16px' }}>Информация</h4>
            <ul style={{ listStyle: 'none', padding: 0 }}>
              <li><a href="#" style={{ color: '#ccc', textDecoration: 'none' }}>Правила пользования</a></li>
              <li><a href="#" style={{ color: '#ccc', textDecoration: 'none' }}>Часы работы</a></li>
              <li><a href="#" style={{ color: '#ccc', textDecoration: 'none' }}>Контакты</a></li>
              <li><a href="#" style={{ color: '#ccc', textDecoration: 'none' }}>Помощь</a></li>
            </ul>
          </div>
          <div>
            <h4 style={{ margin: '0 0 10px 0', fontSize: '16px' }}>Контакты</h4>
            <p style={{ margin: '5px 0', color: '#ccc', fontSize: '13px' }}>г. Барнаул, ул. Пример, 123</p>
            <p style={{ margin: '5px 0', color: '#ccc', fontSize: '13px' }}>Тел.: +7 (3852) 00-00-00</p>
            <p style={{ margin: '5px 0', color: '#ccc', fontSize: '13px' }}>Email: library@aasc.ru</p>
            <p style={{ margin: '5px 0', color: '#ccc', fontSize: '13px' }}>Пн-Пт: 9:00 - 18:00</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default BookPagePaper