
module.exports.handler = async (event, context, callback) => {

    const response = {
      statusCode: 200,
      statusDescription: '200 OK',
      headers: { 'Set-cookie': 'cookies', 'Content-Type': 'application/json' },
      body: 'Successfully executed "handler" lambda call via loadbalancer',
    };
    return callback(null, response);
  }
