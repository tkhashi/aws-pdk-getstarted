/*! Copyright [Amazon.com](http://amazon.com/), Inc. or its affiliates. All Rights Reserved.
SPDX-License-Identifier: Apache-2.0 */
import { DefaultApiClientProvider as MyApiApiClientProvider } from "myapi-typescript-react-query-hooks";
import React from "react";
import { useMyApiApiClient } from "../../hooks/useTypeSafeApiClient";

/**
 * Sets up the Type Safe Api clients.
 */
const TypeSafeApiClientProvider: React.FC<any> = ({ children }) => {
  const MyApiClient = useMyApiApiClient();

  return (
    <MyApiApiClientProvider apiClient={MyApiClient!}>
      {children}
    </MyApiApiClientProvider>
  );
};

export default TypeSafeApiClientProvider;
