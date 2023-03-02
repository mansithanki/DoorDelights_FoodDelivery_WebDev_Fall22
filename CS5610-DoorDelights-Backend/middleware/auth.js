const Account = require("../models/account");
const jwt = require("jsonwebtoken");

const verifyGivenToken = (req, res) => {
  const authHeader = req.get("Authorization");
  if (!authHeader) {
    const error = new Error("AUTHENTICATION UNSUCCESSFUL");
    error.statusCode = 401;
    throw error;
  }

  const token = authHeader.split(" ")[1];
  let decodedToken;
  try {
    decodedToken = jwt.verify(token, "supersecretkey-foodWebApp");
  } catch (err) {
    err.statusCode = 500;
    throw err;
  }
  if (!decodedToken) {
    const error = new Error("AUTHENTICATION UNSUCCESSFUL");
    error.statusCode = 401;
    throw error;
  }

  return decodedToken.accountId;
};

exports.verifySeller = (req, res, next) => {
  const accountId = verifyGivenToken(req, res);
  Account.findById(accountId)
    .then((account) => {
      if (!account) {
        const error = new Error("INTERNAL SERVER ERROR");
        error.statusCode = 500;
        throw error;
      }
      if (account.role !== "ROLE_SELLER") {
        const error = new Error("ACCESS IS FORBIDDEN");
        error.statusCode = 403;
        throw error;
      }
      req.loggedInUserId = accountId;
      next();
    })
    .catch((err) => {
      if (!err.statusCode) err.statusCode = 500;
      next(err);
    });
};

exports.verifyUser = (req, res, next) => {
  const accountId = verifyGivenToken(req, res);
  Account.findById(accountId)
    .then((account) => {
      if (!account) {
        const error = new Error("INTERNAL SERVER ERROR");
        error.statusCode = 500;
        throw error;
      }
      if (account.role !== "ROLE_USER") {
        const error = new Error("ACCESS IS FORBIDDEN");
        error.statusCode = 403;
        throw error;
      }
      req.loggedInUserId = accountId;
      next();
    })
    .catch((err) => {
      if (!err.statusCode) err.statusCode = 500;
      next(err);
    });
};
