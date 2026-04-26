import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'

function BookInfo() {
  const { id } = useParams()
  
  // ВРЕМЕННЫЕ ДАННЫЕ (потом будут с сервера)
  const [book] = useState({
    id: 1,
    resourceType: "Текст",
    bbk: "У9246",
    fullBibliographic: "Толстой, Л. Н. Война и мир : роман-эпопея / Л. Н. Толстой. — 5-е изд. — Москва : Художественная литература, 2020. — 1274 с. — ISBN 978-5-280-03824-4. — Текст : непосредственный.",
    mainTitle: "Война и мир",
    parallelTitle: "War and Peace",
    additionalTitle: "роман-эпопея",
    responsibility: "Л. Н. Толстой",
    partNumbers: ["Том 1", "Том 2", "Том 3"],
    edition: "5-е изд.",
    additionalEdition: "перераб.",
    placeOfPublication: "Москва",
    yearOfPublication: "2020",
    pages: "1274",
    isbn: "978-5-280-03824-4",
    accessDate: "2024-01-15",
    notes: "Классика русской литературы",
    bibliography: "Библиогр.: с. 1200-1250",
    accessUrl: "http://library.aasc.ru/books/war-and-peace",
    accessRestriction: "Свободный доступ",
    contentType: "Монография",
    mediaType: "Печатный",
    language: "Русский",
    source: "Титульный лист",
    rubrics: ["Художественная литература", "Русская проза XIX века"],
    keywords: ["война 1812 года", "русская литература", "исторический роман"],
    persons: ["Толстой Лев Николаевич"],
    series: "Русская классика",
    seriesNumber: "12",
    support: "Золотой фонд",
    contributors: [{ name: "Иванов И.И.", role: "Редактор", inTitle: true, inDescription: false }],
    publishers: ["Художественная литература"],
    seriesList: [{ name: "Русская классика", number: "12" }],
    identifiers: [{ type: "ISBN", value: "978-5-280-03824-4" }],
    inventoryList: [],
    coverPreview: null,
    isActive: true, // true - активна (зелёный), false - неактивна (красный)
    branches: [
      { name: "Центральный корпус", count: 3 },
      { name: "Корпус №2", count: 1 },
      { name: "Корпус №3", count: 0 }
    ]
  })

  const InnerCard = ({ title, children }) => (
    <div style={{ backgroundColor: '#fff', borderRadius: '16px', border: '1px solid #eee', padding: '20px', marginBottom: '20px', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
      <h2 style={{ fontSize: '18px', fontWeight: '500', margin: '0 0 16px 0', color: '#1a1a1a' }}>{title}</h2>
      {children}
    </div>
  )

  const ReadOnlyField = ({ label, value }) => (
    <div style={{ marginBottom: '16px' }}>
      <div style={{ fontSize: '14px', color: '#666', marginBottom: '6px' }}>{label}</div>
      <div style={{ 
        width: '100%', 
        padding: '10px', 
        backgroundColor: '#f5f5f5', 
        border: '1px solid #eee', 
        borderRadius: '8px', 
        fontSize: '14px', 
        color: '#333',
        cursor: 'default'
      }}>
        {value || "—"}
      </div>
    </div>
  )

  const ReadOnlyTagList = ({ label, items, colorScheme }) => {
    let bgColor, textColor
    if (colorScheme === 'blue') {
      bgColor = 'rgba(54, 54, 255, 0.08)'
      textColor = '#3636FF'
    } else if (colorScheme === 'green') {
      bgColor = 'rgba(46, 125, 50, 0.1)'
      textColor = '#2e7d32'
    } else {
      bgColor = 'rgba(255, 152, 0, 0.1)'
      textColor = '#e65100'
    }
    
    return (
      <div style={{ marginBottom: '16px' }}>
        <div style={{ fontSize: '14px', color: '#666', marginBottom: '6px' }}>{label}</div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
          {items.map((item, idx) => (
            <span key={idx} style={{ 
              backgroundColor: bgColor, 
              padding: '6px 12px', 
              borderRadius: '20px', 
              fontSize: '13px', 
              color: textColor,
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px'
            }}>
              {item}
            </span>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', backgroundColor: '#f9f9f9', minHeight: '100vh' }}>
      
      {/* ШАПКА */}
      <div style={{
        backgroundColor: '#fff',
        borderBottom: '1px solid #eee',
        padding: '15px 20px',
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        flexWrap: 'wrap'
      }}>
        <img 
          src="/images/profile-icon.png" 
          alt="Профиль" 
          style={{ width: '36px', height: '36px', objectFit: 'contain' }} 
        />
        <div>
          <h1 style={{ fontSize: '24px', margin: 0, color: '#333', fontWeight: '700' }}>Информация о книге</h1>
          <p style={{ margin: '4px 0 0 0', color: '#666', fontSize: '14px' }}>Колледж ААСК</p>
        </div>
      </div>

      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '20px' }}>
        
        <Link to="/librarian/manage-catalog" style={{ textDecoration: 'none', color: '#3636FF', fontSize: '14px', marginBottom: '20px', display: 'inline-block' }}>
          ← Назад к управлению каталогом
        </Link>

        {/* БИБЛИОГРАФИЧЕСКОЕ ОПИСАНИЕ - ОТДЕЛЬНЫЙ БЛОК */}
        <div style={{
          backgroundColor: '#fff',
          borderRadius: '16px',
          border: '1px solid #3636FF',
          padding: '20px',
          marginBottom: '20px',
          boxShadow: '0 2px 8px rgba(54, 54, 255, 0.05)'
        }}>
          <h2 style={{ fontSize: '18px', fontWeight: '500', margin: '0 0 12px 0', color: '#3636FF' }}>Библиографическое описание</h2>
          <div style={{
            backgroundColor: 'rgba(54, 54, 255, 0.05)',
            borderRadius: '12px',
            padding: '16px',
            border: '1px solid #eeeeee'
          }}>
            <p style={{ margin: 0, color: '#3636FF', fontSize: '14px', lineHeight: '1.5' }}>
              {book.fullBibliographic || `${book.responsibility} ${book.mainTitle} : ${book.additionalTitle} / ${book.responsibility}. — ${book.edition}${book.additionalEdition ? `, ${book.additionalEdition}` : ''}. — ${book.placeOfPublication} : ${book.publishers?.join(', ') || 'б.и.'}, ${book.yearOfPublication}. — ${book.pages} с. — ISBN ${book.isbn}. — Текст : непосредственный.`}
            </p>
          </div>
        </div>

        {/* БОЛЬШАЯ РАМКА "БИБЛИОГРАФИЧЕСКАЯ ЗАПИСЬ" */}
        <div style={{ 
          backgroundColor: '#fff', 
          borderRadius: '20px', 
          border: '1px solid #ddd', 
          padding: '24px', 
          marginBottom: '20px',
          boxShadow: '0 2px 12px rgba(0,0,0,0.05)'
        }}>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
            <h1 style={{ fontSize: '22px', fontWeight: '600', margin: 0, color: '#1a1a1a', paddingBottom: '12px', borderBottom: '2px solid #3636FF', display: 'inline-block' }}>
              Библиографическая запись
            </h1>
            {book.isActive ? (
              <span style={{
                display: 'inline-block',
                backgroundColor: 'rgba(46, 125, 50, 0.15)',
                color: '#2e7d32',
                padding: '4px 12px',
                borderRadius: '20px',
                fontSize: '12px',
                fontWeight: '500'
              }}>
                ● Активна
              </span>
            ) : (
              <span style={{
                display: 'inline-block',
                backgroundColor: 'rgba(211, 47, 47, 0.15)',
                color: '#d32f2f',
                padding: '4px 12px',
                borderRadius: '20px',
                fontSize: '12px',
                fontWeight: '500'
              }}>
                ● Неактивна
              </span>
            )}
          </div>

          {/* ПОЛЯ ВЕРХНЕЙ ЧАСТИ */}
          <div style={{ backgroundColor: '#fff', borderRadius: '16px', border: '1px solid #eee', padding: '20px', marginBottom: '20px', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
            
            <div style={{ display: 'flex', gap: '40px', marginBottom: '20px', flexWrap: 'wrap' }}>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: '14px', color: '#666', marginBottom: '6px' }}>Тип ресурса</div>
                <div style={{ width: '100%', padding: '10px', backgroundColor: '#f5f5f5', border: '1px solid #eee', borderRadius: '8px', fontSize: '14px', color: '#333' }}>
                  {book.resourceType}
                </div>
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: '14px', color: '#666', marginBottom: '6px' }}>Индекс ББК</div>
                <div style={{ width: '100%', padding: '10px', backgroundColor: '#f5f5f5', border: '1px solid #eee', borderRadius: '8px', fontSize: '14px', color: '#333' }}>
                  {book.bbk}
                </div>
              </div>
            </div>

            <ReadOnlyField label="Основное заглавие *" value={book.mainTitle} />
            <ReadOnlyField label="Параллельное заглавие" value={book.parallelTitle} />
            <ReadOnlyField label="Доп. сведения к заглавию" value={book.additionalTitle} />
            <ReadOnlyField label="Сведения об ответственности (текст)" value={book.responsibility} />
          </div>

          {/* НОМЕР ЧАСТИ */}
          <div style={{ backgroundColor: '#fff', borderRadius: '16px', border: '1px solid #eee', padding: '20px', marginBottom: '20px', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
            <h2 style={{ fontSize: '18px', fontWeight: '500', margin: '0 0 16px 0', color: '#1a1a1a' }}>Номер части</h2>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {book.partNumbers.map((part, idx) => (
                <span key={idx} style={{ backgroundColor: 'rgba(54,54,255,0.06)', padding: '4px 12px', borderRadius: '20px', fontSize: '13px', color: '#3636FF' }}>
                  {part}
                </span>
              ))}
            </div>
          </div>

          {/* ИЗДАТЕЛЬСКАЯ ИНФОРМАЦИЯ */}
          <InnerCard title="Издательская информация">
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px' }}>
              <ReadOnlyField label="Сведения об издании" value={book.edition} />
              <ReadOnlyField label="Доп. сведения об издании" value={book.additionalEdition} />
              <ReadOnlyField label="Место издания" value={book.placeOfPublication} />
              <ReadOnlyField label="Год издания" value={book.yearOfPublication} />
              <ReadOnlyField label="Количество страниц" value={book.pages} />
              <ReadOnlyField label="Сопроводительный материал" value={book.supplementaryMaterial || "—"} />
            </div>
          </InnerCard>

          {/* ПРИМЕЧАНИЯ */}
          <div style={{ backgroundColor: '#fff', borderRadius: '16px', border: '1px solid #eee', padding: '20px', marginBottom: '20px', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
            <ReadOnlyField label="Примечания" value={book.notes} />
            <ReadOnlyField label="Библиография" value={book.bibliography} />
          </div>

          {/* ДОСТУП И НОСИТЕЛЬ */}
          <div style={{ backgroundColor: '#fff', borderRadius: '16px', border: '1px solid #eee', padding: '20px', marginBottom: '20px', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
            <ReadOnlyField label="URL доступа" value={book.accessUrl} />
            <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap', marginBottom: '16px' }}>
              <div style={{ flex: 1 }}>
                <ReadOnlyField label="Ограничение доступа" value={book.accessRestriction} />
              </div>
              <div style={{ flex: 1 }}>
                <ReadOnlyField label="Дата обращения" value={book.accessDate} />
              </div>
            </div>
            <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap', marginBottom: '16px' }}>
              <div style={{ flex: 1 }}>
                <ReadOnlyField label="Вид содержания" value={book.contentType} />
              </div>
              <div style={{ flex: 1 }}>
                <ReadOnlyField label="Тип носителя" value={book.mediaType} />
              </div>
            </div>
            <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
              <div style={{ flex: 1 }}>
                <ReadOnlyField label="Язык" value={book.language} />
              </div>
              <div style={{ flex: 1 }}>
                <ReadOnlyField label="Источник описания" value={book.source} />
              </div>
            </div>
          </div>

          {/* ОТВЕТСТВЕННЫЕ ЛИЦА */}
          <div style={{ backgroundColor: '#fff', borderRadius: '16px', border: '1px solid #eee', padding: '20px', marginBottom: '20px', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
            <h2 style={{ fontSize: '18px', fontWeight: '500', margin: '0 0 16px 0', color: '#1a1a1a' }}>Ответственные лица</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {book.contributors.map((item, idx) => (
                <div key={idx} style={{ backgroundColor: 'rgba(54,54,255,0.06)', padding: '8px 12px', borderRadius: '8px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ color: '#333', fontSize: '14px' }}>{item.name} ({item.role}) {item.inTitle && '[В заголовке]'}{item.inDescription && '[В описании]'}</span>
                </div>
              ))}
            </div>
          </div>

          {/* ИЗДАТЕЛИ */}
          <div style={{ backgroundColor: '#fff', borderRadius: '16px', border: '1px solid #eee', padding: '20px', marginBottom: '20px', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
            <h2 style={{ fontSize: '18px', fontWeight: '500', margin: '0 0 16px 0', color: '#1a1a1a' }}>Издатели</h2>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {book.publishers.map((item, idx) => (
                <span key={idx} style={{ backgroundColor: 'rgba(54,54,255,0.06)', padding: '4px 12px', borderRadius: '20px', fontSize: '13px', color: '#3636FF' }}>
                  {item}
                </span>
              ))}
            </div>
          </div>

          {/* СЕРИИ */}
          <div style={{ backgroundColor: '#fff', borderRadius: '16px', border: '1px solid #eee', padding: '20px', marginBottom: '20px', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
            <h2 style={{ fontSize: '18px', fontWeight: '500', margin: '0 0 16px 0', color: '#1a1a1a' }}>Серии</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {book.seriesList.map((item, idx) => (
                <div key={idx} style={{ backgroundColor: 'rgba(54,54,255,0.06)', padding: '8px 12px', borderRadius: '8px' }}>
                  <span style={{ color: '#333', fontSize: '14px' }}>{item.name} (№{item.number})</span>
                </div>
              ))}
            </div>
          </div>

          {/* ИДЕНТИФИКАТОРЫ */}
          <div style={{ backgroundColor: '#fff', borderRadius: '16px', border: '1px solid #eee', padding: '20px', marginBottom: '20px', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
            <h2 style={{ fontSize: '18px', fontWeight: '500', margin: '0 0 16px 0', color: '#1a1a1a' }}>Идентификаторы</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {book.identifiers.map((item, idx) => (
                <div key={idx} style={{ backgroundColor: 'rgba(54,54,255,0.06)', padding: '8px 12px', borderRadius: '8px' }}>
                  <span style={{ color: '#333', fontSize: '14px' }}>{item.type}: {item.value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* РУБРИКИ */}
          <ReadOnlyTagList label="Рубрики" items={book.rubrics} colorScheme="blue" />

          {/* КЛЮЧЕВЫЕ СЛОВА */}
          <ReadOnlyTagList label="Ключевые слова" items={book.keywords} colorScheme="green" />

          {/* ПЕРСОНАЛИИ */}
          <ReadOnlyTagList label="Персоналии" items={book.persons} colorScheme="orange" />

          {/* ИНВЕНТАРНЫЕ ПОЗИЦИИ */}
          <div style={{ backgroundColor: '#fff', borderRadius: '16px', border: '1px solid #eee', padding: '20px', marginBottom: '20px', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
            <h2 style={{ fontSize: '18px', fontWeight: '500', margin: '0 0 16px 0', color: '#1a1a1a' }}>Инвентарные позиции</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {book.inventoryList.map((item, idx) => (
                <div key={idx} style={{ backgroundColor: 'rgba(54,54,255,0.06)', padding: '8px 12px', borderRadius: '8px' }}>
                  <span style={{ color: '#333', fontSize: '14px' }}>
                    {item.location || 'Нет места'} | Инв.№ {item.number} | {item.count || 0} экз. | {item.active ? 'Активна' : 'Не активна'}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* ИЗОБРАЖЕНИЕ ОБЛОЖКИ */}
          <div style={{ backgroundColor: '#fff', borderRadius: '16px', border: '1px solid #eee', padding: '20px', marginBottom: '20px', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
            <h2 style={{ fontSize: '18px', fontWeight: '500', margin: '0 0 16px 0', color: '#1a1a1a' }}>Изображение обложки</h2>
            <div style={{ backgroundColor: '#f5f5f5', borderRadius: '12px', padding: '20px', textAlign: 'center' }}>
              {book.coverPreview ? (
                <img src={book.coverPreview} alt="Обложка" style={{ maxWidth: '100%', maxHeight: '200px', objectFit: 'contain' }} />
              ) : (
                <img src="/images/upload-placeholder.png" alt="Нет обложки" style={{ width: '80px', height: '80px', objectFit: 'contain', opacity: 0.6 }} />
              )}
            </div>
          </div>

          {/* НАЛИЧИЕ ПО ФИЛИАЛАМ */}
          <div style={{ backgroundColor: '#fff', borderRadius: '16px', border: '1px solid #eee', padding: '20px', marginBottom: '20px', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
            <h2 style={{ fontSize: '18px', fontWeight: '500', margin: '0 0 16px 0', color: '#1a1a1a' }}>Наличие по филиалам</h2>
            {book.branches.map((branch, idx) => (
              <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px', padding: '8px', backgroundColor: '#f9f9f9', borderRadius: '8px' }}>
                <span style={{ fontSize: '14px', color: '#333' }}>{branch.name}</span>
                <span style={{ fontSize: '14px', fontWeight: branch.count === 0 ? '600' : '400', color: branch.count > 0 ? '#2e7d32' : '#d32f2f' }}>{branch.count > 0 ? `${branch.count} экз.` : 'Нет в наличии'}</span>
              </div>
            ))}
          </div>

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

export default BookInfo