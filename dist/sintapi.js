const sintapiURL ='http://localhost:9999/';

window.processAudio = function (data, sequence_id, name, age, hobbies, gender, chat_history, callbackhandler) {
//   return fetch(urlLocation + url, {method: "POST", body: JSON.stringify(data)}).then((res) => res.json());
    
    var fd = new FormData()
    fd.append('sequence_id', sequence_id)
    fd.append('name', name)
    fd.append('age', age)
    fd.append('hobbies', JSON.stringify(hobbies))
    fd.append('gender', gender)
    fd.append('history', chat_history[chat_history.length-1])
    fd.append('audio', new Blob([data.buffer]))

    return fetch(sintapiURL+'process_audio/', {
    method: 'POST',
    body: fd
    }).then((res) => res.json()).then(callbackhandler)
}

window.generateResponse = function(name, age, hobbies, gender, chat_history, callbackhandler){
    message = {
        "name": name,
        "age": age,
        "hobbies": hobbies,
        "gender": gender,
        "history": chat_history
    }

    return fetch(sintapiURL+'generate_response/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'            
          },
        body: JSON.stringify(message)
        }).then((res) => res.json()).then(callbackhandler)
}

window.generateAudio = function(text, callbackhandler){    
    message = {
        "text": text
    }

    return fetch(sintapiURL+'generate_audio/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'            
          },
        body: JSON.stringify(message)
        }).then((res) => res.arrayBuffer()).then(callbackhandler)
}



// window.getJson = function (url) {
//   return fetch(urlLocation + url, {method: “GET”, headers: authHeaders})
//     .then((res) => res.json());
//   }

// window.deleteJson = function (url) {
//   return fetch(urlLocation + url, {method: “DELETE”, headers: authHeaders})
//     .then((res) => res.json());
//   }

// window.putJson = function (url) {
//   return fetch(urlLocation + url, {method: “PUT”, headers: authHeaders})
//     .then((res) => res.json());
//   }