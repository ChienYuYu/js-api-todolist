//渲染資料 renderData()---
function renderData(){
  let str=""
  // console.log(todoData);
  todoData.forEach(function(item,index){
    console.log(item.content);
    str +=`<li>
    <label class="d-flex align-items-center border-bottom">
      <input type="checkbox" class="m-3">
      <span>${item.content}</span>
      <a href="#" class="text-decoration-none text-dark p-3 ms-auto">
        <i class="bi bi-x-lg"></i>
      </a>
    </label>
  </li>`
  })
  list.innerHTML = str
}