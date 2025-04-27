$version: "2"
namespace com.aws

@readonly
@http(method: "GET", uri: "/hello")
@handler(language: "typescript")
operation SayHello {
    input := {
        @httpQuery("name")
        @required
        name: String
    }
    output := {
        @required
        message: String
    }
    errors: [NotFoundError]
}
