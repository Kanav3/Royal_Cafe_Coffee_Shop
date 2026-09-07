function getBotResponse(input) {
    // Simple responses
    if (input == "hello") {
        return "Hello there! What can I do for you?";
    } else if (input == "hi") {
        return "Hi there! What can I do for you?";
    } else if (input == "commands") {
        return "Keywords/Commands: <br/><br/> <strong>menu</strong> - it will show our menu. <br/> <strong>about</strong> - it will show the 'about us'. <br/> <strong>contact</strong>- it will show 'contact info'. <br/> <strong>commands</strong> - it will show 'keyword'. <br/> <strong>how to order</strong> - it will show the instruction. <br/> <strong>location</strong> - it will show our address.";
    } else if (input == "menu") {
        return "Here's our menu: <br /><br /> Americano - Hot Espresso - Rs 45.00 <br /> Caffe Latte - Steamed Milk - Rs 65.00 <br /> Salted Caramel Espresso - Rs 75.00 <br /> Cafe Mocha Espresso - Rs 75.00 <br /> Spanish Latte Espresso - Rs 75.00 ";
    } else if (input == "about") {
        return "Hi there! <br /><br /> <strong>Royal Cafe</strong> is a coffee shop and retailer in Punjab, India.";
    } else if (input == "contact") {
        return "Here's our contact information: <br /><br /> <strong>Email:</strong> royalcafe18@gmail.com <br /> <strong>Phone Number:</strong> +91 12345 67890 <br /> <strong>Messenger:</strong> @royalcafe <br /> <strong>Address:</strong> Modern Colony, Pathankot, Punjab ";
    } else if (input == "how to order") {
        return "Hi There! <br /><br /> To order, you can go to our <strong>Menu</strong> section and click the <strong'Add to Cart'></strong> button of your choice. <br /><br /> I hope you understand. Thank you so much!";
    } else if (input == "location") {
        return "Here's our address: <strong>Amar Avenue, Near Bus Stand, Modern Colony, Pathankot, Punjab</strong>";
    
    /*
    } else if (input == "hi") {
        return "Hi there! What can I do for you?";
    } else if (input == "hi") {
        return "Hi there! What can I do for you?";
    } else if (input == "hi") {
        return "Hi there! What can I do for you?";
    } else if (input == "hi") {
        return "Hi there! What can I do for you?";
    } else if (input == "hi") {
        return "Hi there! What can I do for you?";
    } else if (input == "hi") {
        return "Hi there! What can I do for you?";
    } else if (input == "hi") {
        return "Hi there! What can I do for you?";
    */
   
    } else {
        return "Try asking something else!";
    }
}