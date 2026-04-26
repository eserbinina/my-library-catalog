import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'

function LoginPage() {
  const navigate = useNavigate()
  const [login, setLogin] = useState('')
  const [password, setPassword] = useState('')
  const [selectedBranch, setSelectedBranch] = useState('')
  const [branchMenuOpen, setBranchMenuOpen] = useState(false)
  const [error, setError] = useState('')

  const branches = ['Центральный корпус', 'Корпус №2', 'Корпус №3']

  const handleSubmit = (e) => {
    e.preventDefault()
    
    if (login === '' || password === '') {
      setError('Заполните все поля')
      return
    }
    
    if (selectedBranch === '') {
      setError('Выберите филиал')
      return
    }
    
    if (login === 'librarian' && password === '123') {
      localStorage.setItem('userRole', 'librarian')
      navigate('/librarian')
      return
    }
    
    if (login === 'admin' && password === '123') {
      localStorage.setItem('userRole', 'admin')
      navigate('/admin')
      return
    }
    
    setError('Неверный логин или пароль')
  }

  return (
    <div style={{ 
      fontFamily: 'Arial, sans-serif', 
      backgroundColor: '#f9f9f9', 
      minHeight: '100vh' 
    }}>
      
      {/* ШАПКА */}
      <div style={{
        backgroundColor: '#fff',
        borderBottom: '1px solid #eee',
        padding: '15px 20px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap'
      }}>
        <div>
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
        </div>
        <Link to="/" style={{ textDecoration: 'none' }}>
          <button style={{
            padding: '8px 20px',
            backgroundColor: '#3636FF',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            fontSize: '14px'
          }}>
            На главную
          </button>
        </Link>
      </div>

      <div style={{ maxWidth: '500px', margin: '0 auto', padding: '40px 20px' }}>
        
        <div style={{
          backgroundColor: '#fff',
          borderRadius: '24px',
          padding: '40px',
          boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
          border: '1px solid #eee'
        }}>
          
          {/* КАРТИНКА НАД ЗАГОЛОВКОМ (ПО ЦЕНТРУ) */}
          <div style={{ textAlign: 'center', marginBottom: '20px' }}>
            <img 
              src="/images/login-icon.png" 
              alt="Вход" 
              style={{ width: '64px', height: '64px', objectFit: 'contain' }} 
            />
          </div>

          <h2 style={{ fontSize: '24px', fontWeight: '500', margin: '0 0 8px 0', color: '#1a1a1a', textAlign: 'center' }}>
            Вход в аккаунт
          </h2>
          <p style={{ color: '#666', fontSize: '14px', textAlign: 'center', marginBottom: '32px' }}>
            Введите свои учетные данные для входа
          </p>

          {error && (
            <div style={{
              backgroundColor: '#ffebee',
              color: '#d32f2f',
              padding: '12px',
              borderRadius: '12px',
              marginBottom: '24px',
              textAlign: 'center',
              fontSize: '14px'
            }}>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500', color: '#333', fontSize: '14px' }}>
                Логин
              </label>
              <input
                type="text"
                placeholder="Введите логин"
                value={login}
                onChange={(e) => setLogin(e.target.value)}
                style={{
                  width: '100%',
                  padding: '14px 16px',
                  fontSize: '14px',
                  border: '1px solid #ddd',
                  borderRadius: '12px',
                  outline: 'none',
                  boxSizing: 'border-box'
                }}
              />
            </div>

            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500', color: '#333', fontSize: '14px' }}>
                Пароль
              </label>
              <input
                type="password"
                placeholder="Введите пароль"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{
                  width: '100%',
                  padding: '14px 16px',
                  fontSize: '14px',
                  border: '1px solid #ddd',
                  borderRadius: '12px',
                  outline: 'none',
                  boxSizing: 'border-box'
                }}
              />
            </div>

            <div style={{ marginBottom: '28px' }}>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500', color: '#333', fontSize: '14px' }}>
                Филиал
              </label>
              <div style={{ position: 'relative' }}>
                <button
                  type="button"
                  onClick={() => setBranchMenuOpen(!branchMenuOpen)}
                  style={{
                    width: '100%',
                    padding: '14px 16px',
                    fontSize: '14px',
                    backgroundColor: '#fff',
                    border: '1px solid #ddd',
                    borderRadius: '12px',
                    cursor: 'pointer',
                    textAlign: 'left',
                    color: selectedBranch ? '#333' : '#999',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                  }}
                >
                  {selectedBranch || 'Выберите филиал'}
                  <span>{branchMenuOpen ? '▲' : '▼'}</span>
                </button>
                
                {branchMenuOpen && (
                  <div style={{
                    position: 'absolute',
                    top: '100%',
                    left: 0,
                    right: 0,
                    marginTop: '8px',
                    backgroundColor: '#fff',
                    border: '1px solid #ddd',
                    borderRadius: '12px',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                    zIndex: 1000
                  }}>
                    {branches.map((branch) => (
                      <div
                        key={branch}
                        onClick={() => {
                          setSelectedBranch(branch)
                          setBranchMenuOpen(false)
                        }}
                        style={{
                          padding: '12px 16px',
                          cursor: 'pointer',
                          fontSize: '14px',
                          color: '#333',
                          backgroundColor: selectedBranch === branch ? '#f5f5f5' : 'transparent',
                          borderBottom: '1px solid #f0f0f0'
                        }}
                      >
                        {branch}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <button
              type="submit"
              style={{
                width: '100%',
                padding: '14px',
                backgroundColor: '#3636FF',
                color: 'white',
                border: 'none',
                borderRadius: '12px',
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
      <footer style={{ backgroundColor: '#2c3e50', color: '#fff', padding: '40px 20px', marginTop: '40px' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', textAlign: 'center' }}>
          <p>Библиотека ААСК — Электронный библиотечный каталог</p>
          <p>© 2026 Колледж ААСК. Все права защищены</p>
        </div>
      </footer>
    </div>
  )
}

export default LoginPage