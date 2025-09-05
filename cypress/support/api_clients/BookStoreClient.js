class BookStoreClient {
  getAllBooks() {
    return cy.request('GET', 'https://demoqa.com/BookStore/v1/Books');
  }

  addBooksToCollection(userId, token, isbns) {
    return cy.request({
      method: 'POST',
      url: 'https://demoqa.com/BookStore/v1/Books',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: {
        userId: userId,
        collectionOfIsbns: isbns,
      },
    });
  }
}

export default new BookStoreClient();
