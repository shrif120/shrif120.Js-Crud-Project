var productName = document.getElementById("productName");
var productprice = document.getElementById("productPrice");
var productCategory = document.getElementById("productCategory");
var productDescription = document.getElementById("productDescription");
var searchInput = document.getElementById("searchInput");
var addButton = document.getElementById("addButton");
var Alert = document.getElementById("Alert");
var AlertPrice = document.getElementById("AlertPrice");
var required1 = document.getElementById("required1");
var required2 = document.getElementById("required2");
var required3 = document.getElementById("required3");
var required4 = document.getElementById("required4");
var currentIndex = 0;
var productlist = [];
addButton.addEventListener("click", function() {
    if (addButton.innerHTML == "Add Product") {
        if (productName.value != "" && productprice.value != "" && productCategory.value != "" && productDescription.value != "") {
            addProduct();
        } else {
            required1.classList.replace("d-none", "d-block");
            required2.classList.replace("d-none", "d-block");
            required3.classList.replace("d-none", "d-block");
            required4.classList.replace("d-none", "d-block");
        }

    } else {

        saveUpdates();
    }
})


function addProduct() {
    var product = {
        name: productName.value,
        price: productprice.value,
        category: productCategory.value,
        description: productDescription.value
    };
    productlist.push(product);
    localStorage.setItem("ourProducts", JSON.stringify(productlist));
    displayProducts(productlist);
    clearInputs();
}


if (localStorage.getItem("ourProducts") == null) {
    productlist = [];
} else {
    productlist = JSON.parse(localStorage.getItem("ourProducts"));
    displayProducts(productlist);
}

function displayProducts(anyArray) {
    var container = "";
    for (var i = 0; i < anyArray.length; i++) {
        container += `<tr>
                            <td>${i+1}</td>
                            <td>${anyArray[i].name}</td>
                            <td>${anyArray[i].price}</td>
                            <td>${anyArray[i].category}</td>
                            <td>${anyArray[i].description}</td>
                            <td> <button onclick="updateProducts(${i})" class='btn btn-warning'>Update</button> </td>
                            <td> <button onclick="deleteProduct(${i})" class='btn btn-danger'>Delete</button> </td>
                      </tr>`;
    }
    document.getElementById("tableBody").innerHTML = container;
}

function clearInputs() {

    productName.value = "";
    productprice.value = "";
    productCategory.value = "";
    productDescription.value = "";
}

function convertAddToUpdate() {
    addButton.innerHTML = "update";
}

function updateProducts(index) {
    currentIndex = index;
    productName.value = productlist[index].name;
    productprice.value = productlist[index].price;
    productCategory.value = productlist[index].category;
    productDescription.value = productlist[index].description;
    convertAddToUpdate();
}

function saveUpdates() {
    var product = {
        name: productName.value,
        price: productprice.value,
        category: productCategory.value,
        description: productDescription.value
    };
    productlist[currentIndex] = product;
    localStorage.setItem("ourProducts", JSON.stringify(productlist));
    displayProducts(productlist);
    clearInputs();
}

function deleteProduct(index) {
    productlist.splice(index, 1);
    localStorage.setItem("ourProducts", JSON.stringify(productlist));
    displayProducts(productlist);
}

function searchProducts() {
    var term = searchInput.value;
    var wantedProducts = [];
    for (var i = 0; i < productlist.length; i++) {
        if (productlist[i].name.toLowerCase().includes(term.toLowerCase())) {
            wantedProducts.push(productlist[i]);
        }
    }
    displayProducts(wantedProducts);
}
var regex = /^[A-Z][a-z]{3,6}$/;

function validateProductName(productname) {
    if (regex.test(productname) == true) {
        productName.classList.remove("is-invalid");
        productName.classList.add("is-valid");
        Alert.classList.replace("d-block", "d-none");

    } else {
        productName.classList.remove("is-valid");
        productName.classList.add("is-invalid");
        Alert.classList.replace("d-none", "d-block");

    }
}
productName.addEventListener("keyup", function() {
    validateProductName(productName.value);
})

var regex2 = /^([1-9][0-9]{2,4}|100000)$/;

function validateProductPrice(productprice) {
    if (regex2.test(productprice) == true) {
        productPrice.classList.remove("is-invalid");
        productPrice.classList.add("is-valid");
        AlertPrice.classList.replace("d-block", "d-none");

    } else {
        productPrice.classList.remove("is-valid");
        productPrice.classList.add("is-invalid");
        AlertPrice.classList.replace("d-none", "d-block");

    }
}
productPrice.addEventListener("keyup", function() {
    validateProductPrice(productPrice.value);
})