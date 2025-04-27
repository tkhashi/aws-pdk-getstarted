import { CloudscapeReactTsWebsiteProject } from "@aws/pdk/cloudscape-react-ts-website";
import { InfrastructureTsProject } from "@aws/pdk/infrastructure";
import { MonorepoTsProject } from "@aws/pdk/monorepo";
import {
    DocumentationFormat,
    Language,
    Library,
    ModelLanguage,
    TypeSafeApiProject,
} from "@aws/pdk/type-safe-api";
import { javascript } from "projen";

const monorepo = new MonorepoTsProject({
    name: "my-project",
    packageManager: javascript.NodePackageManager.PNPM,
    projenrcTs: true,
});

const api = new TypeSafeApiProject({
    parent: monorepo,
    outdir: "packages/api",
    name: "myapi",
    infrastructure: {
        language: Language.TYPESCRIPT,
    },
    model: {
        language: ModelLanguage.SMITHY,
        options: {
            smithy: {
                serviceName: {
                    namespace: "com.aws",
                    serviceName: "MyApi",
                },
            },
        },
    },
    documentation: {
        formats: [DocumentationFormat.HTML_REDOC],
    },
    library: {
        libraries: [Library.TYPESCRIPT_REACT_QUERY_HOOKS],
    },
    handlers: {
        languages: [Language.TYPESCRIPT],
    },
});

const website = new CloudscapeReactTsWebsiteProject({
    parent: monorepo,
    outdir: "packages/website",
    name: "website",
    typeSafeApis: [api],
});

new InfrastructureTsProject({
    parent: monorepo,
    outdir: "packages/infra",
    name: "infra",
    cloudscapeReactTsWebsites: [website],
    typeSafeApis: [api],
});

monorepo.synth();