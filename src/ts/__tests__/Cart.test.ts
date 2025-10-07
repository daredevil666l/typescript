import Cart from '../service/Cart';
import Movie from '../domain/Movie';

describe('Cart', () => {
  let cart: Cart;
  let movie1: Movie;
  let movie2: Movie;
  let movie3: Movie;

  beforeEach(() => {
    cart = new Cart();
    movie1 = new Movie(
      1,
      'Мстители',
      'The Avengers',
      2012,
      'США',
      'Avengers Assemble!',
      ['фантастика', 'боевик'],
      137,
      1000
    );
    movie2 = new Movie(
      2,
      'Интерстеллар',
      'Interstellar',
      2014,
      'США',
      'Mankind was born on Earth',
      ['фантастика', 'драма'],
      169,
      1500
    );
    movie3 = new Movie(
      3,
      'Начало',
      'Inception',
      2010,
      'США',
      'Your mind is the scene of the crime',
      ['фантастика', 'триллер'],
      148,
      1200
    );
  });

  test('should create empty cart', () => {
    expect(cart.getAll().length).toBe(0);
  });

  test('should add item to cart', () => {
    cart.add(movie1);
    expect(cart.getAll().length).toBe(1);
    expect(cart.getAll()[0]).toBe(movie1);
  });

  test('should add multiple items', () => {
    cart.add(movie1);
    cart.add(movie2);
    cart.add(movie3);
    expect(cart.getAll().length).toBe(3);
  });

  test('should calculate total amount without discount', () => {
    cart.add(movie1);
    cart.add(movie2);
    expect(cart.getTotalAmount()).toBe(2500);
  });

  test('should calculate total amount with single item', () => {
    cart.add(movie1);
    expect(cart.getTotalAmount()).toBe(1000);
  });

  test('should return 0 for empty cart', () => {
    expect(cart.getTotalAmount()).toBe(0);
  });

  test('should calculate total with 10% discount', () => {
    cart.add(movie1);
    cart.add(movie2);
    expect(cart.getTotalWithDiscount(10)).toBe(2250);
  });

  test('should calculate total with 25% discount', () => {
    cart.add(movie1);
    cart.add(movie2);
    expect(cart.getTotalWithDiscount(25)).toBe(1875);
  });

  test('should calculate total with 0% discount', () => {
    cart.add(movie1);
    cart.add(movie2);
    expect(cart.getTotalWithDiscount(0)).toBe(2500);
  });

  test('should calculate total with 100% discount', () => {
    cart.add(movie1);
    expect(cart.getTotalWithDiscount(100)).toBe(0);
  });

  test('should remove item by id', () => {
    cart.add(movie1);
    cart.add(movie2);
    cart.add(movie3);
    
    cart.removeById(2);
    
    const items = cart.getAll();
    expect(items.length).toBe(2);
    expect(items.find(item => item.id === 2)).toBeUndefined();
    expect(items.find(item => item.id === 1)).toBeDefined();
    expect(items.find(item => item.id === 3)).toBeDefined();
  });

  test('should remove first item by id', () => {
    cart.add(movie1);
    cart.add(movie2);
    
    cart.removeById(1);
    
    expect(cart.getAll().length).toBe(1);
    expect(cart.getAll()[0].id).toBe(2);
  });

  test('should remove last item by id', () => {
    cart.add(movie1);
    cart.add(movie2);
    
    cart.removeById(2);
    
    expect(cart.getAll().length).toBe(1);
    expect(cart.getAll()[0].id).toBe(1);
  });

  test('should do nothing when removing non-existent id', () => {
    cart.add(movie1);
    cart.add(movie2);
    
    cart.removeById(999);
    
    expect(cart.getAll().length).toBe(2);
  });

  test('should handle removing from empty cart', () => {
    cart.removeById(1);
    expect(cart.getAll().length).toBe(0);
  });

  test('should remove all items one by one', () => {
    cart.add(movie1);
    cart.add(movie2);
    cart.add(movie3);
    
    cart.removeById(1);
    cart.removeById(2);
    cart.removeById(3);
    
    expect(cart.getAll().length).toBe(0);
  });
});
