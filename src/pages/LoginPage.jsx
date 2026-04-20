import { useState } from 'react'
import { Link } from 'react-router-dom'

function LoginPage() {
  const [login, setLogin] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    
    if (login === '' || password === '') {
      setError('Заполните все поля')
      return
    }
    
    setError('')
    alert(`Вы ввели: логин = ${login}, пароль = ${password}`)
    // Здесь потом будет отправка на сервер
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
        <Link to="/">
          <button style={{
            padding: '8px 20px',
            backgroundColor: '#3636FF',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            fontSize: '14px'
          }}>
            На главную
          </button>
        </Link>
      </div>

      {/* ОСНОВНОЕ СОДЕРЖАНИЕ */}
      <div style={{ maxWidth: '500px', margin: '0 auto', padding: '40px 20px' }}>
        
        {/* ЗАГОЛОВОК */}
        <div style={{ textAlign: 'center', marginBottom: '30px' }}>
          <h1 style={{ fontSize: '28px', margin: 0, color: '#333' }}>Электронный библиотечный каталог</h1>
          <p style={{ color: '#666', fontSize: '14px', marginTop: '5px' }}>Колледж ААСК</p>
        </div>

        {/* КАРТОЧКА ВХОДА */}
        <div style={{
          backgroundColor: '#fff',
          borderRadius: '16px',
          padding: '40px',
          boxShadow: '0 2px 10px rgba(0,0,0,0.05)'
        }}>
          
          <h2 style={{ fontSize: '24px', margin: '0 0 10px 0', color: '#333', textAlign: 'center' }}>
            Вход в аккаунт
          </h2>
          <p style={{ color: '#666', fontSize: '14px', textAlign: 'center', marginBottom: '30px' }}>
            Введите свои учетные данные для входа
          </p>

          {error && (
            <div style={{
              backgroundColor: '#ffebee',
              color: '#c62828',
              padding: '10px',
              borderRadius: '8px',
              marginBottom: '20px',
              textAlign: 'center',
              fontSize: '14px'
            }}>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            {/* ПОЛЕ ЛОГИН */}
            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500', color: '#333' }}>
                Логин
              </label>
              <input
                type="text"
                placeholder="Введите логин"
                value={login}
                onChange={(e) => setLogin(e.target.value)}
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  fontSize: '14px',
                  border: '1px solid #ddd',
                  borderRadius: '8px',
                  outline: 'none',
                  boxSizing: 'border-box'
                }}
              />
            </div>

            {/* ПОЛЕ ПАРОЛЬ */}
            <div style={{ marginBottom: '25px' }}>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500', color: '#333' }}>
                Пароль
              </label>
              <input
                type="password"
                placeholder="Введите пароль"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  fontSize: '14px',
                  border: '1px solid #ddd',
                  borderRadius: '8px',
                  outline: 'none',
                  boxSizing: 'border-box'
                }}
              />
            </div>

            {/* КНОПКА ВОЙТИ */}
            <button
              type="submit"
              style={{
                width: '100%',
                padding: '12px',
                backgroundColor: '#3636FF',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer',
                fontSize: '16px',
                fontWeight: '500'
              }}
            >
              Войти
            </button>
          </form>
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
      </footer>
    </div>
  )
}

export default LoginPage