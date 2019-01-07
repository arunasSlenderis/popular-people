export default class Utils {
  static abcSort(array) {
    return array.slice().sort((a, b) => {
      const x = a.first_name.toLowerCase();
      const y = b.first_name.toLowerCase();
      return x < y ? -1 : x > y ? 1 : 0;
    });
  }

  static numberSort(array) {
    return array.slice().sort((a, b) => b.rating - a.rating);
  }

  static findById(array, id) {
    const idNum = parseInt(id, 10);
    return array.find(item => item.id === idNum);
  }

  static addPulse(el) {
    const newRating = parseInt(el.textContent.trim(), 10) + 1;
    el.textContent = newRating;
    el.classList.remove('pulse');
    void el.offsetWidth;
    el.classList.add('pulse')
  }
}