/*! Copyright [Amazon.com](http://amazon.com/), Inc. or its affiliates. All Rights Reserved.
SPDX-License-Identifier: Apache-2.0 */
import { CognitoAuth } from "@aws-northstar/ui";
import React, { useContext } from "react";
import Config from "../../config.json";
import { RuntimeConfigContext } from "../RuntimeContext";

/**
 * Sets up the Cognito auth.
 *
 * This assumes a runtime-config.json file is present at '/'. In order for Auth to be set up automatically,
 * the runtime-config.json must have the following properties configured: [region, userPoolId, userPoolWebClientId, identityPoolId].
 */
const Auth: React.FC<any> = ({ children }) => {
  const runtimeContext = useContext(RuntimeConfigContext);

  return runtimeContext?.userPoolId &&
    runtimeContext?.userPoolWebClientId &&
    runtimeContext?.region &&
    runtimeContext?.identityPoolId ? (
    <CognitoAuth
      header={Config.applicationName}
      userPoolId={runtimeContext.userPoolId}
      clientId={runtimeContext.userPoolWebClientId}
      region={runtimeContext.region}
      identityPoolId={runtimeContext.identityPoolId}
      signUpAttributes={[
        {
          displayName: "Email",
          name: "email",
          required: true,
        },
        {
          displayName: "Given name",
          name: "given_name",
          required: true,
        },
        {
          displayName: "Last name",
          name: "family_name",
          required: true,
        },
      ]}
    >
      {children}
    </CognitoAuth>
  ) : (
    <></>
  );
};

export default Auth;
