import { UserIdentity } from "@aws/pdk/identity";
import { Stack, StackProps } from "aws-cdk-lib";
import { Construct } from "constructs";
import { MyApi } from "../constructs/apis/myapi";
import { Website } from "../constructs/websites/website";

export class ApplicationStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    // @ts-ignore
    const userIdentity = new UserIdentity(this, `${id}UserIdentity`);
    const myapi = new MyApi(this, "MyApi", {
      userIdentity,
    });
    new Website(this, "Website", {
      userIdentity,
      myapi,
    });
  }
}
