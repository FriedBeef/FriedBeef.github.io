export function getInput(){
    return new Promise((resolve) => {
        // Create form element
        let form = document.createElement('form');
        form.id = 'myForm';
        form.style.top = '500px'; 
        form.style.left = '100px'; 

        // Create label
        let label = document.createElement('label');
        label.htmlFor = 'array';
        label.textContent = 'Enter an array of triangles as a JSON string:';
        form.appendChild(label);
        form.appendChild(document.createElement('br')); // Line break

        // Create text input
        let inputText = document.createElement('input');
        inputText.type = 'text';
        inputText.id = 'array';
        inputText.name = 'array';
        inputText.size = '100';
        form.appendChild(inputText);
        form.appendChild(document.createElement('br')); // Line break

        // Create submit button
        let inputSubmit = document.createElement('input');
        inputSubmit.type = 'submit';
        inputSubmit.value = 'Submit';
        form.appendChild(inputSubmit);

        // Append form to the body of the document
        document.body.appendChild(form);

        // Create paragraph for error message
        let p = document.createElement('p');
        p.id = 'error';
        document.body.appendChild(p);

        // Now you can add the event listener to the form
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            const input = document.getElementById('array').value;
            let t;
            try {
              t = JSON.parse(input);
            } catch (err) {
              document.getElementById('error').textContent = "Invalid JSON input";
              t = null; // Set t to null or some other default value
            }
            document.getElementById('error').textContent = ""; // Clear error message
            // Hide the form
            form.style.display = "none";
            resolve(t); // Resolve the Promise with either the parsed input or null
        });
    });
}
