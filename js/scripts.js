function Pizza(name, pizza, size, price) {
  this.name = name;
  this.pizza = pizza;
  this.size = size;
  this.price = price;
  this.toppings = 0;
}
Pizza.prototype.finalPrice = function() {
  return parseFloat(this.price) + parseFloat(this.toppings);
};

Pizza.prototype.calculateToppings = function() {
  var toppingsVal = 0;
  $("input[type=checkbox]:checked").each(function() {
    toppingsVal += parseInt($(this).val());
  })
  this.toppings = toppingsVal;
};

var cheese = {name: "Cheese",
                sizes: [
                  {size: "Medium", price: 9.99},
                  {size: "Large", price: 11.99},
                  {size: "Extra Large", price: 14.99}
                ]};

var pepperoni = {name: "Pepperoni",
                   sizes: [
                      {size: "Medium", price: 11.99},
                      {size: "Large", price: 12.99},
                      {size: "Extra Large", price: 15.99}
                 ]};

var combination = {name: "Combination",
                     sizes: [
                        {size: "Medium", price: 12.99},
                        {size: "Large", price: 14.99},
                        {size: "Extra Large", price: 17.99}
                   ]};

var pizzas = [cheese, pepperoni, combination];

$(document).ready(function() {

  $('#select-pizza').change('#select-pizza', function() {
    var select = document.getElementById("select-size");
    $('#select-size').empty();
    var selectedPizzaSizes = pizzas[$('#select-pizza').val()].sizes;
    for(var i = 0; i < selectedPizzaSizes.length; i++) {
      var optionElement = document.createElement("option");
      optionElement.textContent = selectedPizzaSizes[i].size;
      optionElement.value = parseFloat(selectedPizzaSizes[i].price);
      select.appendChild(optionElement);
    }
  });

  $("form#pizza-form").submit(function(event){
    event.preventDefault();
    var name = $("#name").val();
    var pizzaName = pizzas[$("#select-pizza").val()].name;
    var pizzaSize = $("#select-size option:selected").text();
    var pizzaPrice = $("#select-size").val();

    var newPizza = new Pizza(name, pizzaName, pizzaSize, pizzaPrice);
    newPizza.calculateToppings();
    $('ul#pizza-names').append('<li><span class="pizza">' + newPizza.name + '</span></li>');
    $("#pizzas").show();

    $(".pizza").last().click(function() {
      $("#show-pizza").show();
      $("#show-pizza h2").text(newPizza.name);
      $(".pizza-name").text(newPizza.pizza);
      $(".pizza-size").text(newPizza.size);
      $(".pizza-price").text('$' + newPizza.finalPrice());

      if (newPizza.toppings > 0) {
        $("#toppingsList").show();
        $(".toppings-price").text(newPizza.toppings);
      }

    });
  });
});
