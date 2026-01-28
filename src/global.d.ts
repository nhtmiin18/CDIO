declare module "*.jsx" {
    import React from "react";
    const Component: React.FC<any>;
    export default Component;
}

declare module "*.js" {
    const content: any;
    export default content;
}
