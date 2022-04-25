document.addEventListener('DOMContentLoaded', function() {
    var btnSubmit = document.forms['noName']['submit']
        // var rollNumber = document.forms['noName']['rollNumber']
    var title = document.forms['noName']['title']
    var description = document.forms['noName']['description']
    var thumbnail = document.forms['noName']['thumbnail']
    var content = document.forms['noName']['content']
    var category = document.forms['noName']['category']
    var status = document.forms['noName']['status']
    var img = document.getElementById("preview-img")

    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    var id = urlParams.get('id')
    if (!!id) {
        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = () => {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {

                    var data = JSON.parse(xhr.responseText)
                    console.log(data)
                    title.value = data.title
                    img.src = data.thumbnail
                    description.value = data.description
                    thumbnail.value = data.thumbnail
                    content.value = data.content
                    category.value = data.category
                    status.value = data.status
                } else {
                    alert("fail!!")
                    window.location.href = '/article/index.html'

                }
            }
        }
        xhr.open('GET', `http://localhost:8080/api/v1/articles/${id}`, false)
            // xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        xhr.send()
    }
    btnSubmit.onclick = (e) => {
        e.preventDefault()
        var obj = {
            'title': title.value,
            'description': description.value,
            'thumbnail': thumbnail.value,
            'content': content.value,
            'category': category.value,
            'status': status.value
        }
        var data = JSON.stringify(obj)
        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = () => {
            if (xhr.readyState === 4 && xhr.status === 200) {
                window.location.href = '/article/index.html'
            }
        }
        if (!!id) {
            xhr.open('PUT', `http://localhost:8080/api/v1/articles/${id}`, false)
        } else {
            xhr.open('POST', 'http://localhost:8080/api/v1/articles', false)

        }
        xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        xhr.send(data)
    }
    var myWidget = cloudinary.createUploadWidget({
        cloudName: 'thanhbc',
        uploadPreset: 'xzfsuj2g'
    }, (error, result) => {
        if (!error && result && result.event === "success") {
            console.log('Done! Here is the image info: ', result.info);
            img.classList.remove("hide");
            img.src = result.info.url
            document.forms['noName']['thumbnail'].value = result.info.url

        }
    })

    document.getElementById("upload_widget").addEventListener("click", function() {
        myWidget.open();
    }, false);
})