document.addEventListener('DOMContentLoaded', function() {
    var btnSubmit = document.forms['noName']['submit']
    var rollNumber = document.forms['noName']['rollNumber']
    var name = document.forms['noName']['name']
    var email = document.forms['noName']['email']
    var address = document.forms['noName']['address']
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    var id = urlParams.get('id')
    if (!!id) {
        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = () => {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    var data = JSON.parse(xhr.responseText)
                    rollNumber.value = data.rollNumber
                    name.value = data.name
                    email.value = data.email
                    address.value = data.address
                } else {
                    alert("fail!!")
                    window.location.href = '/html/index.html'

                }
            }
        }
        xhr.open('GET', `http://localhost:8080/api/v1/students/${id}`, false)
            // xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        xhr.send()
    }
    btnSubmit.onclick = (e) => {
        e.preventDefault()
        var obj = {
            'rollNumber': rollNumber.value,
            'name': name.value,
            'email': email.value,
            'address': address.value
        }
        var data = JSON.stringify(obj)
        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = () => {
            if (xhr.readyState === 4 && xhr.status === 200) {
                window.location.href = '/html/index.html'
            }
        }
        if (!!id) {
            xhr.open('PUT', `http://localhost:8080/api/v1/students/${id}`, false)
        } else {
            xhr.open('POST', 'http://localhost:8080/api/v1/students', false)

        }
        xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        xhr.send(data)
    }
})