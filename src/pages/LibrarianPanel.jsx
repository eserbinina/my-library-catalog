import { Link } from 'react-router-dom'


function LibrarianPanel() {
  const actions = [
    {
      title: "Управление каталогом",
      description: "Просмотр, редактирование и удаление книг из каталога",
      link: "/librarian/manage-catalog",
      color: "#4CAF50",
      image: "/images/manage-catalog.png"
    },
    {
      title: "Картотека книгообеспеченности",
      description: "Управление обеспеченностью учебной литературы",
      link: "/librarian/books-supply",
      color: "#FF9800",
      image: "/images/books-supply.png"
    },
    {
      title: "Акты выбытия книг",
      description: "Реестр списанных книг и актов выбытия",
      link: "/librarian/disposal-acts",
      color: "#F44336",
      image: "/images/disposal-acts.png"
    },
    {
      title: "Импорт книг из Excel",
      description: "Загрузите данные из таблиц Excel",
      link: "/librarian/import-data",
      color: "#607D8B",
      image: "/images/import-excel.png"
    },
    {
      title: "Формирование отчетов",
      description: "Создание отчетов и экспорта данных",
      link: "/librarian/reports",
      color: "#9C27B0",
      image: "/images/reports.png"
    }
  ]

  return (
    <div style={{ 
      fontFamily: 'Arial, sans-serif', 
      backgroundColor: '#f9f9f9', 
      minHeight: '100vh' 
    }}>
      
      {/* ШАПКА С ИКОНКОЙ */}
      <div style={{
        backgroundColor: '#fff',
        borderBottom: '1px solid #eee',
        padding: '15px 20px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap'
      }}>
        {/* ЛЕВАЯ ЧАСТЬ - ИКОНКА + НАЗВАНИЕ */}
        <Link to="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '12px' }}>
          <img 
            src="/images/profile-icon.png" 
            alt="Профиль" 
            style={{ width: '36px', height: '36px', objectFit: 'contain' }} 
          />
          <div>
            <h1 style={{ fontSize: '24px', margin: 0, color: '#333', fontWeight: '700' }}>
              Электронный библиотечный каталог
            </h1>
            <p style={{ margin: '4px 0 0 0', color: '#666', fontSize: '14px' }}>
              Колледж ААСК
            </p>
          </div>
        </Link>

        {/* ПРАВАЯ ЧАСТЬ - КНОПКИ */}
        <div style={{ display: 'flex', gap: '15px' }}>
          <Link to="/librarian">
            <button style={{
              padding: '8px 20px',
              backgroundColor: '#f5f5f5',
              color: '#3636FF',
              border: '1px solid #ddd',
              borderRadius: '8px',
              cursor: 'pointer',
              fontSize: '14px'
            }}>
              ← Назад
            </button>
          </Link>
          <button
            onClick={() => {
              localStorage.removeItem('userRole')
              window.location.href = '/'
            }}
            style={{
              padding: '8px 20px',
              backgroundColor: '#3636FF',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              fontSize: '14px'
            }}
          >
            Выйти
          </button>
        </div>
      </div>

      {/* ОСНОВНОЕ СОДЕРЖАНИЕ */}
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '40px 20px' }}>
        
        <div style={{ marginBottom: '8px' }}>
          <h1 style={{ fontSize: '32px', margin: 0, color: '#333', fontWeight: '600' }}>Панель библиотекаря</h1>
          <p style={{ color: '#666', fontSize: '14px', marginTop: '8px' }}>Колледж ААСК</p>
        </div>

        <div style={{ marginBottom: '40px' }}>
          <p style={{ color: '#666', fontSize: '16px' }}>Добро пожаловать! Выберите действие для управления библиотечным каталогом</p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
          gap: '24px'
        }}>
          {actions.map((action, index) => (
            <div key={index} style={{
              backgroundColor: '#fff',
              borderRadius: '16px',
              padding: '24px',
              boxShadow: '0 2px 12px rgba(0,0,0,0.05)',
              border: '1px solid #eee'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '12px' }}>
                <img 
                  src={action.image} 
                  alt={action.title} 
                  style={{ width: '48px', height: '48px', objectFit: 'contain' }} 
                />
                <h3 style={{ fontSize: '20px', margin: 0, color: action.color }}>{action.title}</h3>
              </div>
              <p style={{ fontSize: '14px', color: '#666', lineHeight: '1.5', margin: '0 0 20px 0' }}>
                {action.description}
              </p>
              <Link to={action.link} style={{
                display: 'inline-block',
                padding: '8px 20px',
                backgroundColor: action.color,
                color: 'white',
                textDecoration: 'none',
                borderRadius: '8px',
                fontSize: '14px',
                fontWeight: '500'
              }}>
                Перейти →
              </Link>
            </div>
          ))}
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
              <li><Link to="/" style={{ color: '#ccc', textDecoration: 'none' }}>Главная</Link></li>
              <li><Link to="/" style={{ color: '#ccc', textDecoration: 'none' }}>Каталог</Link></li>
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
        <div style={{ textAlign: 'center', marginTop: '40px', paddingTop: '24px', borderTop: '1px solid #1e2939', color: '#6a7282', fontSize: '14px' }}>
          © 2026 Колледж ААСК. Все права защищены
        </div>
      </footer>
    </div>
  )
}

export default LibrarianPanel