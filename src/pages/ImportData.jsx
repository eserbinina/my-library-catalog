import { useState, useCallback } from 'react'
import { Link } from 'react-router-dom'

function ImportData() {
  const [selectedFile, setSelectedFile] = useState(null)
  const [dragActive, setDragActive] = useState(false)
  const [previewData, setPreviewData] = useState(null)
  const [importing, setImporting] = useState(false)

  const handleFileSelect = useCallback((file) => {
    if (file && (file.name.endsWith('.xlsx') || file.name.endsWith('.xls'))) {
      setSelectedFile(file)
      setPreviewData({
        fileName: file.name,
        fileSize: (file.size / 1024).toFixed(2),
        rowCount: 15,
        columns: ['Название', 'Автор', 'Специальность', 'Жанр', 'Издательство', 'Год издания']
      })
    } else {
      alert('Пожалуйста, выберите файл в формате .xlsx или .xls')
    }
  }, [])

  const handleDrag = useCallback((e) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true)
    } else if (e.type === 'dragleave') {
      setDragActive(false)
    }
  }, [])

  const handleDrop = useCallback((e) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
    const file = e.dataTransfer.files?.[0]
    if (file) {
      handleFileSelect(file)
    }
  }, [handleFileSelect])

  const handleInputChange = useCallback((e) => {
    const file = e.target.files?.[0]
    if (file) {
      handleFileSelect(file)
    }
  }, [handleFileSelect])

  const handleDownloadTemplate = useCallback(() => {
    alert('Скачивание шаблона Excel (будет реализовано позже)')
  }, [])

  const handleImport = useCallback(async () => {
    if (!selectedFile) {
      alert('Выберите файл для импорта')
      return
    }
    
    setImporting(true)
    
    try {
      await new Promise(resolve => setTimeout(resolve, 2000))
      alert('Данные успешно импортированы!')
      setSelectedFile(null)
      setPreviewData(null)
    } catch (error) {
      alert('Ошибка при импорте данных')
    } finally {
      setImporting(false)
    }
  }, [selectedFile])

  const InnerCard = ({ title, children }) => (
    <div style={{ backgroundColor: '#fff', borderRadius: '16px', border: '1px solid #eee', padding: '24px 20px', marginBottom: '20px' }}>
      <h2 style={{ fontSize: '18px', fontWeight: '500', margin: '0 0 16px 0', color: '#1a1a1a' }}>{title}</h2>
      {children}
    </div>
  )

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', backgroundColor: '#f9f9f9', minHeight: '100vh' }}>
      
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
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <img 
            src="/images/profile-icon.png" 
            alt="Профиль" 
            style={{ width: '36px', height: '36px', objectFit: 'contain' }} 
          />
          <div>
            <h1 style={{ fontSize: '24px', margin: 0, color: '#333', fontWeight: '700' }}>Импортирование данных</h1>
            <p style={{ margin: '4px 0 0 0', color: '#666', fontSize: '14px' }}>Колледж ААСК</p>
          </div>
        </div>
        <Link to="/librarian/panel" style={{ textDecoration: 'none', color: '#3636FF', fontSize: '14px' }}>
          ← Назад к панели
        </Link>
      </div>

      <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '20px' }}>
        
        {/* ЗАГОЛОВОК СТРАНИЦЫ */}
        <div style={{ marginBottom: '24px' }}>
          <h2 style={{ fontSize: '22px', margin: 0, color: '#1a1a1a', fontWeight: '600' }}>Импортирование данных</h2>
          <p style={{ margin: '8px 0 0 0', color: '#666', fontSize: '14px' }}>Загрузка книг из Excel файла в каталог библиотеки</p>
        </div>

        {/* ЗАГРУЗИТЬ ФАЙЛ EXCEL */}
        <InnerCard title="Загрузить файл Excel">
          <div 
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
            style={{
              border: dragActive ? '2px dashed #3636FF' : '2px dashed #ddd',
              borderRadius: '12px',
              padding: '40px 20px',
              textAlign: 'center',
              backgroundColor: dragActive ? 'rgba(54,54,255,0.05)' : '#fafafa',
              cursor: 'pointer',
              transition: 'all 0.2s',
              marginBottom: '20px'
            }}
            onClick={() => document.getElementById('fileInput').click()}
          >
            <div style={{ fontSize: '48px', marginBottom: '12px' }}>📁</div>
            <div style={{ fontSize: '16px', color: '#333', marginBottom: '8px' }}>
              <strong>Нажмите для выбора файла или перетащите его сюда</strong>
            </div>
            <div style={{ fontSize: '13px', color: '#666' }}>
              Поддерживаемые форматы: XLSX, XLS (Максимум 10 МБ)
            </div>
            <input
              id="fileInput"
              type="file"
              accept=".xlsx,.xls"
              onChange={handleInputChange}
              style={{ display: 'none' }}
            />
          </div>

          {selectedFile && previewData && (
            <div style={{
              backgroundColor: '#e8f5e9',
              padding: '12px 16px',
              borderRadius: '8px',
              marginBottom: '16px'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '8px' }}>
                <div>
                  <span style={{ fontSize: '14px', color: '#2e7d32', fontWeight: '500' }}>✓ Файл выбран:</span>
                  <span style={{ fontSize: '14px', color: '#333', marginLeft: '8px' }}>{previewData.fileName}</span>
                  <span style={{ fontSize: '12px', color: '#666', marginLeft: '8px' }}>({previewData.fileSize} КБ)</span>
                </div>
                <button 
                  onClick={() => { setSelectedFile(null); setPreviewData(null) }}
                  style={{ background: 'none', border: 'none', color: '#d32f2f', cursor: 'pointer', fontSize: '14px' }}
                >
                  ✖ Удалить
                </button>
              </div>
            </div>
          )}
        </InnerCard>

        {/* ТРЕБОВАНИЯ К ФАЙЛУ */}
        <div style={{ 
          backgroundColor: '#fff',
          borderRadius: '16px',
          border: '1px solid #eee',
          padding: '20px 24px',
          marginBottom: '20px',
          display: 'flex',
          alignItems: 'center',
          gap: '16px'
        }}>
          <img 
            src="/images/requirements-icon.png" 
            alt="Требования" 
            style={{ width: '40px', height: '40px', objectFit: 'contain' }}
          />
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: '16px', fontWeight: '600', color: '#1a1a1a', marginBottom: '12px' }}>
              Требования к файлу
            </div>
            <div style={{ fontSize: '13px', color: '#333', lineHeight: '1.5' }}>
              Файл должен содержать следующие обязательные столбцы: <strong>Название, Автор, Специальность, Жанр, Издательство, Год издания</strong>. Формат даты: <strong>ДД.ММ.ГГГГ</strong>.
            </div>
          </div>
        </div>

        {/* СКАЧАТЬ ШАБЛОН */}
        <div style={{ 
          backgroundColor: '#fff',
          borderRadius: '16px',
          border: '1px solid #eee',
          padding: '20px 24px',
          marginBottom: '20px',
          textAlign: 'center'
        }}>
          <img 
            src="/images/download-icon.png" 
            alt="Скачать шаблон" 
            style={{ width: '48px', height: '48px', objectFit: 'contain', marginBottom: '12px' }}
          />
          <div style={{ fontSize: '16px', fontWeight: '600', color: '#1a1a1a', marginBottom: '8px' }}>
            Скачать шаблон
          </div>
          <div style={{ fontSize: '12px', color: '#999', marginBottom: '16px' }}>
            Рекомендуем использовать шаблон Excel для правильного заполнения данных.
          </div>
          <button 
            onClick={handleDownloadTemplate}
            style={{
              padding: '8px 32px',
              backgroundColor: '#3636FF',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              fontSize: '14px',
              fontWeight: '500'
            }}
          >
            Скачать шаблон
          </button>
        </div>

        {/* ПОРЯДОК ИМПОРТА ДАННЫХ */}
        <InnerCard title="Порядок импорта данных">
          <ol style={{ margin: 0, paddingLeft: '0', listStyle: 'none' }}>
            {[
              'Скачайте шаблон Excel и заполните его данными о книгах.',
              'Убедитесь, что все обязательные поля заполнены корректно.',
              'Загрузите файл в область выше.',
              'Проверьте данные в предварительном просмотре.',
              'Нажмите кнопку "Импортировать данные" для завершения загрузки.'
            ].map((text, idx) => (
              <li key={idx} style={{ 
                marginBottom: '12px',
                display: 'flex',
                alignItems: 'center',
                gap: '12px'
              }}>
                <span style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '24px',
                  height: '24px',
                  backgroundColor: '#3636FF',
                  color: 'white',
                  borderRadius: '50%',
                  fontSize: '13px',
                  fontWeight: '600',
                  flexShrink: 0
                }}>
                  {idx + 1}
                </span>
                <span style={{ fontSize: '14px', color: '#333' }}>{text}</span>
              </li>
            ))}
          </ol>
        </InnerCard>

        {/* ДВЕ КОЛОНКИ: СОВЕТЫ + ОШИБКИ */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '20px', marginBottom: '20px' }}>
          
          <div style={{ backgroundColor: '#e8f5e9', borderRadius: '16px', padding: '20px', border: '1px solid #c8e6c9' }}>
            <h3 style={{ fontSize: '16px', margin: '0 0 12px 0', color: '#2e7d32', fontWeight: '600' }}>💡 Советы для успешного импорта</h3>
            <ul style={{ margin: 0, paddingLeft: '20px', color: '#555', fontSize: '13px', lineHeight: '1.8' }}>
              <li>Не изменяйте названия столбцов в шаблоне.</li>
              <li>Проверьте формат дат перед загрузкой.</li>
              <li>Убедитесь, что числовые поля не содержат текста.</li>
              <li>Сохраните файл в формате .xlsx перед загрузкой.</li>
            </ul>
          </div>

          <div style={{ backgroundColor: '#ffebee', borderRadius: '16px', padding: '20px', border: '1px solid #ffcdd2' }}>
            <h3 style={{ fontSize: '16px', margin: '0 0 12px 0', color: '#d32f2f', fontWeight: '600' }}>⚠️ Типичные ошибки</h3>
            <ul style={{ margin: 0, paddingLeft: '20px', color: '#555', fontSize: '13px', lineHeight: '1.8' }}>
              <li>Отсутствие обязательных полей.</li>
              <li>Неверный формат даты (используйте ДД.ММ.ГГГГ).</li>
              <li>Дублирование инвентарных номеров.</li>
              <li>Неправильная кодировка файла (используйте UTF-8).</li>
            </ul>
          </div>
        </div>

        {/* ПРЕДПРОСМОТР ДАННЫХ */}
        {previewData && (
          <div style={{ backgroundColor: '#fff', borderRadius: '16px', border: '1px solid #eee', padding: '20px', marginBottom: '20px' }}>
            <h3 style={{ fontSize: '16px', margin: '0 0 12px 0', color: '#1a1a1a', fontWeight: '600' }}>📊 Предпросмотр данных</h3>
            <div style={{ fontSize: '13px', color: '#666', marginBottom: '12px' }}>
              Найдено записей: <strong>{previewData.rowCount}</strong>
            </div>
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px' }}>
                <thead>
                  <tr style={{ backgroundColor: '#f5f5f5' }}>
                    {previewData.columns.map((col, idx) => (
                      <th key={idx} style={{ padding: '8px 12px', textAlign: 'left', color: '#666', fontWeight: '500' }}>{col}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td colSpan={previewData.columns.length} style={{ padding: '20px', textAlign: 'center', color: '#999' }}>
                      Предпросмотр данных будет доступен после выбора файла
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* КНОПКА ИМПОРТА */}
        <div style={{ marginBottom: '20px', marginTop: '20px' }}>
          <button 
            onClick={handleImport}
            disabled={!selectedFile || importing}
            style={{
              width: '100%',
              padding: '14px 20px',
              backgroundColor: selectedFile && !importing ? '#3636FF' : '#ccc',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              cursor: selectedFile && !importing ? 'pointer' : 'not-allowed',
              fontSize: '16px',
              fontWeight: '500'
            }}
          >
            {importing ? 'Импортирование...' : 'Импортировать данные'}
          </button>
        </div>
        
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

export default ImportData