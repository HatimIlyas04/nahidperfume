function success(res, data, statusCode = 200) {
  return res.status(statusCode).json({ success: true, data });
}

function created(res, data) {
  return success(res, data, 201);
}

module.exports = { success, created };
