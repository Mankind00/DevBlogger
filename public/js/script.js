// const { name } = require("ejs");

document.addEventListener("DOMContentLoaded", (event) => {

  function checkPasswordMatch() {
    let password = document.getElementById('password').value;
    let confirmPassword = document.getElementById('confirmPassword').value;
    let passwordMatchElement = document.getElementById('passwordMatch');
    let registerBtn = document.getElementById('registerBtn');

    if (password !== confirmPassword) {
      passwordMatchElement.textContent = 'Passwords do not match';
      registerBtn.disabled = true;
    } else {
      passwordMatchElement.textContent = '';
      registerBtn.disabled = false;
    }
  }
  function MinHeightPlugin(editor) {
    this.editor = editor;
  }
  
  MinHeightPlugin.prototype.init = function() {
    this.editor.ui.view.editable.extendTemplate({
      attributes: {
        style: {
          minHeight: '300px'
        }
      }
    });
  };

  tinymce.init({
    selector: '#editor'
  });
  
  // ClassicEditor.builtinPlugins.push(MinHeightPlugin);
  // ClassicEditor
  //   .create( document.querySelector( '#editor' ) )
  //   .then( editor => {
  //     // console.log( editor );
  //   })
  //   .catch( error => {
  //     console.error( error );
  // });

  


  // This handles the form data from the post route whether to publish or to save to drafts

  

  document.getElementById('blogForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevents the default form submission
    console.log("submit")
    console.log(this)
    const formData = new FormData(this);
    // formData.append("action", "publish");
    // formData.append("action", "saveDraft");
    
    const action = formData.get("action");
    console.log(action)

    // Determine the action and submit the form to the appropriate route
    if (action == 'Publish') {
      console.log("Okay")
      // Handle publishing logic or submit to the publish route
      this.action = '/publish-route'; // Replace with your actual publish route
    } else if (action == 'saveDraft') {
      // Handle saving to draft logic or submit to the save draft route
      this.action = '/save-draft-route'; // Replace with your actual save draft route
    }

    // Uncomment the next line if you want to submit the form programmatically
    // this.submit();
  });


  
});

function click1234(formAction){
  document.getElementById('blogForm').action = formAction;
  document.getElementById('blogForm').submit();
  console.log(formAction)
  // let blogForm = document.getElementById(f1);
  // let fld_n = document.createElement("input");
  // fld_n.setAttribute("type", "hidden");
  // fld_n.setAttribute("name", n1);
  // fld_n.setAttribute("value", v1);
  // blogForm.appendChild(fld_n);
  // console.log(fld_n)
  // blogForm.submit();
}

function addNewCategory() {
  // Obtain the categoryContainer
  const categoryContainer = document.getElementById('categoryContainer');

  // Create a new select element
  const newSelect = document.createElement('select');
  newSelect.name = 'select';
  newSelect.className = 'custom-select select';
  newSelect.required = true;

  // Clone options from the original select element
  const originalSelect = document.getElementById('select');
  originalSelect.childNodes.forEach(function (option) {
    if (option.nodeType === 1) {
      const newOption = document.createElement('option');
      newOption.value = option.value;
      newOption.textContent = option.textContent;
      newSelect.appendChild(newOption);
    }
  });

  // Create the remove button
  const removeButton = document.createElement('button');
  removeButton.type = 'button';
  removeButton.textContent = 'Remove';
  removeButton.className = 'btn btn-danger btn-sm';
  removeButton.addEventListener('click', function () {
    // Remove the entire category div
    categoryContainer.removeChild(categoryDiv);
  });

  // Create a div to contain both the select and remove button
  const categoryDiv = document.createElement('div');
  categoryDiv.className = 'form-group row  m-2';
  categoryDiv.appendChild(newSelect);
  categoryDiv.appendChild(removeButton);

  // Append the new div to the categoryContainer
  categoryContainer.appendChild(categoryDiv);
}


