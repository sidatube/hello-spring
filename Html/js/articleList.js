function deleteStudent(id) {
    if (confirm("A U Sure? "))
        var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = () => {
        if (xhr.readyState == 4 && xhr.status == 200) {
            alert("success")
            window.location.reload()
        }
    }
    xhr.open("DELETE", `http://localhost:8080/api/v1/articles/${id}`, false)
    xhr.send()
}
var xhr = new XMLHttpRequest();
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
var pageIndex = urlParams.get('pageIndex')
var params = {
    pageIndex: 1,
    pageSize: 5,
}
if (!!pageIndex) {
    params.pageIndex = pageIndex
}
var newUrl = new URLSearchParams(params).toString()

xhr.onreadystatechange = () => {
    if (xhr.readyState == 4 && xhr.status == 200) {
        var data = JSON.parse(xhr.responseText)
        var tablebody = document.querySelector('#table-body');
        tablebody.innerHTML = ''
        data.content.forEach(e => {
            tablebody.innerHTML += `<tr>
                <td>${e.id}</td>
                <td>${e.title}</td>
                <td>${e.description}</td>
                <td><img src="${e.thumbnail}" width="80" alt=""></td>
                <td>${e.content}</td>
                <td>${e.category}</td>
                <td><a href="/article/form.html?id=${e.id}"><i class="bi bi-pencil-square"></i></a></td>
                <td>
                    <a href="javascript:"><i class="bi bi-trash-fill" onclick="deleteStudent('${e.id}')"></i></a></td>
                </tr>`
        });
        var pagination = document.querySelector('ul.pagination')
        pagination.innerHTML = ` <li class="page-item ${pageIndex<=1?'disabled':''}">
        <a class="page-link" href="?pageIndex=${pageIndex-1}" aria-label="Previous">
            <span aria-hidden="true">&laquo;</span>
            <span class="sr-only">Previous</span>
        </a>
    </li>`

        for (let index = 1; index <= data.totalPages; index++) {
            pagination.innerHTML += `<li class="page-item ${pageIndex==index?'active':''}"><a class="page-link  " href="?pageIndex=${index}">${index}</a></li>`
        }
        pagination.innerHTML += ` <li class="page-item ${pageIndex>=data.totalPages?'disabled':''}">
        <a class="page-link" href="?pageIndex=${pageIndex+1}" aria-label="Next">
            <span aria-hidden="true">&raquo;</span>
            <span class="sr-only">Next</span>
        </a>
    </li>`
    }
}
xhr.open("GET", 'http://localhost:8080/api/v1/articles?' + newUrl, false)
xhr.send()