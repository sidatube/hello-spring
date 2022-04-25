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
xhr.onreadystatechange = () => {
    if (xhr.readyState == 4 && xhr.status == 200) {
        var data = JSON.parse(xhr.responseText)
        var tablebody = document.querySelector('#table-body');
        tablebody.innerHTML = ''
        data.forEach(e => {
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
    }
}
xhr.open("GET", 'http://localhost:8080/api/v1/articles', false)
xhr.send()