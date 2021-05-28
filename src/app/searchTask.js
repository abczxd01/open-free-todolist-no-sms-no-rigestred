export default function searchTask(searchValue) {
  const tasks = document.querySelectorAll('task-element');
  let searchItem = null;
  tasks.forEach(task => {
    task.title.split(' ').forEach(word => {
      if (word.toLowerCase() === searchValue.toLowerCase()) {
        searchItem = task;
      }
    });
    if (task.text) {
      task.text.split(' ').forEach(word => {
        if (word.toLowerCase() === searchValue.toLowerCase()) {
          searchItem = task;
        }
      });
    }
  });
  if (!searchItem) {
    return null;
  }
  searchItem.style.order = -1;
}
