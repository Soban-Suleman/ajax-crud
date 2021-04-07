$(function () {
  loadRecipes();
  $("#recipes").on("click", ".btn-danger", deleteRecipes);
  $("#recipes").on("click", ".btn-warning", updateRecipes);
  $("#addBtn").click(addRecipe);
  $("#updateRecipe").click(function () {
    let id = $("#updateID").val();
    let name = $("#updateName").val();
    let price = $("#updatePrice").val();
    let department = $("#updateDepartment").val();
    let color = $("#updateColor").val();
    let description = $("#updateDescription").val();
    $.ajax({
      url: "https://usman-recipes.herokuapp.com/api/products/" + id,
      method: "PUT",
      data: { name, price, department, color, description },
      success: function (response) {
        loadRecipes();
        $("#updateModel").modal("hide");
        console.log(response);
      },
    });
  });
});
function addRecipe() {
  let name = $("#name").val();
  let price = $("#price").val();
  let department = $("#department").val();
  let color = $("#color").val();
  let description = $("#description").val();
  $.ajax({
    url: "https://usman-recipes.herokuapp.com/api/products",
    method: "POST",
    data: { name, price, department, color, description },
    success: function (response) {
      loadRecipes();
      console.log(response);
      $("#addModal").modal("hide");
    },
  });
}
function updateRecipes() {
  console.log("here");
  $("#updateModel").modal("show");
  let btn = $(this);
  let parentDiv = btn.closest(".recipe");
  let id = parentDiv.attr("data-id");
  $.get(
    "https://usman-recipes.herokuapp.com/api/products/" + id,
    function (response) {
      $("#updateID").val(response._id);
      $("#updateName").val(response.name);
      $("#updatePrice").val(response.price);
      $("#updateDepartment").val(response.department);
      $("#updateColor").val(response.color);
      $("#updateDescription").val(response.description);
    }
  );
}
function deleteRecipes() {
  let btn = $(this);
  let parentDiv = btn.closest(".recipe");
  let id = parentDiv.attr("data-id");
  $.ajax({
    url: "https://usman-recipes.herokuapp.com/api/products/" + id,
    method: "DELETE",
    success: function () {
      loadRecipes();
    },
  });
  console.log(`${id} deleted`);
}
function loadRecipes() {
  $.ajax({
    url: "https://usman-recipes.herokuapp.com/api/products",
    method: "GET",
    error: function () {
      const recipes = $("#recipes");
      recipes.html("An error Ocurred");
    },
    success: function (response) {
      const recipes = $("#recipes");
      console.log(response);
      recipes.empty();
      for (let i = 0; i < response.length; i++) {
        let rec = response[i];
        recipes.append(`<div class= "recipe" data-id="${rec._id}">
        <h4><strong>Name:</strong> ${rec.name}</h4>
        <p><strong>Price:</strong> ${rec.price}</p>
        <p><strong>Department:</strong> ${rec.department}</p>
        <p><strong>Color:</strong> ${rec.color}</p>
        <p><strong>Description:</strong> ${rec.description}</p>
        <button id="delBtn" class="btn btn-danger btn-sm">Delete product</button>
        <button id="editBtn" class="btn btn-warning btn-sm">Edit product</button>
      </div>`);
      }
    },
  });
}
