import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import API_URL  from '../configuration';
import { login } from '../login'; // Ścieżka do Twojej funkcji login.ts

// Tworzymy instancję mocka dla axiosa
const mock = new MockAdapter(axios);

describe('login function', () => {
  afterEach(() => {
    mock.reset(); // Resetujemy mocka po każdym teście
  });

  it('make a POST request to the correct URL with correct data', async () => {
    const mockResponse = { token: 'dummyToken' };

    // Mockujemy odpowiedź dla zapytania POST na /api/Accounts/signIn
    mock.onPost(`${API_URL}/api/Accounts/signIn`).reply(200, mockResponse);

    const data = { username: 'user', password: 'password123' };

    // Wywołanie funkcji login
    const response = await login(data);

    // Sprawdzamy, czy axios wysłał zapytanie POST do odpowiedniego URL
    expect(mock.history.post.length).toBe(1); // Sprawdza, czy wysłano jedno zapytanie POST
    expect(mock.history.post[0].url).toBe(`${API_URL}/api/Accounts/signIn`);
    expect(mock.history.post[0].data).toBe(JSON.stringify(data)); // Sprawdzamy, czy dane zostały wysłane poprawnie

    // Sprawdzamy, czy odpowiedź jest poprawna
    expect(response.data).toEqual(mockResponse);
  });

  it('handle errors correctly', async () => {
    const errorMessage = 'Something went wrong';

    // Mockujemy odpowiedź z błędem
    mock.onPost(`${API_URL}/api/Accounts/signIn`).reply(500, { message: errorMessage });

    const data = { username: 'user', password: 'password123' };

    // Wywołanie funkcji login
    try {
      await login(data);
    } catch (error: any) {
      // Sprawdzamy, czy błąd jest odpowiedni
      expect(error.response.data.message).toBe(errorMessage);
    }
  });
});
