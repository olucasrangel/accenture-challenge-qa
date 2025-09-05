import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor';
import { faker } from '@faker-js/faker';
import AccountClient from '../../../support/api_clients/AccountClient';
import BookStoreClient from '../../../support/api_clients/BookStoreClient';

let userPayload, userId, token, userBooks;

Given('a new user is created via API', () => {
  const password = 'Password123!';
  userPayload = {
    userName: faker.internet.userName(),
    password: password,
  };

  AccountClient.createUser(userPayload).then((response) => {
    expect(response.status).to.eq(201);
    userId = response.body.userID;
  });
});

When('a token is generated for the new user', () => {
  AccountClient.generateToken(userPayload).then((response) => {
    expect(response.status).to.eq(200);
    expect(response.body.token).to.not.be.empty;
    token = response.body.token;
  });
});

When('the user authorization is confirmed', () => {
  AccountClient.authorizeUser(userPayload).then((response) => {
    expect(response.status).to.eq(200);
    expect(response.body).to.be.true;
  });
});

When("two books are added to the user's collection", () => {
  BookStoreClient.getAllBooks().then((response) => {
    expect(response.status).to.eq(200);
    const firstIsbn = response.body.books[0].isbn;
    const secondIsbn = response.body.books[1].isbn;

    userBooks = [{ isbn: firstIsbn }, { isbn: secondIsbn }];

    BookStoreClient.addBooksToCollection(userId, token, userBooks).then(
      (addResponse) => {
        expect(addResponse.status).to.eq(201);
        expect(addResponse.body.books).to.deep.equal(userBooks);
      }
    );
  });
});

Then("the user's account details should include the two added books", () => {
  AccountClient.getUserDetails(userId, token).then((response) => {
    expect(response.status).to.eq(200);
    expect(response.body.userId).to.eq(userId);
    expect(response.body.username).to.eq(userPayload.userName);
    expect(response.body.books).to.be.an('array').with.lengthOf(2);
    expect(response.body.books[0].isbn).to.eq(userBooks[0].isbn);
    expect(response.body.books[1].isbn).to.eq(userBooks[1].isbn);
  });
});
