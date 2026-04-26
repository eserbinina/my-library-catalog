import { Link } from 'react-router-dom'

function Header() {
  return (
    <div style={{
      backgroundColor: '#fff',
      boxShadow: '0 1px 3px 0 rgba(0,0,0,0.1)',
      padding: '20px 32px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      flexWrap: 'wrap'
    }}>
      {/* ЛЕВАЯ ЧАСТЬ - ИКОНКА + НАЗВАНИЕ */}
      <Link to="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '12px' }}>
        {/* ИКОНКА ПРОФИЛЯ */}
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

      {/* ПРАВАЯ ЧАСТЬ - ПУСТО (кнопка входа в футере) */}
    </div>
  )
}

export default Header