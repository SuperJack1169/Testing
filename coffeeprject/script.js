<script>
  // Dark Mode Toggle
  const toggle = document.getElementById("darkModeToggle");
  toggle.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
  });

  // Cart functionality
  let cart = [];
  const cartItems = document.getElementById("cart-items");
  const cartTotal = document.getElementById("cart-total");

  function updateCart() {
    cartItems.innerHTML = "";
    let total = 0;
    cart.forEach((item) => {
      total += item.price;
      const li = document.createElement("li");
      li.textContent = `${item.name} - $${item.price.toFixed(2)}`;
      cartItems.appendChild(li);
    });
    cartTotal.textContent = total.toFixed(2);
  }

  // Toast Notification Function
  function showToast(message) {
    const toast = document.createElement("div");
    toast.textContent = message;
    toast.className = "toast";
    document.body.appendChild(toast);

    setTimeout(() => {
      toast.classList.add("show");
    }, 100);

    setTimeout(() => {
      toast.classList.remove("show");
      setTimeout(() => toast.remove(), 300);
    }, 2000);
  }

  // Add to Cart with Toast
  document.querySelectorAll(".add-to-cart").forEach(button => {
    button.addEventListener("click", () => {
      const name = button.getAttribute("data-name");
      const price = parseFloat(button.getAttribute("data-price"));
      cart.push({ name, price });
      updateCart();
      showToast("Item added to cart!");
    });
  });

  // Checkout Process
  const checkoutBtn = document.getElementById("checkout");
  checkoutBtn.addEventListener("click", () => {
    const nameInput = document.querySelector("#contact-form input[type='text']");
    const emailInput = document.querySelector("#contact-form input[type='email']");
    const messageInput = document.querySelector("#contact-form textarea");

    if (!nameInput.value || !emailInput.value || !messageInput.value) {
      alert("Please fill out your contact details (name, email, message). This will be used for delivery.");
      return;
    }

    if (cart.length === 0) {
      alert("Your cart is empty!");
      return;
    }

    let orderDetails = `Order Receipt for ${nameInput.value} \nEmail: ${emailInput.value}\nMessage: ${messageInput.value}\n\nItems:\n`;
    let total = 0;
    cart.forEach((item, index) => {
      orderDetails += `${index + 1}. ${item.name} - $${item.price.toFixed(2)}\n`;
      total += item.price;
    });
    orderDetails += `\nTotal: $${total.toFixed(2)}\n\n`;
    orderDetails += "Your order will be delivered to the address/details provided. Thank you for choosing Brew Bliss!";

    alert(orderDetails);
    cart = [];
    updateCart();
    document.getElementById("contact-form").reset();
  });

  // Scroll Fade-in Animation
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("animate-fade-in");
      }
    });
  }, {
    threshold: 0.2
  });

  document.querySelectorAll(".fade-in").forEach(el => observer.observe(el));

  // Tab Filter Logic
  const tabs = document.querySelectorAll(".tab");
  const items = document.querySelectorAll(".menu-item");

  tabs.forEach(tab => {
    tab.addEventListener("click", () => {
      tabs.forEach(t => t.classList.remove("active"));
      tab.classList.add("active");

      const category = tab.dataset.category;
      items.forEach(item => {
        item.style.display = (category === "all" || item.dataset.category === category) ? "block" : "none";
      });
    });
  });
</script>
