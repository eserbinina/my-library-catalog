import { useState, useCallback, useMemo } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'

function ViewDisposalAct() {
  const { id } = useParams()
  const navigate = useNavigate()

  // Временные данные (потом будут с сервера по id)
  const [act] = useState({
    id: 1,
    actNumber: "AB-001/2025",
    date: "15.01.2025",
    status: "Проведен",
    institution: "Колледж ААСК",
    department: "Библиотека",
    conversionFactor: "1.0",
    reason: "Физический износ",
    participants: [
      { id: 1, name: "Иванова Мария Петровна", position: "Заведующая библиотекой", role: "Председатель комиссии" },
      { id: 2, name: "Петров Иван Сергеевич", position: "Библиотекарь", role: "Член комиссии" },
      { id: 3, name: "Сидорова Анна Ивановна", position: "Библиотекарь", role: "Секретарь" }
    ],
    books: [
      { id: 1, invNumber: "123456", bbk: "Y9246", title: "Толстой, Л. Н. Война и мир : роман. — 5-е изд. — Москва : Художественная литература, 2020. — 1274 с.", quantity: 2 },
      { id: 2, invNumber: "789012", bbk: "П30/666", title: "Марк Лутц. Основы программирования на Python : Санкт-Петербург : Диалектика, 2023", quantity: 5 }
    ]
  })

  // Мемоизация вычислений
  const totalBooks = useMemo(() => act.books.length, [act.books.length])
  const totalCopies = useMemo(() => act.books.reduce((sum, book) => sum + book.quantity, 0), [act.books])

  const getStatusColor = useCallback((status) => {
    switch(status) {
      case 'Проведен': return { bg: '#e8f5e9', color: '#2e7d32' }
      case 'Редактируется': return { bg: '#fff3e0', color: '#ed6c02' }
      case 'Черновик': return { bg: '#f5f5f5', color: '#757575' }
      default: return { bg: '#f5f5f5', color: '#757575' }
    }
  }, [])

  const statusStyle = useMemo(() => getStatusColor(act.status), [getStatusColor, act.status])

  const handleEdit = useCallback(() => {
    navigate(`/librarian/edit-disposal-act/${id}`)
  }, [navigate, id])

  const handleDelete = useCallback(() => {
    if (window.confirm('Вы уверены, что хотите удалить этот акт?')) {
      alert(`Акт ${act.actNumber} удален`)
      navigate('/librarian/disposal-acts')
    }
  }, [navigate, act.actNumber])

  const InnerCard = useMemo(() => ({ title, children }) => (
    <div style={{ backgroundColor: '#fff', borderRadius: '16px', border: '1px solid #eee', padding: '24px 20px', marginBottom: '20px' }}>
      <h2 style={{ fontSize: '18px', fontWeight: '500', margin: '0 0 16px 0', color: '#1a1a1a' }}>{title}</h2>
      {children}
    </div>
  ), [])

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', backgroundColor: '#f9f9f9', minHeight: '100vh' }}>
      
      {/* ШАПКА с кнопками */}
      <div style={{
        backgroundColor: '#fff',
        borderBottom: '1px solid #eee',
        padding: '15px 20px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <img 
            src="/images/profile-icon.png" 
            alt="Профиль" 
            style={{ width: '36px', height: '36px', objectFit: 'contain' }} 
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = 'https://via.placeholder.com/36?text=Profile';
            }}
          />
          <div>
            <h1 style={{ fontSize: '24px', margin: 0, color: '#333', fontWeight: '700' }}>Акт выбытия {act.actNumber}</h1>
            <p style={{ margin: '4px 0 0 0', color: '#666', fontSize: '14px' }}>Колледж ААСК</p>
          </div>
        </div>
        <div style={{ display: 'flex', gap: '12px' }}>
          <button 
            onClick={handleEdit} 
            style={{ 
              padding: '8px 20px', 
              backgroundColor: '#3636FF', 
              color: 'white', 
              border: 'none', 
              borderRadius: '8px', 
              cursor: 'pointer', 
              fontSize: '14px', 
              fontWeight: '500',
              transition: 'background-color 0.2s'
            }}
            onMouseEnter={(e) => e.target.style.backgroundColor = '#2525cc'}
            onMouseLeave={(e) => e.target.style.backgroundColor = '#3636FF'}
          >
            Редактировать
          </button>
          <button 
            onClick={handleDelete} 
            style={{ 
              padding: '8px 20px', 
              backgroundColor: '#d32f2f', 
              color: 'white', 
              border: 'none', 
              borderRadius: '8px', 
              cursor: 'pointer', 
              fontSize: '14px', 
              fontWeight: '500',
              transition: 'background-color 0.2s'
            }}
            onMouseEnter={(e) => e.target.style.backgroundColor = '#b71c1c'}
            onMouseLeave={(e) => e.target.style.backgroundColor = '#d32f2f'}
          >
            Удалить
          </button>
        </div>
      </div>

      <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '20px' }}>
        
        <div style={{ marginBottom: '20px' }}>
          <Link 
            to="/librarian/disposal-acts" 
            style={{ 
              textDecoration: 'none', 
              color: '#3636FF', 
              fontSize: '14px',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '4px'
            }}
          >
            ← Назад к актам
          </Link>
        </div>

        {/* СТАТУС */}
        <div style={{ marginBottom: '20px' }}>
          <span style={{ 
            display: 'inline-block', 
            padding: '6px 16px', 
            borderRadius: '20px', 
            fontSize: '14px', 
            fontWeight: '500', 
            backgroundColor: statusStyle.bg, 
            color: statusStyle.color 
          }}>
            Статус: {act.status}
          </span>
        </div>

        {/* ОСНОВНАЯ ИНФОРМАЦИЯ */}
        <InnerCard title="Основная информация">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '20px' }}>
            <div>
              <div style={{ fontSize: '14px', color: '#666', marginBottom: '8px' }}>Номер акта</div>
              <div style={{ fontSize: '16px', color: '#333', fontWeight: '500' }}>{act.actNumber}</div>
            </div>
            <div>
              <div style={{ fontSize: '14px', color: '#666', marginBottom: '8px' }}>Дата акта</div>
              <div style={{ fontSize: '16px', color: '#333', fontWeight: '500' }}>{act.date}</div>
            </div>
            <div>
              <div style={{ fontSize: '14px', color: '#666', marginBottom: '8px' }}>Учреждение</div>
              <div style={{ fontSize: '16px', color: '#333', fontWeight: '500' }}>{act.institution}</div>
            </div>
            <div>
              <div style={{ fontSize: '14px', color: '#666', marginBottom: '8px' }}>Структурное подразделение</div>
              <div style={{ fontSize: '16px', color: '#333', fontWeight: '500' }}>{act.department}</div>
            </div>
            <div>
              <div style={{ fontSize: '14px', color: '#666', marginBottom: '8px' }}>Коэффициент пересчета</div>
              <div style={{ fontSize: '16px', color: '#333', fontWeight: '500' }}>{act.conversionFactor}</div>
            </div>
            <div>
              <div style={{ fontSize: '14px', color: '#666', marginBottom: '8px' }}>Причина списания</div>
              <div style={{ fontSize: '16px', color: '#333', fontWeight: '500' }}>{act.reason}</div>
            </div>
          </div>
        </InnerCard>

        {/* УЧАСТНИКИ АКТА */}
        <InnerCard title={`Участники акта (${act.participants.length})`}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {act.participants.map((p) => (
              <div 
                key={`participant-${p.id}`} 
                style={{ 
                  backgroundColor: 'rgba(54, 54, 255, 0.05)', 
                  borderRadius: '12px', 
                  padding: '16px',
                  transition: 'transform 0.2s, box-shadow 0.2s',
                  cursor: 'pointer'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.1)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                <div style={{ fontSize: '16px', fontWeight: '600', color: '#1a1a1a', marginBottom: '6px' }}>{p.name}</div>
                <div style={{ fontSize: '14px', color: '#666', marginBottom: '4px' }}>{p.position}</div>
                <div style={{ fontSize: '14px', color: '#3636FF' }}>{p.role}</div>
              </div>
            ))}
          </div>
        </InnerCard>

        {/* СПИСАННЫЕ КНИГИ */}
        <InnerCard title={`Списанные книги (${totalBooks})`}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px', flexWrap: 'wrap', gap: '10px' }}>
            <div style={{ fontSize: '14px', color: '#666' }}>
              Всего книг: <span style={{ color: '#3636FF', fontWeight: '600' }}>{totalBooks}</span> 
              (экз.: <span style={{ color: '#3636FF', fontWeight: '600' }}>{totalCopies}</span>)
            </div>
          </div>
          
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', backgroundColor: '#fff', borderRadius: '12px' }}>
              <thead>
                <tr style={{ backgroundColor: '#f5f5f5', borderBottom: '1px solid #eee' }}>
                  <th style={{ padding: '12px 16px', textAlign: 'left', color: '#666', fontSize: '13px', fontWeight: '600' }}>№</th>
                  <th style={{ padding: '12px 16px', textAlign: 'left', color: '#666', fontSize: '13px', fontWeight: '600' }}>Инв. позиция</th>
                  <th style={{ padding: '12px 16px', textAlign: 'left', color: '#666', fontSize: '13px', fontWeight: '600' }}>ББК</th>
                  <th style={{ padding: '12px 16px', textAlign: 'left', color: '#666', fontSize: '13px', fontWeight: '600' }}>Книга</th>
                  <th style={{ padding: '12px 16px', textAlign: 'center', color: '#666', fontSize: '13px', fontWeight: '600' }}>Кол-во</th>
                </tr>
              </thead>
              <tbody>
                {act.books.map((book, idx) => (
                  <tr 
                    key={`book-${book.id}`} 
                    style={{ 
                      borderBottom: '1px solid #eee',
                      transition: 'background-color 0.2s'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f9f9f9'}
                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                  >
                    <td style={{ padding: '12px 16px', fontSize: '14px', color: '#333' }}>{idx + 1}</td>
                    <td style={{ padding: '12px 16px', fontSize: '14px', color: '#333' }}>{book.invNumber}</td>
                    <td style={{ padding: '12px 16px', fontSize: '14px', color: '#3636FF', fontWeight: '500' }}>{book.bbk}</td>
                    <td style={{ padding: '12px 16px', fontSize: '14px', color: '#333', maxWidth: '500px' }}>{book.title}</td>
                    <td style={{ padding: '12px 16px', fontSize: '14px', textAlign: 'center', color: '#2e7d32', fontWeight: '500' }}>{book.quantity} шт.</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {/* Дополнительная информация о списании */}
          {totalCopies > 0 && (
            <div style={{ 
              marginTop: '16px', 
              padding: '12px', 
              backgroundColor: '#f5f5f5', 
              borderRadius: '8px',
              fontSize: '13px',
              color: '#666'
            }}>
              <strong>Итого списано:</strong> {totalCopies} экземпляр(ов)
            </div>
          )}
        </InnerCard>
        
      </div>

      {/* ФУТЕР */}
      <footer style={{ backgroundColor: '#2c3e50', color: '#fff', padding: '40px 20px', marginTop: '40px' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '30px' }}>
          <div>
            <h3 style={{ margin: '0 0 10px 0', fontSize: '18px' }}>Библиотека ААСК</h3>
            <p style={{ margin: 0, color: '#ccc', fontSize: '13px' }}>Электронный библиотечный каталог<br />Алтайского архитектурно-строительного колледжа</p>
          </div>
          <div>
            <h4 style={{ margin: '0 0 10px 0', fontSize: '16px' }}>Навигация</h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              <li style={{ marginBottom: '8px' }}><Link to="/" style={{ color: '#ccc', textDecoration: 'none', transition: 'color 0.2s' }} onMouseEnter={(e) => e.target.style.color = '#fff'} onMouseLeave={(e) => e.target.style.color = '#ccc'}>Главная</Link></li>
              <li style={{ marginBottom: '8px' }}><Link to="/catalog" style={{ color: '#ccc', textDecoration: 'none', transition: 'color 0.2s' }} onMouseEnter={(e) => e.target.style.color = '#fff'} onMouseLeave={(e) => e.target.style.color = '#ccc'}>Каталог</Link></li>
              <li style={{ marginBottom: '8px' }}><a href="#" style={{ color: '#ccc', textDecoration: 'none', transition: 'color 0.2s' }} onMouseEnter={(e) => e.target.style.color = '#fff'} onMouseLeave={(e) => e.target.style.color = '#ccc'}>Новинки</a></li>
              <li style={{ marginBottom: '8px' }}><a href="#" style={{ color: '#ccc', textDecoration: 'none', transition: 'color 0.2s' }} onMouseEnter={(e) => e.target.style.color = '#fff'} onMouseLeave={(e) => e.target.style.color = '#ccc'}>О библиотеке</a></li>
            </ul>
          </div>
          <div>
            <h4 style={{ margin: '0 0 10px 0', fontSize: '16px' }}>Информация</h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              <li style={{ marginBottom: '8px' }}><a href="#" style={{ color: '#ccc', textDecoration: 'none', transition: 'color 0.2s' }} onMouseEnter={(e) => e.target.style.color = '#fff'} onMouseLeave={(e) => e.target.style.color = '#ccc'}>Правила пользования</a></li>
              <li style={{ marginBottom: '8px' }}><a href="#" style={{ color: '#ccc', textDecoration: 'none', transition: 'color 0.2s' }} onMouseEnter={(e) => e.target.style.color = '#fff'} onMouseLeave={(e) => e.target.style.color = '#ccc'}>Часы работы</a></li>
              <li style={{ marginBottom: '8px' }}><a href="#" style={{ color: '#ccc', textDecoration: 'none', transition: 'color 0.2s' }} onMouseEnter={(e) => e.target.style.color = '#fff'} onMouseLeave={(e) => e.target.style.color = '#ccc'}>Контакты</a></li>
              <li style={{ marginBottom: '8px' }}><a href="#" style={{ color: '#ccc', textDecoration: 'none', transition: 'color 0.2s' }} onMouseEnter={(e) => e.target.style.color = '#fff'} onMouseLeave={(e) => e.target.style.color = '#ccc'}>Помощь</a></li>
            </ul>
          </div>
          <div>
            <h4 style={{ margin: '0 0 10px 0', fontSize: '16px' }}>Контакты</h4>
            <p style={{ margin: '5px 0', color: '#ccc', fontSize: '13px' }}>г. Барнаул, ул. Правды, 123</p>
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

export default ViewDisposalAct