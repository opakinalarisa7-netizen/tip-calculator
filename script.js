// Получаем элементы со страницы
const billInput = document.getElementById('billAmount');
const peopleInput = document.getElementById('peopleCount');
const tipSlider = document.getElementById('tipSlider');
const tipPercentageSpan = document.getElementById('tipPercentageValue');
const tipPerPersonSpan = document.getElementById('tipPerPerson');
const totalPerPersonSpan = document.getElementById('totalPerPerson');
const totalBillSpan = document.getElementById('totalBill');
const resetBtn = document.getElementById('resetBtn');

// Функция для форматирования чисел
function formatMoney(value) {
    return value.toLocaleString('ru-RU', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    }) + ' ₽';
}

// Главная функция расчета
function calculateTip() {
    // Получаем значения и преобразуем в числа
    let bill = parseFloat(billInput.value);
    let people = parseInt(peopleInput.value);
    let tipPercent = parseInt(tipSlider.value);
    
    // Валидация (проверка на ошибки)
    if (isNaN(bill) || bill <= 0) {
        bill = 0;
        billInput.value = 0;
    }
    
    if (isNaN(people) || people < 1) {
        people = 1;
        peopleInput.value = 1;
    }
    
    // Расчеты
    const totalTip = (bill * tipPercent) / 100;      // Общая сумма чаевых
    const totalWithTip = bill + totalTip;             // Счет + чаевые
    const tipPerPerson = totalTip / people;           // Чаевые на человека
    const totalPerPerson = totalWithTip / people;     // Итого на человека
    
    // Обновляем отображение процента
    tipPercentageSpan.textContent = tipPercent;
    
    // Обновляем значения на странице с анимацией
    tipPerPersonSpan.textContent = formatMoney(tipPerPerson);
    totalPerPersonSpan.textContent = formatMoney(totalPerPerson);
    totalBillSpan.textContent = formatMoney(totalWithTip);
    
    // Добавляем визуальный эффект при расчете
    [tipPerPersonSpan, totalPerPersonSpan, totalBillSpan].forEach(span => {
        span.style.animation = 'none';
        span.offsetHeight; // Триггер перерисовки
        span.style.animation = 'fadeIn 0.3s ease';
    });
}

// Функция сброса всех значений
function resetCalculator() {
    billInput.value = '1500';
    peopleInput.value = '2';
    tipSlider.value = '15';
    calculateTip(); // Пересчитываем
}

// Слушатели событий (реагируем на изменения)
billInput.addEventListener('input', calculateTip);
peopleInput.addEventListener('input', calculateTip);
tipSlider.addEventListener('input', calculateTip);
resetBtn.addEventListener('click', resetCalculator);

// Первоначальный расчет при загрузке страницы
calculateTip();

// Дополнительно: предотвращаем отрицательные значения
billInput.addEventListener('change', function() {
    if (this.value < 0) this.value = 0;
    calculateTip();
});

peopleInput.addEventListener('change', function() {
    if (this.value < 1) this.value = 1;
    calculateTip();
});