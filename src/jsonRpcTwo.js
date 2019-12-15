/**
 * JSON-RPC classes.
 */
class Request {
  constructor() {
    this.jsonrpc = '2.0';
    this.method = '';
    this.params = {};
    this.id = null;
  }

  isNotification() {
    return this.id == null;
  }

  parametersByPosition() {
    return this.params instanceof Array;
  }

  parametersByName() {
    return this.params instanceof Object;
  }

  toJson() {
    let ret = JSON.stringify({
      'jsonrpc': this.jsonrpc,
      'method': this.method,
      'params': this.params,
      'id': this.id,
    });
    return ret;
  }
  getType() {
    return 'Request';
  }
}

class Response {
  constructor() {
    this.jsonrpc = '2.0';
    this.result = null;
    this.error = null;
    this.id = null;
  }

  isError() {
    return this.error != null;
  }
  toJson() {
    let ret = JSON.stringify({
      'jsonrpc': this.jsonrpc,
      'result': this.result,
      'error': this.error, // FIXME: Set either error or result, but not both.
      'id': this.id,
    });
    return ret;
  }

  getType() {
    return 'Response';
  }
}

class Error {
  constructor() {
    this.code = 0;
    this.message = '';
    this.data = null;
  }

  getMessage() {
    return '' + this.code + ' ' + this.message + ' ' + this.data;
  }

  toJson() {
    let ret = JSON.stringify({
      'code': this.code,
      'message': this.message,
      'data': this.data,
    });
    return ret;
  }

  getType() {
    return 'Error';
  }
}

const parseJsonRpcTwo = function (data) {
  // TODO: Parse batches
  let value = JSON.parse(data);
  if (value.method) {
    let request = new Request();
    request.jsonrpc = value.jsonrpc;
    request.method = value.method;
    request.params = value.params;
    request.id = value.id;
    return request;
  } else if (value.message) {
    let error = new Error();
    error.code = value.code;
    error.message = value.message;
    error.data = value.data;
    return error;
  } else if (value.result || value.error) {
    let response = new Response();
    if (value.result) {
      response.result = value.result;
    } else if (value.error) {
      response.error = value.error;
    }
    response.id = value.id;
    return response;
  }
}

const toJsonTwo = function (item) {
  return item.toJson();
}

exports.Request = Request;
exports.Response = Response;
exports.Error = Error;
exports.parseJsonRpcTwo = parseJsonRpcTwo;
exports.toJsonTwo = toJsonTwo;

