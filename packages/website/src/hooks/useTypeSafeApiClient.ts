import useSigV4Client from "@aws-northstar/ui/components/CognitoAuth/hooks/useSigv4Client";
import {
  DefaultApi as MyApiApi,
  Configuration as MyApiApiConfiguration,
} from "myapi-typescript-react-query-hooks";
import { useContext, useMemo } from "react";
import { RuntimeConfigContext } from "../components/RuntimeContext";

export const useMyApiApiClient = () => {
  const client = useSigV4Client();
  const runtimeContext = useContext(RuntimeConfigContext);

  return useMemo(() => {
    return runtimeContext?.typeSafeApis?.MyApi
      ? new MyApiApi(
          new MyApiApiConfiguration({
            basePath: runtimeContext.typeSafeApis.MyApi,
            fetchApi: client,
          }),
        )
      : undefined;
  }, [client, runtimeContext?.typeSafeApis?.MyApi]);
};
