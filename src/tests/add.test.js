const add = (a, b) => a + b;

const generateGreeting = (name = 'Demba') => `Hello ${name}!`;

test('should add two numbers', () => {
    const result = add(3, 5);

    expect(result).toBe(8);
});

test('should generate greeting for no name', () => {
    const result = generateGreeting();
    expect(result).toBe('Hello Demba!')
});