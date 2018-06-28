document.getElementById("analyze").addEventListener("click", analyze);
function analyze(){

    var reqBody = {
        "documents": [
            {
            "language":"en",
            "id" : 1,
            "text": document.getElementById("phrase").value
            }
        ]
    };

    var myHeader =  new Headers({
        'Content-Type': 'application/json',
        'Ocp-Apim-Subscription-Key':'9860c6bf6a6c436a87386d6e9a6738e4'
    });

    var initObject = {
        method: 'POST',
        body: JSON.stringify(reqBody),
        headers: myHeader
    }

    var request = new Request('https://westcentralus.api.cognitive.microsoft.com/text/analytics/v2.0/keyPhrases', initObject);

    fetch(request).then(function(response){
        if(response.ok){
            return response.json();
        }
        else{
            return Promise.reject(new Error(response.statusText));
        }
    }).then(function(response){
        document.getElementById("key_phrase_count").innerHTML = "Total Key Phrases: " + response.documents[0].keyPhrases.length 
		response.documents[0].keyPhrases.forEach(inject_code);
    }).catch(function(err){
        alert(err);  
		document.getElementById("key_phrase_count").innerHTML = "";
        document.getElementById("key_phrase").innerHTML = "";
    });

}
function inject_code(val)
{
	var li = document.createElement("li");
	li.innerHTML = val;
	document.getElementById("key_phrase").appendChild(li);
}