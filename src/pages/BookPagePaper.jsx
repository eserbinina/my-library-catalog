import { useState } from 'react'
import { useParams, Link, useLocation } from 'react-router-dom'
import Header from '../components/Header'

function BookPagePaper() {
  const { id } = useParams()
  const location = useLocation()
  const searchParams = new URLSearchParams(location.search)
  const from = searchParams.get('from')

  const booksData = {
    1: {
      coverImages: ["https://via.placeholder.com/300x400?text=Война+и+мир+1", "https://via.placeholder.com/300x400?text=Война+и+мир+2"],
      mainTitle: "Война и мир",
      additionalTitle: "роман-эпопея",
      responsibility: "Л. Н. Толстой",
      placeOfPublication: "Москва",
      yearOfPublication: "2020",
      pages: "1274 с.",
      isbn: "978-5-280-03824-4",
      fullBibliographic: "Толстой, Л. Н. Война и мир : роман-эпопея / Л. Н. Толстой. — 5-е изд., перераб. — Москва : Художественная литература, 2020. — 1274 с. — ISBN 978-5-280-03824-4.",
      accessUrl: "http://library.aasc.ru/books/war-and-peace",
      contentType: "Художественный текст",
      mediaType: "Том",
      fullDescription: "Роман-эпопея, описывающий события войны 1812 года и жизнь русского общества начала XIX века.",
      authors: ["Толстой Лев Николаевич"],
      contributors: [{ name: "Иванов И.И.", role: "Редактор" }],
      publishers: ["Художественная литература"],
      series: [{ name: "Русская классика", number: "12" }],
      rubrics: ["Художественная литература", "Русская проза XIX века"],
      keywords: ["война 1812 года", "русская литература", "исторический роман"],
      persons: ["Толстой Лев Николаевич", "Наполеон Бонапарт", "Кутузов Михаил Илларионович"],
      branches: [
        { name: "Центральный корпус", count: 3 },
        { name: "Корпус №2", count: 1 },
        { name: "Корпус №3", count: 0 }
      ]
    },
    2: {
      coverImages: ["https://via.placeholder.com/300x400?text=Преступление+и+наказание"],
      mainTitle: "Преступление и наказание",
      additionalTitle: "роман",
      responsibility: "Ф. М. Достоевский",
      placeOfPublication: "Санкт-Петербург",
      yearOfPublication: "2021",
      pages: "608 с.",
      isbn: "978-5-389-12345-6",
      fullBibliographic: "Достоевский, Ф. М. Преступление и наказание : роман / Ф. М. Достоевский. — 3-е изд. — Санкт-Петербург : Азбука, 2021. — 608 с. — ISBN 978-5-389-12345-6.",
      accessUrl: "http://library.aasc.ru/books/crime-and-punishment",
      contentType: "Художественный текст",
      mediaType: "Том",
      fullDescription: "Роман о моральных терзаниях студента Раскольникова.",
      authors: ["Достоевский Федор Михайлович"],
      contributors: [{ name: "Петров В.В.", role: "Редактор" }],
      publishers: ["Азбука"],
      series: [{ name: "Русская классика", number: "15" }],
      rubrics: ["Художественная литература", "Русская проза XIX века"],
      keywords: ["психология", "преступление", "наказание"],
      persons: ["Достоевский Федор Михайлович", "Раскольников", "Соня Мармеладова"],
      branches: [
        { name: "Центральный корпус", count: 0 },
        { name: "Корпус №2", count: 0 },
        { name: "Корпус №3", count: 0 }
      ]
    },
    3: {
      coverImages: ["https://via.placeholder.com/300x400?text=Мастер+и+Маргарита"],
      mainTitle: "Мастер и Маргарита",
      additionalTitle: "роман",
      responsibility: "М. А. Булгаков",
      placeOfPublication: "Москва",
      yearOfPublication: "2022",
      pages: "480 с.",
      isbn: "978-5-17-123456-7",
      fullBibliographic: "Булгаков, М. А. Мастер и Маргарита : роман / М. А. Булгаков. — 5-е изд. — Москва : АСТ, 2022. — 480 с. — ISBN 978-5-17-123456-7.",
      accessUrl: "http://library.aasc.ru/books/master-and-margarita",
      contentType: "Художественный текст",
      mediaType: "Том",
      fullDescription: "Гениальный роман о любви, добре и зле.",
      authors: ["Булгаков Михаил Афанасьевич"],
      contributors: [{ name: "Козлов Д.Д.", role: "Редактор" }],
      publishers: ["АСТ"],
      series: [{ name: "Русская классика", number: "20" }],
      rubrics: ["Художественная литература", "Русская проза XX века"],
      keywords: ["мистика", "любовь", "сатира"],
      persons: ["Булгаков Михаил Афанасьевич", "Мастер", "Маргарита", "Воланд"],
      branches: []
    }
  }

  const book = booksData[id]
  const [currentCoverIndex, setCurrentCoverIndex] = useState(0)

  if (!book) {
    return (
      <div style={{ fontFamily: 'Arial, sans-serif', backgroundColor: '#f9f9f9', minHeight: '100vh' }}>
        <Header />
        <div style={{ textAlign: 'center', padding: '50px' }}>
          <h2>Книга не найдена</h2>
          <Link to="/" style={{ color: '#3636FF' }}>Вернуться на главную</Link>
        </div>
      </div>
    )
  }

  const hasMultipleCovers = book.coverImages && book.coverImages.length > 1

  const InfoCard = ({ title, children }) => (
    <div style={{ backgroundColor: '#fff', borderRadius: '16px', border: '1px solid #eee', padding: '20px', marginBottom: '20px', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
      <h2 style={{ fontSize: '18px', fontWeight: '500', margin: '0 0 12px 0', color: '#1a1a1a' }}>{title}</h2>
      {children}
    </div>
  )

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', backgroundColor: '#f9f9f9', minHeight: '100vh' }}>
      <Header />

      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '20px' }}>
        
        {/* КНОПКА "НАЗАД" — В ЗАВИСИМОСТИ ОТ ТОГО, ОТКУДА ПРИШЛИ */}
        {from === 'librarian' ? (
          <Link to="/librarian" style={{ textDecoration: 'none', color: '#3636FF', fontSize: '14px', marginBottom: '20px', display: 'inline-block' }}>
            ← Назад к списку книг
          </Link>
        ) : (
          <Link to="/" style={{ textDecoration: 'none', color: '#3636FF', fontSize: '14px', marginBottom: '20px', display: 'inline-block' }}>
            ← Назад к каталогу
          </Link>
        )}

        {/* ДВЕ КОЛОНКИ: ЛЕВАЯ (ОБЛОЖКА + ФИЛИАЛЫ) И ПРАВАЯ (ВСЯ ОСТАЛЬНАЯ ИНФОРМАЦИЯ) */}
        <div style={{ display: 'flex', gap: '30px', flexWrap: 'wrap' }}>
          
          {/* ЛЕВАЯ КОЛОНКА — ОБЛОЖКА И ФИЛИАЛЫ */}
          <div style={{ flex: '0 0 280px' }}>
            {/* Обложка */}
            <div style={{
              width: '100%',
              backgroundColor: '#fff',
              borderRadius: '16px',
              overflow: 'hidden',
              border: '1px solid #eee',
              boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
              marginBottom: '16px'
            }}>
              <div style={{ position: 'relative', backgroundColor: '#f5f5f5', display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '360px' }}>
                <img src={book.coverImages[currentCoverIndex]} alt={book.mainTitle} style={{ width: '100%', objectFit: 'cover' }} />
                {hasMultipleCovers && (
                  <>
                    <button onClick={() => setCurrentCoverIndex(prev => (prev === 0 ? book.coverImages.length - 1 : prev - 1))} style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', background: 'rgba(0,0,0,0.5)', color: 'white', border: 'none', borderRadius: '50%', width: '28px', height: '28px', cursor: 'pointer' }}>◀</button>
                    <button onClick={() => setCurrentCoverIndex(prev => (prev === book.coverImages.length - 1 ? 0 : prev + 1))} style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)', background: 'rgba(0,0,0,0.5)', color: 'white', border: 'none', borderRadius: '50%', width: '28px', height: '28px', cursor: 'pointer' }}>▶</button>
                  </>
                )}
              </div>
            </div>

                                                {/* Бумажная версия */}
            <div style={{ backgroundColor: '#fff', borderRadius: '16px', border: '1px solid #eee', padding: '16px', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
              
              {/* ЕСТЬ БУМАЖНЫЕ ЭКЗЕМПЛЯРЫ */}
              {book.branches?.length > 0 && book.branches.some(b => b.count > 0) ? (
                <>
                  <h3 style={{ fontSize: '16px', fontWeight: '700', margin: '0 0 16px 0', color: '#1a1a1a' }}>Бумажная версия</h3>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '16px' }}>
                    {book.branches.map((b, idx) => {
                      let bgColor = 'transparent'
                      let textColor = '#333'
                      if (b.count > 0) {
                        bgColor = 'rgba(46, 125, 50, 0.1)'  // зелёный фон
                        textColor = '#2e7d32'               // зелёный текст
                      } else if (b.count === 0) {
                        bgColor = 'rgba(211, 47, 47, 0.1)'  // красный фон
                        textColor = '#d32f2f'               // красный текст
                      }
                      return (
                        <div key={idx} style={{ 
                          display: 'flex', 
                          justifyContent: 'space-between', 
                          alignItems: 'center',
                          backgroundColor: bgColor,
                          borderRadius: '8px',
                          padding: '8px 12px'
                        }}>
                          <span style={{ fontSize: '14px', color: textColor, fontWeight: b.count > 0 ? '500' : '500' }}>{b.name}</span>
                          <span style={{ fontSize: '14px', fontWeight: '500', color: textColor }}>
                            {b.count > 0 ? `${b.count} экз.` : 'Нет в наличии'}
                          </span>
                        </div>
                      )
                    })}
                  </div>
                  <p style={{ fontSize: '13px', color: '#999', margin: '16px 0 0 0', fontStyle: 'italic' }}>
                    📍 Для получения книги обратитесь в библиотеку ААСК
                  </p>
                </>
              ) : (
                /* НЕТ БУМАЖНОЙ ВЕРСИИ - КРАСНЫЙ КВАДРАТ (БЕЗ ИКОНКИ КНИГИ) */
                <div style={{ 
                  backgroundColor: 'rgba(211, 47, 47, 0.12)',
                  borderRadius: '12px',
                  padding: '16px',
                  textAlign: 'center',
                  border: '1px solid rgba(211, 47, 47, 0.4)'
                }}>
                  <h3 style={{ fontSize: '16px', fontWeight: '700', margin: '0 0 12px 0', color: '#d32f2f' }}>Бумажная версия</h3>
                  <p style={{ margin: 0, fontSize: '14px', color: '#d32f2f', fontWeight: '500' }}>
                    Отсутствует бумажная версия
                  </p>
                </div>
              )}
              
            </div>
          </div>

          {/* ПРАВАЯ КОЛОНКА — ОСНОВНАЯ ИНФОРМАЦИЯ + ВСЕ ОСТАЛЬНЫЕ БЛОКИ */}
          <div style={{ flex: 1 }}>
            
            {/* Основная информация */}
            <div style={{ backgroundColor: '#fff', borderRadius: '16px', border: '1px solid #eee', padding: '20px', marginBottom: '20px', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
              <h1 style={{ fontSize: '26px', fontWeight: '500', margin: '0 0 4px 0', color: '#1a1a1a' }}>{book.mainTitle}</h1>
              {book.additionalTitle && <p style={{ fontSize: '15px', color: '#666', margin: '0 0 20px 0' }}>{book.additionalTitle}</p>}
            </div>

            {/* БИБЛИОГРАФИЧЕСКОЕ ОПИСАНИЕ (СИНЯЯ РАМКА + ПОЛУПРОЗРАЧНАЯ ЗАЛИВКА) */}
            <div style={{
              backgroundColor: 'rgba(54, 54, 255, 0.05)',
              border: '1px solid #3636FF',
              borderRadius: '12px',
              padding: '16px 20px',
              marginBottom: '30px'
            }}>
              <p style={{ margin: 0, color: '#333', fontSize: '14px', lineHeight: '1.5' }}>
                {book.fullBibliographic}
              </p>
            </div>
                   {/* ОСНОВНАЯ ИНФОРМАЦИЯ - КАЖДОЕ ПОЛЕ В СИНЕЙ ПОЛОСЕ */}
        <div style={{
          backgroundColor: '#fff',
          borderRadius: '16px',
          border: '1px solid #eee',
          padding: '20px',
          marginBottom: '20px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.04)'
        }}>
          <h2 style={{ fontSize: '18px', fontWeight: '500', margin: '0 0 16px 0', color: '#1a1a1a' }}>Основная информация</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px' }}>
            
            <div style={{
              backgroundColor: 'rgba(54, 54, 255, 0.06)',
              borderRadius: '8px',
              padding: '8px 12px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: '8px'
            }}>
              <span style={{ color: '#999', fontSize: '13px' }}>Вид ресурса</span>
              <span style={{ color: '#333', fontSize: '13px', fontWeight: '500' }}>Текст</span>
            </div>
            
            <div style={{
              backgroundColor: 'rgba(54, 54, 255, 0.06)',
              borderRadius: '8px',
              padding: '8px 12px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: '8px'
            }}>
              <span style={{ color: '#999', fontSize: '13px' }}>Основное заглавие</span>
              <span style={{ color: '#333', fontSize: '13px', fontWeight: '500' }}>{book.mainTitle}</span>
            </div>
            
            <div style={{
              backgroundColor: 'rgba(54, 54, 255, 0.06)',
              borderRadius: '8px',
              padding: '8px 12px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: '8px'
            }}>
              <span style={{ color: '#999', fontSize: '13px' }}>Параллельное заглавие</span>
              <span style={{ color: '#333', fontSize: '13px', fontWeight: '500' }}>—</span>
            </div>
            
            <div style={{
              backgroundColor: 'rgba(54, 54, 255, 0.06)',
              borderRadius: '8px',
              padding: '8px 12px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: '8px'
            }}>
              <span style={{ color: '#999', fontSize: '13px' }}>Доп. сведения к заглавию</span>
              <span style={{ color: '#333', fontSize: '13px', fontWeight: '500' }}>{book.additionalTitle}</span>
            </div>
            
            <div style={{
              backgroundColor: 'rgba(54, 54, 255, 0.06)',
              borderRadius: '8px',
              padding: '8px 12px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: '8px'
            }}>
              <span style={{ color: '#999', fontSize: '13px' }}>Сведения об ответственности</span>
              <span style={{ color: '#333', fontSize: '13px', fontWeight: '500' }}>{book.responsibility}</span>
            </div>
            
            <div style={{
              backgroundColor: 'rgba(54, 54, 255, 0.06)',
              borderRadius: '8px',
              padding: '8px 12px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: '8px'
            }}>
              <span style={{ color: '#999', fontSize: '13px' }}>Номер части</span>
              <span style={{ color: '#333', fontSize: '13px', fontWeight: '500' }}>—</span>
            </div>
            
          </div>
        </div>

                {/* ИЗДАТЕЛЬСКАЯ ИНФОРМАЦИЯ - КАЖДОЕ ПОЛЕ В СИНЕЙ ПОЛОСЕ */}
        <div style={{
          backgroundColor: '#fff',
          borderRadius: '16px',
          border: '1px solid #eee',
          padding: '20px',
          marginBottom: '20px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.04)'
        }}>
          <h2 style={{ fontSize: '18px', fontWeight: '500', margin: '0 0 16px 0', color: '#1a1a1a' }}>Издательская информация</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px' }}>
            
            <div style={{
              backgroundColor: 'rgba(54, 54, 255, 0.06)',
              borderRadius: '8px',
              padding: '8px 12px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: '8px'
            }}>
              <span style={{ color: '#999', fontSize: '13px' }}>Сведения об издании</span>
              <span style={{ color: '#333', fontSize: '13px', fontWeight: '500' }}>{book.editionInfo || "—"}</span>
            </div>
            
            <div style={{
              backgroundColor: 'rgba(54, 54, 255, 0.06)',
              borderRadius: '8px',
              padding: '8px 12px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: '8px'
            }}>
              <span style={{ color: '#999', fontSize: '13px' }}>Год издания</span>
              <span style={{ color: '#333', fontSize: '13px', fontWeight: '500' }}>{book.yearOfPublication || "—"}</span>
            </div>
            
            <div style={{
              backgroundColor: 'rgba(54, 54, 255, 0.06)',
              borderRadius: '8px',
              padding: '8px 12px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: '8px'
            }}>
              <span style={{ color: '#999', fontSize: '13px' }}>Доп. сведения об издании</span>
              <span style={{ color: '#333', fontSize: '13px', fontWeight: '500' }}>—</span>
            </div>
            
            <div style={{
              backgroundColor: 'rgba(54, 54, 255, 0.06)',
              borderRadius: '8px',
              padding: '8px 12px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: '8px'
            }}>
              <span style={{ color: '#999', fontSize: '13px' }}>Место издания</span>
              <span style={{ color: '#333', fontSize: '13px', fontWeight: '500' }}>{book.placeOfPublication || "—"}</span>
            </div>
            
          </div>
        </div>

                {/* ФИЗИЧЕСКОЕ ОПИСАНИЕ */}
        <div style={{
          backgroundColor: '#fff',
          borderRadius: '16px',
          border: '1px solid #eee',
          padding: '20px',
          marginBottom: '20px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.04)'
        }}>
          <h2 style={{ fontSize: '18px', fontWeight: '500', margin: '0 0 16px 0', color: '#1a1a1a' }}>Физическое описание</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px' }}>
            
            <div style={{
              backgroundColor: 'rgba(54, 54, 255, 0.06)',
              borderRadius: '8px',
              padding: '8px 12px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: '8px'
            }}>
              <span style={{ color: '#999', fontSize: '13px' }}>Количество страниц</span>
              <span style={{ color: '#333', fontSize: '13px', fontWeight: '500' }}>{book.pages || "—"}</span>
            </div>
            
            <div style={{
              backgroundColor: 'rgba(54, 54, 255, 0.06)',
              borderRadius: '8px',
              padding: '8px 12px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: '8px'
            }}>
              <span style={{ color: '#999', fontSize: '13px' }}>Сопроводительный материал</span>
              <span style={{ color: '#333', fontSize: '13px', fontWeight: '500' }}>—</span>
            </div>
            
            <div style={{
              backgroundColor: 'rgba(54, 54, 255, 0.06)',
              borderRadius: '8px',
              padding: '8px 12px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: '8px'
            }}>
              <span style={{ color: '#999', fontSize: '13px' }}>Примечания</span>
              <span style={{ color: '#333', fontSize: '13px', fontWeight: '500' }}>{book.notes || "—"}</span>
            </div>
            
          </div>
        </div>

                {/* ДОСТУП И НОСИТЕЛЬ */}
        <div style={{
          backgroundColor: '#fff',
          borderRadius: '16px',
          border: '1px solid #eee',
          padding: '20px',
          marginBottom: '20px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.04)'
        }}>
          <h2 style={{ fontSize: '18px', fontWeight: '500', margin: '0 0 16px 0', color: '#1a1a1a' }}>Доступ и носитель</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px' }}>
            
            <div style={{
              backgroundColor: 'rgba(54, 54, 255, 0.06)',
              borderRadius: '8px',
              padding: '8px 12px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: '8px'
            }}>
              <span style={{ color: '#999', fontSize: '13px' }}>Ссылка доступа</span>
              <span style={{ color: '#333', fontSize: '13px', fontWeight: '500' }}>—</span>
            </div>
            
            <div style={{
              backgroundColor: 'rgba(54, 54, 255, 0.06)',
              borderRadius: '8px',
              padding: '8px 12px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: '8px'
            }}>
              <span style={{ color: '#999', fontSize: '13px' }}>Ограничение доступа</span>
              <span style={{ color: '#333', fontSize: '13px', fontWeight: '500' }}>{book.accessRestriction || "Свободный доступ"}</span>
            </div>
            
            <div style={{
              backgroundColor: 'rgba(54, 54, 255, 0.06)',
              borderRadius: '8px',
              padding: '8px 12px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: '8px'
            }}>
              <span style={{ color: '#999', fontSize: '13px' }}>Дата обращения</span>
              <span style={{ color: '#333', fontSize: '13px', fontWeight: '500' }}>—</span>
            </div>
            
            <div style={{
              backgroundColor: 'rgba(54, 54, 255, 0.06)',
              borderRadius: '8px',
              padding: '8px 12px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: '8px'
            }}>
              <span style={{ color: '#999', fontSize: '13px' }}>Вид содержания</span>
              <span style={{ color: '#333', fontSize: '13px', fontWeight: '500' }}>{book.contentType || "—"}</span>
            </div>
            
            <div style={{
              backgroundColor: 'rgba(54, 54, 255, 0.06)',
              borderRadius: '8px',
              padding: '8px 12px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: '8px'
            }}>
              <span style={{ color: '#999', fontSize: '13px' }}>Тип носителя</span>
              <span style={{ color: '#333', fontSize: '13px', fontWeight: '500' }}>{book.mediaType || "—"}</span>
            </div>
            
            <div style={{
              backgroundColor: 'rgba(54, 54, 255, 0.06)',
              borderRadius: '8px',
              padding: '8px 12px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: '8px'
            }}>
              <span style={{ color: '#999', fontSize: '13px' }}>Код языка</span>
              <span style={{ color: '#333', fontSize: '13px', fontWeight: '500' }}>{book.language || "rus"}</span>
            </div>
            
          </div>
        </div>

                {/* ПОЛНОЕ ОПИСАНИЕ */}
        <div style={{
          backgroundColor: '#fff',
          borderRadius: '16px',
          border: '1px solid #eee',
          padding: '20px',
          marginBottom: '20px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.04)'
        }}>
          <h2 style={{ fontSize: '18px', fontWeight: '500', margin: '0 0 12px 0', color: '#1a1a1a' }}>Полное описание</h2>
          <div style={{
            backgroundColor: 'rgba(54, 54, 255, 0.06)',
            borderRadius: '8px',
            padding: '12px 16px'
          }}>
            <p style={{ margin: 0, color: '#333', fontSize: '14px', lineHeight: '1.5' }}>
              {book.fullDescription}
            </p>
          </div>
        </div>

                {/* АВТОРЫ И УЧАСТНИКИ */}
        <div style={{
          backgroundColor: '#fff',
          borderRadius: '16px',
          border: '1px solid #eee',
          padding: '20px',
          marginBottom: '20px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.04)'
        }}>
          <h2 style={{ fontSize: '18px', fontWeight: '500', margin: '0 0 16px 0', color: '#1a1a1a' }}>Авторы и участники</h2>
          
          {/* Авторы - яркая полоска по длине текста */}
          <div style={{ marginBottom: '20px' }}>
            <h3 style={{ fontSize: '14px', fontWeight: '500', margin: '0 0 8px 0', color: '#666' }}>Авторы</h3>
            <div style={{
              display: 'inline-block',
              backgroundColor: 'rgba(54, 54, 255, 0.15)',
              borderRadius: '20px',
              padding: '6px 16px',
              border: '1px solid rgba(54, 54, 255, 0.3)'
            }}>
              <span style={{ color: '#3636FF', fontSize: '14px', fontWeight: '500' }}>{book.authors?.join(', ') || "—"}</span>
            </div>
          </div>
          
          {/* Участники ответственности  */}
          <div>
            <h3 style={{ fontSize: '14px', fontWeight: '500', margin: '0 0 12px 0', color: '#666' }}>Участники ответственности</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px' }}>
              {book.contributors?.map((c, idx) => (
                <div key={idx} style={{
                  backgroundColor: 'rgba(54, 54, 255, 0.06)',
                  borderRadius: '10px',
                  padding: '10px 12px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '4px'
                }}>
                  <span style={{ color: '#333', fontSize: '14px', fontWeight: '500' }}>{c.name}</span>
                  <span style={{ color: '#999', fontSize: '12px' }}>{c.role}</span>
                </div>
              ))}
            </div>
          </div>
          
        </div>
                {/* ИЗДАТЕЛИ */}
        <div style={{
          backgroundColor: '#fff',
          borderRadius: '16px',
          border: '1px solid #eee',
          padding: '20px',
          marginBottom: '20px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.04)'
        }}>
          <h2 style={{ fontSize: '18px', fontWeight: '500', margin: '0 0 12px 0', color: '#1a1a1a' }}>Издатели</h2>
          <div style={{
            display: 'inline-block',
            backgroundColor: 'rgba(76, 175, 80, 0.12)',
            borderRadius: '20px',
            padding: '6px 16px',
            border: '1px solid rgba(76, 175, 80, 0.3)'
          }}>
            <span style={{ color: '#2e7d32', fontSize: '14px', fontWeight: '500' }}>{book.publishers?.join(', ') || "—"}</span>
          </div>
        </div>
                {/* СЕРИИ */}
        <div style={{
          backgroundColor: '#fff',
          borderRadius: '16px',
          border: '1px solid #eee',
          padding: '20px',
          marginBottom: '20px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.04)'
        }}>
          <h2 style={{ fontSize: '18px', fontWeight: '500', margin: '0 0 12px 0', color: '#1a1a1a' }}>Серии</h2>
          <div style={{
            backgroundColor: 'rgba(255, 152, 0, 0.1)',
            borderRadius: '12px',
            padding: '12px 16px',
            border: '1px solid rgba(255, 152, 0, 0.3)'
          }}>
            <div style={{ fontWeight: '500', color: '#e65100', marginBottom: '8px' }}>{book.series?.[0]?.name || "—"}</div>
            <div style={{ fontSize: '13px', color: '#bf360c' }}>
              Номер выпуска: {book.series?.[0]?.number || "—"} | Подсерия: {book.series?.[0]?.subSeries || "Золотой фонд"}
            </div>
          </div>
        </div>
                {/* ИДЕНТИФИКАТОРЫ */}
        <div style={{
          backgroundColor: '#fff',
          borderRadius: '16px',
          border: '1px solid #eee',
          padding: '20px',
          marginBottom: '20px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.04)'
        }}>
          <h2 style={{ fontSize: '18px', fontWeight: '500', margin: '0 0 12px 0', color: '#1a1a1a' }}>Идентификаторы</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
              <span style={{ color: '#999', fontSize: '14px' }}>ISBN</span>
              <span style={{ color: '#333', fontSize: '14px' }}>{book.isbn || "—"}</span>
            </div>
          </div>
        </div>
                {/* КЛАССИФИКАЦИЯ */}
        <div style={{
          backgroundColor: '#fff',
          borderRadius: '16px',
          border: '1px solid #eee',
          padding: '20px',
          marginBottom: '20px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.04)'
        }}>
          <h2 style={{ fontSize: '18px', fontWeight: '500', margin: '0 0 16px 0', color: '#1a1a1a' }}>Классификация</h2>
          
          {/* Рубрики  */}
          <div style={{ marginBottom: '20px' }}>
            <h3 style={{ fontSize: '15px', fontWeight: '500', margin: '0 0 10px 0', color: '#666' }}>Рубрики</h3>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
              {book.rubrics?.map((r, idx) => (
                <span key={idx} style={{
                  backgroundColor: 'rgba(255, 152, 0, 0.12)',
                  borderRadius: '20px',
                  padding: '5px 14px',
                  fontSize: '13px',
                  color: '#e65100',
                  border: '1px solid rgba(255, 152, 0, 0.3)'
                }}>
                  {r}
                </span>
              ))}
            </div>
          </div>
          
          {/* Ключевые слова  */}
          <div style={{ marginBottom: '20px' }}>
            <h3 style={{ fontSize: '15px', fontWeight: '500', margin: '0 0 10px 0', color: '#666' }}>Ключевые слова</h3>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
              {book.keywords?.map((k, idx) => (
                <span key={idx} style={{
                  backgroundColor: 'rgba(54, 54, 255, 0.08)',
                  borderRadius: '20px',
                  padding: '5px 14px',
                  fontSize: '13px',
                  color: '#3636FF',
                  border: '1px solid rgba(54, 54, 255, 0.2)'
                }}>
                  {k}
                </span>
              ))}
            </div>
          </div>
          
        </div>
                {/* ПЕРСОНАЛИИ */}
        <div style={{
          backgroundColor: '#fff',
          borderRadius: '16px',
          border: '1px solid #eee',
          padding: '20px',
          marginBottom: '20px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.04)'
        }}>
          <h2 style={{ fontSize: '18px', fontWeight: '500', margin: '0 0 12px 0', color: '#1a1a1a' }}>Персоналии</h2>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
            {book.persons?.map((p, idx) => (
              <span key={idx} style={{
                backgroundColor: 'rgba(76, 175, 80, 0.1)',
                borderRadius: '20px',
                padding: '5px 14px',
                fontSize: '13px',
                color: '#2e7d32',
                border: '1px solid rgba(76, 175, 80, 0.3)'
              }}>
                {p}
              </span>
            ))}
          </div>
        </div>


            

          </div>
        </div>
      </div>

      {/* ФУТЕР */}
      <footer style={{ backgroundColor: '#2c3e50', color: '#fff', padding: '32px 20px', marginTop: '40px' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', textAlign: 'center' }}>
          <p style={{ margin: '0 0 8px', fontSize: '14px' }}>Библиотека ААСК — Электронный библиотечный каталог</p>
          <p style={{ margin: 0, fontSize: '13px', color: '#aaa' }}>© 2026 Колледж ААСК. Все права защищены</p>
        </div>
      </footer>
    </div>
  )
}

export default BookPagePaper