$version: "2"
namespace com.aws

use aws.protocols#restJson1

/// A sample smithy api
@restJson1
service MyApi {
    version: "1.0"
    operations: [SayHello]
    errors: [
      BadRequestError
      NotAuthorizedError
      InternalFailureError
    ]
}