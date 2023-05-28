export function getValidInput() {
    return getInput().then(t => {
      if (t === null) {
        // Remove previous form before creating a new one
        let oldForm = document.getElementById('myForm');
        oldForm.parentNode.removeChild(oldForm);
        let oldError = document.getElementById('error');
        oldError.parentNode.removeChild(oldError);
        return getValidInput(); // Recursive call
      } else {
        return t;
      }
    });
}
function getInput(){
    return new Promise((resolve) => {
        // Create form element
        let form = document.createElement('form');
        form.id = 'myForm';
        form.style.top = '500px'; 
        form.style.left = '100px'; 

        // Create label
        let label = document.createElement('label');
        label.htmlFor = 'array';
        label.textContent = 'Enter an array of triangles in format: [[[x1, y1], [x2, y2], [x3, y3]], ...] where [x1, y1] is the coordinates of a vertex';
        form.appendChild(label);
        
        let label2 = document.createElement('label');
        label2.textContent = 'The triangles have to be connected and form a convex polygon.';
        form.appendChild(document.createElement('br'));  // Line break
        form.appendChild(label2);
        form.appendChild(document.createElement('br'));

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
                document.getElementById('error').textContent = ""; // Clear error message
                form.style.display = "none"; // Hide the form
                resolve(t); // Resolve the Promise with the parsed input
            } catch (err) {
                document.getElementById('array').value = ""; // Clear the input field
                document.getElementById('error').textContent = "Invalid JSON input"; // Show error message
                // Do not resolve or reject the promise. Let the user correct their input.
            }
        }); 
        
    });
}