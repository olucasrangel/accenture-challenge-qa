class AccountClient {
  createUser(userPayload) {
    return cy.request({
      method: 'POST',
      url: 'https://demoqa.com/Account/v1/User',
      body: userPayload,
    });
  }

  generateToken(userPayload) {
    return cy.request({
      method: 'POST',
      url: 'https://demoqa.com/Account/v1/GenerateToken',
      body: userPayload,
    });
  }

  authorizeUser(userPayload) {
    return cy.request({
      method: 'POST',
      url: 'https://demoqa.com/Account/v1/Authorized',
      body: userPayload,
    });
  }

  getUserDetails(userId, token) {
    return cy.request({
      method: 'GET',
      url: `https://demoqa.com/Account/v1/User/${userId}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
}

export default new AccountClient();
