class ApiResponse {
  constructor(statusCode, data, message = "success") {
    this.statusCode = statusCode;
    this.data = data;
    this.success = statusCode < 400;
    this.message = message;

    if (success) {
      this.errors = [];
    } else {
      this.errors = [message];
    }
  }
}

export { ApiResponse };
