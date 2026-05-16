"use client";

import ReduxProvider from "./ReduxProvider";
import ReactQueryProvider from "./ReactQueryProvider";

export default function Providers({ children, }) {

    return (
        <ReduxProvider>
            <ReactQueryProvider>
                {children}
            </ReactQueryProvider>

        </ReduxProvider>
    );
}