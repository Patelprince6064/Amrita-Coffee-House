const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');

// Configure dotenv
dotenv.config({ path: path.join(__dirname, '.env') });

// Define Menu Schema (matching your backend)
const menuSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  category: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String, required: true },
  isPopular: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now }
});

const MenuItem = mongoose.model('MenuItem', menuSchema);

const menuData = [
  // Coffee (Hot & Espresso Mocktails)
  { name: 'Cappuccino', price: 130, category: 'Coffee', description: 'Classic espresso with steamed milk and dense foam.', image: 'https://images.unsplash.com/photo-1534778101976-62847782c213?auto=format&fit=crop&w=800&q=80' },
  { name: 'Americano', price: 100, category: 'Coffee', description: 'Espresso shots topped with hot water for a rich, bold flavor.', image: 'https://images.unsplash.com/photo-1551033406-611cf9a28f67?auto=format&fit=crop&w=800&q=80' },
  { name: 'Latte', price: 160, category: 'Coffee', description: 'Smooth espresso with plenty of steamed milk and a light layer of foam.', image: 'https://images.unsplash.com/photo-1512568400610-62da28bc8a13?auto=format&fit=crop&w=800&q=80' },
  { name: 'Vanilla Latte', price: 180, category: 'Coffee', description: 'Our classic latte infused with sweet vanilla syrup.', image: 'https://images.unsplash.com/photo-1572442388796-11668a67e53d?auto=format&fit=crop&w=800&q=80' },
  { name: 'Mocha', price: 160, category: 'Coffee', description: 'A perfect blend of espresso, chocolate, and steamed milk.', image: 'https://images.unsplash.com/photo-1522992319-0365e5f11656?auto=format&fit=crop&w=800&q=80' },
  { name: 'Italian Bicerin', price: 180, category: 'Coffee', description: 'Traditional Turin drink with layers of espresso, chocolate and cream.', image: 'https://images.unsplash.com/photo-1541167760496-162955ed8a9f?auto=format&fit=crop&w=800&q=80' },
  { name: 'Irish Cappuccino', price: 180, category: 'Coffee', description: 'Cappuccino with a hint of Irish cream flavor.', image: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=800&q=80' },
  { name: 'Caramel Cappuccino', price: 180, category: 'Coffee', description: 'Rich cappuccino drizzled with sweet caramel sauce.', image: 'https://images.unsplash.com/photo-1572286258217-40142c1c6a70?auto=format&fit=crop&w=800&q=80' },
  { name: 'Hazelnut Cappuccino', price: 180, category: 'Coffee', description: 'Cappuccino infused with nutty hazelnut syrup.', image: 'https://images.unsplash.com/photo-1517701604599-bb29b565090c?auto=format&fit=crop&w=800&q=80' },
  { name: 'Filter Coffee', price: 80, category: 'Coffee', description: 'Traditional South Indian style filter coffee.', image: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=800&q=80' },
  { name: 'Espresso 60ml', price: 120, category: 'Coffee', description: 'Pure, intense shot of our signature blend.', image: 'https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?auto=format&fit=crop&w=800&q=80' },
  { name: 'Hot Chocolate', price: 140, category: 'Coffee', description: 'Rich, creamy chocolate served warm.', image: 'https://images.unsplash.com/photo-1544787210-22bb6ed218c3?auto=format&fit=crop&w=800&q=80' },
  { name: 'Affogato', price: 180, category: 'Coffee', description: 'Vanilla bean gelato drowned in a hot shot of espresso.', image: 'https://images.unsplash.com/photo-1594631252845-29fc4586c3d7?auto=format&fit=crop&w=800&q=80', isPopular: true },
  { name: 'Espresso with Orange Juice', price: 180, category: 'Coffee', description: 'Refreshing blend of citrus and bold espresso.', image: 'https://images.unsplash.com/photo-1622597467825-f3c2253c74b8?auto=format&fit=crop&w=800&q=80' },
  { name: 'Espresso with Cranberry Juice', price: 180, category: 'Coffee', description: 'Tart cranberry paired with intense espresso.', image: 'https://images.unsplash.com/photo-1497515114629-f71d768fd07c?auto=format&fit=crop&w=800&q=80' },
  { name: 'Fizz B with Espresso', price: 180, category: 'Coffee', description: 'Bubbly fizz combined with our signature espresso.', image: 'https://images.unsplash.com/photo-1518057111178-44a106bad636?auto=format&fit=crop&w=800&q=80' },
  { name: 'Redbull with Espresso', price: 210, category: 'Coffee', description: 'Ultimate energy kick combining Redbull and espresso.', image: 'https://images.unsplash.com/photo-1518057111178-44a106bad636?auto=format&fit=crop&w=800&q=80' },
  { name: 'Tonic Water with Espresso', price: 180, category: 'Coffee', description: 'Crisp tonic water with a shot of espresso.', image: 'https://images.unsplash.com/photo-1518057111178-44a106bad636?auto=format&fit=crop&w=800&q=80' },

  // Tea
  { name: 'Indian Tea', price: 50, category: 'Tea', description: 'Classic spiced masala chai.', image: 'https://images.unsplash.com/photo-1561336313-0bd5e0b27ec8?auto=format&fit=crop&w=800&q=80' },
  { name: 'Green Tea', price: 60, category: 'Tea', description: 'Pure and detoxifying green tea.', image: 'https://images.unsplash.com/photo-1523906630133-f753f11d33c5?auto=format&fit=crop&w=800&q=80' },
  { name: 'Lemon Tea', price: 60, category: 'Tea', description: 'Refreshing tea with a zesty lemon twist.', image: 'https://images.unsplash.com/photo-1515696455651-44e49acc63d9?auto=format&fit=crop&w=800&q=80' },

  // Mocktails
  { name: 'Green Apple Cooler', price: 140, category: 'Mocktails', description: 'Crisp and refreshing green apple flavored cooler.', image: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=800&q=80' },
  { name: 'Hibiscus Cooler', price: 140, category: 'Mocktails', description: 'Floral and vibrant hibiscus infused drink.', image: 'https://images.unsplash.com/photo-1556881286-fc6915169721?auto=format&fit=crop&w=800&q=80' },
  { name: 'Watermelon Mojito', price: 140, category: 'Mocktails', description: 'Sweet watermelon with mint and lime.', image: 'https://images.unsplash.com/photo-1563223552-30d01fda3ea6?auto=format&fit=crop&w=800&q=80' },
  { name: 'Grenadine Cooler', price: 140, category: 'Mocktails', description: 'Classic sweet and tart pomegranate flavored cooler.', image: 'https://images.unsplash.com/photo-1536935338213-d2c1238f91c6?auto=format&fit=crop&w=800&q=80' },
  { name: 'Blue Curaçao Mojito', price: 140, category: 'Mocktails', description: 'Stunning blue mojito with citrus notes.', image: 'https://images.unsplash.com/photo-1536935338213-d2c1238f91c6?auto=format&fit=crop&w=800&q=80' },
  { name: 'Mint Mojito', price: 140, category: 'Mocktails', description: 'Classic refreshing mint and lime mojito.', image: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=800&q=80' },
  { name: 'Blueberry Mojito', price: 140, category: 'Mocktails', description: 'Bursting with fresh blueberry flavor.', image: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=800&q=80' },
  { name: 'Kala Khatta Mojito', price: 140, category: 'Mocktails', description: 'Tangy and spicy Indian summer favorite.', image: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=800&q=80' },
  { name: 'Tropical Layers Kiwi', price: 160, category: 'Mocktails', description: 'Exotic layered drink with fresh kiwi.', image: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=800&q=80' },
  { name: 'Mango Berry Bliss', price: 170, category: 'Mocktails', description: 'Sweet mango paired with mixed berries.', image: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=800&q=80' },
  { name: 'Sun-Kissed Sip', price: 160, category: 'Mocktails', description: 'Bright and citrusy summer refreshment.', image: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=800&q=80' },
  { name: 'Yuzu', price: 190, category: 'Mocktails', description: 'Sophisticated Japanese citrus cooler.', image: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=800&q=80' },

  // Smoothies & Bowls
  { name: 'Kiwi Smoothie', price: 180, category: 'Smoothies', description: 'Refreshing blend of fresh kiwis.', image: 'https://images.unsplash.com/photo-1553531384-cc64ac80f931?auto=format&fit=crop&w=800&q=80' },
  { name: 'Mango Smoothie', price: 180, category: 'Smoothies', description: 'Creamy and sweet tropical mango blend.', image: 'https://images.unsplash.com/photo-1553531384-cc64ac80f931?auto=format&fit=crop&w=800&q=80' },
  { name: 'Blueberry Smoothie', price: 180, category: 'Smoothies', description: 'Antioxidant-rich blueberry goodness.', image: 'https://images.unsplash.com/photo-1553531384-cc64ac80f931?auto=format&fit=crop&w=800&q=80' },
  { name: 'Strawberry Smoothie', price: 180, category: 'Smoothies', description: 'Classic strawberry delight.', image: 'https://images.unsplash.com/photo-1553531384-cc64ac80f931?auto=format&fit=crop&w=800&q=80' },
  { name: 'Strawberry Smoothie Bowl', price: 320, category: 'Smoothies', description: 'A refreshing strawberry blend crowned with fresh fruits and nutrition-rich dry fruits.', image: 'https://images.unsplash.com/photo-1553531384-cc64ac80f931?auto=format&fit=crop&w=800&q=80' },
  { name: 'Mango Smoothie Bowl', price: 320, category: 'Smoothies', description: 'A refreshing mango bowl loaded with the goodness of fresh fruits and nutrient-rich dry fruits.', image: 'https://images.unsplash.com/photo-1553531384-cc64ac80f931?auto=format&fit=crop&w=800&q=80' },

  // Shakes
  { name: 'Oreo Shake', price: 220, category: 'Shakes', description: 'Thick shake with crushed Oreo cookies.', image: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&w=800&q=80' },
  { name: 'Brownie Shake', price: 220, category: 'Shakes', description: 'Indulgent shake blended with warm brownies.', image: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&w=800&q=80' },
  { name: 'Chocolate Shake', price: 220, category: 'Shakes', description: 'Classic rich chocolate shake.', image: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&w=800&q=80' },
  { name: 'Kitkat Shake', price: 220, category: 'Shakes', description: 'Crunchy Kitkat pieces in a creamy shake.', image: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&w=800&q=80' },
  { name: 'Biscoff Shake', price: 290, category: 'Shakes', description: 'Caramelized Lotus Biscoff flavor.', image: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&w=800&q=80' },
  { name: 'Tender Coconut Shake', price: 250, category: 'Shakes', description: 'Fresh and creamy tender coconut blend.', image: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&w=800&q=80' },
  { name: 'Pina Colada', price: 260, category: 'Shakes', description: 'Tropical pineapple and coconut shake.', image: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&w=800&q=80' },

  // Pasta
  { name: 'White Sauce Pasta', price: 350, category: 'Pasta', description: 'Creamy, Italian pasta toasted in a rich, velvety white sauce with fresh herbs and vegetables.', image: 'https://images.unsplash.com/photo-1473093226795-af9932fe5856?auto=format&fit=crop&w=800&q=80' },
  { name: 'Blush Pasta', price: 350, category: 'Pasta', description: 'A velvety mix of cream and tomato sauce creating the signature pink pasta delight.', image: 'https://images.unsplash.com/photo-1473093226795-af9932fe5856?auto=format&fit=crop&w=800&q=80' },
  { name: 'Pesto Pasta', price: 370, category: 'Pasta', description: 'Creamy basil pesto blended with pasta and herbs for a refreshing gourmet delight.', image: 'https://images.unsplash.com/photo-1473093226795-af9932fe5856?auto=format&fit=crop&w=800&q=80' },
  { name: 'Tangy Twist Pasta', price: 350, category: 'Pasta', description: 'Spicy, tangy, and vibrant - pasta with a perfect balance of heat and zest.', image: 'https://images.unsplash.com/photo-1473093226795-af9932fe5856?auto=format&fit=crop&w=800&q=80' },
  { name: 'Garlic Flavoured Spaghetti', price: 280, category: 'Pasta', description: 'Spaghetti tossed in fragrant olive oil infused with roasted garlic and herbs. Light, aromatic, and full of bold garlicky flavor.', image: 'https://images.unsplash.com/photo-1473093226795-af9932fe5856?auto=format&fit=crop&w=800&q=80' },
  { name: 'Pesto Spaghetti', price: 320, category: 'Pasta', description: 'Tender spaghetti coated in a velvety basil pesto and cream sauce, blended with parmesan.', image: 'https://images.unsplash.com/photo-1473093226795-af9932fe5856?auto=format&fit=crop&w=800&q=80' },

  // Snacks
  { name: 'Garden Fresh Rock & Roll', price: 190, category: 'Snacks', description: 'Onion, tomato, aloo tikki, lettuce, sweet corn.', image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=800&q=80' },
  { name: 'Smoky Paneer Rock & Roll', price: 210, category: 'Snacks', description: 'Paneer, capsicum, onion.', image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=800&q=80' },
  { name: 'Mexican Nachos', price: 260, category: 'Snacks', description: 'Cheese Crunch and loaded with Mexican flavor in every bite.', image: 'https://images.unsplash.com/photo-1513456852971-30c0b8199d4d?auto=format&fit=crop&w=800&q=80' },
  { name: 'Zesty Cheese Nachos', price: 240, category: 'Snacks', description: 'Crunchy Nachos layered with garden fresh veggie and café-style flavors.', image: 'https://images.unsplash.com/photo-1513456852971-30c0b8199d4d?auto=format&fit=crop&w=800&q=80' },
  { name: 'Plain Maggi', price: 130, category: 'Snacks', description: 'Classic comfort Maggi.', image: 'https://images.unsplash.com/photo-1612929633738-8fe44f7ec841?auto=format&fit=crop&w=800&q=80' },
  { name: 'Vegetable Maggi', price: 150, category: 'Snacks', description: 'Maggi with onion, capsicum, and tomato.', image: 'https://images.unsplash.com/photo-1612929633738-8fe44f7ec841?auto=format&fit=crop&w=800&q=80' },
  { name: 'Vegetable Cheese Maggi', price: 170, category: 'Snacks', description: 'Cheesy Maggi with mixed veggies and processed cheese.', image: 'https://images.unsplash.com/photo-1612929633738-8fe44f7ec841?auto=format&fit=crop&w=800&q=80' },
  { name: 'Garlic Flavour Maggi', price: 170, category: 'Snacks', description: 'Maggi infused with bold garlic flavor.', image: 'https://images.unsplash.com/photo-1612929633738-8fe44f7ec841?auto=format&fit=crop&w=800&q=80' },
];


const seedDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB...');
    
    // Clear existing data
    await MenuItem.deleteMany({});
    console.log('Old menu items cleared.');
    
    // Insert new data
    await MenuItem.insertMany(menuData);
    console.log('New menu items seeded successfully!');
    
    process.exit();
  } catch (err) {
    console.error('Error seeding database:', err);
    process.exit(1);
  }
};

seedDB();
