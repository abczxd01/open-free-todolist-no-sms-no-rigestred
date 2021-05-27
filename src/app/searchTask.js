export default function searchTask(searchValue) {
  const tasks = document.querySelectorAll('task-element');
  let searchItem = null;
  tasks.forEach(task => {
    task.text.split(' ').forEach(word => {
      if (word.toLowerCase() === searchValue.toLowerCase()) {
        searchItem = task;
      }
    });
    task.title.split(' ').forEach(word => {
      if (word.toLowerCase() === searchValue.toLowerCase()) {
        searchItem = task;
      }
    });
  });

  searchItem.style.order = -1;
}
