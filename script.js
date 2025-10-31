aconst GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbzSU2DvQ7i7QHrsEnXHVPCAKBsT2EP1mMD-5zFtTip5P9mMXYNUkFbRd0kHUKYRCKf8/exec";

function getCurrentDay() {
  const activeTab = document.querySelector('.day-tab.active');
  return activeTab ? activeTab.dataset.day : 'monday';
}

function updateSummary(day) {
  const summaryDiv = document.getElementById(day + '-summary');
  if (!summaryDiv) return;
  summaryDiv.innerHTML = '';
  const dayContent = document.getElementById(day);
  if (!dayContent) return;

  const lunchItems = [];
  const dinnerItems = [];

  dayContent.querySelectorAll('.meal-section.lunch .dish-item').forEach(item => {
    const qtyDisplay = item.querySelector('.qty-display');
    const qty = parseFloat(qtyDisplay.textContent) || 0;
    if (qty > 0) {
      const name = item.querySelector('.dish-name').textContent.trim();
      lunchItems.push({ name, quantity: qty, mealType: "lunch" });
    }
  });

  dayContent.querySelectorAll('.meal-section.dinner .dish-item').forEach(item => {
    const qtyDisplay = item.querySelector('.qty-display');
    const qty = parseFloat(qtyDisplay.textContent) || 0;
    if (qty > 0) {
      const name = item.querySelector('.dish-name').textContent.trim();
      dinnerItems.push({ name, quantity: qty, mealType: "dinner" });
    }
  });

  if (lunchItems.length > 0) {
    const lunchHeader = document.createElement('div');
    lunchHeader.className = 'summary-section-header';
    lunchHeader.innerHTML = '<i class="fas fa-sun"></i> Lunch';
    summary