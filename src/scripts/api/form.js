export default function submit(user) {
  var userJsonObject = JSON.stringify(user);
  
  // Sending and receiving data in JSON format using POST method
  //
  var xhr = new XMLHttpRequest();
  var url = "https://surfaceshowcase.azurewebsites.net/api/Function1?code=F3bzB3TyKw4CjhHUIr362PCIwJOy0KrUrhVbYYRD510dKTAj7ON/BA==";
  xhr.open("POST", url, true);
  xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
  
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status === 200)
    {
        console.log(xhr.responseText);
    }
  }
  
  xhr.send(userJsonObject);
}