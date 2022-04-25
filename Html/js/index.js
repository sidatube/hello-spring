function deleteStudent(id) {
    if (confirm("A U Sure? "))
        var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = () => {
        if (xhr.readyState == 4 && xhr.status == 200) {
            alert("success")
            window.location.reload()
        }
    }
    xhr.open("DELETE", `http://localhost:8080/api/v1/students/${id}`, false)
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
                <td>${e.rollNumber}</td>
                <td>${e.name}</td>
                <td>${e.email}</td>
                <td>${e.address}</td>
                <td><a href="/html/update.html?id=${e.rollNumber}"><i class="bi bi-pencil-square"></i></a></td>
                <td>
                    <a href="javascript:"><i class="bi bi-trash-fill" onclick="deleteStudent('${e.rollNumber}')"></i></a></td>
                </tr>`
        });
    }
}
xhr.open("GET", 'http://localhost:8080/api/v1/students', false)
xhr.send()