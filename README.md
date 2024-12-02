# File Management API

This API provides endpoints for managing file uploads, retrieval, and deletion.

## Endpoints

### Upload a file
```POST /upload```
**Request body:**
**File parameter:**

* `file`: The file to upload

**Response:**

* **200 OK:** File uploaded successfully
  * `message`: "File uploaded successfully"
  * `filename`: The name of the uploaded file
* **400 Bad Request:** No file uploaded
  * `error`: "No file uploaded"
* **500 Internal Server Error:** Failed to upload file
  * `error`: "Failed to upload file"

### Get list of uploaded files
```GET /files```

**Response:**

* **200 OK:** List of uploaded files
  * `files`: An array of filenames
* **500 Internal Server Error:** Failed to get files
  * `error`: "Failed to get files"

### Get a file
```GET /files/{filename}```

**Path parameters:**

* `filename`: The name of the file to retrieve

**Response:**

* **200 OK:** File content
* **500 Internal Server Error:** Failed to get file
  * `error`: "Failed to get file"

### Delete a file
```DELETE /files/{filename}```

**Path parameters:**

* `filename`: The name of the file to delete

**Response:**

* **200 OK:** File deleted successfully
  * `message`: "File deleted successfully"
* **500 Internal Server Error:** Failed to delete file
  * `error`: "Failed to delete file"

## Usage

This API can be used to build applications that require file management capabilities. For example, you could use this API to create a file sharing application or an image upload service.

## Installation
`npm install`

## Running the API
`npm start`

## Contributing

Contributions are welcome! Please open an issue or submit a pull request.

